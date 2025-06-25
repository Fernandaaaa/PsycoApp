import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../userContext";
import { API_URL } from "../config";
import { View, FlatList } from "react-native";
import { Text, Card, ActivityIndicator } from "react-native-paper";
import { pacienteDetalheStyles } from '../styles/pacienteDetalheStyles';
import { loadingStyles } from "../styles/loadingStyles";

export default function ConsultasScreen() {
    const { user } = useContext(UserContext);
    const [sessoes, setSessoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarSessoes();
    }, []);

    const carregarSessoes = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/sessoes/paciente/${user.id}`);
            const data = await response.json();
            setSessoes(data);
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <Card style={pacienteDetalheStyles.card} mode="outlined">
            <Card.Content>
                <Text variant="titleMedium" style={{ marginBottom: 4 }}>
                    Sessão: {new Date(item.date).toLocaleDateString()} - {item.status}
                </Text>
                {item.status === "cancelado" && <Text variant="bodySmall" style={{ color: 'red' }}>Sessão Desmarcada</Text>}
                {item.status === "finalizada" && <Text variant="bodySmall" style={{ color: 'gray' }}>Sessão Finalizada</Text>}
                {item.status === "marcada" && <Text variant="bodySmall" style={{ color: 'blue' }}>Sessão Marcada</Text>}
            </Card.Content>
        </Card>
    );

    if (loading) {
        return (
            <View style={loadingStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={loadingStyles.loadingText}>Carregando consultas...</Text>
            </View>
        );
    }

    return (
        <View style={pacienteDetalheStyles.container}>
            <Text variant="titleLarge" style={pacienteDetalheStyles.header}>
                Nome: {user.nome}
            </Text>
            <Text variant="titleMedium" style={pacienteDetalheStyles.titulo}>
                Sessões:
            </Text>
            <FlatList
                data={sessoes}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={() => (
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        Nenhuma sessão encontrada.
                    </Text>
                )}
            />
        </View>
    );
}
