import Text from "@/components/Text";
import {Alert, Platform, View} from "react-native";
import Button from "@/components/Button";
import {Entypo} from "@expo/vector-icons";
import PageTitle from "@/components/PageTitle";
import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import {useUpdateAvatar} from "@/api/hooks/useUpdateAvatar";
import {pickAvatar} from "@/utils/pickAvatar";
import {useSignOutWithClerk} from "@/hooks/useSignOutWithClerk";
import {useTakeDayOff} from "@/api/hooks/useTakeDayOff";
import {useUser} from "@/api/hooks/useUser";
import {useDeleteAccount} from "@/api/hooks/useRemoveAccount";
import {useOptimisticUpdateContext} from "@/hooks/useOptimisticUpdateContext";
import {queryKeys} from "@/api/queryKeys";
import {useQueryClient} from "@tanstack/react-query";

export default function Settings() {
    const {updateAvatar} = useUpdateAvatar()
    const {signOut, isLoading: isSigningOutPending} = useSignOutWithClerk()
    const {takeDayOff, isPending} = useTakeDayOff()
    const {deleteAccountAsync, isDeleting} = useDeleteAccount()
    const {partner, gameAccount: {dayOffPrice}} = useUser().user!
    const {setIsUpdating} = useOptimisticUpdateContext()
    const queryClient = useQueryClient();

    const isLoading = isSigningOutPending || isPending || isDeleting

    const handleUpdateAvatar = async () => {
        const uri = await pickAvatar()
        if (uri) {
            updateAvatar(uri)
        }
    }

    const handleDeleteAccount = async () => {
        const deleteAccount = async () => {
            setIsUpdating(true)
            await queryClient.cancelQueries({queryKey: [queryKeys.useUser]})
            const {status} = await deleteAccountAsync()
            if (status === 200) {
                Alert.alert("Success", "Your account has been successfully deleted.", [
                    {
                        text: "Ok",
                        onPress: async () => {
                            await signOut()
                            setIsUpdating(false)
                        }
                    }
                ])
            }
        }

        Alert.alert("Account deletion", "Are you sure you want to delete your account? This action cannot be undone.", [
            {
                text: "Cancel"
            },
            {
                text: "Permanently delete",
                onPress: deleteAccount,
            }
        ])
    }

    return <SafeAreaWrapper>
        <PageTitle>Settings</PageTitle>
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
                onPress={handleUpdateAvatar}
                title="Change profile picture">
                <Entypo size={24} name="chevron-small-right"/>
            </Button>
            <Button
                classNames={{wrapper: `justify-between mt-auto`}}
                disabled={isLoading}
                iconPosition="right"
                type="white"
                onPress={signOut}
                title="Sign out">
                <Entypo size={24} name="chevron-small-right"/>
            </Button>
            <Button
                classNames={{wrapper: `justify-between ${Platform.OS === "android" ? "mb-10" : "mb-4"}`}}
                disabled={isLoading}
                iconPosition="right"
                type="error"
                onPress={handleDeleteAccount}
                title="Delete account">
                <Entypo size={24} color="red" name="chevron-small-right"/>
            </Button>

        </View>


    </SafeAreaWrapper>
}