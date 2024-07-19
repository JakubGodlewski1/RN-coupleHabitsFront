import {useTabBarContext} from "@/hooks/useTabBarContext";
import {useEffect} from "react";


export const useHandleTabBar = (hideOnMount: boolean = false) => {
    //hide tabBar
    const {setIsVisible} = useTabBarContext()

    useEffect(() => {
        if (hideOnMount) {
            setIsVisible(false)
            return () => setIsVisible(true)
        }
    }, [hideOnMount]);
}