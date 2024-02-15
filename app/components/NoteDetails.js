import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../misc/colors";
import RoundIconbtn from "./RoundIconbtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../context/NoteProvider";
import NoteInputModel from "./NoteInputModel";

const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  return `${day}/${month}/${year}- ${hrs}:${min}`;
};

export default function NoteDetails(props) {
  const [note ,setNote]=useState(props.route.params.note)
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNote = async () => {
    const res = await AsyncStorage.getItem("notes");
    let notes = [];
    if (res !== null) notes = JSON.parse(res);

    const newNotes = notes.filter(n=> n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const onDeleteAlert = () => {
    Alert.alert(
      "Are You Sure",
      "This action will delete your note permamently",
      [
        { text: "Delete", onPress: deleteNote },
        { text: "Cancel", onPress: () => {} },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handelUpdate = async (title, desc, time) => {
    const res = await AsyncStorage.getItem("notes");
    let notes = [];
    if (res !== null) notes = JSON.parse(res);

    const newNotes = notes.filter(n => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;
        setNote(n);
      }
      return n;
    });
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };
  const handelOnClose = () => {
    setShowModal(false);
  };
  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: 120 }]}
      >
        <Text style={styles.time}>{note.isUpdated ? `Updated At ${formatDate(note.time)}`:`Created At ${formatDate(note.time)}`}</Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconbtn
          antIconName={"delete"}
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={onDeleteAlert}
        />
        <RoundIconbtn
          antIconName={"edit"}
          style={{ backgroundColor: colors.PRIMARY }}
          onPress={openEditModal}
        />
      </View>
      <NoteInputModel
        isEdit={isEdit}
        note={note}
        onClose={handelOnClose}
        onsubmit={handelUpdate}
        visible={showModal}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },

  time: {
    textAlign: "right",
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: "absolute",
    right: 15,
    bottom: 20,
  },
});
