import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";

import {
    CallingState,
    useCall,
    useCallStateHooks,
} from "@stream-io/video-react-native-sdk";

const incomingSound = require("../../assets/sounds/incoming_call.mp3");
const outgoingSound = require("../../assets/sounds/outgoing_call.mp3");

const RingingSound = () => {
    const call = useCall();
    const { useCallCallingState } = useCallStateHooks();

    const callingState = useCallCallingState();

    const incomingPlayer = useAudioPlayer(incomingSound);
    const outgoingPlayer = useAudioPlayer(outgoingSound);

    useEffect(() => {
        if (callingState !== CallingState.RINGING) {
            incomingPlayer.pause();
            outgoingPlayer.pause();
            return;
        }

        const player = call?.isCreatedByMe
            ? outgoingPlayer
            : incomingPlayer;

        try {
            player.seekTo(0);
            player.loop = true;
            player.play();
        } catch (error) {
            console.log("RING SOUND ERROR:", error);
        }

        return () => {
            try {
                player.pause();
                player.seekTo(0);
            } catch (error) {
                console.log("STOP RING SOUND ERROR:", error);
            }
        };
    }, [callingState, call?.isCreatedByMe]);

    return null;
};

export default RingingSound;