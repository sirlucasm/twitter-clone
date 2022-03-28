import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/Auth';
import MainStackRoute from './stack';
import TabRoute from './tab';

const Routes = () => {
  const { signed } = useAuth();
  return (
    <NavigationContainer>
      {
        signed ?
        <TabRoute />
        :
        <MainStackRoute />
      }
    </NavigationContainer>
  );
}

export default Routes;
