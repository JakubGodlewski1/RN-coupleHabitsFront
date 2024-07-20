import {PropsWithChildren} from "react";
import {TabBarContextProvider} from "@/contexts/TabBarContext";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function Providers({children}: PropsWithChildren) {

    return <TabBarContextProvider>
        <GestureHandlerRootView style={{flex: 1}}>
            {children}
        </GestureHandlerRootView>
    </TabBarContextProvider>
}