import {TouchableOpacity} from "react-native";
import {ReactNode} from "react"
import {Shadows} from "@/styles/Shadows";
import Text from "@/components/Text";

type BtnType = "primary" | "secondary" | "tertiary" | "skip" | "white" | "error"

type Props = {
    disabled?: boolean,
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

const typeStylesMap: Record<BtnType, { bg: string, text: string, border?: string }> = {
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
    },
    error: {
        bg: "bg-white",
        text: "text-primary",
        border: "border-[1px] border-primary"
    },
}

export default function Button({
                                   children,
                                   iconPosition = "left",
                                   title,
                                   onPress,
                                   classNames,
                                   type = "primary",
                                   disabled
                               }: Props) {

    return <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={{...Shadows, opacity: disabled ? 0.6 : 1}}
        className={`flex-row  items-center justify-center space-x-5  rounded-[20px] p-4 ${typeStylesMap[type].bg} ${typeStylesMap[type]?.border} ${classNames?.wrapper}`}>
        {iconPosition === "right" &&
            <Text
                classNames={{text: `font-mainSemiBold ${typeStylesMap[type].text} ${classNames?.text}`}}>{title}</Text>}
        {children && children}
        {iconPosition === "left" &&
            <Text
                classNames={{text: `font-mainSemiBold ${typeStylesMap[type].text} ${classNames?.text}`}}>{title}</Text>}

    </TouchableOpacity>

}