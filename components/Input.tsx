import {KeyboardTypeOptions, TextInput, TouchableOpacity, View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import {useState} from "react";
import Text from "@/components/Text";

type Props = {
    placeholder?: string,
    value: string,
    onChangeText: (value: string) => void,
    classNames?: {
        wrapper: string
    },
    label?: string,
    errorMessage?: string,
    autoCapitalize?: "none" | "words" | "sentences",
    keyboardType?: KeyboardTypeOptions
}

export default function Input({
                                  placeholder,
                                  onChangeText,
                                  value,
                                  keyboardType,
                                  classNames,
                                  errorMessage,
                                  autoCapitalize = "sentences",
                                  label,


                              }: Props) {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    return <View className={classNames?.wrapper}>
        {label && <Text classNames={{text: "font-mainBold"}}>{label}</Text>}
        <View
            className={`flex-row bg-white border-[1px] border-skip rounded-xl items-center pr-4 overflow-hidden`}>

            <TextInput
                autoCapitalize={autoCapitalize}
                secureTextEntry={!passwordVisible && keyboardType === "visible-password"}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#828282"
                placeholder={placeholder}
                className="p-4 grow"
            />

            {keyboardType === "visible-password" && (
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
        {
            errorMessage && <Text classNames={{
                text: "text-primary mt-2 font-medium"
            }}>{errorMessage}</Text>
        }
    </View>


}