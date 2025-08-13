import { Redirect } from "expo-router";
import { StyleSheet } from "react-native";

export default function Index() {
  return <Redirect href="/films" />;
}

const styles = StyleSheet.create({});
