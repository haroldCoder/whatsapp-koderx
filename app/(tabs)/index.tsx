import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import Home from '@/components/Home';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Messages from '@/components/Messages';
import LoginWap from '@/components/LoginWap';
import * as SecureStore from 'expo-secure-store';
import AddContact from '@/components/AddContact';
import axios from 'axios';
import { API_URL } from '@/config';
import Splashscreen from '@/components/Splashscreen';


const Stack = createStackNavigator();

export interface User {
  name: string,
  image: string | any,
  number: string,
  id_user_main?: number,
  id_user_add?: number,
  id_em?: number,
  id_tr?: number
}

export interface Message {
  name: string,
  image: string,
  message: any,
  number: string,
  id_em?: number,
  id_tr?: number
}

const App = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [user, setUser] = useState<Message>({ name: "", image: "", message: [], number: "" });
  const [loggin, setLoggin] = useState<boolean>(false)
  const [splash, setSplash] = useState(true)

  const getUsers = async () => {
    const res: Array<User> = (await axios.get(`${API_URL}server/api/users/contact/${await SecureStore.getItemAsync('phoneNumber')}`)).data;

    res.map((e: User, index: number) => {
      setUsers((use: User[]) => {
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

  useEffect(() => {
    const loadApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000)); 
      setSplash(false); 
    };

    loadApp();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getisLogin();
      getUsers();
    }, 1500)
    return () => clearInterval(timer)
  }, [SecureStore.getItemAsync('isLogin')])



  const getisLogin = async () => {
    const log = await SecureStore.getItemAsync('isLogin');
    if (log && log != null && SecureStore.getItemAsync('phoneNumber') != null) {
      setLoggin(true)
    }
    console.log(log);
    console.log(loggin);
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar />
        {
          splash ?
            <Splashscreen />
            :
            <NavigationContainer independent={true}>
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
                }} name="Home" component={() => <Home setUser={setUser} />} />


                <Stack.Screen options={{
                  headerStyle: {
                    backgroundColor: "#000",
                  },
                  cardStyle: { backgroundColor: 'black' }
                }} name='msg' component={() => <Messages name={user.name} id_tr={user.id_tr} id_em={user.id_em} image={user.image} message={user.message} number={user.number} />} />

                <Stack.Screen options={{
                  headerStyle: {
                    backgroundColor: "#000",
                  },
                  cardStyle: { backgroundColor: 'black' }
                }} name="addContact" component={() => <AddContact setUser={setUser} users={users} />} />
              </Stack.Navigator>


            </NavigationContainer>
        }
      </SafeAreaView>
    </SafeAreaProvider>
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