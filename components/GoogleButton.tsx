import {Image, Text, TouchableOpacity} from "react-native";
// @ts-ignore
import logo from "./../assets/icons/google.png"

export default function GoogleButton({onPress}:{onPress:()=>void}) {

    return <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-center space-x-5  bg-white rounded-[20px] p-4"
    >
        <Image  className="w-6 h-6" source={logo}/>
        <Text className="">Continue with Google</Text>
    </TouchableOpacity>
}