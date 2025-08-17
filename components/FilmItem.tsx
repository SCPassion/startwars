// use rnfs to create a default react native functional component

import { colors } from "@/constants/colors";
import { Film } from "@/types/types";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FilmItem({ item }: { item: Film }) {
  // Get the last part of the url
  // ["https:", "", "swapi.dev", "api", "films", "1", ""]
  // filter(Boolean) is used to remove the empty strings from the array
  const id = item.url.split("/").filter(Boolean).pop();

  return (
    // asChild is used to wrap the component in a Link component
    // This will the styling of the child component for the link
    <Link href={`/films/${id}`} asChild>
      <TouchableOpacity>
        <View style={styles.filmItem}>
          <Text style={styles.filmTitle}>{item.title}</Text>
          <Text style={styles.filmDetails}>Episode {item.episode_id}</Text>
          <Text style={styles.filmDetails}>Released: {item.release_date}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  filmItem: {
    backgroundColor: colors.background,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  filmTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  filmDetails: {
    fontSize: 14,
    color: "#fff",
  },
});
