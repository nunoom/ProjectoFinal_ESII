import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ContentsScreen from '../screens/ContentsScreen';
import ContentDetailScreen from '../screens/ContentDetailScreen';
import QuizzesScreen from '../screens/QuizzesScreen';
import QuizPlayScreen from '../screens/QuizPlayScreen';
import QuizResultScreen from '../screens/QuizResultScreen';
import RankingScreen from '../screens/RankingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ForumScreen from '../screens/ForumScreen';
import BadgesScreen from '../screens/BadgesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Contents') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'Quizzes') iconName = focused ? 'bulb' : 'bulb-outline';
          else if (route.name === 'Ranking') iconName = focused ? 'trophy' : 'trophy-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          return (
            <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
              <Ionicons name={iconName} size={focused ? 22 : 20} color={color} />
              {focused && <View style={styles.tabDot} />}
            </View>
          );
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray[400],
        tabBarStyle: {
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 8,
          height: 62 + Math.max(insets.bottom - 8, 0),
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.gray[100],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: -2,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Contents" component={ContentsScreen} options={{ title: 'Conteúdos' }} />
      <Tab.Screen name="Quizzes" component={QuizzesScreen} options={{ title: 'Quizzes' }} />
      <Tab.Screen name="Ranking" component={RankingScreen} options={{ title: 'Ranking' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="ContentDetail"
        component={ContentDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="QuizPlay"
        component={QuizPlayScreen}
        options={{ animation: 'slide_from_bottom', gestureEnabled: false }}
      />
      <Stack.Screen
        name="QuizResult"
        component={QuizResultScreen}
        options={{ animation: 'fade', gestureEnabled: false }}
      />
      <Stack.Screen
        name="Forum"
        component={ForumScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Badges"
        component={BadgesScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  tabIconActive: {
    transform: [{ scale: 1.05 }],
  },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginTop: 3,
  },
});
