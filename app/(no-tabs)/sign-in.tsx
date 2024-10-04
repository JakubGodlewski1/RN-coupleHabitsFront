import {ScrollView, TouchableOpacity, View} from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import DividerOr from "@/components/DividerOr";
import GoogleButton from "@/components/GoogleButton";
import {Link, router} from "expo-router";
import Text from "@/components/Text";
import PageTitle from "@/components/PageTitle";

export default function SignIn() {

    return <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <PageTitle>Sign in</PageTitle>
        <Input label="Email" classNames={{wrapper: "mb-4"}} type="email" value={""} onChangeText={() => {
        }} placeholder="emazing@email.com"/>
        <Input label="Password" classNames={{wrapper: "mb-2"}} type="password" value={""} onChangeText={() => {
        }} placeholder="*******"/>
        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
            <Text classNames={{text: "text-sm ml-auto mb-4"}}>Forgot password?</Text>
        </TouchableOpacity>
        <Button onPress={() => {
            router.replace("/(intro)/how-to-play")
        }} title="Sign in"/>
        <DividerOr classNames={{wrapper: "my-4"}}/>
        <GoogleButton onPress={() => {
        }}/>
        <View className="mt-auto">
            <Text classNames={{text: "text-center mb-3"}}>Don't have an account yet? Let's <Link
                className="text-primary font-mainBold" href="/sign-up">Sign up</Link></Text>
            {/*<Button classNames={{wrapper: "mb-2"}} type="skip" onPress={() => router.replace("../intro")}*/}
            {/*        title="Skip for now"/>*/}
        </View>
    </ScrollView>
}