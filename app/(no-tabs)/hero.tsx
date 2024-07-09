import {SafeAreaWrapperWithGradient} from "@/components/SafeAreaWrapperWithGradient";
import Text from "@/components/Text";
import {Image, KeyboardAvoidingView, View} from "react-native";
// @ts-ignore
import couple from "@/assets/illustrations/hero.png"
import Button from "@/components/Button";
import {Feather} from "@expo/vector-icons";
import {router} from "expo-router";

export default function Hero(){

    return <SafeAreaWrapperWithGradient>
        <View className="my-auto">
            <Text type="h1" classNames={{wrapper:"text-center"}}>
                Them for You, {"\n"}
                You for Them. {"\n"}
                Get better <Text type="h1" classNames={{wrapper:"underline"}}>together</Text>
            </Text>
            <Text type="h3" classNames={{wrapper:"text-center mt-2"}}>
                Habit app for couples
            </Text>
        </View>

            <Image
                className="mt-auto mb-5 mx-auto"
                source={couple}
            />
            <Button onPress={()=>router.push("/info-screen")} size="lg" title="Couple up">
                <Feather style={{color:"white"}} size={24} name="arrow-up-right"/>
            </Button>
    </SafeAreaWrapperWithGradient>
}