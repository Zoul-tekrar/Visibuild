import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import {
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

type SelectionFieldProps = {
  label: string;
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
};

function SelectionField({ label, placeholder, icon }: SelectionFieldProps) {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-sm font-semibold text-[#14375F]">{label}</Text>

      <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
        <Ionicons name={icon} size={20} color="#71808E" />

        <Text className="ml-3 flex-1 text-base text-[#94A3B8]">
          {placeholder}
        </Text>

        <Ionicons name="chevron-down" size={19} color="#71808E" />
      </View>
    </View>
  );
}

export default function CreateProjectScreen() {
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
        <View className="h-11 w-11 items-center justify-center rounded-full border border-[#DDE5EA] bg-white">
          <Ionicons name="chevron-back" size={22} color="#14375F" />
        </View>

        <View className="items-center">
          <Text className="text-base font-bold text-[#14375F]">
            Create project
          </Text>

          <Text className="mt-0.5 text-xs text-[#71808E]">Project setup</Text>
        </View>

        <Text className="w-11 text-right text-sm font-semibold text-[#178F87]">
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
              <View className="h-9 w-9 items-center justify-center rounded-full bg-[#078C7D]">
                <Text className="text-sm font-bold text-white">1</Text>
              </View>

              <View className="mx-2 h-0.5 flex-1 bg-[#DDE5EA]" />

              <View className="h-9 w-9 items-center justify-center rounded-full border border-[#CBD5DC] bg-white">
                <Text className="text-sm font-bold text-[#94A3B8]">2</Text>
              </View>

              <View className="mx-2 h-0.5 flex-1 bg-[#DDE5EA]" />

              <View className="h-9 w-9 items-center justify-center rounded-full border border-[#CBD5DC] bg-white">
                <Text className="text-sm font-bold text-[#94A3B8]">3</Text>
              </View>
            </View>

            <View className="mt-2 flex-row justify-between">
              <Text className="w-20 text-left text-xs font-semibold text-[#078C7D]">
                Project
              </Text>

              <Text className="w-20 text-center text-xs text-[#94A3B8]">
                Client
              </Text>

              <Text className="w-20 text-right text-xs text-[#94A3B8]">
                Schedule
              </Text>
            </View>
          </View>

          {/* Introduction */}
          <View className="mb-6 mt-8">
            <Text className="text-2xl font-bold tracking-tight text-[#102F52]">
              Project details
            </Text>

            <Text className="mt-2 text-sm leading-6 text-[#687987]">
              Add the main information for this project. You can update these
              details later.
            </Text>
          </View>

          {/* Project cover */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-[#14375F]">
              Project cover
            </Text>

            <View className="h-40 items-center justify-center rounded-2xl border border-dashed border-[#AFCFCB] bg-[#EDF8F6]">
              <View className="h-12 w-12 items-center justify-center rounded-full bg-[#D8F0EC]">
                <Ionicons name="images-outline" size={24} color="#178F87" />
              </View>

              <Text className="mt-3 text-sm font-semibold text-[#178F87]">
                Add project photo
              </Text>

              <Text className="mt-1 text-xs text-[#71808E]">
                JPG or PNG · Maximum 10 MB
              </Text>
            </View>
          </View>

          {/* Basic details */}
          <View className="mb-5 flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#E7F5F3]">
              <Ionicons name="home-outline" size={19} color="#178F87" />
            </View>

            <Text className="ml-3 text-base font-bold text-[#14375F]">
              Basic details
            </Text>
          </View>

          <InputField
            label="Project name"
            placeholder="e.g. Oakwood House Extension"
            icon="business-outline"
          />

          <SelectionField
            label="Project type"
            placeholder="Select project type"
            icon="construct-outline"
          />

          <InputField
            label="Project reference"
            placeholder="e.g. PRJ-2026-001"
            icon="document-text-outline"
            autoCapitalize="characters"
            optional
          />

          {/* Address */}
          <View className="mb-5 mt-2 flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#E7F5F3]">
              <Ionicons name="location-outline" size={19} color="#178F87" />
            </View>

            <Text className="ml-3 text-base font-bold text-[#14375F]">
              Project location
            </Text>
          </View>

          <View className="mb-5">
            <Text className="mb-2 text-sm font-semibold text-[#14375F]">
              Address
            </Text>

            <View className="min-h-24 flex-row items-start rounded-xl border border-[#DDE5EA] bg-white px-4 py-4">
              <Ionicons name="location-outline" size={20} color="#71808E" />

              <TextInput
                placeholder="Enter the full project address"
                placeholderTextColor="#94A3B8"
                multiline
                textAlignVertical="top"
                autoCapitalize="words"
                className="ml-3 flex-1 text-base leading-6 text-[#14375F]"
              />
            </View>
          </View>

          <InputField
            label="Postcode"
            placeholder="e.g. SW1A 1AA"
            icon="navigate-outline"
            autoCapitalize="characters"
          />

          {/* Dates */}
          <View className="mb-5 mt-2 flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#E7F5F3]">
              <Ionicons name="calendar-outline" size={19} color="#178F87" />
            </View>

            <Text className="ml-3 text-base font-bold text-[#14375F]">
              Project dates
            </Text>
          </View>

          <View className="mb-5 flex-row gap-3">
            <View className="flex-1">
              <Text className="mb-2 text-sm font-semibold text-[#14375F]">
                Start date
              </Text>

              <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
                <Ionicons name="calendar-outline" size={19} color="#71808E" />

                <Text className="ml-2 flex-1 text-sm text-[#94A3B8]">
                  Select date
                </Text>
              </View>
            </View>

            <View className="flex-1">
              <Text className="mb-2 text-sm font-semibold text-[#14375F]">
                Completion
              </Text>

              <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
                <Ionicons name="flag-outline" size={19} color="#71808E" />

                <Text className="ml-2 flex-1 text-sm text-[#94A3B8]">
                  Select date
                </Text>
              </View>
            </View>
          </View>

          {/* Budget */}
          <View className="mb-5 mt-2 flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#E7F5F3]">
              <Ionicons name="wallet-outline" size={19} color="#178F87" />
            </View>

            <Text className="ml-3 text-base font-bold text-[#14375F]">
              Project value
            </Text>
          </View>

          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-[#14375F]">
              Estimated project value
            </Text>

            <View className="h-14 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white px-4">
              <Text className="text-lg font-semibold text-[#14375F]">£</Text>

              <TextInput
                placeholder="0.00"
                placeholderTextColor="#94A3B8"
                keyboardType="decimal-pad"
                className="ml-3 flex-1 text-base text-[#14375F]"
              />

              <Text className="text-xs font-medium text-[#94A3B8]">
                Excluding VAT
              </Text>
            </View>
          </View>

          {/* Project template */}
          <View className="mb-5 flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#E7F5F3]">
              <Ionicons name="copy-outline" size={19} color="#178F87" />
            </View>

            <View className="ml-3">
              <Text className="text-base font-bold text-[#14375F]">
                Project template
              </Text>

              <Text className="text-xs text-[#71808E]">
                Choose a starting timeline
              </Text>
            </View>
          </View>

          <View className="mb-3 flex-row items-center rounded-xl border border-[#8FCBC4] bg-[#EDF8F6] p-4">
            <View className="h-10 w-10 items-center justify-center rounded-lg bg-[#D8F0EC]">
              <Ionicons name="home-outline" size={20} color="#178F87" />
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-sm font-bold text-[#14375F]">
                Residential extension
              </Text>

              <Text className="mt-1 text-xs text-[#687987]">
                8 standard construction stages
              </Text>
            </View>

            <Ionicons name="checkmark-circle" size={23} color="#178F87" />
          </View>

          <View className="mb-8 flex-row items-center rounded-xl border border-[#DDE5EA] bg-white p-4">
            <View className="h-10 w-10 items-center justify-center rounded-lg bg-[#F1F4F6]">
              <Ionicons name="create-outline" size={20} color="#71808E" />
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-sm font-bold text-[#14375F]">
                Start from scratch
              </Text>

              <Text className="mt-1 text-xs text-[#687987]">
                Build your own stages and schedule
              </Text>
            </View>

            <Ionicons name="ellipse-outline" size={23} color="#CBD5DC" />
          </View>

          {/* Visual-only continue button */}
          <View className="h-14 flex-row items-center justify-center rounded-xl bg-[#078C7D]">
            <Text className="text-base font-bold text-white">
              Continue to client details
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color="#FFFFFF"
              style={{ marginLeft: 8 }}
            />
          </View>

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
