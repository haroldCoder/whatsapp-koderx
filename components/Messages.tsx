import React, { useEffect, useState } from 'react'
import { View, Image, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import { Message } from '../App'
import Icon from "react-native-vector-icons/FontAwesome";
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { API_URL } from '../config';
import * as SecureStore from 'expo-secure-store';

interface message{
  content: string,
  number_em: string
}


export default function Messages({name, image, id_em, id_tr, number} : Message) {
  const navigation = useNavigation<any>();
  const [text, setText] = useState<string>("");
  const [Number, setNumber] = useState<string | any>("")
  const [message, setMessage] = useState<message[]>([])

  useEffect(()=>{
    const timer = setInterval(()=>{
    const getMessages = async() =>{
      const res : message[] = (await axios.get(`${API_URL}server/api/messages/${id_em}/${id_tr}`)).data
      setMessage(res)
    }
    getMessages();
    }, 1000);
    return ()=>clearInterval(timer);
  }, [])

  useEffect(()=>{
    const getNumberSecureStore = async() =>{
      setNumber(await SecureStore.getItemAsync('phoneNumber'))
    }
    getNumberSecureStore()
  })
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <View style={{flex: 1}}>
      <View style={{display: "flex", flexDirection: "row", alignItems: "center", padding: 5, justifyContent: "space-between", backgroundColor: "#222"}}>
        <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        <TouchableOpacity onPress={() => {
              navigation.navigate("Home")
          }}>
            <View>
              <Icon.Button name="arrow-left" style={{color: "#FFF", backgroundColor: "#222"}}></Icon.Button>
            </View>
          </TouchableOpacity>
          <Image source={{uri: image}} style={{width: 50, height: 50, borderRadius: 100}} />
          <Text style={{marginLeft: 7, color: "white", fontSize: 20}}>{name}</Text>
        </View>
      </View>
      <View style={{padding: 8}}>
        {
          message.map((ms: message)=>(
            <View style={{backgroundColor: `${ms.number_em == number ? "#28A" : "#333"}`, borderRadius: 10, padding: 12, alignSelf: "flex-start", marginBottom: 12}}>
              <Text style={{color: "#FFF"}}>{ms.content}</Text>
            </View>
          ))
        }
      </View>
      <View style={{ flexDirection: 'row', position: "absolute", top: "90%", width: "100%", paddingHorizontal: 15, paddingBottom: 10 }}>
        <TextInput value={text} onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>)=>{setText(event.nativeEvent.text)}} style={{backgroundColor: "#202c33", width: "80%", borderRadius: 100, color: "#FFF", padding: 12}} placeholder='Mensaje' />
        <View style={{backgroundColor: "#333", borderRadius: 100, padding: 7, marginLeft: 5}}>
          <Icon.Button onPress={async()=>{
            setText("");
            await axios.post(`${API_URL}server/api/message`,{
              user_em: await SecureStore.getItemAsync('phoneNumber'),
              user_tr: number,
              content: text
            })
            
          }} name='paper-plane' style={{backgroundColor: "#333", width: 46, height: 46}}></Icon.Button>
        </View>
      </View>
    </View>
    </GestureHandlerRootView>
  )
}
