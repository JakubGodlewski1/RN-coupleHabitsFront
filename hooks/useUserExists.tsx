import {useEffect, useState} from "react";
import {useSecureStore} from "@/hooks/useSecureStore";
import {Alert} from "react-native";

type Props = {
    onUserExists?: () => void;
    onUserNotExists?: () => void
}

export const useUserExists = ({onUserNotExists, onUserExists}: Props = {}) => {
    const {getString} = useSecureStore()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const isUser = async () => {
            const token = await getString("auth-token")
            if (token && onUserExists) {
                onUserExists()
                setIsLoading(false)
            } else if (!token && onUserNotExists) {
                onUserNotExists()
                setIsLoading(false)
            } else {
                setIsLoading(false)
                Alert.alert("Can't get your user data, try again later")
            }
        }
        isUser()
    }, []);

    return {isLoading}
}