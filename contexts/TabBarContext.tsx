import {createContext, PropsWithChildren, useContext, useState} from "react";

type TabBarContextType = {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

export const TabBarContext = createContext<TabBarContextType>({
    isVisible: true,
    setIsVisible: (isVisible: boolean) => {
    }
})

export const TabBarContextProvider = ({children}: PropsWithChildren) => {
    const [isVisible, setIsVisible] = useState(true);

    return <TabBarContext.Provider value={{
        isVisible,
        setIsVisible: (isVisible) => setIsVisible(isVisible)
    }}>
        {children}
    </TabBarContext.Provider>
}