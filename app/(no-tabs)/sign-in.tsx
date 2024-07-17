import {View} from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import DividerOr from "@/components/DividerOr";
import GoogleButton from "@/components/GoogleButton";
import {Link, router} from "expo-router";
import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import Text from "@/components/Text";

export default function SignIn(){

    return <SafeAreaWrapper>
        <Text classNames={{text:" mt-10 mb-8"}} type="h2">Sign in</Text>
        <Input classNames={{wrapper:"mb-4"}} type="email" value={""} onChangeText={()=>{}} placeholder="Email"/>
        <Input classNames={{wrapper:"mb-2"}} type="password" value={""} onChangeText={()=>{}} placeholder="Password"/>
        <Text classNames={{text:"text-sm ml-auto mb-4"}}>Forgot password?</Text>
        <Button onPress={()=>{}} title="Sign in"/>
        <DividerOr classNames={{wrapper:"my-4"}}/>
        <GoogleButton onPress={()=>{}}/>
        <View className="mt-auto">
            <Text classNames={{text:"text-center mb-3"}}>Have an account yet? Let's <Link className="text-primary font-mainBold" href="/(no-tabs)/sign-up">Sign up</Link></Text>
            <Button type="skip" onPress={()=>router.replace("/(tabs)/dashboard")} title="Skip for now"/>
        </View>
    </SafeAreaWrapper>
}