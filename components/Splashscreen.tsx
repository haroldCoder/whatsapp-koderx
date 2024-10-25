import React from 'react'
import { Image, View } from 'react-native'
import wppdark from "../assets/whatsappdark.png"

export default function Splashscreen() {
    return (
        <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
            <Image style={{width: 90, height: 90}} source={wppdark} />
        </View>
    )
}
