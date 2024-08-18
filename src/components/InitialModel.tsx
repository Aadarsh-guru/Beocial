"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useData } from "@/providers/DataProvider";

const InitialModal: React.FC<React.PropsWithChildren> = ({ children }) => {

    const router = useRouter();

    const {
        isAudioEnabled, setIsAudioEnabled,
        isVideoEnabled, setIsVideoEnabled,
    } = useData();

    const [isErrorMessage, setIsErrorMessage] = useState<string>("");

    useEffect(() => {
        if (!isVideoEnabled && !isAudioEnabled) {
            setIsErrorMessage("You must enable at least the camera or microphone.");
        } else {
            setIsErrorMessage("");
        }
    }, [isVideoEnabled, isAudioEnabled]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    {children}
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl" >Get Started</DialogTitle>
                    <DialogDescription>
                        Start connecting with people around the world. Make new friends right from the comfort of your home.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="default-camera" className="font-medium">
                            Default Camera Setting
                        </Label>
                        <Switch
                            id="default-camera"
                            checked={isVideoEnabled}
                            onCheckedChange={setIsVideoEnabled}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="default-mic" className="font-medium">
                            Default Mic Setting
                        </Label>
                        <Switch
                            id="default-mic"
                            checked={isAudioEnabled}
                            onCheckedChange={setIsAudioEnabled}
                        />
                    </div>
                    {isErrorMessage && (
                        <p className="text-red-500 text-xs font-bold">{isErrorMessage}</p>
                    )}
                </div>
                <DialogClose asChild>
                    <Button
                        className="w-full group"
                        onClick={() => router.push(`/chat`)}
                        disabled={!isVideoEnabled && !isAudioEnabled}
                    >
                        Let&apos;s Begin
                        <ArrowRight size={20} className="ml-2 transition-all group-hover:ml-3" />
                    </Button>
                </DialogClose>
                <DialogFooter>
                    <div className="text-xs text-gray-700 dark:text-gray-300 text-center">
                        By starting, you agree to our
                        {" "}
                        <span
                            onClick={() => router.push("/terms-and-conditions")}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Terms of Service</span>
                        {", "}
                        <span
                            onClick={() => router.push("/privacy-policy")}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Privacy Policy
                        </span>
                        {", and "}
                        <span
                            onClick={() => router.push("/disclaimer")}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Disclaimer
                        </span>
                        .
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default InitialModal;