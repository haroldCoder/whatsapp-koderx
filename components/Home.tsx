import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet, View } from 'react-native'
import Contacts from './Contacts'
import { User } from '../App'
import Head from './Head';

interface propHome{
  setUser: Dispatch<SetStateAction<User>>,
  users: User[]
}

export default function Home({setUser, users}: propHome) {
  console.log(users);
  
  return (
    <>
      <Head />
      <View style={styles.mainHome}>
        {
          users?.map((e)=>(
            <Contacts setuser={setUser} name={e.name} image={e.image} message={e.message} />
          ))
        }  
      </View>
    </>
  )
}

const styles = StyleSheet.create({
    mainHome: {
        paddingTop: 15,
        marginLeft: 5,
        backgroundColor: "transparent"
    }
})
