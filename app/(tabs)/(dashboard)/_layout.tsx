import {Stack} from "expo-router";

export default function DashboardLayout() {

    return <Stack

        screenOptions={{
            contentStyle: {backgroundColor: "#E5F6FE"},
            headerShown: false
        }}
    >
        <Stack.Screen
            name="index"
        />
        <Stack.Screen
            options={{
                title: "Create a habit",
                presentation: "modal"
            }}
            name="habit-form"
        />
        <Stack.Screen
            options={{
                presentation: "modal"
            }}
            name="connect-with-partner"
        />
        <Stack.Screen
            options={{
                presentation: "modal"
            }}
            name="pricing"
        />
    </Stack>
}