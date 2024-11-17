import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import Providers from "@/utils/Providers";
import {StatusBar} from "expo-status-bar";
import Purchases from "react-native-purchases";
import {Platform} from "react-native";

const IOS_RC_KEY = process.env.EXPO_PUBLIC_REVENUE_CAT_IOS
const ANDROID_RC_KEY = process.env.EXPO_PUBLIC_REVENUE_CAT_ANDROID

if (!IOS_RC_KEY)
    throw new Error("Ios revenue cat api key is missing")

if (!ANDROID_RC_KEY)
    throw new Error("Ios revenue cat api key is missing")


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        'AbhayaLibre-Regular': require('./../assets/fonts/AbhayaLibre-Regular.ttf'),
        'AbhayaLibre-Medium': require('./../assets/fonts/AbhayaLibre-Medium.ttf'),
        'AbhayaLibre-SemiBold': require('./../assets/fonts/AbhayaLibre-SemiBold.ttf'),
        'AbhayaLibre-Bold': require('./../assets/fonts/AbhayaLibre-Bold.ttf'),
        'AbhayaLibre-ExtraBold': require('./../assets/fonts/AbhayaLibre-ExtraBold.ttf')
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    //revenue cat
    Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE)

    useEffect(() => {
        if (Platform.OS === 'ios') {
            Purchases.configure({apiKey: IOS_RC_KEY!})
        } else if (Platform.OS === "android") {
            Purchases.configure({apiKey: ANDROID_RC_KEY!})
        }
    }, []);

    if (!loaded) {
        return null;
    }


    return (
        <Providers>
            <Stack
                screenOptions={{
                    contentStyle: {backgroundColor: "#E5F6FE"},
                    headerShown: false
                }}
            >
            </Stack>
            <StatusBar
                style={"dark"}
                translucent={true}
            />
        </Providers>
    );
}
