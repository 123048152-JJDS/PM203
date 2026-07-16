import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function App() {

  // Splash Screen
  const [loading, setLoading] = useState(true);

  // Simulación de guardado
  const [guardando, setGuardando] = useState(false);

  // Inputs
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');

  // Lista de libros
  const [libros, setLibros] = useState([]);

  // Splash de 2 segundos
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Simulación del Splash
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require('./assets/fondo.jpg')}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 34,
              color: 'white',
              fontWeight: 'bold',
            }}
          >
             Biblioteca
          </Text>

          <ActivityIndicator
            size="large"
            color="white"
            style={{ marginTop: 20 }}
          />

          <Text
            style={{
              color: 'white',
              marginTop: 15,
              fontSize: 18,
            }}
          >
            Cargando...
          </Text>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  const agregarLibro = () => {

    if (
      titulo.trim() === '' ||
      autor.trim() === '' 
    ) {

      alert('Todos los campos son obligatorios.');

      return;
    }

    // Muestra el indicador
    setGuardando(true);

    // Espera 4 segundos
    setTimeout(() => {

      const nuevoLibro = {
        id: Date.now().toString(),
        titulo,
        autor,
        genero,
      };

      setLibros([...libros, nuevoLibro]);

      setTitulo('');
      setAutor('');
      setGenero('');

      setGuardando(false);

      alert('Usuario guardado correctamente.');

    }, 4000);

  };

  return (

    <ImageBackground
      source={require('./assets/fondo.jpg')}
      resizeMode="cover"
      style={styles.background}
    >

      <SafeAreaView style={styles.container}>

        <ScrollView>

          <Text style={styles.tituloPrincipal}>
            Registro de Usuarios
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre del usuario"
            value={titulo}
            onChangeText={setTitulo}
          />

          <TextInput
            style={styles.input}
            placeholder="Edad del usuario"
            value={autor}
            onChangeText={setAutor}
          />



          <Pressable
            disabled={guardando}
            style={[
              styles.boton,
              guardando && { backgroundColor: '#999' },
            ]}
            onPress={agregarLibro}
          >
            <Text style={styles.textoBoton}>
              {guardando ? 'Guardando...' : 'Agregar Usuario'}
            </Text>
          </Pressable>

          {guardando && (
            <>
              <ActivityIndicator
                size="large"
                color="#ebfb06"
                style={{ marginTop: 20 }}
              />

              <Text style={styles.guardando}>
                Guardando usuario...
              </Text>
            </>
          )}

          <Text style={styles.total}>
            Total de usuarios: {libros.length}
          </Text>

          <FlatList
            data={libros}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Pressable style={styles.card}>

                <Text style={styles.tituloLibro}>
                   {item.titulo}
                </Text>

                <Text>Edad: {item.autor}</Text>


              </Pressable>
            )}
          />

        </ScrollView>

      </SafeAreaView>

    </ImageBackground>

  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 25,
  },

  input: {
    backgroundColor: '#ffffffdd',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },

  boton: {
    backgroundColor: '#1565C0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBoton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  guardando: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },

  total: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },

  card: {
    backgroundColor: '#ffffffdd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  tituloLibro: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

});