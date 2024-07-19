import {TouchableOpacity, View} from "react-native";
import Text from "@/components/Text";
import {useState} from "react";

type Option<T extends string> = {
    key: T;
    label: string;
};

type Props<T extends string> = {
    options: Option<T>[];
    onPress: (key: T) => void;
    value: T;
};

export default function Tabs<T extends string>({options, onPress, value}: Props<T>) {
    const [selected, setSelected] = useState<T>(value)

    return <View className="flex-row space-x-2 justify-evenly bg-white p-2 h-14 rounded-xl border-[1px] border-skip">
        {options.map((option) => (
            <TouchableOpacity activeOpacity={0.9} onPress={() => {
                onPress(option.key)
                setSelected(option.key)
            }}
                              className={`grow justify-center rounded-lg ${selected === option.key ? "bg-primary" : ""}`}
                              key={option.key}>
                <Text
                    classNames={{text: `text-center ${selected === option.key ? "text-white font-mainBold" : "text-backgroundItem"}`}}>{option.label}</Text>
            </TouchableOpacity>
        ))}
    </View>
}