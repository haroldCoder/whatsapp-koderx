import axios from 'axios'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Button } from 'react-native-paper'
import { API_URL } from '../config';
import * as SecureStore from 'expo-secure-store';

interface Props{
    setAddNumber: Dispatch<SetStateAction<boolean>>
}

export default function AddNumber({setAddNumber}: Props) {
    const [isAdded, setIdAdded] = useState<boolean>(false);
    const idUser = useRef<number[]>([]);
    const [number, setNumber] = useState<string>("");
    const [msg, setMsg] = useState<boolean>(false)

    const AddContact = async() =>{
        
        await axios.get(`${API_URL}server/api/userid/${await SecureStore.getItemAsync('phoneNumber')}`)
        .then(async(id : number | any)=>{
            idUser.current[0] = id.data.id;
            
            await axios.get(`${API_URL}server/api/userid/${number}`)
            .then((id: number | any) =>{
                idUser.current[1] = id.data.id;
                axios.post(`${API_URL}server/api/users/contact`,{
                    user_main: idUser.current[0], 
                    user_add: idUser.current[1]
                })
                .then(()=>{
                    setIdAdded(true)
                })
                .catch((err)=>{
                    setIdAdded(false);
                    console.log(idUser.current[0], idUser.current[1]); 
                    
                })
            })
            .catch((err)=>{
                setIdAdded(false); 
                
            }) 
        })
        .catch((err)=>{
            setIdAdded(false);
            console.log(err); 
        })
        setMsg(true)
        setTimeout(()=>{
          setAddNumber(false)  
        },2000)
        
    }

  return (
    <View style={{position: "absolute", width: "70%", top: "15%", left: "20%", backgroundColor: "#222", padding: 18, borderRadius: 18}}>
        <Text style={{color: "#FFF", fontSize: 18}}>Number</Text>
        <TextInput onChange={(event: any)=>{setNumber(event.nativeEvent.text)}} style={{borderBottomColor: "#AAA", color: "#FFF", marginTop: 20, borderBottomWidth: 1, fontSize: 15}} placeholder='Number of contact' />
        <Button onPress={AddContact} style={{marginTop: 40, backgroundColor: "#FFF", borderRadius: 10,}}><Text style={{color: "#555", fontSize: 15}}>Add Contact</Text></Button>
        <View>
            {
                msg ?
               <Text style={{color: isAdded ? "#0F0" : "#F00", margin: 10}}>{isAdded ? 'Usuario agregado' : 'No se pudo agregar el usuario'}</Text> : null
            } 
        </View>
    </View>
  )
}
