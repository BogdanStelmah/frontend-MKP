import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'light' ? '#FCFCFC' : '#cecece',
        tabBarInactiveTintColor: colorScheme === 'light' ? '#335C33' : '#407440',
        tabBarInactiveBackgroundColor: colorScheme === 'light' ? '#4F7942' : '#28541a',
        tabBarActiveBackgroundColor: colorScheme === 'light' ? '#4F7942' : '#28541a',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 52,
          borderTopWidth: 0
        }
      }}
    >
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarIcon: ({ color }) => <Feather size={32} name="calendar" color={color} />
        }}
      />
      <Tabs.Screen
        name="my-recipes"
        options={{
          tabBarIcon: ({ color }) => <Feather size={32} name="heart" color={color} />
        }}
      />
      <Tabs.Screen
        name="recipe-search"
        options={{
          tabBarIcon: ({ color }) => <Feather size={32} name="search" color={color} />,
          unmountOnBlur: true
        }}
      />
      <Tabs.Screen
        name="shop-list"
        options={{
          tabBarIcon: ({ color }) => <Feather size={32} name="shopping-cart" color={color} />,
          unmountOnBlur: true
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => <Feather size={32} name="settings" color={color} />,
          unmountOnBlur: true
        }}
      />
    </Tabs>
  );
}
