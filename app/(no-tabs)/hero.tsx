import Text from "@/components/Text";
import {Alert, Image, View} from "react-native";
// @ts-ignore
import couple from "@/assets/illustrations/hero.png"
import Button from "@/components/Button";
import {Feather} from "@expo/vector-icons";
import {router} from "expo-router";
import {useCreateUser} from "@/api/hooks/useCreateUser";
import CenteredActivityIndicator from "@/components/CenteredActivityIndicator";

export default function Hero() {
    const {isPending, user} = useCreateUser()

    if (isPending) {
        return <CenteredActivityIndicator/>
    }

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
            className="mt-auto mb-10 mx-auto"
            source={couple}
        />
        <Button disabled={isPending || !user} title="Explore the app" iconPosition="right"
                onPress={() => router.push("/(intro)/how-to-play")}>
            <Feather style={{color: "white"}} size={24} name="arrow-right"/>
        </Button>
    </>
}