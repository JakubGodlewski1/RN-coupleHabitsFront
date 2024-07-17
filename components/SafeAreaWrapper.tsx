import {ReactNode} from "react";
import {StatusBar} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

type Props = {
    options?:{disableBottomSafeArea?: boolean};
    children: ReactNode,
    classNames?:{
        wrapper?: string
    }
}

export const SafeAreaWrapper = ({children, classNames, options={disableBottomSafeArea: false}}:Props) => {
    return (
        <>
            <SafeAreaView edges={options?.disableBottomSafeArea ? ["top", "left", "right"]:undefined} className={`px-4 py-2 grow ${classNames?.wrapper}`}>
                {children}
            </SafeAreaView>
            <StatusBar translucent={false}/>
        </>
    )
}