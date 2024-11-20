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
import {useGoogleAuthWithClerk} from "@/hooks/useGoogleAuthWithClerk";

export default function SignIn() {
    const {errors, clerkErrors, handleSignIn, control, isLoading: isLoadingForm} = useSignInWithClerk()

    const {
        isLoading: isLoadingAuth,
        startAuth
    } = useGoogleAuthWithClerk()

    const isLoading = isLoadingAuth || isLoadingForm

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
            disabled={isLoading}
            onPress={startAuth}
        />
        <View className="mt-auto">
            <Text classNames={{text: "text-center mb-3"}}>Don't have an account yet? Let's
                <Link
                    replace
                    className="text-primary font-mainBold"
                    href="/sign-up"
                >Sign up</Link></Text>
        </View>
    </ScrollView>
}