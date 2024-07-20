import * as Clipboard from "expo-clipboard";
import {Alert} from "react-native";

type Props = {
    textToCopy: string,
    message: string
}

export const copyToClipboard = async ({textToCopy, message}: Props) => {
    await Clipboard.setStringAsync(textToCopy);
    Alert.alert(message);
};