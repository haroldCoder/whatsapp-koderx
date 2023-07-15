import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { ImageSourcePropType, TouchableOpacity, View } from 'react-native'
import { Image, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { User } from '../App';

interface propContact{
  setuser: Dispatch<SetStateAction<User>>
  name: string,
  image: string | any,
  user_tr?: number,
  user_em?: number
}

interface Message{
  content: string
}

export default function Contacts({setuser, name, image, user_tr, user_em}: propContact) {
  const navigation = useNavigation<any>();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(()=>{
    getMessages()
  })

  const getMessages = () =>{

  }

  return (
    <View style={{flexDirection: "row", alignItems: "center", marginBottom: 16}}>
        <View style={{marginRight: 6}}>
            <Image source={{uri: image}} style={{width: 50, height: 50, borderRadius: 100}} />
        </View>
        <TouchableOpacity onPress={()=>{
          setuser({
            name: name,
            image: image,
          })
          navigation.navigate("msg");
        }}>
            <View>
                <Text style={{color: "#FFF", fontSize: 18}}>{name}</Text>
                <Text style={{color: "#999", marginTop: 5, fontSize: 16}}>{messages[messages.length-1].content}</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}
