import {Image, Text, TouchableOpacity} from "react-native";
// @ts-ignore
import logo from "./../assets/icons/google.png"

type Props = {
    disabled?: boolean,
    onPress: () => void,
    classNames?: {
        wrapper?: string
    }
}

export default function GoogleButton({onPress, disabled, classNames}: Props) {

    return <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        className={`flex-row items-center justify-center space-x-5  bg-white rounded-[20px] p-4 ${classNames?.wrapper}`}
    >
        <Image className="w-6 h-6" source={logo}/>
        <Text className="font-mainSemiBold text-lg">Continue with Google</Text>
    </TouchableOpacity>
}