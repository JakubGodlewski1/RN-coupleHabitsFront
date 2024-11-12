import {useCallback, useEffect, useState} from "react";
import * as WebBrowser from 'expo-web-browser'
import {useOAuth} from "@clerk/clerk-expo";
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])
}

WebBrowser.maybeCompleteAuthSession()

export const useGoogleAuthWithClerk = () => {
    useWarmUpBrowser()
    const [isLoading, setIsLoading] = useState(false)

    const {startOAuthFlow} = useOAuth({strategy: 'oauth_google'})

    const onPress = useCallback(async () => {
        setIsLoading(true)
        try {
            const {createdSessionId, setActive} = await startOAuthFlow({
                redirectUrl: Linking.createURL("/(tabs)/(dashboard)", {scheme: 'myapp'}),
            })

            if (createdSessionId) {
                await setActive!({session: createdSessionId})
            }

        } catch (err) {
            console.error('OAuth error', err)
        } finally {
            setIsLoading(false)
        }
    }, [])


    return {startAuth: onPress, isLoading}
}