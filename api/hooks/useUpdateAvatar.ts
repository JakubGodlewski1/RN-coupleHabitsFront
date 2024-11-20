import {useMutation, useMutationState, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/api/queryKeys";
import {router, usePathname} from "expo-router";
import * as FileSystem from "expo-file-system";
import {FileSystemUploadType} from "expo-file-system";
import {DEFAULT_URL} from "@/utils/consts";
import {useAuth} from "@clerk/clerk-expo";
import {handleError} from "@/utils/handleError";

export const MUTATION_KEY = "update-avatar"

export const useUpdateAvatar = () => {
    const queryClient = useQueryClient()
    const {getToken} = useAuth()
    const pathname = usePathname()

    const [optimisticUpdateAvatar] = useMutationState({
        filters: {mutationKey: [MUTATION_KEY], status: "pending"},
        select: (mutation) => {
            return mutation.state.variables
        }
    }) as string[] | null[]

    const uploadImage = async (imageUri: string) => {
        if (pathname === "/settings") {
            router.push("/(dashboard)")
        }

        return await FileSystem.uploadAsync(DEFAULT_URL + "/users/avatar", imageUri, {
            httpMethod: "PATCH",
            headers: {Authorization: `Bearer ${await getToken()}`},
            uploadType: FileSystemUploadType.MULTIPART,
            fieldName: "avatar"
        })
    };

    const {isPending, mutate} = useMutation({
        mutationKey: [MUTATION_KEY],
        mutationFn: async (imageUri: string) => await uploadImage(imageUri),
        onSettled: async () => {
            return queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
        },
        onError: (error) => handleError(error)
    })

    return {isUpdating: isPending, updateAvatar: mutate, optimisticUpdate: optimisticUpdateAvatar}
}