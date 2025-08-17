import { colors } from "@/constants/colors";
import { Film } from "@/types/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

// This page can be accessed by using the following url: http://localhost:8081/films/1
export default function FileDetails() {
  const { id } = useLocalSearchParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("🚀 ~ id:", id);
    fetchFilmDetails();
  }, [id]);

  async function fetchFilmDetails() {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.py4e.com/api/films/${id}`);
      const data = await response.json();

      setFilm(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  if (!film) {
    return (
      <View>
        <Text style={{ color: "#fff" }}>No film found</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{film.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.containerBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
});
