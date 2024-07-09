import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {Platform} from "react-native";
import {Shadows} from "@/styles/Shadows";

export default function TabsLayout(){

    return <Tabs
        screenOptions={{
            tabBarStyle: Platform.OS==="android" ? {height:76, paddingTop:6}:{height:100, paddingTop: 12},
            tabBarItemStyle:{ ...Shadows.md, elevation:4, marginHorizontal: 10, paddingBottom:5, borderRadius: 8, marginBottom: Platform.OS === "android" ? 8 : 0},
            tabBarInactiveBackgroundColor: Platform.OS === "android" ? "white":"transparent",
            tabBarActiveBackgroundColor:"#EBF4CA",
            headerShown: false,
            tabBarLabelStyle:{fontFamily:"AbhayaLibre-SemiBold", color:"#000", fontSize: 13}
        }}
        sceneContainerStyle={{backgroundColor:"transparent"}}
        initialRouteName="dashboard"
    >
        <Tabs.Screen
            name="ideas"
            options={{
                title:"Ideas",
                tabBarIcon: ()=><Ionicons name="bulb-outline" size={24}/>
            }}
        />
          <Tabs.Screen
            name="dashboard"
            options={{
                title:"Dashboard",
                tabBarIcon:()=><Ionicons name="people-outline" size={24}/>
            }}
        />
          <Tabs.Screen
            name="settings"
            options={{
                title:"Settings",
                tabBarIcon:()=><Ionicons name="settings-outline" size={22}/>
            }}
        />

    </Tabs>
}