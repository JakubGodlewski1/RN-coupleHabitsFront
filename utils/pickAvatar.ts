import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {FileSystemUploadType} from 'expo-file-system';
import * as SecureStore from "expo-secure-store";
import {DEFAULT_URL} from "@/utils/consts";
import {Alert} from "react-native";
import {QueryClient} from "@tanstack/query-core";
import {queryClient} from "@/api/queryClient";
import {queryKeys} from "@/api/queryKeys";
import {User} from "@/types";

export const pickAvatar = async () => {
    let imageUri = "";
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
        return Alert.alert("You've refused to allow this app to access your photos!");

    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: false,
    });

    //validation
    const pic = result?.assets?.[0]

    if (!pic) {
        return Alert.alert("Please upload a file");
    }

    if (pic.fileSize! > 4000000) {
        return Alert.alert("Avatar is too big, max size is 4mb", `Your avatar has ${Math.round(result.assets![0].fileSize! / 10000) / 100} mb`);
    }

    if (!result.canceled)
        imageUri = result.assets[0].uri
    else {
        return Alert.alert("You've refused to allow this app to access your photos!");
    }

    return imageUri
};

