import React from 'react'
import { View, Image, Text, TextInput } from 'react-native'
import { User } from '../App'
import Icon from "react-native-vector-icons/FontAwesome";
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'

export default function Messages({name, image, message} : User) {

  const navigation = useNavigation<any>();

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
          <Image source={image} style={{width: 50, height: 50, borderRadius: 100}} />
          <Text style={{marginLeft: 7, color: "white", fontSize: 20}}>{name}</Text>
        </View>
      </View>
      <View style={{padding: 8}}>
        {
          message.map((ms)=>(
            <View style={{backgroundColor: "#202c33", borderRadius: 10, padding: 12, alignSelf: "flex-start", marginBottom: 12}}>
              <Text style={{color: "#FFF"}}>{ms}</Text>
            </View>
          ))
        }
      </View>
      <View style={{ flexDirection: 'row', position: "absolute", top: "90%", width: "100%", paddingHorizontal: 15, paddingBottom: 10 }}>
        <TextInput style={{backgroundColor: "#202c33", width: "80%", borderRadius: 100, color: "#FFF", padding: 12}} placeholder='Mensaje' />
        <View style={{backgroundColor: "#333", borderRadius: 100, padding: 7, marginLeft: 5}}>
          <Icon.Button name='paper-plane' style={{backgroundColor: "#333", width: 46, height: 46}}></Icon.Button>
        </View>
      </View>
    </View>
    </GestureHandlerRootView>
  )
}
