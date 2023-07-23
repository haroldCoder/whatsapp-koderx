import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ImageSourcePropType, StatusBar, StyleSheet, View } from 'react-native';
import Home from './components/Home';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Messages from './components/Messages';
import LoginWap from './components/LoginWap';
import * as SecureStore from 'expo-secure-store';
import AddContact from './components/AddContact';
import axios from 'axios';
import { API_URL } from './config';


const Stack = createStackNavigator();

export interface User{
  name: string,
  image: string | any,
  number: string,
  id_user_main?: number,
  id_user_add?: number,
  id_em?: number,
  id_tr?: number
}

export interface Message{
  name: string,
  image: string,
  message: any,
  number: string
}

const App = ()=>{
  const [users, setUsers] = useState<Array<User>>([]);
  const [user, setUser] = useState<Message>({name: "", image: "", message: [], number: ""});
  const [loggin, setLoggin] = useState<boolean>(false)

  const getUsers = async() =>{
    const res : Array<User> = (await axios.get(`${API_URL}server/api/users/contact/${await SecureStore.getItemAsync('phoneNumber')}`)).data;
    
    res.map((e: User, index: number)=>{
      setUsers((use: User[])=>{
        use[index] = {
          name: e.name,
          image: e.image,
          number: e.number,
          id_user_main: e.id_user_main,
          id_user_add: e.id_user_add
        }
        return use;
    })
    })    
  }


  useEffect(()=>{
    const timer = setTimeout(()=>{
      getisLogin();
      getUsers();
    }, 1500)
    return ()=>clearInterval(timer)
  }, [])

  const getisLogin = async() =>{
    const log = await SecureStore.getItemAsync('isLogin');
    if(log && log != null && SecureStore.getItemAsync('phoneNumber') != null){
      setLoggin(true)
    }
    console.log(log);
    console.log(loggin);
  }
  return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
            {
              !loggin ?
              <Stack.Screen options={{
              headerStyle: {
                backgroundColor: "#000",
              },
              cardStyle: { backgroundColor: 'black' }
            }} name='Login' component={LoginWap} />
            : null
            }
            

            <Stack.Screen options={{
              headerStyle: {
                backgroundColor: "#000",
              },
              cardStyle: { backgroundColor: 'black' }
            }} name="Home" component={()=> <Home setUser={setUser} />} />
            
            
            <Stack.Screen options={{
              headerStyle: {
                backgroundColor: "#000",
              },
              cardStyle: { backgroundColor: 'black' }
            }} name='msg' component={()=> <Messages name={user.name} image={user.image} message={user.message} number={user.number} />} /> 

            <Stack.Screen options={{
              headerStyle: {
                backgroundColor: "#000",
              },
              cardStyle: { backgroundColor: 'black' }}} name="addContact" component={()=> <AddContact setUser={setUser} users={users} />} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  safeArea: {
    flex: 1,
  },
});

export default App;