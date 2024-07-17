import {TouchableOpacity} from "react-native";
import {ReactNode} from "react"
import {Shadows} from "@/styles/Shadows";
import Text from "@/components/Text";

type Props = {
    onPress: ()=>void,
    children?: ReactNode,
    iconPosition?: "left" | "right",
    title: String,
    classNames?: {
        wrapper?: String
    }
}

export default function Button({ children, iconPosition="left", title,  onPress, classNames}:Props) {

    return <TouchableOpacity  onPress={onPress} style={{...Shadows}} className={`flex-row  items-center justify-center space-x-5 bg-primary rounded-[20px] p-4 ${classNames?.wrapper}`}>
        {iconPosition === "right" && <Text classNames={{text:"text-white font-mainBold"}}>{title}</Text>}
             {children && children}
        {iconPosition === "left" && <Text classNames={{text:"text-white font-mainBold"}}>{title}</Text>}

    </TouchableOpacity>

}