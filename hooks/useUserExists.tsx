import {useEffect, useState} from "react";
import {useSecureStore} from "@/hooks/useSecureStore";

type Props = {
    onUserExists?: () => void;
    onUserNotExists?: () => void
}

export const useUserExists = ({onUserNotExists, onUserExists}: Props = {}) => {
    const {getString} = useSecureStore()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const isUser = async () => {
            const token = await getString("auth-token")
            if (token && onUserExists) {
                onUserExists()
                setIsLoading(false)
            } else if (!token && onUserNotExists) {
                onUserNotExists()
                setIsLoading(false)
            }
        }

        isUser()
    }, []);

    return {isLoading}
}