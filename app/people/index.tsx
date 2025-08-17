import { colors } from "@/constants/colors";
import { Person } from "@/types/types";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// having [id] page to move into the details page

// In this index.tsx, we will fetch the first page of people
// Inside people, there is a 	"next": "https://swapi.py4e.com/api/people/?page=2",
// So we can use this to fetch the next page of people
// Use flatlist and an infinite loading at the bottom of the list

export default function people() {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchPeople() {
    setLoading(true);
    try {
      const response = await fetch("https://swapi.py4e.com/api/people/");
      const data = await response.json();
      setPeople(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <View style={styles.container}>
      <Text>people</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
