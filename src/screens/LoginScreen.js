import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Image} from 'react-native';
import { COLORS } from '../../assets/COLORS';
import NFL_Logo from '../../assets/NFL_Logo.jpg'
import Glennon from '../../assets/Mike_Glennon.jpg';
import SubmissionButton from '../components/SubmissionButton';
import StyleSheet69 from '../components/StyleReference'
const styles = StyleSheet69();

function LoginScreen({ navigation, route }) {
    const [username, setUsername] = React.useState('joeyj96@live.com');
    const [password, setPassword] = React.useState('Ws3_rf5');
  
    const baseUrl = 'https://nflpickemapi.azurewebsites.net';
  
    const handleLogin = async () => {
      const credentials = {
        username: username,
        password: password
      }
  
      try {
        const response = await fetch('https://nflpickemapi.azurewebsites.net/Validate', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });
  
        if (response.status == 200) {
            navigation.navigate('Home2');
        } else {
            console.log('Login failed');
        }
  
      } catch (error) {
        console.error('Error: ', error);
      }
    }
  
    return (
      <View className="Login">
        <Text>Login Page</Text>
        <View>
          <Text>Username: </Text>
          <TextInput
            type='text'
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View>
          <Text>Password: </Text>
          <TextInput
            type='text'
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Button 
          onPress={handleLogin}
          title='Login'
        />
      </View>
    );
  }

  export default LoginScreen;