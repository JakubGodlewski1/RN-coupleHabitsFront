import {Text} from "react-native";
import {ReactNode} from "react";

type TextType = "h1" | "h2" | "h3" | "span"

type Props = {
    children: string | string[] | ReactNode,
    classNames?:{
        text:string
    }
    type?: TextType
}

const TextTypeMap:Record<TextType, string> = {
    h1: "text-4xl font-mainExtraBold",
    h2: "text-3xl font-mainExtraBold",
    h3: "text-2xl font-mainSemiBold",
    span: "text-lg font-mainRegular"
}

export default function ({children, classNames, type="span"}:Props){

    return <Text className={`${TextTypeMap[type]} ${classNames?.text}`}>
        {children}
    </Text>
}