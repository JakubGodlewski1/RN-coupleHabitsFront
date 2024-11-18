import {useMutation, useQueryClient} from "@tanstack/react-query";
import {User} from "@/types";
import {queryKeys} from "@/api/queryKeys";
import {produce} from "immer";
import {useAxios} from "@/api/hooks/useAxios";
import {handleError} from "@/utils/handleError";
import {useOptimisticUpdateContext} from "@/hooks/useOptimisticUpdateContext";

export const useToggleCheckbox = () => {
    const {getAxiosInstance} = useAxios()
    const {setIsUpdating} = useOptimisticUpdateContext()
    const queryClient = useQueryClient();

    const toggleCheckbox = async ({id, isCompleted}: { id: string, isCompleted: boolean }) => {
        //optimistic update
        queryClient.setQueryData(
            [queryKeys.useUser],
            (data: User): User => {
                return ({
                    ...data,
                    habits: data.habits.map(h => h.id === id ? produce(h, draft => {
                        draft.details.user.completed = isCompleted;
                    }) : h)
                }) as User
            }
        )

        const api = await getAxiosInstance()
        const data = await api.patch(`/habits/${id}/toggle`, {isCompleted})
        setIsUpdating(false)
        return data
    }

    const {isPending, mutate} = useMutation({
        mutationFn: ({id, isCompleted}: { id: string, isCompleted: boolean }) => toggleCheckbox({id, isCompleted}),
        onError: (error) => handleError(error)
    })

    return {isUpdating: isPending, toggleCheckbox: mutate}
}