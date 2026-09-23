import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, TextInput } from "react-native-paper";

import { Link } from 'expo-router';
import { Text } from 'react-native';
import styles from "../..//styles/auth.styles";
import COLORS from '../../constants/colors';
import { signUpUser } from '../../services/authService';



const SignUp = () => {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [secureText, setSecureText] = useState(true);


    const handleSignUp = async () => {
        setLoading(true);
        try {
            if (!email || !password || !fullName) {
                setError("All Fileds are Required!");
            }
            const trimEmail = email.trim();

            await signUpUser({ email: trimEmail, password, fullName });

            console.log("User Created!")
            setEmail("");
            setFullName("");
            setPassword("");

        } catch (error) {
            console.log("ERROR ", error);
            if (error.message === "Invalid login credentials") {
                setError("Incorrect email or password.");
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} >
            <View style={styles.container}>
                <TextInput
                    label="Full Name"
                    mode="outlined"
                    value={fullName}
                    onChangeText={setFullName}
                    style={styles.input}
                    textColor={COLORS.text}
                />
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
                <Button mode="contained" onPress={handleSignUp} loading={loading}>
                    Sign Up
                </Button>

                <Link href="./signin" style={styles.link}>
                    Already Have An Account
                </Link>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignUp