import { colors } from "@/constants/colors";
import { Person } from "@/types/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";

export default function PeopleDetails() {
  const { id } = useLocalSearchParams();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchPersonDetails() {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.py4e.com/api/people/${id}`);
      const data = await response.json();
      setPerson(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchPersonDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color={colors.text} />;
  }

  if (!person) {
    return <Text style={styles.noPersonFound}>No person found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.personName}>{person.name}</Text>
      <Text style={styles.personBirthYear}>
        Birth Year: {person.birth_year}
      </Text>
      <Text style={styles.personGender}>Gender: {person.gender}</Text>
      <Text style={styles.personHeight}>Height: {person.height}</Text>
      <Text style={styles.personMass}>Mass: {person.mass}</Text>
      <Text style={styles.personHairColor}>
        Hair Color: {person.hair_color}
      </Text>
      <Text style={styles.personSkinColor}>
        Skin Color: {person.skin_color}
      </Text>
      <Text style={styles.personEyeColor}>Eye Color: {person.eye_color}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.containerBackground,
    flex: 1,
  },
  noPersonFound: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: colors.text,
  },
  personName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: colors.text,
  },
  personBirthYear: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: colors.text,
  },
  personGender: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: colors.text,
  },
  personHeight: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: colors.text,
  },
  personMass: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: colors.text,
  },
  personHairColor: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: colors.text,
  },
  personSkinColor: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: colors.text,
  },
  personEyeColor: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: colors.text,
  },
});
