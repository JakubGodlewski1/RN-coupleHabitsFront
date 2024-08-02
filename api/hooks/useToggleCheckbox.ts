import {useMutation} from "@tanstack/react-query";
import {getAxiosInstance} from "@/api/axiosInstance";
import {GlobalStrike, Habit, User} from "@/types";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {Alert} from "react-native";
import habitCard from "@/components/HabitCard";

type ToggleCheckboxArguments = {
    id: string,
    isChecked: boolean,
}

export const useToggleCheckbox = () => {
    const toggleCheckbox = async ({id, isChecked}: ToggleCheckboxArguments) => {
        //optimistic update
        queryClient.setQueryData(
            [queryKeys.useUser],
            (data: User): User => ({
                ...data,
                habits: data.habits.map(h => h.id === id ? {
                    ...h,
                    details: {...h.details, mine: {...h.details.mine, completed: isChecked}}
                } : h)
            })
        )

        const api = await getAxiosInstance()

        return await api.patch(`/habits/${id}`, {type: "checkbox"})
    }

    const {isPending, mutate} = useMutation({
        mutationFn: ({id, isChecked}: ToggleCheckboxArguments) => toggleCheckbox({id, isChecked}),
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