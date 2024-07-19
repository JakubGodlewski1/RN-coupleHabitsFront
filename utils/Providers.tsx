import {PropsWithChildren} from "react";
import {TabBarContextProvider} from "@/contexts/TabBarContext";

export default function Providers({children}: PropsWithChildren) {

    return <TabBarContextProvider>
        {children}
    </TabBarContextProvider>
}