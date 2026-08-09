import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
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

type InputFieldProps = {
  label: string;
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  optional?: boolean;
};

function InputField({
  label,
  placeholder,
  icon,
  keyboardType = "default",
  autoCapitalize = "sentences",
  optional = false,
}: InputFieldProps) {
  return (
    <View className="mb-5">
      <View className="mb-2 flex-row items-center">
        <Text className="text-sm font-semibold text-[#14375F]">{label}</Text>

        {optional ? (
          <Text className="ml-1 text-xs text-[#94A3B8]">(optional)</Text>
        ) : null}
      </View>

      <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
        <Ionicons name={icon} size={20} color="#71808E" />

        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          className="ml-3 flex-1 text-base text-[#14375F]"
        />
      </View>
    </View>
  );
}

type AccessItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

function AccessItem({ icon, title, description }: AccessItemProps) {
  return (
    <View className="flex-row items-start py-3">
      <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#E7F5F3]">
        <Ionicons name={icon} size={18} color="#178F87" />
      </View>

      <View className="ml-3 flex-1">
        <Text className="text-sm font-semibold text-[#14375F]">{title}</Text>

        <Text className="mt-0.5 text-xs leading-5 text-[#71808E]">
          {description}
        </Text>
      </View>

      <Ionicons name="checkmark-circle" size={20} color="#178F87" />
    </View>
  );
}

