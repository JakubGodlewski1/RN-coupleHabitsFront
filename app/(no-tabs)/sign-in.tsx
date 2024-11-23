import {ScrollView, TouchableOpacity, View} from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import DividerOr from "@/components/DividerOr";
import GoogleButton from "@/components/GoogleButton";
import {Link, router} from "expo-router";
import Text from "@/components/Text";
import PageTitle from "@/components/PageTitle";
import {useSignInWithClerk} from "@/hooks/useSignInWithClerk";
import {Controller} from "react-hook-form";
import {useOAuthWithClerk} from "@/hooks/usOAuthWithClerk";
import AppleButton from "@/components/AppleButton";
import CenteredActivityIndicator from "@/components/CenteredActivityIndicator";

export default function SignIn() {
    const {errors, clerkErrors, handleSignIn, control, isLoading: isLoadingForm} = useSignInWithClerk()
    const {isLoading: isLoadingGoogleAuth, startAuth: startGoogleAuth} = useOAuthWithClerk({strategy: "google"})
    const {isLoading: isLoadingAppleAuth, startAuth: startAppleAuth} = useOAuthWithClerk({strategy: "apple"})

    const isLoading = isLoadingGoogleAuth || isLoadingAppleAuth || isLoadingForm

    if (isLoadingGoogleAuth || isLoadingAppleAuth) {
        return <CenteredActivityIndicator/>
    }

    return <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <PageTitle>Sign in</PageTitle>
        <Controller
            control={control}
            render={({field: {value, onChange}}) => (
                <Input
                    autoCapitalize="none"
                    errorMessage={errors.email?.message || clerkErrors.email || undefined}
                    label="Email"
                    classNames={{wrapper: "mb-4"}}
                    keyboardType="email-address"
                    value={value}
                    onChangeText={onChange}
                    placeholder="your@email.com"
                />
            )}
            name="email"
        />
        <Controller
            control={control}
            render={({field: {value, onChange}}) => (
                <Input
                    autoCapitalize="none"
                    errorMessage={errors.password?.message || clerkErrors.password || undefined}
                    label="Password"
                    classNames={{wrapper: "mb-2"}}
                    keyboardType="visible-password"
                    value={value}
                    onChangeText={onChange}
                    placeholder="*******"
                />
            )}
            name="password"
        />

        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
            <Text classNames={{text: "text-sm ml-auto mb-4"}}>Forgot password?</Text>
        </TouchableOpacity>
        <Button
            disabled={isLoading}
            onPress={handleSignIn}
            title="Sign in"
        />
        <DividerOr classNames={{wrapper: "my-4"}}/>
        <GoogleButton
            classNames={{wrapper: "mb-2"}}
            disabled={isLoading}
            onPress={startGoogleAuth}
        />
        <AppleButton
            disabled={isLoading}
            onPress={startAppleAuth}
        />
        <View className="mt-auto">
            <Text classNames={{text: "text-center mb-3"}}>Don't have an account yet? Let's
                <Link
                    replace
                    className="text-primary font-mainBold"
                    href="/sign-up"
                > sign up</Link></Text>
        </View>
    </ScrollView>
}