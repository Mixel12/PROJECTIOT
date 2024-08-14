import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const [oxigenacion, setOxigenacion] = useState(null);
  const [ritmoCardiaco, setRitmoCardiaco] = useState(null);

  const fetchData = async () => {
    try {
      const oxigenacionResponse = await axios.get(
        'https://backend.thinger.io/v3/users/Steven25/devices/ESP32proyecto/resources/oxigenacion',
        { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjMyNTYwNDgsImlhdCI6MTcyMzI0ODg0OCwicm9sZSI6InVzZXIiLCJ1c3IiOiJTdGV2ZW4yNSJ9.clcAoCarOEyGZKLGnjldmmajKLTsWwY1SA7FkfrBYhM' } }
      );
      setOxigenacion(oxigenacionResponse.data);

      const ritmoCardiacoResponse = await axios.get(
        'https://backend.thinger.io/v3/users/Steven25/devices/ESP32proyecto/resources/ritmo_cardiaco',
        { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjMyNTYwNDgsImlhdCI6MTcyMzI0ODg0OCwicm9sZSI6InVzZXIiLCJ1c3IiOiJTdGV2ZW4yNSJ9.clcAoCarOEyGZKLGnjldmmajKLTsWwY1SA7FkfrBYhM' } }
      );

      setRitmoCardiaco(ritmoCardiacoResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchData, 1000); // Actualiza cada 1 segundo
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos de Thinger.io</Text>
      <Text style={styles.text}>Oxigenación: {oxigenacion}</Text>
      <Text style={styles.text}>Ritmo Cardíaco: {ritmoCardiaco}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
  },
});