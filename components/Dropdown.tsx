import {Keyboard, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import Text from "@/components/Text";
import {Entypo} from "@expo/vector-icons";

type Props<T extends string> = {
    selectedKey: T;
    onPress: (key: T) => void;
    options: {
        key: T,
        label: string
    }[]
}

export default function Dropdown<T extends string>({options, onPress, selectedKey}: Props<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const selected = options.find(el => el.key === selectedKey)!

    return <View className="relative z-10">
        <TouchableOpacity
            onPress={() => {
                Keyboard.dismiss()
                setIsOpen(p => !p)
            }}
            className="p-3 border-[1px] flex-row border-skip rounded-xl items-center justify-between h-[55px]">
            <Text>{selected.label}</Text>
            <Entypo size={24} name={isOpen ? "chevron-small-up" : "chevron-small-down"}/>
        </TouchableOpacity>
        {isOpen && (
            <View className="border-[1px] border-skip rounded-xl z-10 bg-white mt-1 p-2 absolute top-14 w-full">
                {options.map(o => (
                    <TouchableOpacity
                        className={`flex-row justify-between items-center rounded-lg py-2 px-3 ${selected.key === o.key && "bg-[#FF5545]"}`}
                        key={o.key}
                        onPress={() => {
                            onPress(o.key)
                            setIsOpen(false)
                        }}>
                        <Text
                            classNames={{text: `${selected.key === o.key && "text-white font-mainBold"}`}}
                        >{o.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )}
    </View>

}