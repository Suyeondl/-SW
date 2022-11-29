import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import Home from './Screens/Home';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'
        screenOptions={{
          headerStyle:{backgroundColor:"#89EE"},
          geaderTitleStyle:{fontWeight:"bold", color:'black'}
        }}
      >
        <Stack.Screen 
          name ="SignUp"
          component={SignUp}
          options = {{title:"SignUp Screen"}}
        />
        <Stack.Screen 
          name='Home'
          component={Home}
          options = {{title:"Home Screen"}}
        />
        <Stack.Screen 
          name='Login' 
          component={Login}
          options = {{title:"Login Screen"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}