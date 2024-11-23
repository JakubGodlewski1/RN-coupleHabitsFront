import {useMutation} from "@tanstack/react-query";
import {useAxios} from "@/api/hooks/useAxios";
import {handleError} from "@/utils/handleError";

export const useDeleteAccount = () => {
    const {getAxiosInstance} = useAxios()

    const deleteAccount = async () => {
        const api = await getAxiosInstance()
        return await api.delete(`/users`)
    }

    const {isPending, mutateAsync} = useMutation({
        mutationFn: deleteAccount,
        onError: (error) => handleError(error)
    })

    return {isDeleting: isPending, deleteAccountAsync: mutateAsync}
}