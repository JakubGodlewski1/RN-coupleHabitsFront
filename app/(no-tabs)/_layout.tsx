import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import {Redirect, Stack} from "expo-router";
import {useAuth} from "@clerk/clerk-expo";

export default function NoTabsLayout() {
    const {isSignedIn} = useAuth()

    if (isSignedIn) {
        return <Redirect href="/(dashboard)"/>
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