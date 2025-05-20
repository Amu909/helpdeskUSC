import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { db } from '../../../scripts/firebase';
import { collection, getDocs } from 'firebase/firestore';

const screenWidth = Dimensions.get('window').width;

const Analytics = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [closedTickets, setClosedTickets] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);

  useEffect(() => {
    const fetchTickets = async () => {
      const closedSnapshot = await getDocs(collection(db, 'tickets_realizados'));
      const openSnapshot = await getDocs(collection(db, 'tickets'));

      setClosedTickets(closedSnapshot.size);
      setOpenTickets(openSnapshot.size);
      setDataLoaded(true);
    };

    fetchTickets();
  }, []);

  const pieData = [
    {
      name: 'Cerrados',
      tickets: closedTickets,
      color: '#4CAF50', // verde principal del proyecto
      legendFontColor: '#333',
      legendFontSize: 14
    },
    {
      name: 'Abiertos',
      tickets: openTickets,
      color: '#F44336', // rojo
      legendFontColor: '#333',
      legendFontSize: 14
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <Text style={styles.subheader}>Estado actual de los tickets</Text>

      {dataLoaded ? (
        <View style={styles.chartCard}>
          <PieChart
            data={pieData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            accessor="tickets"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      ) : (
        <Text style={styles.loadingText}>Cargando datos...</Text>
      )}
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // azul del proyecto
  labelColor: () => '#333',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingTop: 40
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4
  },
  subheader: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
    fontSize: 16
  }
});

export default Analytics;
