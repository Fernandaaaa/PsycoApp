import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { loadingStyles } from './styles/loadingStyles';
import { UserContext, UserProvider } from "./userContext";

import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import HomePaciente from "./screens/HomePacienteTabs";
import HomePsicologo from "./screens/HomePsicologoTabs";
import HomeScreen from './screens/HomeScreen';
import DiarioEmocionalScreen from './screens/DiarioEmocionalScreen';
import DiarioUserScreen from "./screens/DiarioUserScreen";
import FeedbackScreen from './screens/FeedbackScreen';
import FeedbackUserScreen from './screens/FeedbackUserScreen';
import FinanciasScreen from './screens/FinanciasScreen';
import PacientesListScreen from './screens/PacientesListScreen';
import PacienteDetalheScreen from './screens/PacienteDetalheScreen';
import DiarioPacienteScreen from './screens/DiarioPacienteScreen';
import FeedbackPacienteScreen from './screens/FeedbackPacienteScreen';


const Stack = createNativeStackNavigator();

function LoadingScreen() {
    return (
      <View style={loadingStyles.loadingContainer}>
        <ActivityIndicator size='large' color='#6a0dad' />
        <Text style={loadingStyles.loadingText}>Carregando...</Text>
      </View>
    );
  }

export default function App() {
  return (
    <UserProvider>
      <PaperProvider>
        <NavigationContainer>
          <UserContext.Consumer>
            {({ user, isLoading }) => (
              <Stack.Navigator>
                {isLoading ? (
                  <Stack.Screen name="Loading" component={LoadingScreen} />
                ) : user?.tipoUsuario === 'paciente' ? (
                  <>
                    <Stack.Screen name="Home" component={HomePaciente} options={{headerShown: false}} />
                    {/* <Stack.Screen name="Diario" component={DiarioEmocionalScreen} options={{title: 'Diário Emocional'}} /> */}
                    <Stack.Screen name="DiarioUser" component={DiarioUserScreen} options={{title: 'Registros do Diário'}} />
                    {/* <Stack.Screen name="Feedback" component={FeedbackScreen} options={{title: 'Feedback Emocional'}} /> */}
                    <Stack.Screen name="FeedbackUser" component={FeedbackUserScreen} options={{headerShown: false}} />
                    {/* <Stack.Screen name="Financias" component={FinanciasScreen} options={{headerShown: false}} /> */}
                  </>
                ) : user?.tipoUsuario === 'psicologo' ? (
                  <>
                    <Stack.Screen name="Home" component={HomePsicologo} options={{headerShown: false}} />
                    <Stack.Screen name="PacienteDetalhe" component={PacienteDetalheScreen} options={{title: 'Sessões Agendadas'}} />
                    <Stack.Screen name="DiarioPaciente" component={DiarioPacienteScreen} options={{title: 'Diário do Paciente'}} />
                    <Stack.Screen name="FeedbackPaciente" component={FeedbackPacienteScreen} options={{headerShown: false}} />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Cadastro" component={CadastroScreen} />
                  </>
                )}
              </Stack.Navigator>
            )}
          </UserContext.Consumer>
        </NavigationContainer>
      </PaperProvider>
    </UserProvider>
  );
}
