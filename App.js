import { StyleSheet, Text, View } from "react-native";
import Intro from "./app/screens/Intro";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteScreen from "./app/screens/NoteScreen";
import { createStackNavigator } from "@react-navigation/stack";
import NoteDetails from "./app/components/NoteDetails";
import { NavigationContainer } from "@react-navigation/native";
import NoteProvider from "./app/context/NoteProvider";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen,setisAppFirstTimeOpen]=useState(false)
  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");

    if(result ===null) return setisAppFirstTimeOpen(true)
    setUser(JSON.parse(result));
    setisAppFirstTimeOpen(false)
  };
  useEffect(() => {
    findUser();
  }, []);
  const renderNoteScreen =props=><NoteScreen {...props} user={user}/>

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  return (
    <NavigationContainer>
      <NoteProvider>
      <Stack.Navigator  
         screenOptions={{headerTitle:'',headerTransparent:true}}>
        <Stack.Screen component= {renderNoteScreen} name='NoteScreen' />
        <Stack.Screen
          component={NoteDetails} name='NoteDetails'
        />
      </Stack.Navigator>
      </NoteProvider>
      
    </NavigationContainer>
    
     
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
