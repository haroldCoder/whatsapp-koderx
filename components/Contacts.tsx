import React, { Dispatch, SetStateAction } from 'react'
import { ImageSourcePropType, TouchableOpacity, View } from 'react-native'
import { Image, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { User } from '../App';

interface propContact{
  setuser: Dispatch<SetStateAction<User>>
  name: string,
  image: ImageSourcePropType,
  message: string[]
}

export default function Contacts({setuser, name, image, message}: propContact) {
  const navigation = useNavigation<any>();

  return (
    <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 16}}>
        <View style={{marginRight: 6}}>
            <Image source={image} style={{width: 60, height: 60, borderRadius: 100}} />
        </View>
        <TouchableOpacity onPress={()=>{
          setuser({
            name: name,
            image: image,
            message: message
          })
          navigation.navigate("msg");
        }}>
            <View>
                <Text style={{color: "#FFF", fontSize: 18}}>{name}</Text>
                <Text style={{color: "#999", marginTop: 5, fontSize: 16}}>{message[message.length-1]}</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}
