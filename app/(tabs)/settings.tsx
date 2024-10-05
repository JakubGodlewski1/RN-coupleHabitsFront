import Text from "@/components/Text";
import {Alert, Image, View} from "react-native";
import Button from "@/components/Button";
import {Entypo} from "@expo/vector-icons";
import PageTitle from "@/components/PageTitle";
import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import {useUpdateAvatar} from "@/api/hooks/useUpdateAvatar";
import {pickAvatar} from "@/utils/pickAvatar";
import {router, useRouter} from "expo-router";
import {useValidateStrike} from "@/api/hooks/useValidateStrike";
import {useCompleteAllTasks} from "@/api/hooks/useCompleteAllTasks";
import {useAuth, useClerk} from "@clerk/clerk-expo";
import {useState} from "react";
import {useSignOutWithClerk} from "@/hooks/useSignOutWithClerk";

export default function Settings() {
    const {updateAvatar} = useUpdateAvatar()
    const {signOut, isLoading} = useSignOutWithClerk()

    const handleUpdateAvatar = async () => {
        const uri = await pickAvatar()
        if (uri) {
            updateAvatar(uri)
        }
    }


    return <SafeAreaWrapper>
        <PageTitle>Settings</PageTitle>
        <View style={{gap: 16, flexGrow: 1}}>
            <Button
                disabled={isLoading}
                onPress={() => {
                }}
                classNames={{wrapper: "justify-between"}}
                type="secondary"
                iconPosition="right"
                title="Complete all tasks"
            >
                <Text classNames={{text: "text-white"}}><Text
                    classNames={{text: "font-mainBold"}}>⭐️ 500</Text> Points</Text>
            </Button>
            <Button
                disabled={isLoading}
                classNames={{wrapper: "justify-between"}}
                iconPosition="right"
                type="white"
                onPress={handleUpdateAvatar} title="Change profile picture">
                <Entypo size={24} name="chevron-small-right"/>
            </Button>
            <Button
                disabled={isLoading}
                classNames={{wrapper: "justify-between mt-auto mb-4"}}
                iconPosition="right"
                type="white"
                onPress={signOut}
                title="Sign out">
                <Entypo size={24} name="chevron-small-right"/>
            </Button>

        </View>


    </SafeAreaWrapper>
}