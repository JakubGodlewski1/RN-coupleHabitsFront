import {PropsWithChildren} from "react";
import {TabBarContextProvider} from "@/contexts/TabBarContext";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {queryClient} from "@/api/queryClient";
import {QueryClientProvider} from "@tanstack/react-query";
import {ClerkProviderWithToken} from "@/components/ClerkProviderWithToken";
import {OptimisticUpdateContextProvider} from "@/contexts/OptimisticUpdateContext";

export default function Providers({children}: PropsWithChildren) {

    return <ClerkProviderWithToken>
        <QueryClientProvider client={queryClient}>
            <OptimisticUpdateContextProvider>
                <TabBarContextProvider>
                    <GestureHandlerRootView style={{flex: 1}}>
                        {children}
                    </GestureHandlerRootView>
                </TabBarContextProvider>
            </OptimisticUpdateContextProvider>
        </QueryClientProvider>
    </ClerkProviderWithToken>


}