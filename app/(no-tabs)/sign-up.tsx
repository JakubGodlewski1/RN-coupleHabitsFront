import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import Input from "@/components/Input";
import Text from "@/components/Text";
import Button from "@/components/Button";
import GoogleButton from "@/components/GoogleButton";
import DividerOr from "@/components/DividerOr";
import {View} from "react-native";
import {Link, router} from "expo-router";
import PageTitle from "@/components/PageTitle";

export default function SignUp() {

    return <SafeAreaWrapper>
        <PageTitle>Sign up</PageTitle>
        <Input label="Email" classNames={{wrapper: "mb-4"}} type="email" value={""} onChangeText={() => {
        }} placeholder="super@email.com"/>
        <Input label="Password" classNames={{wrapper: "mb-4"}} type="password" value={""} onChangeText={() => {
        }} placeholder="********"/>
        <Input label="Password confirmation" classNames={{wrapper: "mb-2"}} type="password" value={""}
               onChangeText={() => {
               }} placeholder="********"/>
        <Button onPress={() => {
        }} title="Sign up"/>
        <DividerOr classNames={{wrapper: "my-4"}}/>
        <GoogleButton onPress={() => {
        }}/>
        <View className="mt-auto">
            <Text classNames={{text: "text-center mb-3"}}>Don't have an account yet? Let's <Link
                className="text-primary font-mainBold" href="/(no-tabs)/sign-in">Sign in</Link></Text>
            <Button type="skip" onPress={() => router.replace("/(tabs)")} title="Skip for now"/>
        </View>
    </SafeAreaWrapper>
}