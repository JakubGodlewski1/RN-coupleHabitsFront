import {useMutation} from "@tanstack/react-query";
import {Habit} from "@/types";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {router} from "expo-router";
import {useAxios} from "@/api/hooks/useAxios";
import {handleError} from "@/utils/handleError";

export const useUpdateHabit = () => {
    const {getAxiosInstance} = useAxios()

    const updateHabit = async (habit: Habit) => {
        const api = await getAxiosInstance()
        return await api.patch(`/habits/${habit.id}`, habit)
    }

    const {isPending, mutate} = useMutation({
        mutationFn: (habit: Habit) => updateHabit(habit),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
            router.back()
        },
        onError: (error) => handleError(error)
    })

    return {isUpdating: isPending, updateHabit: mutate}
}