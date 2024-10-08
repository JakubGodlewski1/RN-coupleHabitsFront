import Text from "@/components/Text";
import {Platform, View} from "react-native";
import Button from "@/components/Button";
import {Entypo} from "@expo/vector-icons";
import PageTitle from "@/components/PageTitle";
import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import {useUpdateAvatar} from "@/api/hooks/useUpdateAvatar";
import {pickAvatar} from "@/utils/pickAvatar";
import {useSignOutWithClerk} from "@/hooks/useSignOutWithClerk";
import {useTakeDayOff} from "@/api/hooks/useTakeDayOff";
import {useUser} from "@/api/hooks/useUser";

export default function Settings() {
    const {updateAvatar} = useUpdateAvatar()
    const {signOut, isLoading: isSigningOutPending} = useSignOutWithClerk()
    const {takeDayOff, isPending} = useTakeDayOff()
    const {partner, gameAccount: {dayOffPrice}, email} = useUser().user!

    const isLoading = isSigningOutPending || isPending

    const handleUpdateAvatar = async () => {
        const uri = await pickAvatar()
        if (uri) {
            updateAvatar(uri)
        }
    }

    return <SafeAreaWrapper>
        <PageTitle>Settings</PageTitle>
        {/*<Text>{email}</Text>*/}
        <View style={{gap: 16, flexGrow: 1}}>
            {
                partner.connected && (
                    <Button
                        disabled={isLoading}
                        onPress={takeDayOff}
                        classNames={{wrapper: "justify-between"}}
                        type="secondary"
                        iconPosition="right"
                        title="Take a day off"
                    >
                        <Text classNames={{text: "text-white"}}><Text
                            classNames={{text: "font-mainBold"}}>⭐️ {dayOffPrice}</Text> Points</Text>
                    </Button>
                )
            }
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
                classNames={{wrapper: `justify-between mt-auto ${Platform.OS === "android" ? "mb-10" : "mb-4"}`}}
                iconPosition="right"
                type="white"
                onPress={signOut}
                title="Sign out">
                <Entypo size={24} name="chevron-small-right"/>
            </Button>

        </View>


    </SafeAreaWrapper>
}