import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { CloudUpload } from "lucide-react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  firstName?: string;
  lastName?: string;
}

export default function FileUpload({
  firstName = "John",
  lastName = "Doe",
}: Props) {
  return (
    <View style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>
        Good Morning,{" "}
        <Text style={styles.greetingName}>
          {firstName} {lastName}
        </Text>
      </Text>

      {/* Add Documents heading */}
      <Text style={styles.sectionTitle}>Add Documents</Text>

      {/* Upload Box */}
      <View style={styles.uploadBox}>
        <TouchableOpacity>
          <CloudUpload size={60} color="#175635" />
        </TouchableOpacity>

        <Text style={styles.mainText}>
          Drag & Drop or choose files to upload
        </Text>
        <Text style={styles.subText}>
          Select multiple images, pdf or ms.word files
        </Text>
      </View>

      {/* OR separator */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 16,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "#D1D5DB" }} />
        <Text style={{ marginHorizontal: 12, color: "#6B7280" }}>OR</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "#D1D5DB" }} />
      </View>

      {/* Import from URL */}
      <View style={{ marginTop: 6 }}>
        <Text style={{ marginBottom: 4, fontWeight: "600", color: "#28372B" }}>
          Import from URL
        </Text>

        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#25995C80",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <TextInput
            style={{ flex: 1, padding: 8 }}
            placeholder="Add URL link"
          />
          <TouchableOpacity
            style={{ paddingHorizontal: 16, justifyContent: "center" }}
          >
            <Text style={{ fontWeight: "600", color: "#175635" }}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Help + Action Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 24,
          flexWrap: "wrap",
        }}
      >
        {/* Help text */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <FontAwesome
            name="question-circle-o"
            size={20}
            style={{ marginRight: 8, color: "#293728" }}
          />

          <Text style={{ fontWeight: "600", color: "#293728" }}>
            Still need help?
          </Text>
        </View>

        {/* Buttons group */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: "#175635",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#175635" }}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#175635",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff" }}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* QR Code / Wallet / Summary */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginTop: 24,
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: "#175635",
            borderRadius: 25,
            width: 250,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#175635" }}>QR Code</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: "#175635",
            borderRadius: 25,
            width: 250,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#175635" }}>Generate Apple Wallet Pass</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#175635",
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 999,
            width: 250,
          }}
        >
          <Text style={{ color: "#fff", marginRight: 8 }}>View Summary</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    marginTop: 60,
  },
  greeting: {
    fontWeight: "400",
    fontSize: 32,
  },
  greetingName: {
    fontWeight: "800",
    color: "#175635",
  },
  sectionTitle: {
    marginTop: 24,
    fontWeight: "600",
    fontSize: 24,
    color: "#175635",
    textAlign: "center",
  },
  uploadBox: {
    marginTop: 12,
    paddingVertical: 48,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: "#175635",
    borderStyle: "dashed",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  mainText: {
    color: "#28372B",
    textAlign: "center",
    marginTop: 8,
  },
  subText: {
    color: "#51785E",
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
});
