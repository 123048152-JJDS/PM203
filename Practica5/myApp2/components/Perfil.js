/*Perfil usando Desestructuracion */
import { View, Text, Button, StyleSheet } from 'react-native';
import React,{useState} from 'react';

export const Perfil = ({ nombre, carrera, materia, cuatrimestre }) => {
    const [mostrar, setMostrar]=useState(false);
    return (
        <View style={styles.tarjeta}>
            <Text style={styles.nombre}>Nombre: {nombre}</Text>

            {/* Rendelizado Condicional */}
            {mostrar && 
            <>
                <Text style={styles.carrera}>Carrera: {carrera}</Text>
                <Text style={styles.otroTexto}>Materia: {materia}</Text>
                <Text style={styles.otroTexto}>Cuatrimestre: {cuatrimestre}</Text>
            </>
            }
            <Button title="Mostrar Perfil" onPress={ ()=>{setMostrar(!mostrar)}}/>
            
        </View>
    );
};

/* Perfil usando Props*/
/*
import { View, Text } from 'react-native';

export const Perfil = (props) => {
    return (
        <View>
            <Text>Nombre: {props.nombre}</Text>
            <Text>Carrera: {props.carrera}</Text>
            <Text>Materia: {props.materia}</Text>
            <Text>Cuatrimestre: {props.cuatrimestre}</Text>
        </View>
    );
};
*/

const styles = StyleSheet.create({
    nombre:{
        fontSize: 24,
        fontWeight: 600,
        textTransform: 'uppercase',
    },

    carrera:{
        fontSize: 18,
        color: 'blue',
        fontFamily: 'Roboto',
    },

    otroTexto:{
        fontSize: 12,
        fontFamily: 'Courier',
        fontStyle: 'italic',
    },

    tarjeta:{
        borderWidth: 2,
        padding:25,
        margin:15,
    },
});