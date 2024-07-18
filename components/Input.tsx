import {TextInput, TouchableOpacity, View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import {useState} from "react";
import Text from "@/components/Text";

type InputType = "text" | "password" | "email"

type Props = {
    type?: InputType
    placeholder?: string,
    value: string,
    onChangeText: (value: string) => void,
    classNames?: {
        wrapper: string
    },
    label: string
}

const typeMap: Record<InputType, "email-address" | "default"> = {
    email: "email-address",
    text: "default",
    password: "default",
}

export default function Input({placeholder, onChangeText, value, type = "text", classNames, label}: Props) {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    return <View className={classNames?.wrapper}>
        <Text classNames={{text: "font-mainBold"}}>{label}</Text>
        <View
            className={`flex-row bg-white border-[1px] border-skip rounded-xl items-center pr-4 overflow-hidden`}>
            <TextInput
                keyboardType={typeMap[type]}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#5A5A5A"
                placeholder={placeholder}
                className="p-4 grow"
            />
            {type === "password" && (
                <>
                    {
                        <TouchableOpacity onPress={() => setPasswordVisible(p => !p)}>
                            {
                                passwordVisible ?
                                    <Entypo size={24} name="eye-with-line"/> :
                                    <Entypo size={24} name="eye"/>
                            }
                        </TouchableOpacity>


                    }
                </>

            )}
        </View>
    </View>


}