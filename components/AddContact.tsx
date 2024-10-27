import React, { Dispatch, SetStateAction, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Message, User } from "@/constants/main";
import Contacts from "./Contacts";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AddNumber from "./AddNumber";
import axios from "axios";
import { API_URL } from "@/config";
import * as SecureStore from "expo-secure-store";
import useSWR, { mutate } from "swr";

interface propaddcontact {
  setUser: Dispatch<SetStateAction<Message>>;
  setIsAddNumber: Dispatch<SetStateAction<boolean>>;
  isAddNumber: boolean;
}

const getUsers = async () => {
  const phoneNumber = await SecureStore.getItemAsync("phoneNumber");
  const res: Array<User> = (
    await axios.get(`${API_URL}server/api/users/contact/${phoneNumber}`)
  ).data;

  const users = res.map((e: User, index: number) => ({
    name: e.name,
    image: e.image,
    number: e.number,
    id_user_main: e.id_user_main,
    id_user_add: e.id_user_add,
  }));

  return users;
};

export default function AddContact({
  setUser,
  setIsAddNumber,
  isAddNumber,
}: propaddcontact) {
  const { data: users, error, isLoading} = useSWR("users", getUsers);
 
  useEffect(() => {
    if(isAddNumber){
      mutate("users")
    }
  }, [isAddNumber]);

  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",
          backgroundColor: "#222",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Icon.Button
          onPress={() => {
            navigation.navigate("Home");
          }}
          name="arrow-back"
          style={{ color: "#FFF", fontSize: 70, backgroundColor: "#222" }}
        ></Icon.Button>
        <View style={{ marginLeft: 15 }}>
          <Text style={{ color: "#FFF", fontSize: 22 }}>Contacts</Text>
          <Text style={{ color: "#FFF" }}>
            {users && users!.length} contacts
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, padding: 8 }}>
        <TouchableOpacity
          onPress={() => {
            setIsAddNumber(true);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 5,
              alignItems: "center",
              marginBottom: 25,
            }}
          >
            <Icon
              style={{
                backgroundColor: "#222",
                color: "#FFF",
                width: 60,
                height: 60,
                borderRadius: 100,
                padding: 10,
                fontSize: 40,
              }}
              name="person-add"
            />
            <Text style={{ color: "#FFF", fontSize: 22, marginLeft: 15 }}>
              New contact
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={{ color: "#FFF", margin: 10, marginBottom: 26 }}>
          Contact whatsApp
        </Text>
        <View style={styles.mainHContact}>
          {users?.map((e: User, index: number) => (
            <Contacts
              key={index}
              setuser={setUser}
              name={e.name}
              image={e.image}
              user_em={e.id_user_main}
              number={e.number}
              user_tr={e.id_user_add}
            />
          ))}
        </View>
      </View>
      {isAddNumber && <AddNumber setAddNumber={setIsAddNumber} />}
    </View>
  );
}

const styles = StyleSheet.create({
  mainHContact: {
    paddingTop: 15,
    marginLeft: 5,
    backgroundColor: "transparent",
    flex: 1,
    gap: 15,
    paddingLeft: 10,
  },
});
