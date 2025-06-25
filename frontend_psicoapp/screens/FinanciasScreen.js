import React, { useState, useEffect, useContext } from "react";
import { View, FlatList } from "react-native";
import { Appbar, Card, ActivityIndicator, Text } from 'react-native-paper';
import { UserContext } from "../userContext";
import { API_URL } from "../config";
import { financiasStyles } from '../styles/financiasStyles';
import { loadingStyles } from "../styles/loadingStyles";

export default function FinanciasScreen() {
    const { user } = useContext(UserContext);
    const [relatorios, setRelatorios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarRelatorios();
    }, []);

    const carregarRelatorios = async () => {
        try {
            const rota = user.tipoUsuario === 'psicologo' ? `${API_URL}/financias/${user.id}` : `${API_URL}/financias/paciente/${user.id}`;

            const response = await fetch(rota);
            if (!response.ok) {
                const texto = await response.text();
                console.error('Erro na API:', texto);
                return;
            }
            const data = await response.json();
            setRelatorios(data);
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <Card style={financiasStyles.card} mode="outlined">
            <Card.Title title={`Data: ${new Date(item.date).toLocaleDateString('pt-BR')}`} />
            <Card.Content>
                <Text variant="bodyMedium">Paciente: {item.paciente.nome}</Text>
                <Text variant="bodyMedium">Doutor: {item.psicologo.nome}</Text>
                <Text variant="bodyMedium">Valor: R$ {item.pagamento.toFixed(2)}</Text>
                <Text variant="bodyMedium">Imposto: R$ {item.imposto.toFixed(2)}</Text>
            </Card.Content>
        </Card>
    );

    if (loading) {
        return (
            <View style={loadingStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={loadingStyles.loadingText}>Carregando registros...</Text>
            </View>
        );
    }

    return (
        <View style={financiasStyles.container}>
            <Text variant="headlineMedium" style={{ margin: 18 }}>Relatórios Financeiros</Text>
            {relatorios.length > 0 ? (
                <FlatList
                    data={relatorios}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
                />
            ) : (
                <Text style={financiasStyles.noRecordsText}>Nenhum Relatório encontrado.</Text>
            )}
        </View>
    );
}
