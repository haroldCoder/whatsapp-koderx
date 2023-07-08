import React from 'react'
import whatsApp from '../assets/whatsapp96.png';
import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native';
import camera from '../assets/camara.png';
import search from '../assets/busqueda.png';
import menu from '../assets/menu.png';


export default function Head() {
  return (
    <View style={{display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#222", justifyContent: "space-between", padding: 10}}>
      <View>
        <Image source={whatsApp} style={styles.imgcover} />
      </View>
      <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: '30%'}}>
        <Image source={camera} style={styles.camera} />
        <Image source={search} style={styles.camera} />
        <Image source={menu} style={styles.camera} />
      </View>
    </View>  
  )
}

const styles = StyleSheet.create({
  imgcover: {
    width: 50,
    height: 50
  },
  camera: {
    width: 26,
    height: 26,
  }
})