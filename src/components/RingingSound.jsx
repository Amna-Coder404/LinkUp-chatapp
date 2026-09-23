import { useEffect } from "react";
import SoundPlayer from "react-native-sound-player";

import {
    CallingState, useCall, useCallStateHooks,
} from "@stream-io/video-react-native-sdk";

const RingingSound = () => {
    const call = useCall();

    const { useCallCallingState } = useCallStateHooks();

    const callingState = useCallCallingState();

    useEffect(() => {
        if (callingState !== CallingState.RINGING) {
            return;
        }

        try {
            SoundPlayer.playSoundFile(
                call?.isCreatedByMe ? "outgoing_call" : "incoming_call", "mp3"
            );
        } catch (error) {
            console.log("RING SOUND ERROR:", error);
        }

        return () => {
            try {
                SoundPlayer.stop();
            } catch (error) {
                console.log("STOP RING SOUND ERROR:", error);
            }
        };
    }, [callingState, call?.isCreatedByMe]);

    return null;
};

export default RingingSound;