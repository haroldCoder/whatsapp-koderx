import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { ImageSourcePropType, TouchableOpacity, View } from 'react-native'
import { Image, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Message } from '../App';
import axios from 'axios';
import { API_URL } from '../config';

interface propContact{
  setuser: Dispatch<SetStateAction<Message>>
  name: string,
  image: string | any,
  user_tr?: number,
  user_em?: number
}

interface Messages{
  content: string
}

export default function Contacts({setuser, name, image, user_tr, user_em}: propContact) {
  const navigation = useNavigation<any>();
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(()=>{
    getMessages()
  }, [])

  const getMessages = async() =>{
    const res = (await axios.get(`${API_URL}server/api/messages/${user_em}/${user_tr}`)).data
    setMessages(res)
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
            message: messages
          })
          navigation.navigate("msg");
        }}>
            <View>
                <Text style={{color: "#FFF", fontSize: 18}}>{name}</Text>
                {
                  messages.length != 0 ?<Text style={{color: "#999", marginTop: 5, fontSize: 16}}>{messages[messages.length-1].content}</Text> : null
                }
                
            </View>
        </TouchableOpacity>
    </View>
  )
}
