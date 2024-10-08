import {useMutation} from "@tanstack/react-query";
import {Alert} from "react-native";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {useAxios} from "@/api/hooks/useAxios";
import {handleError} from "@/utils/handleError";

export const useConnectPartner = () => {
    const {getAxiosInstance} = useAxios()

    const connectWithPartner = async (connectionCode: string) => {
        if (connectionCode.length !== 6) {
            return Alert.alert("Connection code should be 6 characters long")
        }

        const api = await getAxiosInstance()
        return await api.patch("/users/connect-with-partner", {
            connectionCode: connectionCode.toUpperCase(),
            utcOffset: -Math.floor(new Date().getTimezoneOffset() / 60)
        })
    }

    const {isPending, mutate} = useMutation({
        mutationFn: connectWithPartner,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
        },
        onError: (error) => handleError(error)
    })

    return {isPending, connect: mutate}
}