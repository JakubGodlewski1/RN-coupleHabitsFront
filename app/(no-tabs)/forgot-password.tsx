import {Alert, ScrollView} from "react-native";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Text from "@/components/Text";
import {Link} from "expo-router";

export default function ForgotPassword() {

    return <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <PageTitle>Reset password</PageTitle>
        <Text classNames={{text: "mb-8"}}>
            Enter the email address associated with your account and we will send you a link to reset your password
        </Text>
        <Input label="Email" classNames={{wrapper: "mb-4"}} type="email" value={""} onChangeText={() => {
        }} placeholder="emazing@email.com"/>

        <Button onPress={() => {
            Alert.alert("Check your email");
        }} title="Reset password"/>
        <Text classNames={{text: "text-center mt-auto"}}>Don't have an account yet? Let's <Link
            className="text-primary font-mainBold" href="/(no-tabs)/sign-up">Sign up</Link></Text>
    </ScrollView>
}