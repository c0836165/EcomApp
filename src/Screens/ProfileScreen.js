import { Center, Heading, Image, Text } from "native-base";
import React ,{useEffect, useState} from "react";
import Colors from "../color";
import Tabs from "../Components/Profile/Tabs";
import { getAuth } from "firebase/auth";
import { Button, Pressable, View ,StyleSheet} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, onValue , update, set } from 'firebase/database';
import { useIsFocused } from "@react-navigation/native";

// import { createDrawerNavigator } from "@react-navigation/drawer";
// import Orders from "../Components/Profile/Orders";
// import AddProduct from "../Components/Profile/AddProduct";
// import MyProducts from "../Components/Profile/MyProducts";
// import ManageOrders from "../Components/Profile/ManageOrders";

// const Drawer = createDrawerNavigator();

function ProfileScreen({ navigation }) {

  const [isAdmin , setIsAdmin] = useState(true);

  const [id , setId] = useState("");
  const userName = useState(getAuth().currentUser?.email);
  const [pImage, setPImage] = useState("https://res.cloudinary.com/zpune/image/upload/v1645429478/random/user_u3itjd.png");

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

 const setUserProfile = () =>{
  const db = getDatabase();

    update(ref(db, 'users/' + id), {
      
                userId:id,         
                userProfile:pImage,
                
              }).then(() => {
              alert('Image Uploaded');  
              })  
            .catch((error) => {
                    // The write failed...
                    alert(error);
                });

 }





  const SubTaskData = () =>{
   
  const db = getDatabase();
  const reference = ref(db, "users/");
  onValue(reference, (snapshot) => {
    snapshot.forEach(function (childSnapshot){
      const ProjectData = childSnapshot.val();
      if(ProjectData.email === getAuth().currentUser?.email){
          setId(ProjectData.userId);
          setPImage(ProjectData.userProfile);
          console.log(ProjectData.userId);
        }
      });
        
    });
   

  
}

  const logout = () => {
    getAuth().signOut().then(() => {
      navigation.replace("Login");
    }).catch(error => { alert(error.message) });
  }

  return (
    <>
      <Center bg={Colors.main} pt={10} pb={6}>
       
       
      <View style={styles.avatarContainer} >
      <Pressable onPress={()=>pickImageAsync()}>
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
        
       
   
       
        <Heading bold fontSize={15} isTruncated my={2} color={Colors.white}>
         {userName}
        </Heading>
        <Button
          onPress={() => setUserProfile()}
          title="Save Profile"
          color={Colors.red}
        />
        <Button
          onPress={() => logout()}
          title="Logout"
          color={Colors.red}
        />
      </Center>
      <Tabs />
    </>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({

  productIMG:{
    width:90,
    height:90,
    borderRadius: 50,
    alignSelf:'center',
    
  },
  avatarContainer:{
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    height:100,
    width:100,
    justifyContent:'center',
    marginTop:10,
    alignSelf:'center',
    borderColor:'gray',
    borderWidth:1,
   
  },

  
});
