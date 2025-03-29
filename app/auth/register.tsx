import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback } from "react-native";
import { Link } from "expo-router";
import { signUp } from "@/services/auth";
import { useState } from "react";

export default function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async () => {
        try {
            console.log(email, password)
            await signUp(email, password);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <View style={styles.separator} />
            <TextInput placeholder="Email" onChangeText={setEmail} />
            <TextInput placeholder="Password" onChangeText={setPassword} />
            <TouchableWithoutFeedback onPress={handleRegister}>
                <Text>Register</Text>
            </TouchableWithoutFeedback>
            <Text>Have account?</Text>
            <Link href="/auth/login">Login</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});