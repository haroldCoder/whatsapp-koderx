import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ImageSourcePropType, StatusBar, StyleSheet, View } from 'react-native';
import Home from './components/Home';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Messages from './components/Messages';
import userimg from './assets/user.png'
import nft from './assets/nft.png'
import LoginWap from './components/LoginWap';
import * as SecureStore from 'expo-secure-store';


const Stack = createStackNavigator();

export interface User{
  name: string,
  image: ImageSourcePropType,
  number?: string,
  message: string[]
}

const App = ()=>{
  const [users, setUsers] = useState<Array<User>>([]);
  const [user, setUser] = useState<User>({name: "", image: userimg, message: []});
  const loggin = useRef<boolean>(false)

  useMemo(()=>{
    setUsers((us: User[])=>{
      getisLogin();
      if(us)
        us.push({
          name: "Harold",
          image: userimg,
          number: "3006397804",
          message: ["Last msg"],
        });

        us.push({
          "name": "Luis",
          "image": nft,
          "message": ["Ey Harold que tal!", "Parcero me puedes ayudar a terminar un trabajo?"]
        })
        return us;
      })
      
      
  }, [1]);

  useEffect(()=>{

  })

  const getisLogin = async() =>{
    const log = await SecureStore.getItemAsync('isLogin');
    if(log){
      loggin.current = true
    }
  }
  console.log(users);
  return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
            {
              loggin.current ?
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
            }} name="Home" component={()=> <Home setUser={setUser} users={users}/> } />
            
            
            <Stack.Screen options={{
              headerStyle: {
                backgroundColor: "#000",
              },
              cardStyle: { backgroundColor: 'black' }
            }} name='msg' component={()=> <Messages name={user.name} image={user.image} message={user.message} />} /> 
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "black"
  },
});

export default App;