import {PropsWithChildren} from "react";
import {TabBarContextProvider} from "@/contexts/TabBarContext";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {QueryClientProvider} from "react-query";
import {queryClient} from "@/api/queryClient";

export default function Providers({children}: PropsWithChildren) {

    return <QueryClientProvider client={queryClient}>
        <TabBarContextProvider>
            <GestureHandlerRootView style={{flex: 1}}>
                {children}
            </GestureHandlerRootView>
        </TabBarContextProvider>
    </QueryClientProvider>

}