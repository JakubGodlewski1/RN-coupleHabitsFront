import {ImageBackground, View} from "react-native";
import {useState} from "react";
// @ts-ignore
import add from "../../assets/introScreens/add.png"
// @ts-ignore
import columns from "../../assets/introScreens/columns.png"
// @ts-ignore
import updateAvatar from "../../assets/introScreens/updateAvatar.png"
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Button from "@/components/Button";
import {router} from "expo-router";

export default function PicSlides() {
    const [activeImg, setActiveImg] = useState(0);
    const {top} = useSafeAreaInsets()

    const images = [
        add, columns, updateAvatar
    ]

    return <ImageBackground style={{marginTop: top}} className="grow w-full" source={images[activeImg]}>
        {images.length - 1 === activeImg ?
            <View className="bg-black/50 p-5 pb-10 mt-auto">
                <Button type="secondary" onPress={() => {
                }} title="Upload avatar"/>
                <View style={{gap: 20}} className="flex-row mt-5">
                    <Button classNames={{wrapper: "flex-1"}} type="skip" onPress={() => router.push("../(tabs)")}
                            title="Skip"/>
                    <Button classNames={{wrapper: "flex-1"}} onPress={() => router.push("../(tabs)")} title="Next"/>
                </View>
            </View>
            :
            <View style={{gap: 20}} className="flex-row bg-black/50 p-5 pb-10 mt-auto">
                <Button classNames={{wrapper: "flex-1"}} type="skip" onPress={() => router.push("../(tabs)")}
                        title="Skip"/>
                <Button classNames={{wrapper: "flex-1"}} onPress={() => setActiveImg(p => p + 1)} title="Next"/>
            </View>
        }

    </ImageBackground>
}
