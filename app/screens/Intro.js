import { View, Text, TextInput ,StyleSheet , Dimensions, Button } from 'react-native'
import React, { useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from '../misc/colors';
import RoundIconbtn from '../components/RoundIconbtn';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Intro({onFinish}) {
  const [name,setName]= useState('Siri');

  const handelOnChangeText = text => setName(text);

  const handelSubmit=async () =>{
    const user={name:name}
    await AsyncStorage.setItem('user',JSON.stringify(user));
    if(onFinish) onFinish();
  }
  // const handelRemove=async()=>{try {
  //   await AsyncStorage.removeItem('user')
  // } catch(e) {
  //   // remove error
  // }

  // console.log('Done.')}
  
  return (
    <View style= {styles.container}>
      <Text style={styles.inputTitle}>Enter Your name to continue</Text>

      <TextInput value={name}
       onChangeText={handelOnChangeText}
        placeholder='Enter Name'
       style={styles.textInput} />
      { name.trim().length>=3 ? 
       (<RoundIconbtn antIconName='arrowright' onPress={handelSubmit} style={styles.rBtn}/>) :null}
      

      {/* <Button style={styles.rmBtn} title="Remove name" onPress={handelRemove}></Button> */}

    </View>

  )
}

const width = Dimensions.get('window').width-50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth:2,
    borderRadius:10,
    borderColor:colors.PRIMARY,
    color: colors.PRIMARY,
    width, 
    height:50,
    paddingLeft:15,
    fontSize:25,
    marginBottom:60,
   
  },
  inputTitle: {
    alignSelf:'flex-start',
    marginBottom:5,  
    marginLeft:10,
    opacity:0.5,

  },
  // rmBtn:{
  //   marginTop:80,
  // },
  rBtn:{
  marginBottom:30,
  }
});  