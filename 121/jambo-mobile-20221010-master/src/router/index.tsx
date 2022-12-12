import routes from './config';
import createMyNavigator from './MyNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigationOptions, Urls } from './type';

const Stack = createNativeStackNavigator();
const My = createMyNavigator();
const BottomNavigation = () => {
  const initials = routes[0];
  return (
    <My.Navigator initialRouteName={initials.initialRouteName}>
      {
        initials.children?.map(item =>
          <My.Screen key={item.url} name={item.url} component={item.component} options={item.options as TabNavigationOptions} />
        )
      }
    </My.Navigator>
  )
}

function Routers({ initialRouteName }: { initialRouteName?: Urls }) {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {
        routes.map((item, index) => {
          if (item.children) {
            return <Stack.Screen key={index} name={item.url} component={BottomNavigation} options={{ ...item.options, headerShown: false }} />
          }
          return <Stack.Screen key={index} name={item.url} component={item.component} options={{
            headerShown: false,
            ...item.options,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#E1FDFF',
            },
            headerTitleStyle: {
              fontFamily: 'Audiowide-Regular'
            }
          }} />
        })
      }
    </Stack.Navigator>
  )
}

export default Routers;