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
import { signin } from "../../services/authService";
import styles from "../../styles/auth.styles";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [secureText, setSecureText] = useState(true);

    const handleSignIn = async () => {
        setError("");

        if (!email.trim() || !password) {
            setError("All fields are required.");
            return;
        }

        setLoading(true);

        try {
            await signin({
                email: email.trim(),
                password,
            });

            console.log("User Signed In!");

            setEmail("");
            setPassword("");
        } catch (error) {
            console.log("SIGN IN ERROR:", error);
            setError(error.message || "Something went wrong.");
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
                        Welcome back
                    </Text>

                    <Text style={styles.heroTitle}>
                        LET'S{"\n"}
                        <Text style={styles.heroAccent}>
                            CONNECT.
                        </Text>
                    </Text>

                    <Text style={styles.heroSubtitle}>
                        Your people, your conversations,
                        all in one place.
                    </Text>
                </View>

                {/* Form */}
                <View style={styles.formCard}>
                    <View style={styles.form}>

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
                                        icon={
                                            secureText
                                                ? "eye"
                                                : "eye-off"
                                        }
                                        onPress={() =>
                                            setSecureText(
                                                !secureText
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

                        {/* Sign In */}
                        <Button
                            mode="contained"
                            onPress={handleSignIn}
                            loading={loading}
                            disabled={loading}
                            style={styles.button}
                            contentStyle={styles.buttonContent}
                        >
                            Continue
                        </Button>
                    </View>
                </View>
                {/* Sign Up */}
                <View style={styles.accountRow}>
                    <Text style={styles.accountText}>
                        New to LinkUp?
                    </Text>

                    <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}
                    >
                        <Text style={styles.link}>
                            {" "}Create account
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
        </KeyboardAvoidingView>
    );
};

export default SignIn;