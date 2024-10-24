import React, { Dispatch, SetStateAction, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Message, User } from '../app/(tabs)/index'
import Contacts from './Contacts'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AddNumber from './AddNumber'

interface propaddcontact {
  setUser: Dispatch<SetStateAction<Message>>,
  users: User[]
}

export default function AddContact({ setUser, users }: propaddcontact) {

  const navigation = useNavigation<any>();
  const [isAddNumber, setIsAddNumber] = useState<boolean>(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ display: "flex", backgroundColor: "#222", padding: 10, flexDirection: "row", alignItems: "center" }}>
        <Icon.Button onPress={() => {
          navigation.navigate("Home")
        }} name="arrow-back" style={{ color: "#FFF", fontSize: 70, backgroundColor: "#222" }}></Icon.Button>
        <View style={{ marginLeft: 15 }}>
          <Text style={{ color: "#FFF", fontSize: 22 }}>Contacts</Text>
          <Text style={{ color: "#FFF" }}>{users.length} contacts</Text>
        </View>
      </View>
      <View style={{ flex: 1, padding: 8 }}>
        <TouchableOpacity onPress={() => {
          setIsAddNumber(true)
        }}>
          <View style={{ flexDirection: "row", padding: 5, alignItems: "center", marginBottom: 25 }}>
            <Icon style={{ backgroundColor: "#222", color: "#FFF", width: 60, height: 60, borderRadius: 100, padding: 10, fontSize: 40 }} name='person-add' />
            <Text style={{ color: "#FFF", fontSize: 22, marginLeft: 15 }}>New contact</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ color: "#FFF", margin: 10, marginBottom: 26 }}>Contact whatsApp</Text>
        <View style={styles.mainHContact}>
          {
            users?.map((e: User, index: number) => (
              <Contacts key={index} setuser={setUser} name={e.name} image={e.image} user_em={e.id_user_main} number={e.number} user_tr={e.id_user_add} />
            ))
          }
        </View>
      </View>
      {
        isAddNumber ?
          <AddNumber setAddNumber={setIsAddNumber} /> : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  mainHContact: {
      paddingTop: 15,
      marginLeft: 5,
      backgroundColor: "transparent",
      flex: 1,
      gap: 15,
      paddingLeft: 10
  }
})