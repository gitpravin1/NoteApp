import {  AsyncStorage } from 'react-native'
import React, { createContext } from 'react'
import { useState } from 'react';
import { useEffect, useContext } from 'react';


const NoteContext= createContext()
export default function NoteProvider({children}) {

    const [notes, setNotes] = useState([]);
    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');
        if (result !== null) setNotes(JSON.parse(result));
      };
    
      useEffect(() => {
        findNotes();
        
      },[]);

  return (
    <NoteContext.Provider value={{notes,setNotes,findNotes}}>
        {children}
    </NoteContext.Provider>
  )
}
export const useNotes = () => useContext(NoteContext);

