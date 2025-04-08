// src/components/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './bottomTab';
import FormularioHelpdesk from '../../screens/FormularioHelpdesk';
import HomeScreen from '../../screens/homeScreen';
import Grilla from '../../screens/grilla';
import TicketDetalle from '../../screens/TicketDetalle';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTab} />
      <Stack.Screen name="Formulario Helpdesk" component={FormularioHelpdesk} />
      <Stack.Screen name="homeScreen" component={HomeScreen} />
      <Stack.Screen name="grilla" component={Grilla} />
      <Stack.Screen name="TicketDetalle" component={TicketDetalle} />
    </Stack.Navigator>
  );
}
