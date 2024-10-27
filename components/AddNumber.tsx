import axios from "axios";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  BackHandler,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";
import { API_URL } from "../config";
import * as SecureStore from "expo-secure-store";
import wppdark from "@/assets/whatsappdark.png";

interface Props {
  setAddNumber: Dispatch<SetStateAction<boolean>>;
}

export default function AddNumber({ setAddNumber }: Props) {
  const [isAdded, setIdAdded] = useState<boolean>(false);
  const idUser = useRef<number[]>([]);
  const [number, setNumber] = useState<string>("");
  const [msg, setMsg] = useState<boolean>(false);

  useEffect(() => {
    const onBackPress = () => {
      setAddNumber(false);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => backHandler.remove();
  }, []);

  const AddContact = async () => {
    await axios
      .get(
        `${API_URL}server/api/userid/${await SecureStore.getItemAsync(
          "phoneNumber"
        )}`
      )
      .then(async (id: number | any) => {
        idUser.current[0] = id.data.id;

        await axios
          .get(`${API_URL}server/api/userid/${number}`)
          .then((id: number | any) => {
            idUser.current[1] = id.data.id;
            axios
              .post(`${API_URL}server/api/users/contact`, {
                user_main: idUser.current[0],
                user_add: idUser.current[1],
              })
              .then(() => {
                setIdAdded(true);
                setMsg(true);
                setTimeout(() => {
                  setAddNumber(false);
                }, 1000);
              })
              .catch((err) => {
                setIdAdded(false);
                setMsg(true);
                console.log(idUser.current[0], idUser.current[1]);
              });
          })
          .catch((err) => {
            setIdAdded(false);
          });
      })
      .catch((err) => {
        setIdAdded(false);
        console.log(err);
      });
  };

  return (
    <Pressable
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => setAddNumber(false)}
    >
      <Pressable onPress={(e) => e.stopPropagation()}>
        <View
          style={{
            backgroundColor: "#FFFFFF80",
            height: 400,
            width: 280,
            padding: 18,
            borderRadius: 18,
            justifyContent: "space-between",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image source={wppdark} style={{ width: 60, height: 60 }} />
          </View>
          <TextInput
            onChange={(event: any) => {
              setNumber(event.nativeEvent.text);
            }}
            style={{
              borderBottomColor: "#AAA",
              color: "#FFF",
              marginTop: 20,
              borderBottomWidth: 1,
              fontSize: 15,
            }}
            placeholderTextColor={"#FFFFFFBB"}
            placeholder="Number of contact"
            keyboardType="phone-pad"
          />
          <Button
            onPress={AddContact}
            style={{ marginTop: 40, backgroundColor: "#FFF", borderRadius: 10 }}
          >
            Add Contact
          </Button>
          <View>
            {msg ? (
              <Text style={{ color: isAdded ? "#0F0" : "#F00", margin: 10 }}>
                {isAdded ? "Usuario agregado" : "No se pudo agregar el usuario"}
              </Text>
            ) : null}
          </View>
        </View>
      </Pressable>
    </Pressable>
  );
}
