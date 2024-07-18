import {Stack} from "expo-router";
import {Platform} from "react-native";

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
                title: "Create a habit",
                presentation: "modal"
            }}
            name="add-habit"
        />

    </Stack>
}