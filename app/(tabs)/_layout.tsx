import {router, Tabs, useFocusEffect} from "expo-router";
import {Image, Platform, TouchableOpacity, View} from "react-native";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {ReactNode, useEffect, useState} from "react";
import {Shadows} from "@/styles/Shadows";
import {useTabBarContext} from "@/hooks/useTabBarContext";
import {useValidateStrike} from "@/api/hooks/useValidateStrike";
import {DateManager} from "@/utils/dateManager";

type CurrentPage = "ideas" | "dashboard" | "settings"

const icons: { name: CurrentPage, body: (currentPage: CurrentPage) => ReactNode }[] = [
    {
        name: "ideas",
        body: (currentPage: CurrentPage) => <Image className="w-10 h-10"
                                                   source={currentPage === "ideas" ?
                                                       require("./../../assets/icons/bulb_active.png") :
                                                       require("./../../assets/icons/bulb.png")}/>
    },
    {
        name: "dashboard",
        body: (currentPage) => <MaterialCommunityIcons color={currentPage === "dashboard" ? "#413085" : "#5CBFEC"}
                                                       size={40} name="view-dashboard"/>
    },
    {
        name: "settings",
        body: (currentPage) => <Ionicons size={40} color={currentPage === "settings" ? "#413085" : "#5CBFEC"}
                                         name="settings-sharp"/>
    }
]

export default function TabsLayout() {
    const [currentPage, setCurrentPage] = useState<CurrentPage>("dashboard");
    const {isVisible} = useTabBarContext()
    const {validate} = useValidateStrike()

    //validate global strike
    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined
        validate()
        const timeoutId = setTimeout(() => {
            validate()
            intervalId = setInterval(() => {
                validate()
            }, 1000 * 60 * 60 * 24)
        }, DateManager.millisecondsToMidnight(5))

        return () => {
            clearInterval(intervalId)
            clearTimeout(timeoutId)
        }
    }, []);

    const onPress = (icon: { name: CurrentPage, body: (currentPage: CurrentPage) => ReactNode }) => {
        if (icon.name === currentPage && currentPage !== "dashboard") {
            setCurrentPage("dashboard")
            router.push("/(dashboard)")
        } else if (icon.name === currentPage) {
            return
        } else {
            setCurrentPage(icon.name)
            router.replace(`/${icon.name === "dashboard" ? "(dashboard)" : icon.name}`)
        }
    }

    useFocusEffect(() => {
        //check strike

        const id = setInterval(() => {
            //check strike
        }, 1000 * 60 * 60)

        return () => clearInterval(id)
    })

    return <Tabs
        sceneContainerStyle={{backgroundColor: "transparent"}}
        screenOptions={{
            headerShown: false,
        }}
        tabBar={() =>
            !isVisible ? <></> :
                (
                    <View className="h-20 relative">
                        <View className="z-20 items-start justify-evenly flex-row -top-3">
                            {icons.map(icon => (
                                <TouchableOpacity
                                    key={icon.name}
                                    activeOpacity={100}
                                    className={
                                        `px-2.5 py-4 rounded-full
                     ${currentPage === icon.name ? "bg-white" : ""}
                     ${Platform.OS === "android" ? "-mb-4" : "-mb-2"}
                     `}
                                    onPress={() => onPress(icon)}>
                                    {icon.body(currentPage)}
                                </TouchableOpacity>
                            ))}

                        </View>
                        {Platform.OS === "ios" ?
                            <View
                                style={{...Shadows}}
                                className="z-10 bg-tertiaryLight h-[60vw] mt-auto rounded-t-full absolute w-[120vw] -left-[10%] -top-12"/> :
                            <View
                                className="z-10 bg-tertiaryLight h-[100vw] mt-auto rounded-t-full absolute w-[200vw] -left-[50%] -top-12"/>
                        }
                    </View>
                )}>
    </Tabs>


}