import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNotes } from "../context/NoteProvider";
import React, { useEffect, useContext, useState } from "react";
import colors from "../misc/colors";
import SearchBar from "../components/SearchBar";
import Note from "../components/Note";
import RoundIconbtn from "../components/RoundIconbtn";
import NoteInputModel from "../components/NoteInputModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import NotFound from "../components/NotFound";
// import { useContext } from "react";


const reverseData = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

export default function NoteScreen({ user, navigation }) {
  const [greet, setGreet] = useState("Evening");
  const [modalVisible, setModalVisible] = useState(false);
  const { notes, setNotes, findNotes } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);
  const[filteredNotes,setFilteredNotes] = useState([])
  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
    setGreet("Evening");
  };

  useEffect(() => {
    findGreet();
  }, []);
  const reverseNotes= reverseData(notes)
  const handelOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updateNotes = [...notes, note];
    setNotes(updateNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updateNotes));
  };

  const openNote = (note) => {
    navigation.navigate("NoteDetails", { note });
  };
const handelOnSearchInput = async (text) => {
    setSearchQuery(text);

    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }

    const filterNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(text.toLowerCase())
    );

    if (filterNotes.length) {
      setFilteredNotes([...filterNotes]);
      setResultNotFound(false);
    } else {
      setFilteredNotes([]);
      setResultNotFound(true);
    }
  };

  const handelOnClear = async () => {
    setSearchQuery('');
    setFilteredNotes([]);
    setResultNotFound(false);
    await findNotes();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.textHeading}>
            Good {greet} {user.name}
          </Text>

          {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handelOnSearchInput}
              containerStyle={{ marginVertical: 15 }}
              onClear={handelOnClear}
            />
          ) : null}

          {resultNotFound ? (
            <NotFound />
          ) : (
            <FlatList
            data={searchQuery.trim() ? filteredNotes : reverseNotes}       
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 15,
            }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Note onPress={() => openNote(item)} item={item} />
            )}
          />
          )}

          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <RoundIconbtn
        onPress={() => setModalVisible(true)}
        antIconName="plus"
        style={styles.addBtn}
      />

      <NoteInputModel
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onsubmit={handelOnSubmit}
      />
    </>
  );
}
const styles = StyleSheet.create({
  textHeading: {
    fontSize: 25,
    fontWeight: "bold",
    // flex:1,
    // color:"#000000",
    marginTop: 110,
  },
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
    //  backgroundColor:'red',
  },
  addBtn: {
    position: "absolute",
    right: 15,
    bottom: 50,
    zIndex: 1,
  },
});
