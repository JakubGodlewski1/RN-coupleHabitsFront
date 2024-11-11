import {PropsWithChildren} from "react";
import {TabBarContextProvider} from "@/contexts/TabBarContext";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {queryClient} from "@/api/queryClient";
import {QueryClientProvider} from "@tanstack/react-query";
import {ClerkProviderWithToken} from "@/components/ClerkProviderWithToken";

export default function Providers({children}: PropsWithChildren) {

    return <ClerkProviderWithToken>
        <QueryClientProvider client={queryClient}>
            <TabBarContextProvider>
                <GestureHandlerRootView style={{flex: 1}}>
                    {children}
                </GestureHandlerRootView>
            </TabBarContextProvider>
        </QueryClientProvider>
    </ClerkProviderWithToken>


}