
import { useCall, useCallStateHooks, } from "@stream-io/video-react-native-sdk";

import { useEffect, useRef, useState, } from "react";

import { ImageBackground, View, } from "react-native";

import { Avatar, IconButton, Text } from "react-native-paper";

import COLORS from "../constants/colors";
import styles from "../styles/AudioCall.styles";
import formatCallDuration from "../utils/formatCallDuration";
import { getImageSource, getProfileInitial } from "../utils/getImageSource";

import { updateCallHistoryStatus, } from "../services/callHistoryService";


const AudioCallContent = () => {
    const call = useCall();

    const {
        useCallStartedAt,
        useCallCallingState,
        useCallMembers,
        useCallCustomData,
        useMicrophoneState,
        useCallSession,

    } = useCallStateHooks();


    // Call Info who memeber, callign status
    const startedAt = useCallStartedAt();
    const callingState = useCallCallingState();
    const members = useCallMembers();
    const customData = useCallCustomData();
    const session = useCallSession();


    const { microphone, isMute, } = useMicrophoneState();


    const [now, setNow] = useState(Date.now());
    const [callEnded, setCallEnded] = useState(false);


    // Prevent duplicate history updates
    const completedSavedRef = useRef(false);
    const endedSavedRef = useRef(false);

    const missedSavedRef = useRef(false);


    // Current User
    const currentUserId = call?.currentUserId;


    // Caller
    const callerId = customData?.callerId;

    // Receiver 
    const receiverId = members.find((member) => member.user_id !== callerId)?.user_id;


    // Other user (like ma ks sy baar kar rho hon)
    const otherMember =
        members.find(
            (member) => member.user_id !== currentUserId)
        ;

    const user = otherMember?.user;


    // SAVE COMPLETED CALL
    const saveCompletedCall = async () => {
        if (!call?.id || !startedAt || endedSavedRef.current) return;


        try {
            endedSavedRef.current = true;

            // For Call History
            await updateCallHistoryStatus({
                streamCallId: call.id,
                status: "completed",
                startedAt: startedAt,
                endedAt: new Date().toISOString(),
            });

        } catch (error) {
            endedSavedRef.current = false;
            console.log("SAVE COMPLETED CALL ERROR:", error);
        }
    };


    // MARK CALL AS STARTED / COMPLETED
    useEffect(() => {
        if (!startedAt || !call?.id || completedSavedRef.current) return;

    }, [startedAt, call?.id,]);


    // CALL DURATION
    useEffect(() => {
        if (!startedAt) return;


        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);


        return () => {
            clearInterval(interval);
        };

    }, [startedAt,]);


    // MISSED CALL

    useEffect(() => {

        if (
            !call?.id ||
            startedAt ||
            !session ||
            !currentUserId ||
            missedSavedRef.current
        ) {
            return;
        }


        const missedBy = session?.missed_by || {};


        if (missedBy[currentUserId]) {
            return;
        }


        const saveMissedCall =
            async () => {

                try {

                    missedSavedRef.current = true;

                    await updateCallHistoryStatus({
                        streamCallId: call.id,
                        status: "missed",
                        startedAt: null,
                        endedAt: new Date().toISOString(),
                    });


                    setCallEnded(true);
                } catch (error) {
                    missedSavedRef.current = false;
                    console.log("SAVE MISSED CALL ERROR:", error
                    );
                }
            };


        saveMissedCall();

    }, [call?.id, currentUserId, session, startedAt,]);


    // Remote Hangup
    useEffect(() => {
        if (!call) return

        const unsubscribe = call.on("custom", async (event) => {
            if (event?.custom?.type !== "call_ended") {
                return;
            }


            // Remote user ended call
            setCallEnded(true);


            if (startedAt) {
                await saveCompletedCall();
            }
            try {
                await call.leave();
            } catch (error) {
                console.log("REMOTE CALL LEAVE ERROR:", error);
            }
        }
        );


        return () => {
            unsubscribe?.();
        };
    }, [call, startedAt,
    ]);


    // PARTICIPANT LEFT
    useEffect(() => {

        if (!call) return;


        const unsubscribe = call.on("call.session_participant_left", async (event) => {

            const leftUserId = event?.participant?.user_id;


            if (!leftUserId || leftUserId === currentUserId) return;

            // Someone else left an
            // already-established session.
            if (startedAt) {
                await saveCompletedCall();
                setCallEnded(true);
            }
        });


        return () => {
            unsubscribe?.();
        };

    }, [call, currentUserId, startedAt,]);


    // CALL LEFT

    useEffect(() => {
        if (callingState !== "left") return;
        setCallEnded(true);

    }, [callingState,]);


    // Mute
    const handleMute = async () => {
        await microphone.toggle();
    };


    // HangUp
    const handleHangup = async () => {
        setCallEnded(true);

        // Answered Call
        if (startedAt) {
            await saveCompletedCall();
        }


        // Never answered (Call Status change)
        else if (call?.isCreatedByMe) {

            try {
                await updateCallHistoryStatus({
                    streamCallId: call.id,
                    status: "cancelled",
                    startedAt: null,
                    endedAt: new Date().toISOString(),
                });

            } catch (error) {
                console.log("SAVE CANCELLED CALL ERROR:", error);
            }

        }


        // tell other user to close call ui (if I cut call then close second user call ui)
        try {
            await call.sendCustomEvent({
                type: "call_ended",
                payload: {},
            });

        } catch (error) {
            console.log("SEND CALL ENDED EVENT ERROR:", error);
        }


        // Leave Stream call  (cut call form stream also)
        try {
            await call.leave();
        } catch (error) {
            console.log("CALL LEAVE ERROR:", error);
        }

    };


    // Hide ui (if Call Ended or not any call)
    // if (callEnded) { retcurn null; }

    return (
        <ImageBackground
            source={require("../../assets/images/imgs/call-bg-light.png")}
            style={styles.AudioCallContent}
            resizeMode="cover" >

            {user?.image ? (
                <Avatar.Image
                    size={89}
                    source={getImageSource(user.image)}
                    style={styles.avatar}
                    backgroundColor="transparent"
                />

            ) : (
                <Avatar.Text
                    size={89}
                    label={getProfileInitial(user?.name)}
                    style={styles.avatar}
                />

            )}


            <Text variant="headlineSmall" style={styles.textCall}  >
                {user?.name || "Audio Call"}
            </Text>


            <Text variant="bodyLarge" style={styles.calltitle}    >
                {formatCallDuration(startedAt, now)}
            </Text>


            <View style={styles.callBtnCon} >

                <IconButton
                    icon={isMute ? "microphone-off" : "microphone"}
                    mode="contained"
                    containerColor="white"
                    iconColor={COLORS.primary}
                    size={30}
                    onPress={handleMute}
                />


                <IconButton
                    icon="phone-hangup"
                    mode="contained"
                    containerColor={COLORS.danger}
                    iconColor="white"
                    size={30}
                    onPress={handleHangup}
                />

            </View>

        </ImageBackground>
    );
};


export default AudioCallContent;

