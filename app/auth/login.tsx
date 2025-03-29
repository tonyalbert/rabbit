import { Text } from "react-native"
import { Link, router } from "expo-router";
import { signIn } from "@/services/auth";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Screen from "@/components/ui/Screen";

export default function Login() {
    const [email, setEmail] = useState('tony.albert789@gmail.com');
    const [password, setPassword] = useState('pibaevania2');
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoginLoading(true);
        try {
            console.log(email, password)
            //await new Promise(resolve => setTimeout(resolve, 5000));
            const user = await signIn(email, password);
            if (user) {
                router.replace('/(tabs)');
            }
            console.log('Login successful!');
        } catch (error) {
            alert('Login failed!');
            console.log(error);
        } finally {
            setIsLoginLoading(false);
        }
    }

    return (
        <Screen>
            <Text>Login</Text>
            <Input 
                type="email"
                value={email}
                onChangeText={setEmail}
                placeholder="Email" />
            <Input 
                type="password"
                value={password}
                onChangeText={setPassword}
                placeholder="Password" />
            <Button loading={isLoginLoading} title="Entrar" onPress={handleLogin} />
            <Link href="/auth/register">Register</Link>
        </Screen>
    )
}
