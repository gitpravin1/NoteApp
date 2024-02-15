import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../misc/colors";
import RoundIconbtn from "./RoundIconbtn";

export default function NoteInputModel({ visible, onClose, onsubmit,isEdit,note }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const handelModelClose = () => {
    Keyboard.dismiss();
  };

  useEffect(()=>{
    if(isEdit){
      setTitle(note.title)
      setDesc(note.desc)
    }
  },[isEdit])


  const handelOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };
  const handelOnSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();

    if(isEdit){
     onsubmit(title,desc,Date.now())
    }else{
    onsubmit(title, desc);
    setDesc("");
    setTitle("");
    }
    
    onClose();
  };
  const closeModal = () => {
    if(!isEdit){
      setTitle("");
      setDesc("");
    }
    
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.container}>
        <TextInput
          value={title}
          onChangeText={(text) => handelOnChangeText(text, "title")}
          placeholder="Title"
          style={[styles.input, styles.title]}
        />

        <TextInput
          value={desc}
          onChangeText={(text) => handelOnChangeText(text, "desc")}
          multiline
          placeholder="Note"
          style={[styles.input, styles.desc]}
        />

        <View style={styles.btnContainer}>
          <RoundIconbtn
            size={15}
            antIconName="check"
            style={styles.submit}
            onPress={handelOnSubmit}
          />
          {title.trim() || desc.trim() ? (
            <RoundIconbtn
              size={15}
              style={{ marginLeft: 15 }}
              antIconName="close"
              onPress={closeModal}
            />
          ) : null}
        </View>
      </View>
      <TouchableWithoutFeedback onPress={handelModelClose}>
        <View style={[styles.modalBG, StyleSheet.absoluteFill]} />
      </TouchableWithoutFeedback>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    top: 0,
    paddingHorizontal: 30,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
  },
  desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
  },
});
