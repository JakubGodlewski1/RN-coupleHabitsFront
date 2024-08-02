import {useMutation} from "@tanstack/react-query";
import {getAxiosInstance} from "@/api/axiosInstance";
import {Habit, User} from "@/types";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {Alert} from "react-native";

export const useToggleCheckbox = () => {
    const toggleCheckbox = async (habit: Habit) => {
        //optimistic update
        queryClient.setQueryData(
            [queryKeys.useUser],
            (data: User): User => ({...data, habits: data.habits.map(h => h.id === habit.id ? habit : h)})
        )

        const api = await getAxiosInstance()
        return await api.patch(`/habits/${habit.id}`, habit)
    }

    const {isPending, mutate} = useMutation({
        mutationFn: (habit: Habit) => toggleCheckbox(habit),
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
        },
        onError: () => {
            Alert.alert("Something went wrong, try again later")
        }
    })

    return {isUpdating: isPending, toggleCheckbox: mutate}
}