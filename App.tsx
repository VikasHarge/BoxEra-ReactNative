import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View , ActivityIndicator} from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';
import useCachedResources from './src/hooks/useCachedResources.tsx';



const Stack = createNativeStackNavigator();





export default function App() {

  const { isLoadingComplete, store } = useCachedResources()


  return isLoadingComplete && store ? (
    <Provider store={store} >
      <NavigationContainer fallback={<Text>Loading...</Text>} >
        <BottomTabsNavigator />
      </NavigationContainer>
    </Provider>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
