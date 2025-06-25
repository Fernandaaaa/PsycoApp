import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../userContext";
import { API_URL } from "../config";
import { View, FlatList, Modal, ScrollView, KeyboardAvoidingView } from "react-native";
import { Text, TextInput, ActivityIndicator, Button, Card, Portal, Dialog, Provider as PaperProvider } from "react-native-paper";
import { pacienteDetalheStyles } from '../styles/pacienteDetalheStyles';
import { loadingStyles } from "../styles/loadingStyles";

export default function PacienteDetalheScreen({ route }) {
    const { user } = useContext(UserContext);
    const { paciente } = route.params;
    const [sessoes, setSessoes] = useState([]);
    const [dataSessao, setDataSessao] = useState('');
    const [notaSessao, setNotaSessao] = useState('');
    const [loading, setLoading] = useState(true);

    const [modalEditar, setModalEditar] = useState(false);
    const [modalCancelar, setModalCancelar] = useState(false);
    const [modalFinalizar, setModalFinalizar] = useState(false);
    const [sessaoAtual, setSessaoAtual] = useState(null);
    const [novaData, setNovaData] = useState('');
    const [novasNotas, setNovasNotas] = useState('');
    const [valorFinal, setValorFinal] = useState('');

    useEffect(() => {
        carregarSessoes();
    }, []);

    const carregarSessoes = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/sessoes/paciente/${paciente._id}`);
            const data = await response.json();
            setSessoes(data);
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const agendarSessao = async () => {
        const body = {
            paciente: paciente._id,
            psicologo: user.id,
            date: new Date(dataSessao),
            notas: notaSessao
        }

        await fetch(`${API_URL}/sessoes/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        setDataSessao('');
        setNotaSessao('');
        carregarSessoes();
    };


    const abrirModal = (tipo, sessao) => {
        setSessaoAtual(sessao);
        if (tipo === 'editar') {
            setNovaData(sessao.date.split('T')[0]);
            setNovasNotas(sessao.notas);
            setModalEditar(true);
        }
        if (tipo === 'cancelar') {
            setModalCancelar(true);
        }
        if (tipo === 'finalizar') {
            setModalFinalizar(true);
        }
    };

    const confirmarEdicao = async () => {
        await fetch(`${API_URL}/sessoes/update/${sessaoAtual._id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ date: new Date(novaData), notas: novasNotas })
        });
        setModalEditar(false);
        carregarSessoes();
    };

    const confirmarCancelamento = async () => {
        await fetch(`${API_URL}/sessoes/cancel/${sessaoAtual._id}`, { method: 'DELETE' });
        setModalCancelar(false);
        carregarSessoes();
    };

    const confirmarFinalizacao = async () => {
        await fetch(`${API_URL}/sessoes/complete/${sessaoAtual._id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ pagamento: parseFloat(valorFinal) })
        });
        setModalFinalizar(false);
        carregarSessoes();
    };

    const renderItem = ({ item }) => (
        <Card style={pacienteDetalheStyles.card} mode="outlined">
            <Card.Content>
                <Text variant="titleMedium" style={{ marginBottom: 4 }}>
                    Sessão: {new Date(item.date).toLocaleDateString()} - {item.status}
                </Text>
                {item.status === "cancelado" && <Text variant="bodySmall" style={{ color: 'red' }}>Sessão Desmarcada</Text>}
                {item.status === "finalizada" && <Text variant="bodySmall" style={{ color: 'gray' }}>Sessão Finalizada</Text>}
                {item.status === "marcada" && (
                    <View style={{ marginTop: 12, gap: 8 }}>
                        <Button mode="outlined" style={pacienteDetalheStyles.button} onPress={() => abrirModal('editar', item)}>Editar</Button>
                        <Button mode="outlined" style={pacienteDetalheStyles.button} textColor="red" onPress={() => abrirModal('cancelar', item)}>Cancelar</Button>
                        <Button mode="outlined" style={pacienteDetalheStyles.button} onPress={() => abrirModal('finalizar', item)}>Finalizar</Button>
                    </View>
                )}
            </Card.Content>
        </Card>
    );

    if (loading) {
        return (
            <View style={loadingStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={loadingStyles.loadingText}>Carregando sessões...</Text>
            </View>
        );
    }

    return (
        <PaperProvider>
            <KeyboardAvoidingView 
                style={{ flex: 1 }}
                behavior="height"
            >
                <View style={pacienteDetalheStyles.container}>
                    <Text variant="titleLarge" style={pacienteDetalheStyles.header}>
                        Nome: {paciente.nome}
                    </Text>
                    <Text variant="titleMedium" style={pacienteDetalheStyles.titulo}>
                        Sessões:
                    </Text>
                    <FlatList
                        data={sessoes}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItem}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ paddingBottom: 20 }}
                        ListEmptyComponent={() => (
                            <Text style={{ textAlign: "center", marginTop: 20 }}>
                                Nenhuma sessão encontrada.
                            </Text>
                        )}
                    />
                    <Text variant="titleMedium" style={pacienteDetalheStyles.titulo}>
                        Agendar nova sessão:
                    </Text>
                    <TextInput
                        label="Data (YYYY-MM-DD)"
                        mode="outlined"
                        value={dataSessao}
                        onChangeText={setDataSessao}
                        style={pacienteDetalheStyles.input}
                        placeholder="YYYY-MM-DD"
                    />
                    <TextInput
                        label="Notas"
                        mode="outlined"
                        value={notaSessao}
                        onChangeText={setNotaSessao}
                        multiline
                        style={pacienteDetalheStyles.input}
                        placeholder="Notas sobre a sessão"
                    />
                    <Button mode="contained" onPress={agendarSessao}>
                        Agendar
                    </Button>
                </View>
            </KeyboardAvoidingView>

            <Portal>
                <Dialog visible={modalEditar} onDismiss={() => setModalEditar(false)}>
                    <Dialog.Title>Editar Sessão</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Nova Data (YYYY-MM-DD)"
                            mode="outlined"
                            value={novaData}
                            onChangeText={setNovaData}
                            style={{ marginBottom: 12 }}
                            placeholder="YYYY-MM-DD"
                        />
                        <TextInput
                            label="Novas Notas"
                            mode="outlined"
                            value={novasNotas}
                            onChangeText={setNovasNotas}
                            multiline
                            style={{ marginBottom: 12 }}
                            placeholder="Notas atualizadas"
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={confirmarEdicao}>Salvar</Button>
                        <Button onPress={() => setModalEditar(false)}>Cancelar</Button>
                    </Dialog.Actions>
                </Dialog>
            
            
                <Dialog visible={modalCancelar} onDismiss={() =>
                setModalCancelar(false)}>
                    <Dialog.Title>Cancelar Sessão</Dialog.Title>
                    <Dialog.Content>
                        <Text>Tem certeza que deseja cancelar?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button textColor="red" onPress={confirmarCancelamento}>
                            Sim
                        </Button>
                        <Button onPress={() => setModalCancelar(false)}>Não</Button>
                    </Dialog.Actions>
                </Dialog>
            
            {/* Modal Finalizar */}
            
                <Dialog visible={modalFinalizar} onDismiss={() =>
                setModalFinalizar(false)}>
                    <Dialog.Title>Finalizar Sessão</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Valor da consulta"
                            mode="outlined"
                            value={valorFinal}
                            onChangeText={setValorFinal}
                            keyboardType="numeric"
                            placeholder="R$ 0,00"
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={confirmarFinalizacao}>Finalizar</Button>
                        <Button onPress={() => setModalFinalizar(false)}>Cancelar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </PaperProvider>
    );
}
