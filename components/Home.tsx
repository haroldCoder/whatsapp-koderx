import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Contacts from "./Contacts";
import { User, Message } from "@/constants/main";
import Head from "./Head";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../config";
import * as SecureStore from "expo-secure-store";
import useSWR from "swr";

interface propHome {
  setUser: Dispatch<SetStateAction<Message>>;
}

export default function Home({ setUser }: propHome) {
  const navigation = useNavigation<any>();
  const getMessageMe = async () => {
    try {
      const res: Array<User> = await (
        await axios.get(
          `${API_URL}server/api/messages/${await SecureStore.getItemAsync(
            "phoneNumber"
          )}`
        )
      ).data;
      
      const updatedUsers = res.map((e: User) => ({
        name: e.name,
        image: e.image,
        number: e.number,
        id_user_main: e.id_em,
        id_user_add: e.id_tr,
      }));

      return updatedUsers;
    } catch (err) {
      console.log(err);
    }
  };
  
  const {data: users, isLoading} = useSWR("msgs_me", getMessageMe,{
    refreshInterval: 1000,
  });

  return (
    !isLoading &&
    <View style={{ flex: 1 }}>
      <Head />
      <View style={styles.mainHome}>
        {users!.map((e: User) => (
          <Contacts
            key={e.number}
            setuser={setUser}
            number={e.number}
            name={e.name}
            user_em={e.id_user_main}
            user_tr={e.id_user_add}
            image={e.image}
          />
        ))}
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: "85%",
            width: "100%",
            justifyContent: "flex-end",
            paddingRight: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("addContact");
            }}
          >
            <Icon
              name="comment"
              style={{
                backgroundColor: "#333",
                padding: 10,
                borderRadius: 100,
                fontSize: 40,
                color: "#FFF",
              }}
            ></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainHome: {
    paddingTop: 15,
    marginLeft: 5,
    backgroundColor: "transparent",
    flex: 1,
    gap: 15,
    paddingLeft: 10,
  },
});
