import {View} from "react-native";
import Text from "@/components/Text";

type Props = {
    url?: string,
    text?: string
}
export default function Avatar({url, text}: Props) {

    return <View className="bg-skip rounded-full h-[72px] w-[72px]  items-center justify-center">
        <Text classNames={{text: "font-mainBold text-sm"}}>{text}</Text>
    </View>
}