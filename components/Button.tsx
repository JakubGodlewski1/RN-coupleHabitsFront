import {TouchableOpacity} from "react-native";
import Text from "@/components/Text";
import {ReactNode} from "react"

type Size = "sm" | "md" | "lg"

type Props = {
    onPress: ()=>void,
    size?: Size
    classnames?:{
        wrapper?: string,
        text?:string
    }
    title: string | string[],
    children?: ReactNode
}

const SizeMap: Record<Size, string> = {
    sm:"p-1",
    md: "text-xl font-alSemiBold p-1",
    lg: "text-2xl font-alBold p-2"
}

export default function Button({ title, children, classnames, size="sm", onPress}:Props) {

    return <TouchableOpacity onPress={onPress} className={`bg-primary rounded-lg flex-row items-center justify-center space-x-2 ${classnames?.wrapper}`}>
            <Text classNames={{wrapper:`text-center text-white ${SizeMap[size]} ${classnames?.text}`}}>{title}</Text>
             {children && children}
    </TouchableOpacity>

}