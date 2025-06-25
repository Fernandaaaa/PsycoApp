import React, { useContext } from "react";
import { View, Alert } from "react-native";
import { Text, Button, Surface } from "react-native-paper";
import { homeStyles } from '../styles/homeStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../userContext";

export default function HomeScreen({ navigation }) {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        Alert.alert(
            'Sair', 'Tem certeza que deseja sair?',
            [
                {text: 'Cancelar', style: 'cancel'},
                {text: 'Sair', onPress: async () => {
                    try {
                        await AsyncStorage.removeItem('users');
                        setUser(null);
                    } catch (error) {
                        console.error('Erro: ', error);
                        Alert.alert('Erro', 'Não foi possível sair. Tente novamente');
                    }
                }}
            ],
            {cancelable: true}
        );
    };

    return (
        <Surface style={homeStyles.container}>
            <Text variant="headlineMedium" style={homeStyles.welcome}>
                Bem-vindo, {user.nome} 
            </Text>
            {user.tipoUsuario === 'psicologo' ? (
                <Button mode="contained" style={homeStyles.button} onPress={() => navigation.navigate('PacientesList')}>
                    Ver lista de Pacientes
                </Button>
            ) : (
                <>
                    <Button mode="contained" style={homeStyles.button} onPress={() => navigation.navigate('Diario')}>
                        Meu Diário
                    </Button>
                    <Button mode="contained" style={homeStyles.button} onPress={() => navigation.navigate('Feedback')}>
                        Feedback dos seus sentimentos
                    </Button>
                </>
            )}
            <Button mode="contained" style={homeStyles.button} onPress={() => navigation.navigate('Financias')}>
                Relatórios Financeiros
            </Button>
            <Button mode="text" onPress={handleLogout} style={homeStyles.logout}>
                Sair
            </Button>
        </Surface>
    );
}
