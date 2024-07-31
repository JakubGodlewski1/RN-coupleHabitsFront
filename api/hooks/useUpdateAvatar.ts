import {useMutation, useQueryClient} from "@tanstack/react-query";
import {User} from "@/types";
import {queryKeys} from "@/api/queryKeys";
import {Alert} from "react-native";
import {router} from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as FileSystem from "expo-file-system";
import {DEFAULT_URL} from "@/utils/consts";
import {FileSystemUploadType} from "expo-file-system";

export const useUpdateAvatar = () => {
    const queryClient = useQueryClient()

    const uploadImage = async (imageUri: string) => {
        //optimistic update
        await queryClient.setQueryData(
            [queryKeys.useUser],
            (data: User) => ({...data, avatar: imageUri} as User)
        )

        const value = await SecureStore.getItemAsync('auth-token');
        if (!value) {
            throw new Error("You don't have enough permissions to upload your photo. Contact support.")
        }
        return await FileSystem.uploadAsync(DEFAULT_URL + "/avatars", imageUri, {
            httpMethod: "POST",
            headers: {
                "x-auth-token": value
            },
            uploadType: FileSystemUploadType.MULTIPART,
            fieldName: "avatar"
        })
    };

    const {isPending, mutate} = useMutation({
        mutationFn: (imageUri: string) => uploadImage(imageUri),
        onSettled: async () => {
            router.push("/(dashboard)")
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
        },
        onError: (error) => Alert.alert(error.message)
    })

    return {isUpdating: isPending, updateAvatar: mutate}
}