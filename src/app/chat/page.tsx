"use client";
import {
    useEffect,
    useRef,
    useState
} from "react";
import {
    ArrowRightToLine,
    Camera,
    CameraOff,
    LogOut,
    Mic,
    MicOff,
    Replace,
    Volume2,
    VolumeX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    EVENTS,
    iceServers,
    cn,
} from "@/lib/utils";
import {
    brodcastRealtimeEvent,
    createRoom,
    deleteRoom,
    findRandomRoom,
} from "@/lib/actions";
import supabase from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import TooltipContainer from "@/components/TooltipContainer";
import { useData } from "@/providers/DataProvider";


const Chat: React.FC = () => {

    // router instance created
    const router = useRouter();

    // video refs for handling remote and local videos
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);

    // state to store current room id
    const [currentRoomId, setCurrentRoomId] = useState<string>("");

    // state to store the current participant is initiator or not.
    const [isInitiator, setIsInitiator] = useState<boolean>(false);

    // state to store local video stream
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);

    // states for local functionality
    const {
        isAudioEnabled, setIsAudioEnabled,
        isVideoEnabled, setIsVideoEnabled,
        isMuted, setIsMuted,
    } = useData();

    // states for remote functionality
    const [isRemoteVideoEnabled, setIsRemoteVideoEnabled] = useState<boolean>(false);
    const [isRemoteAudioEnabled, setIsRemoteAudioEnabled] = useState<boolean>(false);

    // state for showing finding spinner
    const [isFinding, setIsFinding] = useState<boolean>(true);

    // state for managing the timeout ID
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    // state for tracking main video frame
    const [isLocalMain, setIsLocalMain] = useState<boolean>(false);

    const startCapturingMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: isVideoEnabled, audio: isAudioEnabled });
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            setLocalStream(stream);
            const existingRoomId = await findRandomRoom();
            if (existingRoomId) {
                await deleteRoom(existingRoomId);
                setCurrentRoomId(() => existingRoomId);
                setIsInitiator(true);
            } else {
                const createdRoomId = await createRoom();
                setCurrentRoomId(() => createdRoomId);
                // Set a timeout to redirect if no match is found within 60 seconds
                const id = setTimeout(() => {
                    cleanup();
                    router.push("/");
                    toast({
                        title: 'No match found. Try again.',
                        variant: "destructive",
                    });
                }, 60000);
                setTimeoutId(id);
            }
        } catch (error) {
            console.error('Error accessing media devices:', error);
            toast({
                title: "Failed to proceed. Please check your camera and microphone permissions.",
                variant: "destructive",
            });
            router.push("/");
        };
    };

    const cleanup = async () => {
        if (localStream) {
            localStream.getTracks().forEach(track => {
                track.stop();
            });
            setLocalStream(null);
        }
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
        }
        if (currentRoomId) {
            await brodcastRealtimeEvent(currentRoomId, EVENTS.LEAVE, null);
            await deleteRoom(currentRoomId);
        }
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };

    // useEffect for capturing user's device media on first render.
    useEffect(() => {
        startCapturingMedia();
        return () => {
            cleanup();
        };
    }, []);

    // useEffect for handling peer connection
    useEffect(() => {
        if (!currentRoomId) {
            return;
        };

        // created an peer connection instance
        const peerConnection = new RTCPeerConnection({ iceServers });

        const channel = supabase.channel(currentRoomId);
        channel.subscribe(async (status) => {
            if (status !== "SUBSCRIBED") {
                return;
            }
            if (isInitiator) {
                await channel.send({
                    type: "broadcast",
                    event: EVENTS.JOIN,
                    payload: null,
                });
            };

            const handleTrackEvent = (event: RTCTrackEvent) => {
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = event.streams[0];
                }
                const remoteStream = event.streams[0];
                // Check if remote stream has video and audio enabled
                setIsRemoteVideoEnabled(remoteStream.getVideoTracks().some(track => track.enabled));
                setIsRemoteAudioEnabled(remoteStream.getAudioTracks().some(track => track.enabled));
                // Listen for changes in the track states
                remoteStream.getVideoTracks().forEach(track => {
                    track.onmute = () => setIsRemoteVideoEnabled(false);
                    track.onunmute = () => setIsRemoteVideoEnabled(true);
                });
                remoteStream.getAudioTracks().forEach(track => {
                    track.onmute = () => setIsRemoteAudioEnabled(false);
                    track.onunmute = () => setIsRemoteAudioEnabled(true);
                });
            };

            channel.on("broadcast", { event: EVENTS.JOIN }, async () => {
                peerConnection.ontrack = handleTrackEvent;
                peerConnection.onicecandidate = async (event) => {
                    if (event.candidate) {
                        await channel.send({
                            type: "broadcast",
                            event: EVENTS.CANDIDATE,
                            payload: { candidate: event.candidate },
                        });
                    }
                };
                localStream?.getTracks().forEach(track => {
                    peerConnection.addTrack(track, localStream!);
                });
                const offer = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offer);
                await channel.send({
                    type: "broadcast",
                    event: EVENTS.OFFER,
                    payload: { offer, },
                });
            });

            channel.on("broadcast", { event: EVENTS.OFFER }, async ({ payload: { offer } }) => {
                peerConnection.ontrack = handleTrackEvent;
                peerConnection.onicecandidate = async (event) => {
                    if (event.candidate) {
                        await channel.send({
                            type: "broadcast",
                            event: EVENTS.CANDIDATE,
                            payload: { candidate: event.candidate },
                        });
                    }
                };
                localStream?.getTracks().forEach(track => {
                    peerConnection.addTrack(track, localStream!);
                });
                if (offer) {
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
                }
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);
                await channel.send({
                    type: "broadcast",
                    event: EVENTS.ANSWER,
                    payload: { answer, },
                });
            });

            channel.on("broadcast", { event: EVENTS.ANSWER }, async ({ payload: { answer } }) => {
                if (peerConnection && answer) {
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
                    setIsFinding(false);
                }
            });

            channel.on("broadcast", { event: EVENTS.CANDIDATE }, async ({ payload: { candidate } }) => {
                if (peerConnection && candidate) {
                    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
                    setIsFinding(false);
                    // Clear the timeout if a match is found
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    };
                }
            });

            channel.on("broadcast", { event: EVENTS.LEAVE }, async () => {
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = null;
                    setIsRemoteVideoEnabled(false);
                    setIsRemoteAudioEnabled(false);
                    toast({ title: "Participant has left the room." });
                }
            });

            channel.on("broadcast", { event: EVENTS.VIDEO_TOGGLE }, async ({ payload: { enabled } }) => {
                setIsRemoteVideoEnabled(() => enabled);
            });

            channel.on("broadcast", { event: EVENTS.AUDIO_TOGGLE }, async ({ payload: { enabled } }) => {
                setIsRemoteAudioEnabled(() => enabled);
            });

            peerConnection.onconnectionstatechange = async () => {
                if (peerConnection.connectionState === "disconnected"
                    || peerConnection.connectionState === "failed"
                    || peerConnection.connectionState === "closed"
                ) {
                    if (currentRoomId) {
                        await brodcastRealtimeEvent(currentRoomId, EVENTS.LEAVE, null);
                        await deleteRoom(currentRoomId);
                    }
                }
            };

        });
        return () => {
            channel.unsubscribe();
        };
    }, [currentRoomId]);

    // function for toggle user's camera off and on 
    const toggleVideo = async () => {
        if (localStream) {
            localStream.getVideoTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsVideoEnabled(prevState => !prevState);
            await brodcastRealtimeEvent(currentRoomId, EVENTS.VIDEO_TOGGLE, { enabled: !isVideoEnabled });
        }
    };

    // function for toggle user's audio off and on 
    const toggleAudio = async () => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsAudioEnabled(prevState => !prevState);
            await brodcastRealtimeEvent(currentRoomId, EVENTS.AUDIO_TOGGLE, { enabled: !isAudioEnabled });
        }
    };

    // function to swap the video frames
    const swapFrames = () => {
        setIsLocalMain(() => !isLocalMain)
    };

    // function for find the new user
    const handleNext = () => {
        try {
            if (!isVideoEnabled || !isAudioEnabled) {
                return toast({
                    title: "Please enable your video or audio before finding a match.",
                    variant: "destructive",
                });
            }
            cleanup();
            startCapturingMedia();
            setIsFinding(true);
        } catch (error) {
            console.log(error);
        }
    };

    // function for cut the peer connection leave
    const goBack = () => {
        try {
            cleanup();
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="h-[calc(100vh-64px)] md:h-screen w-full">
            <div className="w-full h-full relative">
                {isFinding && (
                    <div className="absolute md:top-0 left-0 bottom-[calc(100vh/2)] md:bottom-full right-0 flex justify-center gap-2 md:gap-4 items-center h-16 bg-transparent text-white z-50">
                        <div className="h-10 w-10 rounded-full border-4 border-purple-300 border-r-purple-600 animate-spin duration-700" />
                        <p className="text-xl font-bold" >Finding match..</p>
                    </div>
                )}
                <div
                    className={cn(
                        "relative",
                        !isLocalMain && "w-full h-full flex items-center md:block bg-black",
                        isLocalMain && "absolute top-4 right-4 rounded-xl bg-black w-1/2 md:w-1/4 object-cover aspect-video z-50"
                    )}
                >
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        muted={isMuted}
                        className={cn(
                            "w-full h-auto md:h-full object-cover aspect-video bg-black",
                            isLocalMain && "rounded-xl border-2 border-blue-500"
                        )}
                    />
                    {!isRemoteVideoEnabled && (
                        <div className="absolute h-full w-full top-0 bottom-0 left-0 rounded-xl right-0 bg-gray-950 flex justify-center items-center">
                            <CameraOff size={64} className="hidden md:block text-red-500" />
                            <CameraOff size={32} className="md:hidden text-red-500" />
                        </div>
                    )}
                    {!isRemoteAudioEnabled && (
                        <div className="absolute top-2 left-2">
                            <MicOff className="text-red-500" />
                        </div>
                    )}
                </div>
                <div
                    className={cn(
                        "relative",
                        isLocalMain && "w-full h-full flex items-center md:block bg-black",
                        !isLocalMain && "absolute top-4 right-4 rounded-xl bg-black w-1/2 md:w-1/4 object-cover aspect-video z-50",
                    )}
                >
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        className={cn(
                            "w-full h-auto md:h-full object-cover aspect-video bg-black",
                            !isLocalMain && "rounded-xl border-2 border-blue-500"
                        )}
                    />
                    {!isVideoEnabled && (
                        <div className="absolute h-full w-full top-0 bottom-0 left-0 rounded-xl right-0 bg-gray-900 flex justify-center items-center">
                            <CameraOff size={64} className="hidden md:block text-red-500" />
                            <CameraOff size={32} className="md:hidden text-red-500" />
                        </div>
                    )}
                    {!isAudioEnabled && (
                        <div className="absolute top-2 left-2">
                            <MicOff className="text-red-500" />
                        </div>
                    )}
                </div>
                <div className="absolute gap-2 md:gap-4 bottom-10 w-full flex px-4 justify-center">
                    <TooltipContainer content={"Swap Frame"} >
                        <Button className="transition-all active:scale-95" size={'icon'} onClick={swapFrames}>
                            <Replace className="text-blue-500" />
                        </Button>
                    </TooltipContainer>
                    <TooltipContainer content={isVideoEnabled ? "Camera off" : "Camera on"} >
                        <Button className="transition-all active:scale-95" size={'icon'} onClick={toggleVideo}>
                            {isVideoEnabled ? <Camera className="text-blue-500" /> : <CameraOff className="text-red-500" />}
                        </Button>
                    </TooltipContainer>
                    <TooltipContainer content={isAudioEnabled ? "Mic off" : "Mic on"} >
                        <Button className="transition-all active:scale-95" size={'icon'} onClick={toggleAudio}>
                            {isAudioEnabled ? <Mic className="text-blue-500" /> : <MicOff className="text-red-500" />}
                        </Button>
                    </TooltipContainer>
                    <TooltipContainer content={isMuted ? "Unmute" : "Mute"} >
                        <Button className="transition-all active:scale-95" size={'icon'} onClick={() => setIsMuted(!isMuted)} >
                            {isMuted ? <VolumeX className="text-red-500" /> : <Volume2 className="text-blue-500" />}
                        </Button>
                    </TooltipContainer>
                    <TooltipContainer content="Find next" >
                        <Button onClick={handleNext} size={'icon'} className="transition-all active:scale-95 bg-green-500 hover:bg-green-600">
                            <ArrowRightToLine className="text-white" />
                        </Button>
                    </TooltipContainer>
                    <TooltipContainer content="End chatting" >
                        <Button onClick={goBack} size={'icon'} className="transition-all active:scale-95 bg-rose-500 hover:bg-rose-600">
                            <LogOut className="text-white" />
                        </Button>
                    </TooltipContainer>
                </div>
            </div>
        </main>
    );
};

export default Chat;