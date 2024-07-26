import {useMutation} from "@tanstack/react-query";
import {getAxiosInstance} from "@/api/axiosInstance";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {Alert} from "react-native";
import {User} from "@/types";

export const useDeleteHabit = () => {

    const deleteHabit = async (habitId: string) => {
        queryClient.setQueryData(
            [queryKeys.useUser],
            (data: User): User => ({...data, habits: data.habits.filter(h => h.id !== habitId)})
        )

        const api = await getAxiosInstance()
        return await api.delete(`/habits/${habitId}`)
    }

    const {isPending, mutate} = useMutation({
        mutationFn: (habitId: string) => deleteHabit(habitId),
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
        },
        onError: () => {
            Alert.alert("Something went wrong, try again later")
        }
    })

    return {isDeleting: isPending, deleteHabit: mutate}
}