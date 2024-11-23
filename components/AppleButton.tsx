import {Image, Text, TouchableOpacity} from "react-native";
// @ts-ignore
import logo from "./../assets/icons/apple.png"

type Props = {
    disabled?: boolean,
    onPress: () => void
}

export default function AppleButton({onPress, disabled}: Props) {

    return <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        className={`flex-row items-center justify-center space-x-5  bg-white rounded-[20px] p-4 ${disabled ? "bg-white/60" : ""}`}
    >
        <Image className="w-7 h-7" source={logo}/>
        <Text className="font-mainSemiBold text-lg">Continue with Apple</Text>
    </TouchableOpacity>
}