import {View, Text} from "react-native";
import {Link} from "expo-router";
import {SafeAreaWrapperWithGradient} from "@/components/SafeAreaWrapperWithGradient";

export default function Hero(){

    return <SafeAreaWrapperWithGradient>
        <Text>Hero</Text>
        <Link href="/info-screen">info</Link>
        <Link href="/dashboard">Dashboard</Link>
    </SafeAreaWrapperWithGradient>
}