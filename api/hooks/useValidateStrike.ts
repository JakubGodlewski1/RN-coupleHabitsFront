import {useMutation} from "@tanstack/react-query";
import {getAxiosInstance} from "@/api/axiosInstance";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";

export const useValidateStrike = () => {
    const validateStrike = async () => {
        const api = await getAxiosInstance()
        return await api.patch("/game-accounts/validate-strike", {
            todayDate: new Date().toString()
        })
    }

    const {mutate, isPending} = useMutation({
        mutationFn: validateStrike,
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
        }
    })

    return {validate: mutate, isPending}
}