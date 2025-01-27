import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
// import CapabilitiesScreen from './Capabilities';
// import PrinterScreen from './Printer';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* <Tab.Screen name="Printer" component={PrinterScreen} /> */}
        <Tab.Screen name="Home" component={HomeScreen} />
        {/* <Tab.Screen name="Capabilities" component={CapabilitiesScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
