import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import Colors from "../color";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from 'firebase/database';
import {StyleSheet} from 'react-native';

function LoginScreen({ navigation }) {
  const firebaseConfig = {
    
    apiKey: "AIzaSyChdnSavBPWvd43rDmQrzw4FBkfVxU2QDI",
    authDomain: "ecomreact-1a30d.firebaseapp.com",
    projectId: "ecomreact-1a30d",
    storageBucket: "ecomreact-1a30d.appspot.com",
    messagingSenderId: "151825167474",
    appId: "1:151825167474:web:0ab9c8d3c74a7c97eb3eeb",
    measurementId: "G-GQ4M03RMCQ"
  };


  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  useEffect(() => {
    initializeApp(firebaseConfig);
    const unsubscribe = getAuth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Bottom");
      }
    })
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    if (email === "" || password === "") {
      alert("Email or password cannot be empty!!!");
    } else {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then(
          saveToDB()
        ).catch(error => alert(error.message));
    }
  }

  const saveToDB = () => {
    const id = Date.now();
    const db = getDatabase();
    const reference = ref(db, "users/" + id);
    set(reference, { userId: id, email: email, userType: "user" , userProfile:"" });
  }

  const handleLogin = () => {
    if (email === "" || password === "") {
      alert("Email or password cannot be empty!!!");
    } else
      signInWithEmailAndPassword(getAuth(), email, password)
        .then().catch(error => alert(error.message));
  }

  return (
    <Box flex={1} bg={Colors.white}>
      <Box
        w="full"
        h="full"
        position="absolute"
        top="0"
        px="6"
        justifyContent="center"
      >
        <Image
        style={styles.logo}
        alt="Logo"
        resizeMode="cover"
        
        source={require("../../assets/images/cover.gif")}
      />
        
        <VStack style={styles.logininfo} space={5} pt="6">
          <Input
            InputLeftElement={
              <MaterialIcons name="email" size={20} color={Colors.main} />
            }
            variant="underlined"
            placeholder="user@gmail.com"
            w="70%"
            pl={2}
            type="text"
            color={Colors.main}
            borderBottomColor={Colors.underline}
            value={email}
            fontSize = "20"
            onChangeText={text => setEmail(text)}
          />
          <Input
            InputLeftElement={
              <Ionicons name="eye" size={20} color={Colors.main} />
            }
            fontSize = "20"
            variant="underlined"
            placeholder="*********"
            w="70%"
            type="password"
            pl={2}
            color={Colors.main}
            borderBottomColor={Colors.underline}
            value={password}
            onChangeText={text => setPassWord(text)}
          />
        </VStack>
        <Button
          _pressed={{
            bg: Colors.main,
          }}
          my={30}
          w="40%"
          rounded={50}
          bg={Colors.main}
          onPress={() => handleLogin()}
          style={styles.logBtn}
        >
          LOGIN
        </Button>
        <Pressable mt={4} onPress={() => handleSignUp()}>
          <Text color={"blue.900"}>SIGN UP</Text>
        </Pressable>
      </Box>
    </Box>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
 logo:{
    height:"15%",
 },
 logininfo:{
    alignItems:'center',
 },
 logBtn:{
  alignSelf:'center',
 }
  
});

