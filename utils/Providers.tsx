import React, {PropsWithChildren} from "react";
import {TabBarContextProvider} from "@/contexts/TabBarContext";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {queryClient} from "@/api/queryClient";
import {QueryClientProvider} from "@tanstack/react-query";

export default function Providers({children}: PropsWithChildren) {

    return <QueryClientProvider client={queryClient}>
        <TabBarContextProvider>
            <GestureHandlerRootView style={{flex: 1}}>
                {children}
            </GestureHandlerRootView>
        </TabBarContextProvider>
    </QueryClientProvider>

}