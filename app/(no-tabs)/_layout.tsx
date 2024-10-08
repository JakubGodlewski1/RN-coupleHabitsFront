import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import {Redirect, Stack} from "expo-router";
import {useAuth} from "@clerk/clerk-expo";
import {useEffect} from "react";
import * as SecureStore from "expo-secure-store";

export default function NoTabsLayout() {
    const {isSignedIn} = useAuth()

    //reset after intro token
    useEffect(() => {
        SecureStore.deleteItemAsync("after-intro")
    }, [])

    if (isSignedIn) {
        return <Redirect href={"/(dashboard)"}/>
    }

    return <SafeAreaWrapper>
        <Stack
            screenOptions={{
                contentStyle: {backgroundColor: "#E5F6FE"},
                headerShown: false
            }}
        >
        </Stack>
    </SafeAreaWrapper>
}