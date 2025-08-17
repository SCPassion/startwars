import { colors } from "@/constants/colors";
import { FAVORITES_KEY } from "@/constants/keys";
import { Film } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// This page can be accessed by using the following url: http://localhost:8081/films/1
export default function FileDetails() {
  const { id } = useLocalSearchParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchFilmDetails();
  }, [id]);

  async function fetchFilmDetails() {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.py4e.com/api/films/${id}`);
      const data = await response.json();
      setFilm(data);
      checkFavoriteStatus(data); // Check if the film is a favorite
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function checkFavoriteStatus(film: Film) {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (favorites) {
        // Async storage is only writing/reading with json strings
        const favoriteFilms = JSON.parse(favorites) as Film[];
        setIsFavorite(
          // If any of the favorite films have the same episode id as the current film, then set isFavorite to true
          favoriteFilms.some((f) => f.episode_id === film.episode_id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function toggleFavorite() {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      let favoriteFilms = favorites ? (JSON.parse(favorites) as Film[]) : [];

      if (isFavorite) {
        favoriteFilms = favoriteFilms.filter(
          // Filter out the film with the same episode id
          (f) => f.episode_id !== film?.episode_id
        );
      } else {
        film && favoriteFilms.push(film);
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteFilms));

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
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
    // When you have more content than you can fit in the screen, you can use a ScrollView
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons
                name={isFavorite ? "star" : "star-outline"}
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Text style={styles.title}>{film.title}</Text>
      <Text style={styles.details}>Episode: {film.episode_id}</Text>
      <Text style={styles.details}>Director: {film.director}</Text>
      <Text style={styles.details}>Producer: {film.producer}</Text>
      <Text style={styles.details}>Release Date: {film.release_date}</Text>
      <Text style={styles.crawl}>{film.opening_crawl}</Text>
    </ScrollView>
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
  details: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.text,
  },
  crawl: {
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 16,
    marginBottom: 8,
    color: colors.text,
  },
});
