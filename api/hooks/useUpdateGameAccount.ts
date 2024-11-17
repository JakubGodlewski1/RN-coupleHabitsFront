import {useAxios} from "@/api/hooks/useAxios";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {handleError} from "@/utils/handleError";

export const useUpdateGameAccount = () => {
    const {getAxiosInstance} = useAxios()

    const updateGameAccount = async (update: Record<string, any>) => {
        const api = await getAxiosInstance()
        return await api.patch("/game-account", update)
    }

    const {mutate, isPending} = useMutation({
        mutationFn: updateGameAccount,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
        },
        onError: (error) => handleError(error)
    })

    return {updateGameAccount: mutate, isPending}
}