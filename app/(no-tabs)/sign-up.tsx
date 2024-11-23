import Input from "@/components/Input";
import Text from "@/components/Text";
import Button from "@/components/Button";
import GoogleButton from "@/components/GoogleButton";
import DividerOr from "@/components/DividerOr";
import {ScrollView, View} from "react-native";
import {Link} from "expo-router";
import PageTitle from "@/components/PageTitle";
import {Controller} from "react-hook-form";
import {useSignUpWithClerk} from "@/hooks/useSignUpWithClerk";
import {useOAuthWithClerk} from "@/hooks/usOAuthWithClerk";
import CenteredActivityIndicator from "@/components/CenteredActivityIndicator";
import AppleButton from "@/components/AppleButton";

export default function SignUp() {
    const {
        controlSignUpForm,
        codeFormErrors,
        onSignUpFormSubmit,
        signUpFormErrors,
        controlCodeForm,
        onCodeFormSubmit,
        pendingVerification,
        clerkErrors,
        isLoading: isLoadingForm
    } = useSignUpWithClerk()

    const {isLoading: isLoadingGoogleAuth, startAuth: startGoogleAuth} = useOAuthWithClerk({strategy: "google"})
    const {isLoading: isLoadingAppleAuth, startAuth: startAppleAuth} = useOAuthWithClerk({strategy: "apple"})

    const isLoading = isLoadingGoogleAuth || isLoadingAppleAuth || isLoadingForm

    if (isLoadingGoogleAuth || isLoadingAppleAuth) {
        return <CenteredActivityIndicator/>
    }

    return <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <PageTitle>Sign up</PageTitle>
        {!pendingVerification && <>
            <Controller
                control={controlSignUpForm}
                render={({field: {onChange, value}}) => (
                    <Input
                        autoCapitalize="none"
                        errorMessage={signUpFormErrors.email?.message || clerkErrors.email || undefined}
                        label="Email"
                        classNames={{wrapper: "mb-4"}}
                        keyboardType="email-address"
                        value={value}
                        onChangeText={onChange}
                        placeholder="super@email.com"
                    />
                )}
                name="email"
            />
            <Controller
                control={controlSignUpForm}
                render={({field: {onChange, value}}) => (
                    <Input
                        autoCapitalize="none"
                        errorMessage={signUpFormErrors.password?.message || clerkErrors.password || undefined}
                        label="Password"
                        classNames={{wrapper: "mb-4"}}
                        keyboardType="visible-password"
                        value={value}
                        onChangeText={onChange}
                        placeholder="********"
                    />
                )}
                name="password"
            />
            <Controller
                control={controlSignUpForm}
                render={({field: {onChange, value}}) => (
                    <Input
                        autoCapitalize="none"
                        errorMessage={signUpFormErrors.passwordConfirmation?.message}
                        label="Password confirmation"
                        classNames={{wrapper: "mb-2"}}
                        keyboardType="visible-password"
                        value={value}
                        onChangeText={onChange}
                        placeholder="********"
                    />
                )}
                name="passwordConfirmation"
            />

            <Button
                disabled={isLoading}
                onPress={onSignUpFormSubmit}
                title="Sign up"
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
                <Text classNames={{text: "text-center mb-3"}}>Already have an account? Let's <Link
                    replace
                    className="text-primary font-mainBold"
                    href="/sign-in">
                    sign in</Link></Text>
            </View>
        </>}

        {pendingVerification && (
            <View>
                <Controller
                    control={controlCodeForm}
                    render={({field: {onChange, value}}) => {
                        return <Input
                            keyboardType="numeric"
                            autoCapitalize="none"
                            errorMessage={codeFormErrors.code?.message || clerkErrors.code}
                            label="We have sent a confirmation code to your email"
                            classNames={{wrapper: "mb-2"}}
                            value={value}
                            onChangeText={onChange}
                            placeholder="954329"
                        />
                    }}
                    name="code"
                />
                <Button disabled={isLoading} title="Verify Email" onPress={onCodeFormSubmit}/>
            </View>
        )}
    </ScrollView>
}