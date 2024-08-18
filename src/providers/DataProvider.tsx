"use client";
import React from "react";

type DefaultDataContextType = {
    isVideoEnabled: boolean;
    isAudioEnabled: boolean;
    isMuted: boolean;
    setIsVideoEnabled: (value: React.SetStateAction<boolean>) => void;
    setIsAudioEnabled: (value: React.SetStateAction<boolean>) => void;
    setIsMuted: (value: React.SetStateAction<boolean>) => void;
};

const DataContext = React.createContext<DefaultDataContextType>({
    isAudioEnabled: true,
    isVideoEnabled: true,
    isMuted: false,
    setIsVideoEnabled: () => { },
    setIsAudioEnabled: () => { },
    setIsMuted: () => { },
});

export const useData = () => {
    return React.useContext(DataContext);
};

const DataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [isVideoEnabled, setIsVideoEnabled] = React.useState<boolean>(true);
    const [isAudioEnabled, setIsAudioEnabled] = React.useState<boolean>(true);
    const [isMuted, setIsMuted] = React.useState<boolean>(false);

    return (
        <DataContext.Provider value={{
            isAudioEnabled, setIsAudioEnabled,
            isVideoEnabled, setIsVideoEnabled,
            isMuted, setIsMuted,
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;