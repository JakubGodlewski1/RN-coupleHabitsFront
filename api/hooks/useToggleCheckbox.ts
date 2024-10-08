import {useMutation} from "@tanstack/react-query";
import {User} from "@/types";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {produce} from "immer";
import {useAxios} from "@/api/hooks/useAxios";
import {handleError} from "@/utils/handleError";

export const useToggleCheckbox = () => {
    const {getAxiosInstance} = useAxios()

    const toggleCheckbox = async ({id, isCompleted}: { id: string, isCompleted: boolean }) => {
        //optimistic update
        queryClient.setQueryData(
            [queryKeys.useUser],
            (data: User): User => ({
                ...data,
                habits: data.habits.map(h => h.id === id ? produce(h, draft => {
                    draft.details.user.completed = isCompleted;
                }) : h)
            })
        )

        const api = await getAxiosInstance()
        return await api.patch(`/habits/${id}/toggle`, {isCompleted})
    }

    const {isPending, mutate} = useMutation({
        mutationFn: ({id, isCompleted}: { id: string, isCompleted: boolean }) => toggleCheckbox({id, isCompleted}),
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
        },
        onError: (error) => handleError(error)
    })

    return {isUpdating: isPending, toggleCheckbox: mutate}
}