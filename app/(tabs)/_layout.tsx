import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons'; 

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home-outline" size={28} color={color} />, // Home icon
        }}
      />
      <Tabs.Screen
        name="MoreFeature"
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => <Icon name="apps-outline" size={28} color={color} />, // More Features icon
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <Icon name="person-outline" size={28} color={color} />,
  }}
/>

    </Tabs>
  );
}
