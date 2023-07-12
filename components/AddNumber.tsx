import axios from 'axios'
import React, { useRef, useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Button } from 'react-native-paper'
import { API_URL } from '../config';
import * as SecureStore from 'expo-secure-store';

export default function AddNumber() {
    const [isAdded, setIdAdded] = useState<boolean>(false);
    const idUser = useRef<number[]>([]);
    const [number, setNumber] = useState<string>("");
    const [msg, setMsg] = useState<boolean>(false)

    const AddContact = async() =>{
        setMsg(true)
        await axios.get(`${API_URL}server/api/userid/${SecureStore.getItemAsync('phoneNumber')}`)
        .then(async({id} : number | any)=>{
            idUser.current[0] = id;
            await axios.get(`${API_URL}server/api/userid/${number}`)
            .then(({id}: number | any) =>{
                idUser.current[1] = id;
                axios.post(`${API_URL}server/api/users/contact`,{
                    user_main: idUser.current[0], 
                    user_add: idUser.current[1]
                })
                .then(()=>{
                    setIdAdded(true)
                })
                .catch(()=>{
                    setIdAdded(false);
                })
            })
            .catch(()=>{
                setIdAdded(false);
            }) 
        })
        .catch(()=>{
            setIdAdded(false);
        })
    }

  return (
    <View style={{position: "absolute", width: "70%", top: "15%", left: "20%", backgroundColor: "#222", padding: 18, borderRadius: 18}}>
        <Text style={{color: "#FFF", fontSize: 18}}>Number</Text>
        <TextInput onChange={(value: any)=>{setNumber(value)}} style={{borderBottomColor: "#AAA", color: "#FFF", marginTop: 20, borderBottomWidth: 1, fontSize: 15}} placeholder='Number of contact' />
        <Button onPress={AddContact} style={{marginTop: 40, backgroundColor: "#FFF", borderRadius: 10,}}><Text style={{color: "#555", fontSize: 15}}>Add Contact</Text></Button>
        <View>
            {
                msg ?
               <Text>{isAdded ? 'Usuario agregado' : 'No se pudo agregar el usuario'}</Text> : null
            } 
        </View>
    </View>
  )
}
