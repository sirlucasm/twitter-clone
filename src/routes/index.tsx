import { NavigationContainer } from '@react-navigation/native';
import Loading from '../components/Loading';
import { useAuth } from '../contexts/Auth';
import MainStackRoute from './stack';
import TabRoute from './tab';

const Routes = () => {
  const { signed, isLoading } = useAuth();
  return (
    <NavigationContainer>
      {
        signed ?
        <TabRoute />
        :
        <MainStackRoute />
      }
      { isLoading && <Loading /> }
    </NavigationContainer>
  );
}

export default Routes;
