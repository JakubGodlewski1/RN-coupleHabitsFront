import {Tabs} from "expo-router";

export default function TabsLayout(){

    return <Tabs
        sceneContainerStyle={{backgroundColor:"transparent"}}
        initialRouteName="dashboard"
        screenOptions={{
            headerShown:false
        }}
    >
        <Tabs.Screen
            name="ideas"
        />
          <Tabs.Screen
            name="dashboard"
        />
          <Tabs.Screen
            name="settings"
        />

    </Tabs>
}