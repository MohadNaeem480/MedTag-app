// styles/common.js
import { StyleSheet } from "react-native";
import { theme } from "../theme";

export const common = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
  },
  heading: {
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  text: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: "bold",
    fontSize: theme.fontSize.md,
  },
});
