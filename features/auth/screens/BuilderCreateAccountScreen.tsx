import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    type TextInputProps,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormFieldProps = {
  label: string;
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  secureTextEntry?: boolean;
};

function FormField({
  label,
  placeholder,
  icon,
  keyboardType = "default",
  autoCapitalize = "none",
  secureTextEntry = false,
}: FormFieldProps) {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-sm font-semibold text-[#14375F]">{label}</Text>

      <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
        <Ionicons name={icon} size={20} color="#71808E" />

        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          className="ml-3 flex-1 text-base text-[#14375F]"
        />

        {secureTextEntry ? (
          <Ionicons name="eye-off-outline" size={20} color="#94A3B8" />
        ) : null}
      </View>
    </View>
  );
}

export default function BuilderCreateAccountScreen() {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const createAccount = () => {
    if (!termsAccepted) {
      Alert.alert("Accept the terms", "Please accept the Terms of Service and Privacy Policy to continue.");
      return;
    }
    router.replace("/create-project/details");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FBFC]" edges={["top", "bottom"]}>
      <StatusBar style="dark" backgroundColor="#F8FBFC" />

      {/* Decorative background */}
      <View
        pointerEvents="none"
        className="absolute -right-24 -top-20 h-64 w-64 rounded-full bg-[#249A96] opacity-10"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="px-6">
          {/* Header */}
          <View className="mt-2 flex-row items-center justify-between">
            <Pressable onPress={() => router.back()} className="h-11 w-11 items-center justify-center rounded-full border border-[#DDE5EA] bg-white active:opacity-60">
              <Ionicons name="chevron-back" size={22} color="#14375F" />
            </Pressable>

            <View className="flex-row items-center rounded-full bg-[#E7F5F3] px-3 py-2">
              <Ionicons name="construct-outline" size={15} color="#178F87" />

              <Text className="ml-1.5 text-xs font-bold tracking-wide text-[#178F87]">
                BUILDER
              </Text>
            </View>
          </View>

          {/* Introduction */}
          <View className="mt-3">
            <Text className="text-3xl font-bold tracking-tight text-[#102F52]">
              Create your account
            </Text>

            <Text className="mt-2 max-w-sm text-base leading-6 text-[#687987]">
              Start managing projects, sharing progress, and building client
              trust.
            </Text>
          </View>

          {/* Account type */}
          <View className="my-6 flex-row items-center rounded-xl border border-[#CDE7E3] bg-[#EDF8F6] p-4">
            <View className="h-11 w-11 items-center justify-center rounded-full bg-[#D8F0EC]">
              <Ionicons name="business-outline" size={21} color="#178F87" />
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-sm font-bold text-[#14375F]">
                Builder account
              </Text>

              <Text className="mt-0.5 text-xs leading-5 text-[#687987]">
                For builders, project managers, and construction teams
              </Text>
            </View>

            <Ionicons name="checkmark-circle" size={22} color="#178F87" />
          </View>

          {/* Form */}
          <FormField
            label="Full name"
            placeholder="Full Name"
            icon="person-outline"
            autoCapitalize="words"
          />

          <FormField
            label="Business email"
            placeholder="Email address"
            icon="mail-outline"
            keyboardType="email-address"
          />

          <FormField
            label="Phone number"
            placeholder="Phone Number"
            icon="call-outline"
            keyboardType="phone-pad"
          />

          <FormField
            label="Password"
            placeholder="Create a secure password"
            icon="lock-closed-outline"
            secureTextEntry
          />

          <FormField
            label="Confirm password"
            placeholder="Enter your password again"
            icon="shield-checkmark-outline"
            secureTextEntry
          />

          {/* Password guidance */}
          <View className="-mt-1 mb-5 flex-row items-start">
            <Ionicons
              name="information-circle-outline"
              size={17}
              color="#71808E"
            />

            <Text className="ml-2 flex-1 text-xs leading-5 text-[#71808E]">
              Use at least 8 characters with a number and a capital letter.
            </Text>
          </View>

          {/* Terms */}
          <Pressable onPress={() => setTermsAccepted((value) => !value)} className="mb-6 flex-row items-start">
            <Ionicons name={termsAccepted ? "checkbox" : "square-outline"} size={23} color="#249A96" />

            <Text className="ml-3 flex-1 text-sm leading-5 text-[#687987]">
              I agree to the{" "}
              <Text className="font-semibold text-[#178F87]">
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text className="font-semibold text-[#178F87]">
                Privacy Policy
              </Text>
              .
            </Text>
          </Pressable>

          {/* Visual-only primary button */}
          <Pressable
            onPress={createAccount}
            accessible
            accessibilityRole="button"
            className="h-14 flex-row items-center justify-center rounded-xl bg-[#078C7D]"
          >
            <Text className="text-base font-bold text-white">
              Create account
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color="#FFFFFF"
              style={{ marginLeft: 8 }}
            />
          </Pressable>

          {/* Visual-only login prompt */}
          <Pressable onPress={() => router.replace("/login")} className="mt-6 flex-row items-center justify-center">
            <Text className="text-sm text-[#71808E]">
              Already have an account?
            </Text>

            <Text className="ml-1.5 text-sm font-bold text-[#178F87]">
              Log in
            </Text>
          </Pressable>

          <View className="mt-8 flex-row items-center justify-center">
            <Ionicons
              name="shield-checkmark-outline"
              size={15}
              color="#94A3B8"
            />

            <Text className="ml-1.5 text-xs text-[#94A3B8]">
              Your information is securely protected
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
