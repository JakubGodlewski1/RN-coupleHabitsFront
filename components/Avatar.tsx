import {Alert, Image, TouchableOpacity} from "react-native";
import Text from "@/components/Text";
import {useUpdateAvatar} from "@/api/hooks/useUpdateAvatar";
import {pickAvatar} from "@/utils/pickAvatar";

type Props = {
    url: string | null,
    text?: string,
    ownership?: "main" | "partner"
}
export default function Avatar({url, text, ownership = "partner"}: Props) {
    const {updateAvatar, optimisticUpdate} = useUpdateAvatar()

    const handleUpdateAvatar = async () => {
        const uri = await pickAvatar()
        if (uri) {
            updateAvatar(uri)
        }
    }

    return <TouchableOpacity
        onPress={() => ownership === "partner" ? () => {
        } : Alert.alert("Show your partner who they deal with!", "Do you want to update your avatar?", [
            {
                text: "Cancel"
            },
            {
                text: "Update",
                onPress: handleUpdateAvatar,
            }
        ])
        }
        className="bg-skip rounded-full h-[72px] w-[72px]  items-center justify-center overflow-hidden">
        {
            ownership === "main" && ((url || optimisticUpdate) ? <Image className="w-full h-full" source={{
                    uri: optimisticUpdate || url!
                }}/> :
                <Text classNames={{text: "font-mainBold text-sm"}}>{text}</Text>)
        }
        {
            ownership === "partner" && (url ? <Image className="w-full h-full" source={{
                    uri: url
                }}/> :
                <Text classNames={{text: "font-mainBold text-sm"}}>{text}</Text>)
        }

    </TouchableOpacity>
}