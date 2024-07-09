import {PropsWithChildren} from "react";
import {StatusBar} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {SafeAreaView} from "react-native-safe-area-context";

export const SafeAreaWrapperWithGradient = ({children}:PropsWithChildren) => {
    return (
        <LinearGradient className="grow p-2" colors={["#97E9FF","#F6F7C4"]}>
           <SafeAreaView className="grow">
                <StatusBar translucent={false}/>
                {children}
            </SafeAreaView>
        </LinearGradient>
    )

}
