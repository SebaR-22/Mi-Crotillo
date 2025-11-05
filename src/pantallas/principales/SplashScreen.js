import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const loadingWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of smooth animations
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(loadingWidth, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }),
    ]).start();

    // Check token and navigate
    const checkAndNavigate = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token') || 
                     await AsyncStorage.getItem('token') || 
                     await AsyncStorage.getItem('user_token');

        // Wait for animations to finish
        setTimeout(() => {
          if (token) {
            navigation.reset({ index: 0, routes: [{ name: 'AppPrincipal' }] });
          } else {
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          }
        }, 1500);
      } catch (e) {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      }
    };

    checkAndNavigate();
  }, [fadeAnim, scaleAnim, translateY, loadingWidth, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: translateY }
            ]
          }
        ]}
      >
        <View style={styles.logoWrapper}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>MB</Text>
          </View>
          <View style={styles.decorativeLine} />
        </View>
        
        <Text style={styles.title}>MiBolsillo</Text>
        <Text style={styles.subtitle}>Gestiona tus finanzas</Text>
        
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <Animated.View 
              style={[
                styles.loadingProgress,
                {
                  width: loadingWidth.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%']
                  })
                }
              ]} 
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0084ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0084ff',
  },
  decorativeLine: {
    width: 40,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 1.5,
    marginTop: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 30,
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingBar: {
    width: 180,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: '#fff',
  }
});

export default SplashScreen;
