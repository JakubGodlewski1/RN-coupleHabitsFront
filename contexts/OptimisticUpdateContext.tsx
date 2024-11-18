import {createContext, PropsWithChildren, useState} from "react";

type OptimisticUpdateType = {
    isUpdating: boolean,
    setIsUpdating: (isUpdating: boolean) => void,
}

export const OptimisticUpdateContext = createContext<OptimisticUpdateType>({
    isUpdating: false,
    setIsUpdating: () => {
    }
})

export const OptimisticUpdateContextProvider = ({children}: PropsWithChildren) => {
    const [isUpdating, setIsUpdating] = useState(false)

    return <OptimisticUpdateContext.Provider value={{
        isUpdating,
        setIsUpdating: (isUpdating) => setIsUpdating(isUpdating),
    }}>
        {children}
    </OptimisticUpdateContext.Provider>
}