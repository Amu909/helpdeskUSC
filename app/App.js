import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import NewTicketScreen from './screens/NewTicketScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [screenProps, setScreenProps] = useState({});

  const navigate = (screenName, props = {}) => {
    setCurrentScreen(screenName);
    setScreenProps(props);
  };

  const renderScreen = () => {
    switch(currentScreen) {
      case 'Home':
        return <HomeScreen navigate={navigate} {...screenProps} />;
      case 'NewTicket':
        return <NewTicketScreen navigate={navigate} {...screenProps} />;
      default:
        return <HomeScreen navigate={navigate} />;
    }
  };

  return (
    <View style={styles.appContainer}>
      <StatusBar backgroundColor="#2c3e50" barStyle="light-content" />
      <NavigationContainer>
        <Navbar navigate={navigate} currentScreen={currentScreen} />
        <View style={styles.screenContainer}>
          {renderScreen()}
        </View>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenContainer: {
    flex: 1,
    marginTop: 60, // Ajusta este valor según la altura de tu Navbar
  },
});

export default App;