import { NavigationContainer } from '@react-navigation/native';
import Loading from '../components/Loading';
import { useAuth } from '../contexts/Auth';
import MainDrawerRoute from './drawer';
import MainStackRoute from './stack';

const Routes = () => {
  const { signed, isLoading } = useAuth();
  return (
    <NavigationContainer>
      {
        signed ?
        <MainDrawerRoute />
        :
        <MainStackRoute />
      }
      { isLoading && <Loading /> }
    </NavigationContainer>
  );
}

export default Routes;
