import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTab from './src/components/navigation/bottomTab';
import { login } from './src/screens/login';
import FormularioHelpdesk from './src/screens/FormularioHelpdesk';
import homeScreen from './src/screens/homeScreen';

const Stack = createNativeStackNavigator();


const MyStack = () => {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#2c3e50" barStyle="light-content" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={login} 
            options ={{
              title: "LOGIN",
              headerTintColor :"white",
              headertitleAling:"center",
              headerStyle: {backgroundColor:"#3498db"},
            
          }}
          />
          <Stack.Screen name="Formulario Helpdesk" component={FormularioHelpdesk} />
          <Stack.Screen name="homeScreen" component={homeScreen}/>
          
        </Stack.Navigator>
        <BottomTab />
      </View>
    </NavigationContainer>
  );
};

export default MyStack;
