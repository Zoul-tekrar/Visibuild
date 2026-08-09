import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const logIn = () => {
    if (!email.trim() || !password) {
      Alert.alert("Enter your details", "Add an email address and password to continue.");
      return;
    }
    router.replace("/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FBFC]" edges={["top", "bottom"]}>
      <StatusBar style="dark" backgroundColor="#F8FBFC" />

      {/* Decorative background */}
      <View
        pointerEvents="none"
        className="absolute -right-24 -top-20 h-64 w-64 rounded-full bg-[#249A96] opacity-10"
      />

      <View
        pointerEvents="none"
        className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#14375F] opacity-5"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 px-6">
          {/* VisiBuild logo */}
          <View className="mt-5 mb-14 h-28 items-center justify-center overflow-hidden">
            <Image
              source={require("../../../assets/images/Logo.png")}
              resizeMode="contain"
              accessible
              accessibilityLabel="VisiBuild logo"
              className="h-56 w-80"
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
                Log in to access your projects and continue where you left off.
              </Text>
            </View>

            {/* Email address */}
            <View className="mb-5">
              <Text className="mb-2 text-sm font-semibold text-[#14375F]">
                Email address
              </Text>

              <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
                <Ionicons name="mail-outline" size={20} color="#71808E" />

                <TextInput
                  placeholder="Enter your email address"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                  className="ml-3 flex-1 text-base text-[#14375F]"
                />
              </View>
            </View>

            {/* Password */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-semibold text-[#14375F]">
                Password
              </Text>

              <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#71808E"
                />

                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  className="ml-3 flex-1 text-base text-[#14375F]"
                />

                <Pressable onPress={() => setPasswordVisible((value) => !value)} hitSlop={10}>
                  <Ionicons name={passwordVisible ? "eye-outline" : "eye-off-outline"} size={20} color="#94A3B8" />
                </Pressable>
              </View>
            </View>

            {/* Remember me and forgot password */}
            <View className="mb-7 flex-row items-center justify-between">
              <Pressable onPress={() => setRememberMe((value) => !value)} className="flex-row items-center">
                <Ionicons name={rememberMe ? "checkbox" : "square-outline"} size={22} color="#249A96" />

                <Text className="ml-2 text-sm text-[#687987]">Remember me</Text>
              </Pressable>

              <Text onPress={() => router.push("/forgot-password")} className="text-sm font-semibold text-[#178F87]">
                Forgot password?
              </Text>
            </View>

            {/* Visual-only login button */}
            <Pressable onPress={logIn} className="h-14 flex-row items-center justify-center rounded-xl bg-[#078C7D] active:opacity-80">
              <Text className="text-base font-bold text-white">Log in</Text>

              <Ionicons
                name="arrow-forward"
                size={19}
                color="#FFFFFF"
                style={{ marginLeft: 8 }}
              />
            </Pressable>

            {/* Divider */}
            <View className="my-7 flex-row items-center">
              <View className="h-px flex-1 bg-[#DDE5EA]" />

              <Text className="mx-4 text-xs font-semibold tracking-wide text-[#94A3B8]">
                NEW TO VISIBUILD?
              </Text>

              <View className="h-px flex-1 bg-[#DDE5EA]" />
            </View>

            {/* Visual-only create-account button */}
            <Pressable onPress={() => router.push("/create-account")} className="h-14 flex-row items-center justify-center rounded-xl border border-[#078C7D] bg-white active:bg-[#EDF8F6]">
              <Ionicons name="person-add-outline" size={19} color="#078C7D" />

              <Text className="ml-2 text-base font-bold text-[#078C7D]">
                Create an account
              </Text>
            </Pressable>

            <Text className="mt-3 text-center text-xs leading-5 text-[#71808E]">
              Create a builder account to start managing your projects.
            </Text>
          </View>

          {/* Security message */}
          <View className="mb-5 flex-row items-center justify-center">
            <Ionicons
              name="shield-checkmark-outline"
              size={15}
              color="#94A3B8"
            />

            <Text className="ml-1.5 text-xs text-[#94A3B8]">
              Secure access to your VisiBuild workspace
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
