import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';

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

  if (!loaded) {
    return null;
  }

  return (
        <Stack
            screenOptions={{
              contentStyle:{backgroundColor:"#E5F6FE"},
              headerShown:false
            }}
        />

  );
}
