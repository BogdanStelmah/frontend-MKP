import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FCFCFC',
        tabBarInactiveTintColor: '#335C33',
        tabBarInactiveBackgroundColor: '#4F7942',
        tabBarActiveBackgroundColor: '#4F7942',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 52 }
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
          tabBarIcon: ({ color }) => <Feather size={32} name="search" color={color} />
        }}
      />
      <Tabs.Screen
        name="shop-list"
        options={{
          tabBarIcon: ({ color }) => <Feather size={32} name="shopping-cart" color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => <Feather size={32} name="settings" color={color} />
        }}
      />
    </Tabs>
  );
}
