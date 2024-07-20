import {SafeAreaWrapper} from "@/components/SafeAreaWrapper";
import {Slot, Stack} from "expo-router";

export default function NoTabsLayout() {

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