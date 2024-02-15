import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import colors from "../misc/colors";
import { AntDesign } from "@expo/vector-icons";

export default function SearchBar({
  containerStyle,
  value,
  onChangeText,
  onClear,
}) {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search.."
        style={styles.searchBar}
      />
      {value ? (
        <AntDesign
          name="close"
          size={20}
          color={colors.PRIMARY}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
  },
  container:{
    justifyContent:'center'
  },
  clearIcon:{
  position:'absolute',
  right:10  
  }
});
