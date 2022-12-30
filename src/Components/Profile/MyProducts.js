import {
    Box,
    FlatList,
    Flex,
    Heading,
    Image,
    Pressable,
    Text,
} from "native-base";
import React, { useEffect, useState } from "react";
import Colors from "../../color";
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { Button , View , StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';

const MyProducts = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);

    const getProductsFromDB = () => {
        const db = getDatabase();
        const reference = ref(db, "products/");
        onValue(reference, (snapshot) => {
            const temp = [];
            snapshot.forEach(function (childSnapshot) {
                if (childSnapshot.val().addedBy === getAuth().currentUser?.email) {
                    temp.push(childSnapshot.val());
                }
            });
            setProducts(temp);
        });
    }

    const removeFromDB = (pId) => {
        const db = getDatabase();
        remove(ref(db, "products/" + pId));
        alert("Item removed");
        getProductsFromDB();
    }

    useEffect(() => {
        getProductsFromDB()
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.productBox}>
        <Pressable
            style={styles.Box}
            onPress={() => navigation.navigate("ProductSaleStatus", item)}
            key={item.pId}
            bg={Colors.deepGray}
        >
            

        <View style={styles.list}>    
            <View style={styles.avatarContainer} >
                <Image
                style={styles.productIMG}
                alt="https://res.cloudinary.com/zpune/image/upload/v1645429478/random/user_u3itjd.png"
                source={{ uri: item.imageURL }}
                resizeMode="contain" />
            </View>
            <View style={styles.PDetails}>
                <View>
                    <Text style={styles.INstock}>InStock- {item.quantity}</Text>
                    <Text>{item.name}</Text>
                </View>
            </View>
            <View style={styles.delete}>
                        <Pressable onPress={() => removeFromDB(item.pId)}>
                        <MaterialIcons name="delete" size={30} color={Colors.red} />
                        </Pressable>
                </View>
            </View>
            
        </Pressable>
        </View>
    );

    return (
        <View>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.pId}
            />
            
        </View>  
       
    );
};

export default MyProducts;

const styles = StyleSheet.create({
   
    productBox:{
      width:'100%'
    
    },
    Box:{
     width:'95%',
     backgroundColor:'white',
     borderWidth:0.4,
     borderRadius:20,
     padding:5,
     marginTop:5,
     marginLeft:'2%',
     
    },
    PDetails:{
       flexDirection:'column',
       width:'60%',
       alignItems:'flex-start',
       padding:10,
    },
    list:{
        flex:1,
        flexDirection:'row',
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
        alignSelf:'center',
    },
    delete:{
        alignSelf:'center',
    },
    INstock:{
        fontWeight:'bold',
    },
    
  });
  

