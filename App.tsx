import './src/api/settings';
import Index from './src';
import { AuthProvider } from './src/contexts/Auth';

export default function App() {
  return <AuthProvider><Index /></AuthProvider>;
};
