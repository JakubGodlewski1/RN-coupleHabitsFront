import Text from "@/components/Text";
import {Image, View} from "react-native";
// @ts-ignore
import couple from "@/assets/illustrations/intro.png"
import Button from "@/components/Button";
import {Feather} from "@expo/vector-icons";
import {router} from "expo-router";

export default function Hero() {

    return <>
        <View className="mt-11">
            <Text type="h1" classNames={{text: "text-center"}}>
                Them for You, {"\n"}
                You for Them. {"\n"}
                Get better together
            </Text>
            <Text type="h3" classNames={{text: "text-center mt-2"}}>
                Habit app for couples
            </Text>
        </View>
        <Image
            // style={{height: 400, width: 300}}
            resizeMode="contain"
            className="mt-auto mb-10 mx-auto w-[85vw] h-[400px]"
            source={couple}
        />
        <Button title="Start the change" iconPosition="right"
                onPress={() => router.push("/sign-up")}>
            <Feather style={{color: "white"}} size={24} name="arrow-right"/>
        </Button>
    </>
}