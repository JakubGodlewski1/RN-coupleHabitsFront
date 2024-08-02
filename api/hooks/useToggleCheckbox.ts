import {useMutation} from "@tanstack/react-query";
import {getAxiosInstance} from "@/api/axiosInstance";
import {User} from "@/types";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {Alert} from "react-native";
import {produce} from "immer";

export const useToggleCheckbox = () => {
    const toggleCheckbox = async ({id}: { id: string }) => {
        //optimistic update

        queryClient.setQueryData(
            [queryKeys.useUser],
            (data: User): User => ({
                ...data,
                habits: data.habits.map(h => h.id === id ? produce(h, draft => {
                    draft.details.mine.completed = !h.details.mine.completed
                }) : h)
            })
        )

        const api = await getAxiosInstance()
        return await api.patch(`/habits/${id}`, {type: "checkbox"})
    }

    const {isPending, mutate} = useMutation({
        mutationFn: ({id}: { id: string }) => toggleCheckbox({id}),
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