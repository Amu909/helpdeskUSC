import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const BottomTab = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab}>
        <Text>
        <MaterialCommunityIcons name="home-plus" size={35} color="#3498db" />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text>
        <MaterialIcons name="support-agent" size={35} color="#3498db" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    zIndex: 999,
    borderRadius :60 // aseguramos que esté encima
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomTab;
