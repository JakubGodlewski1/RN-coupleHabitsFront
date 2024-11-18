import {Alert, Image, TouchableOpacity} from "react-native";
import Text from "@/components/Text";
import {MUTATION_KEY, useUpdateAvatar} from "@/api/hooks/useUpdateAvatar";
import {pickAvatar} from "@/utils/pickAvatar";
import {useMutationState} from "@tanstack/react-query";
import {useEffect, useState} from "react";

type Props = {
    url: string | null,
    text?: string,
    ownership?: "main" | "partner"
}
export default function Avatar({url, text, ownership = "partner"}: Props) {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
    const {updateAvatar} = useUpdateAvatar()
    const [optimisticUpdateAvatar] = useMutationState({
        filters: {mutationKey: [MUTATION_KEY], status: "pending"},
        select: (mutation) => {
            return mutation.state.variables
        }
    }) as string[] | null[]

    useEffect(() => {
        if (optimisticUpdateAvatar && ownership === "main") {
            console.log({update: optimisticUpdateAvatar})
            setAvatarUrl(optimisticUpdateAvatar)
        } else {
            setAvatarUrl(url)
        }
    }, [optimisticUpdateAvatar, ownership, url])

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
        {avatarUrl ? <Image className="w-full h-full" source={{
                uri: avatarUrl || undefined,
            }}/> :
            <Text classNames={{text: "font-mainBold text-sm"}}>{text}</Text>
        }
    </TouchableOpacity>
}