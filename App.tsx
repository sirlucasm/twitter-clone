import './src/api/settings';
import Index from './src';
import { AuthProvider } from './src/contexts/Auth';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';

LogBox.ignoreLogs([
  'AsyncStorage',
  'Setting a timer',
  'Found screens',
  'Non-serializable values were found in the navigation state',
]);

export default function App() {
  return (
    <>
      <AuthProvider>
        <Index />
      </AuthProvider>
      <Toast />
    </>
  );
};
