import {useMutation} from "@tanstack/react-query";
import {getAxiosInstance} from "@/api/axiosInstance";
import {Habit} from "@/types";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {Alert} from "react-native";
import {router} from "expo-router";

export const useUpdateHabit = () => {

    const updateHabit = async (habit: Habit) => {
        const api = await getAxiosInstance()
        return await api.patch(`/habits/${habit.id}`, {type: "habit", data: habit})
    }

    const {isPending, mutate} = useMutation({
        mutationFn: (habit: Habit) => updateHabit(habit),
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
        },
        onSuccess: () => router.back(),
        onError: () => {
            Alert.alert("Something went wrong, try again later")
        }
    })

    return {isUpdating: isPending, updateHabit: mutate}
}