import { colors } from "@/constants/colors";
import { FAVORITES_KEY } from "@/constants/keys";
import { Film } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function favorites() {
  const [favorites, setFavorites] = useState<Film[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchFavorites() {
    setRefreshing(true);
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (favorites) {
        // Async storage is only writing/reading with json strings
        setFavorites(JSON.parse(favorites) as Film[]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }

  // useEffect(() => {
  //   fetchFavorites();
  // }, []);

  // useFocusEffect is a hook that allows us to fetch the favorites when the screen is focused
  // focus means when the user navigates to the screen
  // Where as useEffect is a hook that allows us to fetch the favorites when the component is mounted,
  // even if the user navigates to the screen and then back to the favorites screen, the favorites will not be fetched again
  // because the component has already been mounted
  useFocusEffect(
    //
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  async function onRefresh() {
    setRefreshing(true);
    await fetchFavorites();
  }

  async function removeFavorite(film: Film) {
    const updatedFavorites = favorites.filter(
      (f) => f.episode_id !== film.episode_id
    );
    setFavorites(updatedFavorites);

    try {
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.log(error);
    }
  }

  function renderItem({ item }: { item: Film }) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.title}</Text>
        <TouchableOpacity
          onPress={() => {
            removeFavorite(item);
          }}
        >
          <Ionicons name="trash-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.episode_id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.text}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.itemBackground,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
});
