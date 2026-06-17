/*Zona 1: Importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Saludo } from './components/Saludo';
import { Saludo2 } from './components/Saludo2';
import { Perfil } from './components/Perfil';

/*Zona 2: Main - Hogar de los componentes */
export default function App() {
  return (
    /*Cuando tenemos varios componentes debemos almacenarlos en un View (Se considera como un div en html) */
    <View style={styles.container}>
      
      {/* <Image></Image>
      
      <Image source={require('./assets/wave.png')}/>
      
      <Text>------------Componentes Nativos-----------------------</Text>
      <Text>Hola mundo React Native!</Text>

      <Text>------------Componentes Personalizados Simples-----------------------</Text>
      <Saludo></Saludo>

      <Text>------------Componentes Personalizados Compuestos-----------------------</Text>
      <Saludo2></Saludo2> 

      <Text>------------Mi Perfil Personal-----------------------</Text>*/}
      <Perfil estiloExt={styles.tarjetaRoja} nombre="Jesus Jimenez De Santiago" carrera="Ingeniería en Sistemas Computacionales" materia="Programación Móvil" cuatrimestre="9° Cuatrimestre" />

      <Perfil estiloExt={styles.tarjetaVerde} nombre="Jesus" carrera="ISC" materia="Programación Móvil" cuatrimestre="9°" />

      <Perfil estiloExt={styles.tarjetaRoja} nombre="Santiago" carrera="Ingeniería en Sistemas Computacionales" materia="Programación Móvil" cuatrimestre="9° Cuatrimestre" />
      
      <StatusBar style="auto" />
    </View>
  );
}

/*Zona 3: Estilos y Posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  tarjetaRoja:{
    backgroundColor: '#FF6B6B',},
    
  tarjetaVerde:{
    backgroundColor: '#6BFF6B',},
});
