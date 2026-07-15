/*Perfil usando Desestructuracion */
import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export const TarjetaProductos = ({ nombre, marca, precio, estiloExt }) => {
    const [mostrar, setMostrar] = useState(false);
    return (
        <View style={[styles.tarjeta, estiloExt]}>
            <Text style={styles.nombre}>Nombre: {nombre}</Text>

            {mostrar && 
            <>
                <Text style={styles.marca}>marca: {marca}</Text>
                <Text style={styles.precio}>precio: {precio}</Text>
            </>
            }
            <Button title="Mostrar Perfil" onPress={ ()=>{setMostrar(!mostrar)}}/>
            
        </View>
    );
};

const styles = StyleSheet.create({
    nombre:{
        fontSize: 24,
        fontWeight: '600',
        textTransform: 'uppercase',
    },

    marca:{
        fontSize: 18,
        color: 'green',
        fontFamily: 'Roboto',
        textAlign: 'center',
    },

    precio:{
        fontSize: 18,
        color: 'blue',
        fontFamily: 'Roboto',
        textAlign: 'center',
    },

    tarjeta:{
        borderWidth: 2,
        padding:25,
        margin:15,
    },
});