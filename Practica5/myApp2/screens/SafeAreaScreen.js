/*Zona 1: Importaciones de componentes y archivos */
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, ScrollView, StyleSheet, View, Text, Pressable} from 'react-native';


/*Zona 2: Main - Hogar de los componentes */
export default function SafeAreaScreen() {

  const [mensaje, setMensaje] = useState(
    'Bienvenidos a nuestra práctica de SafeAreaView y ScrollView'
  );

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar style="auto" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
      >

        <Text style={styles.titulo}>
          Práctica: SafeAreaView y ScrollView
        </Text>

        <View style={styles.tarjeta}>
          <Text style={styles.subtitulo}>Hobbies</Text>
          <Text style={styles.texto}>
            Ver videos{"\n"}
            Videojuegos{"\n"}
            Jugar fútbol
          </Text>
        </View>

        <View style={styles.tarjeta}>
          <Text style={styles.subtitulo}>Comidas Favoritas</Text>
          <Text style={styles.texto}>
            Pizza{"\n"}
            Hamburguesa{"\n"}
            Tacos
          </Text>
        </View>

        <View style={styles.tarjeta}>
          <Text style={styles.subtitulo}>Colores Favoritos</Text>
          <Text style={styles.texto}>
            Azul{"\n"}
            Negro{"\n"}
            Blanco
          </Text>
        </View>

        <View style={styles.tarjeta}>
          <Text style={styles.subtitulo}>Animales Favoritos</Text>
          <Text style={styles.texto}>
            Perro{"\n"}
            Tigre{"\n"}
            Lobo
          </Text>
        </View>

        <View style={styles.tarjeta}>
          <Text style={styles.subtitulo}>Equipos Favoritos</Text>
          <Text style={styles.texto}>
            Cruz Azul{"\n"}
            Chivas
          </Text>
        </View>

        <View style={styles.tarjeta}>
          <Text style={styles.subtitulo}>Películas Favoritas</Text>
          <Text style={styles.texto}>
            La Monja{"\n"}
            El Conjuro {"\n"}
            Annabelle
          </Text>
        </View>

        <View style={styles.tarjeta}>
          <Text style={styles.subtitulo}>Información Extra</Text>
          <Text style={styles.texto}>
            Este ejemplo demuestra el uso de SafeAreaView y ScrollView
            en React Native.
          </Text>
        </View>

        <View style={styles.tarjeta}>
          <Text style={styles.subtitulo}>
            Ejemplo de State
          </Text>

          <Text style={styles.texto}>
            {mensaje}
          </Text>

          <Pressable
            style={styles.boton}
            onPress={() =>
              setMensaje(
                'El State cambió correctamente'
              )
            }
          >
            <Text style={styles.textoBoton}>
              Cambiar Mensaje
            </Text>
          </Pressable>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

/*Zona 3: Estilos y Posicionamiento */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },

  scrollContainer: {
    padding: 20,
    paddingTop: 35,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0F172A',
    marginTop: 10,
    marginBottom: 20,
  },

  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 18,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    elevation: 5,
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 10,
  },

  texto: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },

  boton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },

  textoBoton: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
