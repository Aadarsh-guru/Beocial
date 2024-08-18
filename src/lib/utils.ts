import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export const EVENTS = {
  JOIN: "JOIN",
  LEAVE: "LEAVE",
  OFFER: "OFFER",
  ANSWER: "ANSWER",
  CANDIDATE: "CANDIDATE",
  VIDEO_TOGGLE: "VIDEO_TOGGLE",
  AUDIO_TOGGLE: "AUDIO_TOGGLE",
};

export const iceServers = [
  {
    urls: [
      "stun:stun.l.google.com:19302",
      "stun:global.stun.twilio.com:3478",
    ],
  }
];