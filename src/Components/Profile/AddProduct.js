
import { Box, FormControl, Input, ScrollView, View, VStack, } from "native-base";
import React, { useEffect, useState } from "react";
import Colors from "../../color";
import Buttone from "../Buttone";
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddProduct = () => {

  const [userType, setUserType] = useState("");
  const [pName, setPName] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pCategory, setPCategory] = useState("");
  const [pImage, setPImage] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pQuantity, setPQuantity] = useState("");

  
    const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.5,
        aspect: [3,2],
        
        
      });

      if (!result.cancelled) {
        setPImage(result.uri);
        alert(result.uri);
      } else {
        alert('You did not select any image.');
      }
  
      console.log(result.uri);
    
    }
  
  const saveProductToServer = () => {
    const id = Date.now();
    const db = getDatabase();
    const reference = ref(db, "products/" + id);
    set(reference, { pId: id, name: pName, desc: pDesc, category: pCategory, price: pPrice, imageURL: pImage, quantity: pQuantity, addedBy: getAuth().currentUser?.email })
      .then(() => resetValues())
      .catch(error => { alert(error.message) })
  }

  const resetValues = () => {
    alert("Product successfully added!!!");
    setPName("");
    setPDesc("");
    setPCategory("");
    setPImage("");
    setPPrice("");
    setPQuantity("");
  }

  return (
    <Box h="full" bg={Colors.white} px={5}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={10} mt={5} pb={10}>

          <FormControl >
            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Product name
            </FormControl.Label>
            <Input
              borderWidth={0.2}
              bg={Colors.subGreen}
              borderColor={Colors.main}
              py={4}
              type="text"
              color={Colors.black}
              fontSize={15}
              _focus={{
                bg: Colors.subGreen,
                borderColor: Colors.main,
                borderWidth: 1,
              }}
              value={pName}
              onChangeText={text => setPName(text)}
            />
          </FormControl>

          <FormControl >
            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Add product description
            </FormControl.Label>
            <Input
              borderWidth={0.2}
              bg={Colors.subGreen}
              borderColor={Colors.main}
              py={4}
              type="text"
              color={Colors.black}
              fontSize={15}
              _focus={{
                bg: Colors.subGreen,
                borderColor: Colors.main,
                borderWidth: 1,
              }}
              value={pDesc}
              onChangeText={text => setPDesc(text)}
            />
          </FormControl>

          <FormControl >
            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Please enter category name, product belongs to
            </FormControl.Label>
            <Input
              borderWidth={0.2}
              bg={Colors.subGreen}
              borderColor={Colors.main}
              py={4}
              type="text"
              color={Colors.black}
              fontSize={15}
              _focus={{
                bg: Colors.subGreen,
                borderColor: Colors.main,
                borderWidth: 1,
              }}
              value={pCategory}
              onChangeText={text => setPCategory(text)}
            />
          </FormControl>

          <FormControl >
            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Price of Product
            </FormControl.Label>
            <Input
              borderWidth={0.2}
              bg={Colors.subGreen}
              borderColor={Colors.main}
              py={4}
              type="number"
              color={Colors.black}
              fontSize={15}
              _focus={{
                bg: Colors.subGreen,
                borderColor: Colors.main,
                borderWidth: 1,
              }}
              value={pPrice}
              onChangeText={text => setPPrice(text)}
            />
          </FormControl>

          <FormControl >
            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              URL to pproduct image
            </FormControl.Label>
            <Buttone bg={Colors.main} color={Colors.white}
            onPress={() => pickImageAsync()}>
            Add Product Image
          </Buttone>
          </FormControl>

          <FormControl >
            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Available quantity of product
            </FormControl.Label>
            <Input
              borderWidth={0.2}
              bg={Colors.subGreen}
              borderColor={Colors.main}
              py={4}
              type="number"
              color={Colors.black}
              fontSize={15}
              _focus={{
                bg: Colors.subGreen,
                borderColor: Colors.main,
                borderWidth: 1,
              }}
              value={pQuantity}
              onChangeText={text => setPQuantity(text)}
            />
          </FormControl>

          <Buttone bg={Colors.main} color={Colors.white}
            onPress={() => saveProductToServer()}>
            Add Product
          </Buttone>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  error: {
    marginHorizontal: 20,
    textAlignVertical: "center",
    textAlign: "center",
    marginTop: 200,
    fontSize: 20,
  },
});