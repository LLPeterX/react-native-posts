import 'react-native-gesture-handler'
import React from 'react';
import AppLoading from 'expo-app-loading'
import { bootstrap } from './src/bootstrap'
import { AppNavigation } from './src/navigation/AppNavigation';

export default function App() {
  const [isReady, setIsReady] = React.useState(false);

  if (!isReady) {
    return <AppLoading
      startAsync={bootstrap}
      onFinish={() => setIsReady(true)}
      onError={(err) => console.log(err)}
    />
  }

  return <AppNavigation />
}

