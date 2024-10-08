import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {User} from "@/types";
import {useAxios} from "@/api/hooks/useAxios";
import {handleError} from "@/utils/handleError";

export const useDeleteHabit = () => {
    const {getAxiosInstance} = useAxios()

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
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
        },
        onError: (error) => handleError(error)
    })

    return {isDeleting: isPending, deleteHabit: mutate}
}