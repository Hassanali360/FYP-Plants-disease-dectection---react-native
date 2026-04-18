import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/globalcss';

const tabIcons = {
  index: 'home-outline',
  Scan: 'leaf',
  Shop: 'storefront-outline',
  Expert: 'people-outline',
  Profile: 'person-outline',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
      {Object.entries(tabIcons).map(([name, iconName]) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.item, focused && styles.activeItem]}>
                <Ionicons 
                  name={iconName as any} 
                  size={focused ? 24 : 20}
                  color={focused ? '#fff' : '#222'} 
                />
                <Text style={[styles.label, focused && styles.activeLabel]}>
                  {name === 'index' ? 'Home' : name === 'Profile' ? 'Profile' : name === 'Scan' ? 'Scan' : name === 'Shop' ? 'Market' : 'Expert'}
                </Text>
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingHorizontal: 10,
    paddingTop: 13,
    paddingBottom: 13,
    borderTopWidth: 0,
    elevation: 8,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  item: {
    width: 80,
    height: 50,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    marginTop: 10,
  },
  activeItem: {
    backgroundColor: COLORS.primary,
  },
  label: {
    fontSize: 9,
    color: '#222',
    fontFamily: FONTS.plus[400],
    letterSpacing: 0.3,
  },
  activeLabel: { color: '#fff' },
});
