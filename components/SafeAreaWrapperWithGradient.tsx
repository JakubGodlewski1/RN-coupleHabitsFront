import {PropsWithChildren, ReactNode} from "react";
import {StatusBar} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {SafeAreaView} from "react-native-safe-area-context";

type Props = {
    children: ReactNode,
    classNames?:{
        wrapper?: string
    }
}

export const SafeAreaWrapperWithGradient = ({children, classNames}:Props) => {
    return (
        <LinearGradient className="grow p-2" colors={["#97E9FF","#F6F7C4"]}>
           <SafeAreaView className={`grow ${classNames?.wrapper}`}>
                {children}
            </SafeAreaView>
            <StatusBar translucent={false}/>
        </LinearGradient>
    )

}