export default function ClientDetailsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F8FBFC]" edges={["top", "bottom"]}>
      <StatusBar style="dark" backgroundColor="#F8FBFC" />

      {/* Decorative background */}
      <View
        pointerEvents="none"
        className="absolute -right-24 -top-20 h-64 w-64 rounded-full bg-[#249A96] opacity-10"
      />

      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-[#E4EAEE] bg-[#F8FBFC] px-5 py-3">
        <Pressable
          onPress={() => router.back()}
          className="h-11 w-11 items-center justify-center rounded-full border border-[#DDE5EA] bg-white active:opacity-60"
        >
          <Ionicons name="chevron-back" size={22} color="#14375F" />
        </Pressable>

        <View className="items-center">
          <Text className="text-base font-bold text-[#14375F]">
            Create project
          </Text>

          <Text className="mt-0.5 text-xs text-[#71808E]">Client setup</Text>
        </View>

        <Text
          onPress={() =>
            Alert.alert(
              "Draft saved",
              "Client details have been saved locally for this prototype.",
            )
          }
          className="w-11 text-right text-sm font-semibold text-[#178F87]"
        >
          Save
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 36 }}
      >
        <View className="px-6">
          {/* Wizard progress */}
          <View className="mt-6">
            <View className="flex-row items-center">
              <View className="h-9 w-9 items-center justify-center rounded-full bg-[#DDF2EF]">
                <Ionicons name="checkmark" size={20} color="#078C7D" />
              </View>

              <View className="mx-2 h-0.5 flex-1 bg-[#078C7D]" />

              <View className="h-9 w-9 items-center justify-center rounded-full bg-[#078C7D]">
                <Text className="text-sm font-bold text-white">2</Text>
              </View>

              <View className="mx-2 h-0.5 flex-1 bg-[#DDE5EA]" />

              <View className="h-9 w-9 items-center justify-center rounded-full border border-[#CBD5DC] bg-white">
                <Text className="text-sm font-bold text-[#94A3B8]">3</Text>
              </View>
            </View>

            <View className="mt-2 flex-row justify-between">
              <Text className="w-20 text-left text-xs font-semibold text-[#178F87]">
                Project
              </Text>

              <Text className="w-20 text-center text-xs font-semibold text-[#078C7D]">
                Client
              </Text>

              <Text className="w-20 text-right text-xs text-[#94A3B8]">
                Payment
              </Text>
            </View>
          </View>

          {/* Introduction */}
          <View className="mb-6 mt-8">
            <Text className="text-2xl font-bold tracking-tight text-[#102F52]">
              Client details
            </Text>

            <Text className="mt-2 text-sm leading-6 text-[#687987]">
              Add the main client for this project. They will receive access
              after you create the project.
            </Text>
          </View>

          {/* Client type */}
          <View className="mb-6 rounded-xl bg-[#E9EEF1] p-1">
            <View className="flex-row">
              <View className="h-11 flex-1 flex-row items-center justify-center rounded-lg bg-white">
                <Ionicons name="person-add-outline" size={18} color="#178F87" />

                <Text className="ml-2 text-sm font-semibold text-[#14375F]">
                  New client
                </Text>
              </View>

              <View className="h-11 flex-1 flex-row items-center justify-center">
                <Ionicons name="search-outline" size={18} color="#71808E" />

                <Text className="ml-2 text-sm font-medium text-[#71808E]">
                  Existing client
                </Text>
              </View>
            </View>
          </View>

          {/* Main client */}
          <View className="mb-5 flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#E7F5F3]">
              <Ionicons name="person-outline" size={19} color="#178F87" />
            </View>

            <View className="ml-3">
              <Text className="text-base font-bold text-[#14375F]">
                Main client
              </Text>

              <Text className="text-xs text-[#71808E]">
                Primary project contact
              </Text>
            </View>
          </View>

          <InputField
            label="Full name"
            placeholder="Enter the client’s full name"
            icon="person-outline"
            autoCapitalize="words"
          />

          <InputField
            label="Email address"
            placeholder="client@email.com"
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <InputField
            label="Phone number"
            placeholder="+44 7700 900000"
            icon="call-outline"
            keyboardType="phone-pad"
          />

          {/* Client role */}
          <View className="mb-5">
            <Text className="mb-2 text-sm font-semibold text-[#14375F]">
              Client role
            </Text>

            <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
              <Ionicons name="people-outline" size={20} color="#71808E" />

              <Text className="ml-3 flex-1 text-base text-[#14375F]">
                Main homeowner
              </Text>

              <Ionicons name="chevron-down" size={19} color="#71808E" />
            </View>
          </View>

          {/* Client address */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-[#14375F]">
              Client address
            </Text>

            <View className="flex-row items-center rounded-xl border border-[#DDE5EA] bg-white p-4">
              <Ionicons name="square-outline" size={23} color="#249A96" />

              <View className="ml-3 flex-1">
                <Text className="text-sm font-semibold text-[#14375F]">
                  Same as project address
                </Text>

                <Text className="mt-1 text-xs text-[#71808E]">
                  Use the property address entered previously
                </Text>
              </View>
            </View>
          </View>

          {/* Additional client */}
          <Pressable
            onPress={() =>
              Alert.alert(
                "Additional homeowner",
                "A second client form would open here in the production flow.",
              )
            }
            className="mb-8 h-14 flex-row items-center justify-center rounded-xl border border-dashed border-[#8FCBC4] bg-[#EDF8F6] active:opacity-70"
          >
            <Ionicons name="person-add-outline" size={19} color="#178F87" />

            <Text className="ml-2 text-sm font-semibold text-[#178F87]">
              Add another homeowner
            </Text>
          </Pressable>

          {/* Client access */}
          <View className="mb-5 flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#E7F5F3]">
              <Ionicons name="key-outline" size={19} color="#178F87" />
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-base font-bold text-[#14375F]">
                Client access
              </Text>

              <Text className="text-xs text-[#71808E]">
                Choose when the invitation is sent
              </Text>
            </View>
          </View>

          {/* Invitation toggle */}
          <View className="mb-4 flex-row items-center rounded-xl border border-[#CDE7E3] bg-[#EDF8F6] p-4">
            <View className="h-11 w-11 items-center justify-center rounded-full bg-[#D8F0EC]">
              <Ionicons name="paper-plane-outline" size={21} color="#178F87" />
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-sm font-bold text-[#14375F]">
                Send project invitation
              </Text>

              <Text className="mt-1 text-xs leading-5 text-[#687987]">
                Invite the client when the project is created
              </Text>
            </View>

            <View className="h-7 w-12 items-end justify-center rounded-full bg-[#078C7D] px-1">
              <View className="h-5 w-5 rounded-full bg-white" />
            </View>
          </View>

          {/* Invitation message */}
          <View className="mb-6">
            <View className="mb-2 flex-row items-center">
              <Text className="text-sm font-semibold text-[#14375F]">
                Welcome message
              </Text>

              <Text className="ml-1 text-xs text-[#94A3B8]">(optional)</Text>
            </View>

            <View className="min-h-28 rounded-xl border border-[#DDE5EA] bg-white px-4 py-4">
              <TextInput
                placeholder="Write a short welcome message for your client..."
                placeholderTextColor="#94A3B8"
                multiline
                textAlignVertical="top"
                className="flex-1 text-base leading-6 text-[#14375F]"
              />

              <Text className="mt-2 text-right text-xs text-[#94A3B8]">
                0 / 250
              </Text>
            </View>
          </View>

          {/* Access preview */}
          <View className="mb-8 rounded-2xl border border-[#DDE5EA] bg-white p-4">
            <View className="mb-1 flex-row items-center">
              <Ionicons name="eye-outline" size={19} color="#178F87" />

              <Text className="ml-2 text-sm font-bold text-[#14375F]">
                Client experience
              </Text>
            </View>

            <Text className="mb-2 text-xs leading-5 text-[#71808E]">
              The client will receive a simple view of the information shared
              with them.
            </Text>

            <AccessItem
              icon="trending-up-outline"
              title="View project progress"
              description="Follow stages, milestones, and published updates"
            />

            <View className="h-px bg-[#EDF1F3]" />

            <AccessItem
              icon="checkmark-done-outline"
              title="Respond to decisions"
              description="Review and confirm choices requested by the builder"
            />

            <View className="h-px bg-[#EDF1F3]" />

            <AccessItem
              icon="card-outline"
              title="View payment requests"
              description="See amounts, deadlines, invoices, and evidence"
            />

            <View className="h-px bg-[#EDF1F3]" />

            <AccessItem
              icon="document-text-outline"
              title="Access shared documents"
              description="View contracts, drawings, certificates, and manuals"
            />
          </View>

          {/* Visual-only continue button */}
          <Pressable
            onPress={() => router.push("/create-project/payment")}
            className="h-14 flex-row items-center justify-center rounded-xl bg-[#078C7D] active:opacity-80"
          >
            <Text className="text-base font-bold text-white">
              Continue to payment
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color="#FFFFFF"
              style={{ marginLeft: 8 }}
            />
          </Pressable>

          {/* Visual-only previous button */}
          <Pressable
            onPress={() => router.back()}
            className="mt-3 h-14 flex-row items-center justify-center rounded-xl border border-[#DDE5EA] bg-white active:bg-[#F4F7F8]"
          >
            <Ionicons name="arrow-back" size={18} color="#71808E" />

            <Text className="ml-2 text-sm font-semibold text-[#687987]">
              Back to project details
            </Text>
          </Pressable>

          <View className="mt-4 flex-row items-center justify-center">
            <Ionicons name="cloud-done-outline" size={15} color="#94A3B8" />

            <Text className="ml-1.5 text-xs text-[#94A3B8]">
              Your progress will be saved as a draft
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
