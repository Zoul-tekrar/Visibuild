import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace("/login"), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="relative flex-1 overflow-hidden bg-[#F8FBFC]">
      <StatusBar style="dark" backgroundColor="#F8FBFC" />

      {/* Decorative background accents */}
      <View className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[#249A96] opacity-10" />
      <View className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#14375F] opacity-5" />

      {/* Central branding */}
      <View className="flex-1 items-center justify-center px-8">
        <View className="-translate-y-10 w-full max-w-sm items-center">
          <Image
            source={require("../../../assets/images/Logo.png")}
            resizeMode="contain"
            accessible
            accessibilityLabel="VisiBuild logo"
            className="h-72 w-full"
          />

          <Text className="-mt-24 ml-28 font-medium tracking-wide text-[#536779]">
            See every step of the way.
          </Text>
        </View>
      </View>
    </View>
  );
}
