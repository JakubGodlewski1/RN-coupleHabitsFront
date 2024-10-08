import {useMutation, useQueryClient} from "@tanstack/react-query";
import {User} from "@/types";
import {queryKeys} from "@/api/queryKeys";
import {router, usePathname} from "expo-router";
import * as FileSystem from "expo-file-system";
import {FileSystemUploadType} from "expo-file-system";
import {DEFAULT_URL} from "@/utils/consts";
import {useAuth} from "@clerk/clerk-expo";
import {handleError} from "@/utils/handleError";

export const useUpdateAvatar = () => {
    const queryClient = useQueryClient()
    const pathname = usePathname()
    const {getToken} = useAuth()

    const uploadImage = async (imageUri: string) => {
        //optimistic update
        await queryClient.setQueryData(
            [queryKeys.useUser],
            (data: User) => ({...data, avatar: imageUri} as User)
        )

        return await FileSystem.uploadAsync(DEFAULT_URL + "/users/avatar", imageUri, {
            httpMethod: "PATCH",
            headers: {Authorization: `Bearer ${await getToken()}`},
            uploadType: FileSystemUploadType.MULTIPART,
            fieldName: "avatar"
        })
    };

    const {isPending, mutate} = useMutation({
        mutationFn: (imageUri: string) => uploadImage(imageUri),
        onSettled: async () => {
            if (pathname === "/settings") {
                router.push("/(dashboard)")
            }
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
        },
        onError: (error) => handleError(error)
    })

    return {isUpdating: isPending, updateAvatar: mutate}
}