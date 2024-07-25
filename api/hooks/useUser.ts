import {getAxiosInstance} from "@/api/axiosInstance";
import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/api/queryKeys";

export const useUser = () => {

    const {isError, error, isLoading, data: user, refetch} = useQuery({
        queryKey: [queryKeys.useUser],
        staleTime: Infinity,
        gcTime: Infinity,
        queryFn: async () => {
            const api = await getAxiosInstance();
            return await api.get("/users/user")
        },
    })

    return {isLoading, error, isError, data: user, refetch}
}