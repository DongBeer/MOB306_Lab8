import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './comp/Home';
import Them from './comp/Them';
import Sua from './comp/Sua';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        {/**Đăng ký các component ở đây */}
        <Stack.Screen name='Home' component={Home} options={{title: 'Danh sách sản phẩm'}}/>
        <Stack.Screen name='Them' component={Them} options={{title: 'Thêm sản phẩm'}}/>
        <Stack.Screen name='Sua' component={Sua} options={{title: 'Sửa sản phẩm'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
