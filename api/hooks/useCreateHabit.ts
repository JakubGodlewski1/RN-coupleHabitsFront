import {useMutation} from "@tanstack/react-query";
import {CreateHabit} from "@/types";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {router} from "expo-router";
import {useAxios} from "@/api/hooks/useAxios";
import {handleError} from "@/utils/handleError";

export const useCreateHabit = () => {
    const {getAxiosInstance} = useAxios()

    const createHabit = async (habit: CreateHabit) => {
        const api = await getAxiosInstance()
        return await api.post("/habits", habit)
    }

    const {isPending, mutate} = useMutation({
        mutationFn: (habit: CreateHabit) => createHabit(habit),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
            router.back()
        },
        onError: (error) => handleError(error)
    })

    return {isPending, createHabit: mutate}
}