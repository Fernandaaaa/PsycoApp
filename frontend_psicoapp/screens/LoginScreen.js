import React, { useState, useContext } from "react";
import { View, Alert, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, Snackbar }from "react-native-paper";
import { loginStyles } from '../styles/loginStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../userContext";
import { API_URL } from '../config';

export default function LoginScreen({ navigation }) {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    const logar = async () => {
        if (!email || !senha) {
            setSnackbarMsg('Preencha todos os campos');
            setSnackbarVisible(true);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, senha })
            });
            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem('users', JSON.stringify(data.user));
                setUser(data.user);
            } else {
                setSnackbarMsg(data.message);
                setSnackbarVisible(true);
            }
        } catch (error) {
            console.error('Erro: ', error);
        } finally {
            setLoading(false);
        }
    };


    return ( 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
            <KeyboardAvoidingView behavior="height" style={loginStyles.container}> 
                <ScrollView contentContainerStyle={loginStyles.contentContainer}> 
                    <Text variant="headlineMedium" style={loginStyles.title}> 
                        Login 
                    </Text> 
            
                    <TextInput 
                        label="E-mail" 
                        value={email} 
                        onChangeText={setEmail} 
                        keyboardType="email-address" 
                        autoCapitalize="none" 
                        style={loginStyles.input} 
                        mode="outlined" 
                    /> 
            
                    <TextInput 
                        label="Senha" 
                        value={senha} 
                        onChangeText={setSenha} 
                        secureTextEntry 
                        style={loginStyles.input} 
                        mode="outlined" 
                    /> 
            
                    {loading ? ( 
                        <ActivityIndicator 
                        animating={true} 
                        size="large" 
                        color="#6a0dad" 
                        style={{ marginVertical: 20 }} 
                        /> 
                    ) : ( 
                        <> 
                            <Button 
                                mode="contained" 
                                onPress={logar} 
                                style={loginStyles.button} 
                                contentStyle={{ paddingVertical: 8 }} 
                            > 
                                Entrar 
                            </Button> 
                
                            <Button 
                                mode="outlined" 
                                onPress={() => navigation.navigate("Cadastro")} 
                                style={loginStyles.button} 
                                contentStyle={{ paddingVertical: 8 }} 
                            > 
                                Cadastre-se 
                            </Button> 
                        </> 
                    )} 
            
                    <Snackbar 
                        visible={snackbarVisible} 
                        onDismiss={() => setSnackbarVisible(false)} 
                        duration={3000} 
                        action={{ 
                        label: "Fechar", 
                        onPress: () => setSnackbarVisible(false), 
                        }} 
                    > 
                        {snackbarMsg} 
                    </Snackbar> 
                </ScrollView> 
            </KeyboardAvoidingView> 
        </TouchableWithoutFeedback> 
  ); 
}
