import {Image, View} from "react-native";
import Text from "@/components/Text";
import {useUser} from "@/api/hooks/useUser";

type Props = {
    url: string | null,
    text?: string
}
export default function Avatar({url, text}: Props) {
    const {isLoading} = useUser()
    url = isLoading ? null : url

    return <View className="bg-skip rounded-full h-[72px] w-[72px]  items-center justify-center overflow-hidden">
        {url ? <Image className="w-full h-full" source={{
                uri: url,
            }}/> :
            <Text classNames={{text: "font-mainBold text-sm"}}>{text}</Text>
        }
    </View>
}