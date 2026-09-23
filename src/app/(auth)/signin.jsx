import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from "react-native-paper";

import { router } from 'expo-router';
import styles from "../..//styles/auth.styles";
import COLORS from '../../constants/colors';
import { signin } from '../../services/authService';



const SignIn = () => {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [secureText, setSecureText] = useState(true);


    const handleSignIn = async () => {
        setLoading(true);
        try {
            if (!email || !password) {
                setError("All Fileds are Required!");
            }
            const trimEmail = email.trim();


            await signin({ email: trimEmail, password });
            console.log("User Created!")
            setEmail("");

            setPassword("");

        } catch (error) {
            setError(error.message);
            console.log("ERROR ", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} >
            <View style={styles.container}>

                <TextInput
                    label="Email"
                    mode="outlined"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    textColor={COLORS.text}
                />

                <TextInput
                    label="Password"
                    mode="outlined"
                    secureTextEntry={secureText}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    textColor={COLORS.text}
                    right={
                        <TextInput.Icon
                            icon={secureText ? "eye" : "eye-off"}
                            onPress={() => setSecureText(!secureText)}
                        />
                    }
                    theme={{
                        colors: {
                            onSurfaceVariant: COLORS.textSecondary,
                        },
                    }}
                />
                {error && (
                    <Text style={{ color: "red", marginBottom: 10 }}>
                        {error}
                    </Text>
                )}

                <Button mode="contained" onPress={handleSignIn} loading={loading}>
                    Sign In
                </Button>

                <TouchableOpacity onPress={() => router.back()} >

                    <Text style={styles.link}> Create Account</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignIn