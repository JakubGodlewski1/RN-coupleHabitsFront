import {ReactNode} from "react";
import {StatusBar, ViewStyle} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

type Props = {
    options?: { disableBottomSafeArea?: boolean };
    children: ReactNode,
    classNames?: {
        wrapper?: string
    },
    style?: ViewStyle
}

export const SafeAreaWrapper = ({children, classNames, style, options = {disableBottomSafeArea: false}}: Props) => {
    return (
        <>
            <SafeAreaView style={style} edges={options?.disableBottomSafeArea ? ["top", "left", "right"] : undefined}
                          className={`px-4 py-2 grow ${classNames?.wrapper}`}>
                {children}
            </SafeAreaView>
            <StatusBar translucent={false}/>
        </>
    )
}