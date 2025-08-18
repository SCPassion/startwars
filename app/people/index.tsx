import ListEmptyComponent from "@/components/ListEmptyComponent";
import { colors } from "@/constants/colors";
import { People, Person } from "@/types/types";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Inside people, there is a 	"next": "https://swapi.py4e.com/api/people/?page=2",
// So we can use this to fetch the next page of people
// Use flatlist and an infinite loading at the bottom of the list

export default function people() {
  const [people, setPeople] = useState<People | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  async function fetchPeople() {
    setLoading(true);
    try {
      const response = await fetch("https://swapi.py4e.com/api/people/");
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function fetchMorePeople() {
    if (!people || !people.next) return;

    try {
      const response = await fetch(people.next);
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 1000);
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  const persons: Person[] = people?.results || [];

  function renderPerson({ item }: { item: Person }) {
    const id = item.url.split("/").filter(Boolean).pop();
    return (
      <Link href={`/people/${id}`} asChild>
        <TouchableOpacity>
          <View style={styles.personContainer}>
            <Text style={styles.personName}>Name: {item.name}</Text>
            <Text style={styles.personBirthYear}>
              Birth Year: {item.birth_year}
            </Text>
            <Text style={styles.personGender}>Gender: {item.gender}</Text>
          </View>
        </TouchableOpacity>
      </Link>
    );
  }

  function onRefresh() {
    setRefreshing(true);
    fetchPeople();
  }

  function renderFooter() {
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="large" color={colors.text} />
        <Text style={styles.footerText}>Loading more people...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={persons}
        keyExtractor={(item) => item.name}
        renderItem={renderPerson}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.text}
          />
        }
        ListEmptyComponent={
          <ListEmptyComponent loading={loading} message="No people found" />
        }
        ListFooterComponent={renderFooter}
        onEndReached={fetchMorePeople}
        onEndReachedThreshold={0.1}
        removeClippedSubviews={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.containerBackground,
    flex: 1,
  },
  personContainer: {
    padding: 16,
    borderBottomColor: colors.background,
    backgroundColor: colors.background,
    margin: 10,
    borderRadius: 10,
  },
  personName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 5,
  },
  personBirthYear: {
    fontSize: 14,
    color: "#fff",
  },
  personGender: {
    fontSize: 14,
    color: "#fff",
  },
  footerContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 16,
    color: colors.text,
    marginTop: 10,
  },
});
