import { colors } from "@/constants/colors";
import { Film } from "@/types/types";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

export default function films() {
  const [films, setFilms] = useState<Film[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchFiles() {
    setLoading(true);
    try {
      const response = await fetch("https://swapi.py4e.com/api/films/");
      const data = await response.json();
      console.log("🚀 ~ fetchFiles ~ data:", data);

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

  function renderItem({ item }: { item: Film }) {
    return <Text style={{ color: "white" }}>{item.title}</Text>;
  }

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
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.text}
          />
        }
        ListEmptyComponent={
          <Text style={{ color: colors.text }}>No films found</Text>
        }
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
