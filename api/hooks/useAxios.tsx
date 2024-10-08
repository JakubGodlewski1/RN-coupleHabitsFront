import {useAuth} from "@clerk/clerk-expo";
import {DEFAULT_URL} from "@/utils/consts";
import axios from "axios";

export const useAxios = () => {
    const {getToken} = useAuth()

    const getAxiosInstance = async () => {
        const baseConfig = {
            baseURL: DEFAULT_URL,
            headers: {Authorization: `Bearer ${await getToken()}`}
        }

        return axios.create(baseConfig)
    }

    return {getAxiosInstance}
}