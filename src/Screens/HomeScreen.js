import {
  Box,
  FlatList,
  Flex,
  HStack,
  Heading,
  Image,
  Pressable,
  Text,
  Input,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, onValue } from 'firebase/database';
import { StyleSheet } from 'react-native';


function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [query, setQuery] = useState("");

  const getProductsFromDB = () => {
    const db = getDatabase();
    const reference = ref(db, "products/");
    onValue(reference, (snapshot) => {
      const temp = [];
      snapshot.forEach(function (childSnapshot) {
        temp.push(childSnapshot.val());
      });
      setProducts(temp);
      setAllProducts(temp);
    });
  }

  const onSearchTextChanged = (text) => {
    const temp = [];
    setQuery(text);
    allProducts.forEach(function (childSnapshot) {
      if (childSnapshot.category.toLowerCase().includes(text.toLowerCase())) {
        temp.push(childSnapshot);
      }
    });
    setProducts(temp);
  }

  useEffect(() => {
    getProductsFromDB();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.productBox}>
    <Pressable
      onPress={() => navigation.navigate("Single", item)}
      key={item.pId}
      w="180"
      marginRight={4}
      bg={Colors.white}
      rounded="md"
      shadow={2}
      pt={0.3}
      my={3}
      pb={2}
    
    >
      
      <View style={styles.avatarContainer} >
        <Image
        style={styles.productIMG}
        alt="https://res.cloudinary.com/zpune/image/upload/v1645429478/random/user_u3itjd.png"
        source={{ uri: item.imageURL }}
        resizeMode="contain" />
      </View>
      <Box px={4} pt={1}>
        <Heading size="sm" bold>
          ${item.price}
        </Heading>
        <Text fontSize={10} mt={1} isTruncated w="full">
          {item.name}
        </Text>
      </Box>
      
    </Pressable>
    </View>
  );

  return (
    
    <View>
      
      <HStack
        space={3}
        w="full"
        px={6}
        bg={Colors.main}
        py={4}
        alignItems="center"
        safeAreaTop
      >
        <Input
          value={query}
          onChangeText={text => onSearchTextChanged(text)}
          placeholder="Enter category name to find products"
          w="100%"
          bg={Colors.white}
          type="search"
          variant="filled"
          h={12}
          borderWidth={0}
          _focus={{
            bg: Colors.white,
          }}
        />
      </HStack>

      
      
      <View style={styles.mainpage}>
        
        
         
          {( products != null && products.length > 0 ?
          <View>
              <FlatList
                contentContainerStyle={{ alignSelf: 'flex-start' }}
                numColumns={2}
                
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.pId}
              ></FlatList>
          </View>
              :
              <Text style={styles.text}>No products exists matching your searched criteria!!! </Text>)}
       
       
       
      </View>
      
      </View>

    
     
      
      
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
      margin: 20,
      fontSize: 13,
      fontWeight: "bold",
  },
  productIMG:{
    width:150,
    height:70,
    borderRadius: 20,
    borderWidth:0.4,
    borderColor:'black',
    
  },
  avatarContainer:{
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    height:70,
    width:105,
    justifyContent:'center',
    marginTop:10,
    alignSelf:'center',
   
  },
 
  productBox:{
    width:'50%',
    
    paddingTop:7,
    paddingLeft:7,
    marginBottom:-17,
  },
  mainpage:{
   
  },
  
});
