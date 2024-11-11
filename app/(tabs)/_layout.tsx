import {Redirect, router, Tabs} from "expo-router";
import {Platform, TouchableOpacity, View} from "react-native";
import {ReactNode, useState} from "react";
import {Shadows} from "@/styles/Shadows";
import {useTabBarContext} from "@/hooks/useTabBarContext";
import {CurrentTabBarPage} from "@/types";
import {tabBarIcons} from "@/utils/tabBarIcons";
import CenteredActivityIndicator from "@/components/CenteredActivityIndicator";
import {useAfterIntro} from "@/hooks/useAfterIntro";

export default function TabsLayout() {
    const [currentPage, setCurrentPage] = useState<CurrentTabBarPage>("dashboard");
    const {isVisible} = useTabBarContext()
    const {isLoading: gettingToken, token} = useAfterIntro()

    if (gettingToken)
        return <CenteredActivityIndicator/>

    if (!token) {
        return <Redirect href="/(intro)/how-to-play"/>
    }

    const onPress = (icon: { name: CurrentTabBarPage, body: (currentPage: CurrentTabBarPage) => ReactNode }) => {
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
                            {tabBarIcons.map(icon => (
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