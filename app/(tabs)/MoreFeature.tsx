import { createStackNavigator } from '@react-navigation/stack';
import MoreFeaturesScreen from '../screens/MoreFeaturesScreen';
import SearchTrainScreen from '../screens/SearchTrainScreen';
import LiveStatusScreen from '../screens/LiveStatusScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import PNRStatusScreen from '../screens/PNRStatusScreen';
import SeatAvailabilityScreen from '../screens/SeatAvailabilityScreen';
import FareScreen from '../screens/FareScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="MoreFeatures" 
        component={MoreFeaturesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SearchTrain" component={SearchTrainScreen} />
      <Stack.Screen name="LiveStatus" component={LiveStatusScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="PNRStatus" component={PNRStatusScreen} />
      <Stack.Screen name="SeatAvailability" component={SeatAvailabilityScreen} />
      <Stack.Screen name="Fare" component={FareScreen} />
    </Stack.Navigator>
  );
}