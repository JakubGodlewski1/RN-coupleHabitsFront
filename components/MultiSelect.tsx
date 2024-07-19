import {TouchableOpacity, View} from "react-native";
import Text from "@/components/Text";

type Option<T extends string> = {
    key: T;
    label: string;
    isSelected: boolean;
}

type Props<T extends string> = {
    options: Option<T>[],
    onPress: (key: T) => void
}

export default function MultiSelect<T extends string>({options, onPress}: Props<T>) {

    const handlePress = (option: Option<T>) => {
        if (options.length === 1 && option.isSelected) {
            return
        }
        onPress(option.key);
    }

    return <View className="flex-row space-x-2 justify-evenly bg-white p-2 h-14 rounded-xl border-[1px] border-skip">
        {options.map((option) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handlePress(option)}
                className={`grow justify-center rounded-lg ${option.isSelected ? "bg-primary" : ""}`}
                key={option.key}>
                <Text
                    classNames={{text: `text-center ${option.isSelected ? "text-white font-mainBold" : "text-backgroundItem"}`}}>{option.label}</Text>
            </TouchableOpacity>
        ))}
    </View>
}