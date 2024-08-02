import {useMutation} from "@tanstack/react-query";
import {getAxiosInstance} from "@/api/axiosInstance";
import {GlobalStrike, Habit, User} from "@/types";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {Alert} from "react-native";
import habitCard from "@/components/HabitCard";

export const useToggleCheckbox = () => {
    const toggleCheckbox = async ({url, data}: GlobalStrike) => {
        // @ts-ignore
        const habit = data?.action ? data.habit : data
        //optimistic update
        queryClient.setQueryData(
            [queryKeys.useUser],
            (data: User): User => ({...data, habits: data.habits.map(h => h.id === habit.id ? habit : h)})
        )

        const api = await getAxiosInstance()
        return await api.patch(url, data)
        // return await api.patch(`/habits/${habit.id}`, habit)
    }

    const {isPending, mutate} = useMutation({
        mutationFn: ({url, data}: GlobalStrike) => toggleCheckbox({url, data}),
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