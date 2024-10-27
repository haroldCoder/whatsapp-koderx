import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import Home from "@/components/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Messages from "@/components/Messages";
import LoginWap from "@/components/LoginWap";
import AddContact from "@/components/AddContact";
import Splashscreen from "@/components/Splashscreen";
import { User, Message } from "@/constants/main";
import * as SecureStore from "expo-secure-store";

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState<Message>({
    name: "",
    image: "",
    message: [],
    number: "",
  });
  const [loggin, setLoggin] = useState<boolean>(false);
  const [splash, setSplash] = useState(true);
  const [isAddNumber, setIsAddNumber] = useState<boolean>(false);

  useEffect(() => {
    const loadApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSplash(false);
    };

    loadApp();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getisLogin();
    }, 1500);
    return () => clearInterval(timer);
  }, [SecureStore.getItemAsync("isLogin")]);

  const getisLogin = async () => {
    const log = await SecureStore.getItemAsync("isLogin");
    if (log && log != null && SecureStore.getItemAsync("phoneNumber") != null) {
      setLoggin(true);
    }
    console.log(log);
    console.log(loggin);
  };
  return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar />
          {splash ? (
            <Splashscreen />
          ) : (
            <NavigationContainer independent={true}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                {!loggin ? (
                  <Stack.Screen
                    options={{
                      headerStyle: {
                        backgroundColor: "#000",
                      },
                      cardStyle: { backgroundColor: "black" },
                    }}
                    name="Login"
                    component={LoginWap}
                  />
                ) : null}

                <Stack.Screen
                  options={{
                    headerStyle: {
                      backgroundColor: "#000",
                    },
                    cardStyle: { backgroundColor: "black" },
                  }}
                  name="Home"
                  component={() => <Home setUser={setUser} />}
                />

                <Stack.Screen
                  options={{
                    headerStyle: {
                      backgroundColor: "#000",
                    },
                    cardStyle: { backgroundColor: "black" },
                  }}
                  name="msg"
                  component={() => (
                    <Messages
                      name={user.name}
                      id_tr={user.id_tr}
                      id_em={user.id_em}
                      image={user.image}
                      message={user.message}
                      number={user.number}
                    />
                  )}
                />

                <Stack.Screen
                  options={{
                    headerStyle: {
                      backgroundColor: "#000",
                    },
                    cardStyle: { backgroundColor: "black" },
                  }}
                  name="addContact"
                  component={() => (
                    <AddContact
                      setUser={setUser}
                      isAddNumber={isAddNumber}
                      setIsAddNumber={setIsAddNumber}
                    />
                  )}
                />
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  safeArea: {
    flex: 1,
  },
});

export default App;
