import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Appbar, Card, Button, ActivityIndicator, Text } from 'react-native-paper';
import { API_URL } from "../config";
import { pacientesListStyles } from '../styles/pacientesListStyles';
import { loadingStyles } from "../styles/loadingStyles";

export default function PacientesListScreen({ navigation }) {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarPacientes();
    }, []);

    const carregarPacientes = async () => {
        try {
            const response = await fetch(`${API_URL}/users/pacientes`);
            const data = await response.json();
            setPacientes(data);
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <Card style={pacientesListStyles.card} mode="outlined">
            <Card.Title title={item.nome} />
            <View style={pacientesListStyles.actionContainer}>
                <Button mode="contained" onPress={() => navigation.navigate('DiarioPaciente',
                { paciente: item })} style={pacientesListStyles.button} labelStyle={pacientesListStyles.buttonLabel}
                >
                    Ver Diário
                </Button>
                <Button mode="contained" onPress={() => navigation.navigate('FeedbackPaciente', {
                paciente: item })} style={pacientesListStyles.button} labelStyle={pacientesListStyles.buttonLabel}
                >
                    Ver Feedbacks
                </Button>
                <Button mode="contained" onPress={() => navigation.navigate('PacienteDetalhe', { paciente: item })} 
                style={pacientesListStyles.button} labelStyle={pacientesListStyles.buttonLabel}
                >
                    Ver Sessões
                </Button>
            </View>
        </Card>
    );

    if (loading) {
        return (
            <View style={loadingStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={loadingStyles.loadingText}>Carregando lista de pacientes...</Text>
            </View>
        );
    }

    return (
        <View>
            {pacientes.length > 0 ? (
                <FlatList
                    data={pacientes}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={pacientesListStyles.listContainer}
                />
            ) : (
                <Text style={pacientesListStyles.noRecordsText}>Nenhum Paciente Registrado</Text>
            )}
        </View>
    );
}
