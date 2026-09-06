import { SignIn } from "@clerk/expo/web";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F8FBFC]" edges={["top", "bottom"]}>
      <StatusBar style="dark" backgroundColor="#F8FBFC" />

      <View
        style={{ pointerEvents: "none" }}
        className="absolute -right-24 -top-20 h-64 w-64 rounded-full bg-[#249A96] opacity-10"
      />
      <View
        style={{ pointerEvents: "none" }}
        className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#14375F] opacity-5"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 items-center px-6 py-8">
          <Image
            source={require("../../../assets/images/Logo.png")}
            resizeMode="contain"
            accessible
            accessibilityLabel="VisiBuild logo"
            style={{ width: 320, height: 96 }}
            className="mb-6"
          />

          <View className="w-full max-w-md items-center">
            <View className="mb-6 items-center">
              <Text className="text-center text-3xl font-bold tracking-tight text-[#102F52]">
                Welcome to VisiBuild
              </Text>
              <Text className="mt-2 text-center text-base leading-6 text-[#687987]">
                Sign in or create an account to continue to your secure builder
                workspace.
              </Text>
            </View>

            <SignIn
              routing="hash"
              withSignUp
              forceRedirectUrl="/home"
              signUpForceRedirectUrl="/home"
              appearance={{
                variables: {
                  colorPrimary: "#078C7D",
                  colorBackground: "#FFFFFF",
                  borderRadius: "0.75rem",
                },
                elements: {
                  rootBox: {
                    width: "100%",
                  },
                  cardBox: {
                    width: "100%",
                    boxShadow: "none",
                  },
                  card: {
                    width: "100%",
                    border: "1px solid #DDE5EA",
                    boxShadow: "none",
                  },
                },
              }}
            />
          </View>

          <View className="mt-6 flex-row items-center justify-center">
            <Ionicons name="lock-closed-outline" size={15} color="#94A3B8" />
            <Text className="ml-1.5 text-xs text-[#94A3B8]">
              Authentication securely provided by Clerk
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
