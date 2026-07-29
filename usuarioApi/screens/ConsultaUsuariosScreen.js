import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';

export default function ConsultaUsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch('http://127.0.0.1:5000/v1/usuarios/');
      const datos = await respuesta.json();
      console.log("Respuesta API: ", datos);
      setUsuarios(datos.usuarios || []); 
    } catch (error) {
      console.log("Error API: ", error);
    }
  };

  useEffect(() => { obtenerUsuarios(); }, []);

  // const usuarios = [
  //   { id: '1', nombre: 'Isay Guerra', edad: 22 },
  //   { id: '2', nombre: 'Ana López', edad: 19 },
  //   { id: '3', nombre: 'Carlos Gonzalez', edad: 25 },
  //   { id: '4', nombre: 'Bjork Guerra', edad: 21 },
  //   { id: '5', nombre: 'Luisa Martínez', edad: 28 },
  // ];

  // const renderTarjeta = ({ item }) => (
  //   <View style={styles.card}>
  //     <Text style={styles.nombre}>{item.nombre}</Text>
  //     <View style={styles.linea}></View>
  //     <Text style={styles.info}>Edad: {item.edad} años</Text>
  //   </View>
  // );

  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <View style={styles.linea} />
      <Text style={styles.info}>Edad: {item.edad} años</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,
    boxShadow: '0px 3px 5px rgba(0,0,0,0.15)',
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    color: '#4B5563',
  },
});