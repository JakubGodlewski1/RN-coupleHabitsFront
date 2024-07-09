import {Text} from "react-native";
import {ReactNode} from "react";

type TextType = "h1" | "h3" | "span"

type Props = {
    children: string | string[] | ReactNode,
    classNames?:{
        wrapper:string
    }
    type?: TextType
}

const TextTypeMap:Record<TextType, string> = {
    h1: "text-4xl font-alExtraBold",
    h3: "text-2xl font-alSemiBold",
    span: "text-lg font-alRegular"
}

export default function ({children, classNames, type="span"}:Props){

    return <Text className={`${TextTypeMap[type]} ${classNames?.wrapper}`}>
        {children}
    </Text>
}