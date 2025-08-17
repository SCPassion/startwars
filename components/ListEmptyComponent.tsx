import { colors } from "@/constants/colors";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type ListEmptyComponentProps = {
  loading: boolean;
  message?: string;
};

export default function ListEmptyComponent({
  loading,
  message = "No items found",
}: ListEmptyComponentProps) {
  return (
    <View style={styles.emptyContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.text} />
      ) : (
        <Text style={styles.emptyText}>{message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  emptyText: {
    fontSize: 18,
    color: colors.inactive,
  },
});
