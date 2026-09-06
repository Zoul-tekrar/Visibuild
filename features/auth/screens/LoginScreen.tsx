import { useAuth } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import { useHostedAuth } from "@clerk/expo/hosted-auth";

import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type HostedAuthMode = "sign-in" | "sign-up";

export default function LoginScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const { startHostedAuth } = useHostedAuth();
  const [activeMode, setActiveMode] = useState<HostedAuthMode | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/home");
    }
  }, [isLoaded, isSignedIn]);

  const openAuth = async (mode: HostedAuthMode) => {
    if (!isLoaded || activeMode) {
      return;
    }

    setActiveMode(mode);

    try {
      await startHostedAuth({ mode });
    } catch {
      Alert.alert(
        "Unable to open authentication",
        "The secure sign-in page could not be opened. Please try again.",
      );
    } finally {
      setActiveMode(null);
    }
  };

  const isBusy = !isLoaded || activeMode !== null;

  return (
    <SafeAreaView className="flex-1 bg-[#F8FBFC]" edges={["top", "bottom"]}>
      <StatusBar style="dark" backgroundColor="#F8FBFC" />

      {/* Decorative background */}
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
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 px-6">
          {/* VisiBuild logo */}
          <View className="mt-6 mb-10 h-28 items-center justify-center">
            <Image
              source={require("../../../assets/images/Logo.png")}
              resizeMode="contain"
              accessible
              accessibilityLabel="VisiBuild logo"
              className="h-28 w-full max-w-sm"
            />
          </View>

          {/* Login content */}
          <View className="flex-1 justify-center pb-10">
            {/* Introduction */}
            <View className="mb-8">
              <Text className="text-3xl font-bold tracking-tight text-[#102F52]">
                Welcome back
              </Text>

              <Text className="mt-2 text-base leading-6 text-[#687987]">
                Continue to your secure VisiBuild workspace to manage projects,
                updates, and clients.
              </Text>
            </View>

            <View className="mb-8 rounded-2xl border border-[#DDE5EA] bg-white p-5">
              <View className="mb-3 h-11 w-11 items-center justify-center rounded-xl bg-[#E4F5F2]">
                <Ionicons
                  name="shield-checkmark-outline"
                  size={23}
                  color="#078C7D"
                />
              </View>
              <Text className="text-base font-bold text-[#14375F]">
                Secure authentication
              </Text>
              <Text className="mt-1 text-sm leading-5 text-[#687987]">
                Sign in through Clerk using the authentication methods enabled
                for your account.
              </Text>
            </View>

            <Pressable
              onPress={() => openAuth("sign-in")}
              disabled={isBusy}
              accessibilityRole="button"
              accessibilityLabel="Continue to secure login"
              accessibilityState={{
                disabled: isBusy,
                busy: activeMode === "sign-in",
              }}
              className={`h-14 flex-row items-center justify-center rounded-xl bg-[#078C7D] ${
                isBusy ? "opacity-60" : "active:opacity-80"
              }`}
            >
              {!isLoaded || activeMode === "sign-in" ? (
                <>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text className="ml-2 text-base font-bold text-white">
                    {!isLoaded ? "Preparing login..." : "Opening login..."}
                  </Text>
                </>
              ) : (
                <>
                  <Text className="text-base font-bold text-white">
                    Continue to log in
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={19}
                    color="#FFFFFF"
                    style={{ marginLeft: 8 }}
                  />
                </>
              )}
            </Pressable>

            {/* Divider */}
            <View className="my-7 flex-row items-center">
              <View className="h-px flex-1 bg-[#DDE5EA]" />

              <Text className="mx-4 text-xs font-semibold tracking-wide text-[#94A3B8]">
                NEW TO VISIBUILD?
              </Text>

              <View className="h-px flex-1 bg-[#DDE5EA]" />
            </View>

            <Pressable
              onPress={() => openAuth("sign-up")}
              disabled={isBusy}
              accessibilityRole="button"
              accessibilityLabel="Create a VisiBuild account"
              accessibilityState={{
                disabled: isBusy,
                busy: activeMode === "sign-up",
              }}
              className={`h-14 flex-row items-center justify-center rounded-xl border border-[#078C7D] bg-white ${
                isBusy ? "opacity-60" : "active:bg-[#EDF8F6]"
              }`}
            >
              {activeMode === "sign-up" ? (
                <>
                  <ActivityIndicator size="small" color="#078C7D" />
                  <Text className="ml-2 text-base font-bold text-[#078C7D]">
                    Opening sign-up...
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons
                    name="person-add-outline"
                    size={19}
                    color="#078C7D"
                  />
                  <Text className="ml-2 text-base font-bold text-[#078C7D]">
                    Create an account
                  </Text>
                </>
              )}
            </Pressable>
          </View>

          {/* Security message */}
          <View className="mb-5 flex-row items-center justify-center">
            <Ionicons
              name="lock-closed-outline"
              size={15}
              color="#94A3B8"
            />

            <Text className="ml-1.5 text-xs text-[#94A3B8]">
              Authentication securely provided by Clerk
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
