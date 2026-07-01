/* Zona 1: Importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Button, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

/* Zona 2: Main - Hogar de los componentes */
export default function ImageBackgroundScreen() {
    const [fondo, setFondo] = useState(
        require('../assets/fondo.jpeg'));

    const [splash, setSplash] = useState(true);

    useEffect(() => { setTimeout(() => { setSplash(false); }, 3000); }, []);

    if (splash) {
        return (
            <View style={styles.splashContainer}>
                <Image source={require('../assets/wave.png')} resizeMode="contain" style={styles.logo} />

                <Text style={styles.carga}> Cargando...</Text>

                <StatusBar style="auto" />
            </View>
        );
    }

    const cambiarFondo = () => {
        setFondo(
            fondo === require('../assets/fondo.jpeg')
                ? require('../assets/fondo2.jpeg')
                : require('../assets/fondo.jpeg')
        );
    };

    return (
        <ImageBackground
            source={fondo}
            style={styles.fondo}
            resizeMode="cover"
        >
            <View style={styles.centro}>
                <Text style={styles.texto}>Bienvenido</Text>
                <Button title="Cambiar Fondo" onPress={cambiarFondo} />
            </View>
            <StatusBar style="auto" />
        </ImageBackground>
    );
}

/* Zona3: Estilos y Posicionamiento */
const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        width: '100%',
    },
    centro: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    splashContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#1E88E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    carga: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 15,
    },
    logo: {
        width: 150,
        height: 150,
    },
});