import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {Alert} from "react-native";
import {useAxios} from "@/api/hooks/useAxios";
import {validateDayOff} from "@/validators/dayOffValidators";
import {useUser} from "@/api/hooks/useUser";
import {handleError} from "@/utils/handleError";

export const useTakeDayOff = () => {
    const {getAxiosInstance} = useAxios()
    const {user} = useUser()

    const takeDayOff = async () => {
        const {success, message} = validateDayOff(user!)
        if (!success) {
            throw new Error(message)
        }
        const api = await getAxiosInstance()
        return await api.get("/day-off")
    }

    const {mutate, isPending} = useMutation({
        mutationFn: takeDayOff,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.useUser]
            })
            Alert.alert("All tasks completed, take a day off. You deserve it (:")
        },
        onError: (error) => handleError(error)
    })

    return {takeDayOff: mutate, isPending}
}