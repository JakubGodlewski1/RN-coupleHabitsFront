import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {FileSystemUploadType} from 'expo-file-system';
import * as SecureStore from "expo-secure-store";
import {DEFAULT_URL} from "@/utils/consts";
import {Alert} from "react-native";

export const uploadImage = async () => {
    let imageUri;
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
        alert("You've refused to allow this app to access your photos!");
        return;
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

    if (pic.fileSize! > 10000000) {
        return Alert.alert("Avatar is too big, max size is 10mb", `Your avatar has ${Math.round(result.assets![0].fileSize! / 10000) / 100} mb`);
    }


    if (!result.canceled)
        imageUri = result.assets[0].uri
    else {
        return alert("You've refused to allow this app to access your photos!");
    }

    try {
        const value = await SecureStore.getItemAsync('auth-token');
        if (!value) {
            return alert("You don't have enough permissions to upload your photo. Contact support.");
        }
        await FileSystem.uploadAsync(DEFAULT_URL + "/avatars", imageUri, {
            httpMethod: "POST",
            headers: {
                "x-auth-token": value
            },
            uploadType: FileSystemUploadType.MULTIPART,
            fieldName: "avatar"
        })


    } catch (error) {
        console.error('Upload failed', error);
    }
};

