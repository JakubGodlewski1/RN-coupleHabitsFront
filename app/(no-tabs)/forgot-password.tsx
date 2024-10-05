import {Alert, ScrollView} from "react-native";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Text from "@/components/Text";
import {Link} from "expo-router";
import {useResetPasswordWithClerk} from "@/hooks/useResetPasswordWithClerk";
import {useEffect} from "react";

export default function ForgotPassword() {
    const {
        emailSent,
        isLoading,
        updatePassword,
        sendCode,
        email,
        code,
        updateValue,
        password,
        errors: {generalError, emailError, codeError, passwordError}
    } = useResetPasswordWithClerk()

    
    useEffect(() => {
        if (generalError.length > 0) {
            Alert.alert(generalError)
        }
    }, [generalError])

    return <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <PageTitle>Reset password</PageTitle>
        {
            !emailSent ? (
                    <>
                        <Text classNames={{text: "mb-8"}}>
                            Enter the email address associated with your account and we will send you a link to reset your
                            password
                        </Text>
                        <Input
                            errorMessage={emailError || undefined}
                            label="Email"
                            classNames={{wrapper: "mb-4"}}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(text: string) => updateValue("email", text)}
                            placeholder="amazing@email.com"
                        />

                        <Button
                            disabled={isLoading}
                            onPress={sendCode}
                            title="Send code"
                        />
                    </>
                )
                :
                (
                    <>
                        <Input
                            errorMessage={codeError || undefined}
                            label="Enter code"
                            classNames={{wrapper: "mb-4"}}
                            keyboardType="numeric"
                            value={code}
                            onChangeText={(text: string) => updateValue("code", text)}
                            placeholder="123456"
                        />
                        <Input
                            errorMessage={passwordError || undefined}
                            label="New password"
                            classNames={{wrapper: "mb-4"}}
                            keyboardType="visible-password"
                            value={password}
                            onChangeText={(text: string) => updateValue("password", text)}
                            placeholder="*******"
                        />
                        <Button
                            disabled={isLoading}
                            onPress={updatePassword}
                            title="Reset password"
                        />
                    </>
                )
        }

        <Text classNames={{text: "text-center mt-auto"}}>Don't have an account yet? Let's <Link
            className="text-primary font-mainBold" href="/sign-up">Sign up</Link></Text>
    </ScrollView>
}