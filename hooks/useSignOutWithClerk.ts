import {useRouter} from "expo-router";
import {Alert} from "react-native";
import {useClerk} from "@clerk/clerk-expo";
import {useState} from "react";

export const useSignOutWithClerk = () => {
    const {replace} = useRouter();
    const {signOut: signOutWithClerk} = useClerk()
    const [isLoading, setIsLoading] = useState(false)

    const signOut = async () => {
        setIsLoading(true)
        try {
            await signOutWithClerk()
            replace("/hero")
        } catch (err) {
            setIsLoading(false)
            Alert.alert("Something went wrong, try again later")
        }
    }

    return {signOut, isLoading}
}