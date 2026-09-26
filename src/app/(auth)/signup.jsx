import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from "expo-router";
import { Button, Text, TextInput } from "react-native-paper";

import COLORS from "../../constants/colors";
import { signUpUser } from "../../services/authService";
import styles from "../../styles/auth.styles";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [secureText, setSecureText] = useState(true);

    const handleSignUp = async () => {
        setError("");

        if (
            !fullName.trim() ||
            !email.trim() ||
            !password
        ) {
            setError("All fields are required.");
            return;
        }

        setLoading(true);

        try {
            await signUpUser({
                email: email.trim(),
                password,
                fullName: fullName.trim(),
            });

            console.log("User Created!");

            setEmail("");
            setFullName("");
            setPassword("");
        } catch (error) {
            console.log("SIGN UP ERROR:", error);

            if (
                error.message ===
                "Invalid login credentials"
            ) {
                setError(
                    "Incorrect email or password."
                );
            } else {
                setError(
                    error.message ||
                    "Something went wrong."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : "height"
            }
        >
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >

                {/* Brand */}
                <View style={styles.topBar}>
                    <Text style={styles.brand}>
                        LinkUp
                        <Text style={styles.brandDot}>.</Text>
                    </Text>


                    {/* Logo */}
                    <Image
                        source={require("../../../assets/images/imgs/logo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>


                {/* Hero */}
                <View style={styles.hero}>
                    <Text style={styles.eyebrow}>
                        New here?
                    </Text>

                    <Text style={styles.heroTitle}>
                        JOIN{"\n"}
                        <Text style={styles.heroAccent}>
                            LINKUP.
                        </Text>
                    </Text>

                    <Text style={styles.heroSubtitle} >
                        Create your account and start
                        connecting with your people.

                    </Text>
                </View>

                {/* Form */}
                <View style={styles.formCard}>
                    <View style={styles.form}>

                        {/* Full Name */}
                        <View style={styles.inputWrapper}>
                            <TextInput
                                label="Full Name"
                                mode="flat"
                                value={fullName}
                                onChangeText={setFullName}
                                style={styles.input}
                                textColor={COLORS.text}
                                underlineColor="transparent"
                                activeUnderlineColor={
                                    COLORS.primary
                                }
                            />
                        </View>

                        {/* Email */}
                        <View style={styles.inputWrapper}>
                            <TextInput
                                label="Email"
                                mode="flat"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                textColor={COLORS.text}
                                underlineColor="transparent"
                                activeUnderlineColor={
                                    COLORS.primary
                                }
                            />
                        </View>

                        {/* Password */}
                        <View style={styles.inputWrapper}>
                            <TextInput
                                label="Password"
                                mode="flat"
                                secureTextEntry={secureText}
                                value={password}
                                onChangeText={setPassword}
                                style={styles.input}
                                textColor={COLORS.text}
                                underlineColor="transparent"
                                activeUnderlineColor={
                                    COLORS.primary
                                }
                                right={
                                    <TextInput.Icon
                                        icon={secureText ? "eye" : "eye-off"
                                        }
                                        onPress={() => setSecureText(!secureText
                                        )
                                        }
                                    />
                                }
                                theme={{
                                    colors: {
                                        onSurfaceVariant:
                                            COLORS.textSecondary,
                                    },
                                }}
                            />
                        </View>

                        {/* Error */}
                        {error ? (
                            <Text style={styles.error}>
                                {error}
                            </Text>
                        ) : null}

                        {/* Sign Up */}
                        <Button
                            mode="contained"
                            onPress={handleSignUp}
                            loading={loading}
                            disabled={loading}
                            style={styles.button}
                            contentStyle={styles.buttonContent}
                        >
                            Create Account
                        </Button>
                    </View>
                </View>
                {/* Sign In */}
                <View style={styles.accountRow}>
                    <Text style={styles.accountText}>
                        Already on LinkUp?
                    </Text>

                    <TouchableOpacity
                        onPress={() =>
                            router.replace(
                                "/(auth)/signin"
                            )
                        }
                    >
                        <Text style={styles.link}>
                            {" "}Sign in
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Connect • Chat • Call
                    </Text>
                </View>

            </ScrollView>
        </KeyboardAvoidingView >
    );
};

export default SignUp;