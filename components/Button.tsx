import {TouchableOpacity} from "react-native";
import {ReactNode} from "react"
import {Shadows} from "@/styles/Shadows";
import Text from "@/components/Text";

type BtnType = "primary" | "secondary" | "tertiary" | "skip" | "white"

type Props = {
    type?: BtnType,
    onPress: () => void,
    children?: ReactNode,
    iconPosition?: "left" | "right",
    title: string,
    classNames?: {
        wrapper?: string,
        text?: string
    }
}

const typeStylesMap: Record<BtnType, { bg: string, text: string }> = {
    primary: {
        bg: "bg-primary",
        text: "text-white"
    },
    secondary: {
        bg: "bg-secondary",
        text: "text-white"
    },
    tertiary: {
        bg: "bg-tertiary",
        text: "text-white"
    },
    skip: {
        bg: "bg-skip",
        text: "text-black"
    },
    white: {
        bg: "bg-white",
        text: "text:black"
    }
}

export default function Button({children, iconPosition = "left", title, onPress, classNames, type = "primary"}: Props) {

    return <TouchableOpacity onPress={onPress} style={{...Shadows}}
                             className={`flex-row  items-center justify-center space-x-5  rounded-[20px] p-4 ${typeStylesMap[type].bg} ${classNames?.wrapper}`}>
        {iconPosition === "right" &&
            <Text classNames={{text: `font-mainBold ${typeStylesMap[type].text} ${classNames?.text}`}}>{title}</Text>}
        {children && children}
        {iconPosition === "left" &&
            <Text classNames={{text: `font-mainBold ${typeStylesMap[type].text} ${classNames?.text}`}}>{title}</Text>}

    </TouchableOpacity>

}