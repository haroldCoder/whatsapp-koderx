import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet, View, } from 'react-native'
import Contacts from './Contacts'
import {User, Message} from '../App'
import Head from './Head';
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

interface propHome{
  setUser: Dispatch<SetStateAction<Message>>,
  users: User[],
}

export default function Home({setUser, users}: propHome) {
  const navigation = useNavigation<any>();
  
  return (
    <View style={{flex: 1}}>
      <Head />
      <View style={styles.mainHome}>
        {
          users?.map((e)=>(
            <Contacts setuser={setUser} name={e.name} user_em={e.id_user_main} user_tr={e.id_user_add} image={e.image} />
          ))
        }
        <View style={{ flexDirection: 'row', position: "absolute", top: "85%", width: "100%", justifyContent: "flex-end", paddingRight: 10}}>
          <TouchableOpacity onPress={()=>{
            
            navigation.navigate("addContact")
          }}>
            <Icon name='comment' style={{backgroundColor: "#333",padding: 10, borderRadius: 100 ,fontSize: 40,color: "#FFF"}}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainHome: {
        paddingTop: 15,
        marginLeft: 5,
        backgroundColor: "transparent",
        flex: 1
    }
})
