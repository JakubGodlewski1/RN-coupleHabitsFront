import Text from "@/components/Text";
import {Image, View} from "react-native";
import Button from "@/components/Button";
import {Entypo} from "@expo/vector-icons";
import PageTitle from "@/components/PageTitle";
import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import {useUpdateAvatar} from "@/api/hooks/useUpdateAvatar";
import {pickAvatar} from "@/utils/pickAvatar";
import {router} from "expo-router";

export default function Settings() {
    const {updateAvatar} = useUpdateAvatar()

    const handleUpdateAvatar = async () => {
        const uri = await pickAvatar()
        if (uri) {
            updateAvatar(uri)
        }
    }

    return <SafeAreaWrapper>
        <PageTitle>Settings</PageTitle>
        <View style={{gap: 16}}>
            <Button classNames={{wrapper: "justify-between"}} type="secondary" iconPosition="right" onPress={() => {
            }} title="Take day off">
                <Text classNames={{text: "text-white"}}><Text
                    classNames={{text: "font-mainBold"}}>⭐️ 900</Text> Points</Text>
            </Button>
            <Button
                classNames={{wrapper: "justify-between"}}
                iconPosition="right"
                type="white"
                onPress={handleUpdateAvatar} title="Change profile picture">
                <Entypo size={24} name="chevron-small-right"/>
            </Button>
        </View>


    </SafeAreaWrapper>
}