import {ReactNode} from "react";
import {Image} from "react-native";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {CurrentTabBarPage} from "@/types";

export const tabBarIcons: { name: CurrentTabBarPage, body: (currentPage: CurrentTabBarPage) => ReactNode }[] = [
    {
        name: "ideas",
        body: (currentPage: CurrentTabBarPage) => <Image style={{maxHeight: 40, maxWidth: 40}} width={40} height={40}
                                                         source={currentPage === "ideas" ?
                                                             require("@/assets/icons/bulb_active.png") :
                                                             require("@/assets/icons/bulb.png")}/>
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
