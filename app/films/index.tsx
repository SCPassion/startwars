import FilmItem from "@/components/FilmItem";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { colors } from "@/constants/colors";
import { Film } from "@/types/types";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

export default function films() {
  const [films, setFilms] = useState<Film[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchFiles() {
    setLoading(true);
    try {
      const response = await fetch("https://swapi.py4e.com/api/films/");
      const data = await response.json();

      setFilms(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  // Add pull down to refresh to the FlatList
  function onRefresh() {
    setRefreshing(true);
    fetchFiles();
  }

  // ListEmptyComponent: A component to display when the list is empty
  // refreshing: whether the view should be indicating an active refresh
  // onRefresh: function to call when the user pulls down on the view
  return (
    <View style={styles.container}>
      <FlatList
        data={films}
        keyExtractor={(item) => item.episode_id.toString()}
        renderItem={(item) => <FilmItem item={item.item} />}
        refreshControl={
          <RefreshControl // This is the component that allows the user to pull down to refresh the list
            refreshing={refreshing}
            onRefresh={onRefresh} // This is the function that will be called when the user pulls down on the view
            tintColor={colors.text} // This is the color of the refresh indicator
          />
        }
        ListEmptyComponent={
          <ListEmptyComponent loading={loading} message="No films found" />
        }
        // showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // make sure it expands to the full height of the screen
    backgroundColor: colors.containerBackground,
  },
});
