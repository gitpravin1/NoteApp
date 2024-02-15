import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../misc/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Note({ item, onPress }) {
  const { title, desc } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  );
}
const width = Dimensions.get("window").width - 40;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    width: width / 2 - 10,
    padding: 10,

    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
