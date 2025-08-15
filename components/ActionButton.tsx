import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { QrCode, ExternalLink } from "lucide-react-native";

const ActionButtons: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <QrCode size={20} color="#175635" />
        <Text style={styles.secondaryButtonText}>QR Code</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.secondaryButtonText}>
          Generate Apple Wallet Pass
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.primaryButton]}>
        <Text style={styles.primaryButtonText}>View Summary</Text>
        <ExternalLink size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
    flexDirection: "column",
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: "#175635",
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#EAF8EF",
  },
  secondaryButtonText: {
    color: "#175635",
    fontWeight: "600",
  },
});
