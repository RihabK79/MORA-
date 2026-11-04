import React from 'react';import {Ionicons} from '@expo/vector-icons';import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';import {createNativeStackNavigator} from '@react-navigation/native-stack';import {HomeScreen} from '../screens/HomeScreen';import {ShopScreen} from '../screens/ShopScreen';import {CartScreen} from '../screens/CartScreen';import {ProfileScreen} from '../screens/ProfileScreen';import {FavoritesScreen} from '../screens/FavoritesScreen';import {ProductDetailsScreen} from '../screens/ProductDetailsScreen';import {CheckoutScreen} from '../screens/CheckoutScreen';import {OrdersScreen} from '../screens/OrdersScreen';import {AddressesScreen} from '../screens/AddressesScreen';import {colors} from '../theme';
const Tab=createBottomTabNavigator();const Stack=createNativeStackNavigator();
function Tabs(){
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {fontSize: 11, fontWeight: '600'},
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'];

          switch (route.name) {
            case 'Discover':
              iconName = focused ? 'compass' : 'compass-outline';
              break;
            case 'Shop':
              iconName = focused ? 'storefront' : 'storefront-outline';
              break;
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'My bag':
              iconName = focused ? 'bag' : 'bag-outline';
              break;
            case 'Account':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Discover" component={HomeScreen}/>
      <Tab.Screen name="Shop" component={ShopScreen}/>
      <Tab.Screen name="Favorites" component={FavoritesScreen}/>
      <Tab.Screen name="My bag" component={CartScreen}/>
      <Tab.Screen name="Account" component={ProfileScreen}/>
    </Tab.Navigator>
  );
}
export function MainNavigator(){return <Stack.Navigator screenOptions={{headerShown:false}}><Stack.Screen name="Tabs" component={Tabs}/><Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{headerShown:true,title:'Product details',headerTintColor:colors.primary,headerStyle:{backgroundColor:colors.background}}}/><Stack.Screen name="Checkout" component={CheckoutScreen} options={{headerShown:true,title:'Checkout',headerTintColor:colors.primary,headerStyle:{backgroundColor:colors.background}}}/><Stack.Screen name="Orders" component={OrdersScreen} options={{headerShown:true,title:'My orders',headerTintColor:colors.primary,headerStyle:{backgroundColor:colors.background}}}/><Stack.Screen name="Addresses" component={AddressesScreen} options={{headerShown:true,title:'Delivery addresses',headerTintColor:colors.primary,headerStyle:{backgroundColor:colors.background}}}/></Stack.Navigator>}
