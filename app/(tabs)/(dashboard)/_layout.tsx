import {Stack} from "expo-router";

export default function () {

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
                presentation: "modal"
            }}
            name="add-habit"
        />

    </Stack>
}