import React ,{useEffect, useState} from "react";
import Colors from "../color";
import Buttone from "../Components/Buttone";
import { getAuth } from "firebase/auth";
import {StyleSheet , TextInput ,TouchableHighlight} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, onValue , update, set } from 'firebase/database';
import { useIsFocused } from "@react-navigation/native";
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


export default function UserProfile() {

const [id , setId] = useState();
const [pImage, setPImage] = useState("https://res.cloudinary.com/zpune/image/upload/v1645429478/random/user_u3itjd.png");
const [userFName , setUserFName] = useState("");
const [userLName , setUserLName] = useState("");
const [ mobileNo , setMobileNo] = useState("");
const userEmail = getAuth().currentUser?.email;

const focus = useIsFocused(); 
  
useEffect(() => {
    if(focus == true){
  SubTaskData();
    }
}, [focus]);

 
  

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [5, 4],
    });

    if (!result.cancelled) {
      setPImage(result.uri);
      alert(result.uri);
      
    } else {
      alert('You did not select any image.');
    }
    
 } 

  



  const SubTaskData = () =>{
   
    const db = getDatabase();
    const reference = ref(db, "users/");
    onValue(reference, (snapshot) => {
      snapshot.forEach(function (childSnapshot){
        const ProjectData = childSnapshot.val();
        if(ProjectData.email === getAuth().currentUser?.email){
            setPImage(ProjectData.userProfile);
            setId(ProjectData.userId);
            console.log(id);
          }
        });
       

          
      });
    }

    const setUserProfile = () =>{
        const db = getDatabase();
      
          update(ref(db, 'users/' + id), {
            
                      userId:id,         
                      userProfile:pImage,
                      userFname:userFName,
                      userLname:userLName,
                      userMobile:mobileNo,
                      
                    }).then(() => {
                    alert('Data Updated!!');  
                    })  
                  .catch((error) => {
                          // The write failed...
                          alert(error);
                      });
      
       }

 

  

  return (
    
    <View>
      
      

    <View>
        <View style={styles.avatarContainer} >
            <Pressable onPress={()=> pickImageAsync()}>
              <Image
                source={{
                  uri: pImage,
                }}
                alt="profile"
                style={styles.productIMG}
                resizeMode="cover"
              />
              
              </Pressable>
        </View>
        <View>
            <Text style={styles.label}>First Name</Text>
            <TextInput
            style={styles.textBoxes}
            placeholder=" Task Name.... "
            value={userFName}
            onChangeText={ (v) => setUserFName(v)}
            />

        </View>
        <View>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
            style={styles.textBoxes}
            placeholder=" Task Name.... "
            value={userLName}
            onChangeText={ (v) => setUserLName(v)}
            />

        </View>
        <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
            style={styles.textBoxes}
            placeholder=" Task Name.... "
            value={userEmail}
        
            editable = {false}
            />

        </View>
        <View>
            <Text style={styles.label}>Contanct Number</Text>
            <TextInput
            style={styles.textBoxes}
            placeholder=" Task Name.... "
            value={mobileNo}
            onChangeText={ (v) => setMobileNo(v)}
            />

        </View>
        <TouchableHighlight
            style={styles.submit}
            onPress={() => setUserProfile()}
            underlayColor='#fff'>
              <Text style={styles.submitText}>SUBMIT</Text>
          </TouchableHighlight>
    </View>    
      
       
     
      
    </View>
    
        
        

     
      
      
  );
}


const styles = StyleSheet.create({
  text: {
      margin: 20,
      fontSize: 13,
      fontWeight: "bold",
  },
  productIMG:{
    width:100,
    height:100,
    borderRadius: 50,
    borderWidth:0.4,
    borderColor:'black',
    
  },
  avatarContainer:{
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    height:100,
    width:100,
    justifyContent:'center',
    marginTop:10,
    alignSelf:'center',
   
  },
  label:{
    padding:5,
    marginLeft:"15%",
    fontWeight:'bold',
    alignSelf:'flex-start',
    color:'gray',
  },
  textBoxes: {
    width: 300, 
    fontSize: 15,
    padding: 15,
    borderColor: "#ADD8E6", 
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom:10,
    marginLeft:10,
    backgroundColor: '#B0E0E6', 
    alignSelf:'center',
    },
    submit: {
        marginTop:10,  
        marginRight: 40,
        marginLeft: 50,
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: '#B0E0E6',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#B0E0E6',
        height:50,
        
      },
      submitText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight:'bold',
       
      },

 
});
