import {
  Box,
  FlatList,
  HStack,
  Heading,
  Image,
  Pressable,
  Text,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, onValue } from 'firebase/database';
import { StyleSheet, TextInput } from 'react-native';
import { getAuth } from "firebase/auth";
import { FontAwesome5 } from '@expo/vector-icons';


function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [userName,setUserName] = useState("");
  const [pImage, setPImage] = useState("https://res.cloudinary.com/zpune/image/upload/v1645429478/random/user_u3itjd.png");
 
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

  const SubTaskData = () =>{
   
    const db = getDatabase();
    const reference = ref(db, "users/");
    onValue(reference, (snapshot) => {
      snapshot.forEach(function (childSnapshot){
        const ProjectData = childSnapshot.val();
        if(ProjectData.email === getAuth().currentUser?.email){
            setPImage(ProjectData.userProfile);
            setUserName(ProjectData.userFname);
          }
        });
        console.log(pImage);
          
      });
     
  
    
  }

  useEffect(() => {
    getProductsFromDB();
    SubTaskData();
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
        px={7}
        bg={Colors.main}
        py={1}
        alignItems="center"
        safeAreaTop
      >

    <View style={styles.Header}>
      <View style={styles.logo}>
      <Text style={styles.appName}>ECOM</Text> 
      <FontAwesome5 name="opencart" size={24} color="black" /> 
      </View>
   
      <View style={styles.avatarContainer1} >
            <Pressable onPress={()=> navigation.navigate("UserProfile")}>
              <Image
                source={{
                  uri: pImage,
                }}
                alt="profile"
                style={styles.productIMG1}
                resizeMode="cover"
              />
              
              </Pressable>
      </View>
    </View>    
      
       
      </HStack>

      
      
      <View style={styles.mainpage}>
        
        
         
          {( products != null && products.length > 0 ?
          <View>
               <TextInput 
                  style = {styles.textBoxes}
                  value={query}
                  onChangeText={text => onSearchTextChanged(text)}
                  placeholder="Enter category name to find products"
               />
              <FlatList
                contentContainerStyle={{ alignSelf: 'flex-start' }}
                numColumns={2}
                data={products}
                style={styles.flatlist}
                renderItem={renderItem}
                keyExtractor={item => item.pId}
              ></FlatList>
          </View>
              :
              <View>
              <TextInput 
                  style = {styles.textBoxes}
                  value={query}
                  onChangeText={text => onSearchTextChanged(text)}
                  placeholder="Enter category name to find products"
               />
              <Text style={styles.text}>No products exists matching your searched criteria!!! </Text>
              </View>
              
              )}
       
       
       
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
    width:90,
    height:90,
    borderRadius: 20,
    borderWidth:0.4,
    borderColor:'black',
    
  },
  avatarContainer:{
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    height:70,
    width:70,
    justifyContent:'center',
    alignSelf:'center',
    marginBottom:20,
  },
  avatarContainer1:{
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    height:80,
    width:80,
    justifyContent:'center',
    alignSelf:'center',
    marginBottom:20,
  },
  productIMG1:{
    width:70,
    height:70,
    borderRadius: 50,
    borderWidth:0.4,
    borderColor:'black',
    alignSelf:'center',
    
  },
 
  productBox:{
    width:'50%',
    
    paddingTop:7,
    paddingLeft:7,
    marginBottom:-17,
  },
  
  productIMG:{
    width:50,
    height:50,
    borderRadius: 50,
    alignSelf:'center',
    
  },
  avatarContainer:{
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    height:60,
    width:60,
    justifyContent:'center',
    alignSelf:'center',
    borderColor:'gray',
    borderWidth:1,
    marginTop:'3%',
   
  },
  textBoxes: {
    width: "90%", 
    fontSize: 18,
    marginTop:10,
    borderColor: 'gray', 
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf:'center',
    padding:10,

    },
    Header:{
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    appName:{
      
      fontSize:20,
      fontWeight:'300',
      alignSelf:'center',
      marginRight:7,
      marginTop:3,
    },
    logo:{
      flexDirection:'row',
      alignItems:'center',
    },
    flatlist:{
      height:'100%',
    },
  
});
