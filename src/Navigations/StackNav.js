import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import SingleProductScreen from "../Screens/SingleProductScreen";
import ShippingScreen from "../Screens/ShippingScreen";
import PaymentScreen from "../Screens/PaymentScreen";
import PlaceOrderScreen from "../Screens/PlaceOrderScreen";
import BoughtProducts from "../Screens/BoughtProducts";
import ProductSaleStatus from "../Screens/ProductSaleStatus";
import UserProfile from "../Screens/UserProfile";
import { Button } from "react-native";
import { getAuth } from "firebase/auth";

const Stack = createNativeStackNavigator();
const StackNav = ({navigation}) => {

  const logout = () => {
    getAuth().signOut().then(() => {
      navigation.replace("Login");
    }).catch(error => { alert(error.message) });
  }
  

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Single" component={SingleProductScreen} />
      <Stack.Screen name="Shipping" component={ShippingScreen} />
      <Stack.Screen name="Checkout" component={PaymentScreen} />
      <Stack.Screen name="Placeorder" component={PlaceOrderScreen} />
      <Stack.Screen name="BoughtProducts" component={BoughtProducts} />
      <Stack.Screen name="ProductSaleStatus" component={ProductSaleStatus} />
      <Stack.Screen name="UserProfile" component={UserProfile}
            options={{
              headerRight: () => (
                <Button
                  onPress={() => logout()}
                  title="Logout"
                  color='red'
                />
              ),
              headerShown: true,
              title: 'User Profile',
              headerStyle: {
                backgroundColor: '#ADD8E6',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
      
      
      
      />
    </Stack.Navigator>
  );
};

export default StackNav;
