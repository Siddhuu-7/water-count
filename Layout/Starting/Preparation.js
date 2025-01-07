import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

export default function LoadingAnimation() {
  const navigation = useNavigation();
  const translateY = useRef(new Animated.Value(height)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const fadeInOpacity = useRef(new Animated.Value(0)).current;
  const fadeInScale = useRef(new Animated.Value(0.9)).current;

  const bubbles = [
    useRef(new Animated.Value(height)).current,
    useRef(new Animated.Value(height)).current,
    useRef(new Animated.Value(height)).current,
    useRef(new Animated.Value(height)).current,
    useRef(new Animated.Value(height)).current,
  ];

  useEffect(() => {
    // Start the main bottom-to-top animation
    const slideUpAnimation = Animated.timing(translateY, {
      toValue: height * 0.4,
      duration: 1000,
      useNativeDriver: true,
    });

    // Progress bar animation
    const progressAnimation = Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    });

    // Fade in and scale animation
    const fadeInAnimation = Animated.parallel([
      Animated.timing(fadeInOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]);

    // Create bubble animations
    const bubbleAnimations = bubbles.map((bubble, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(bubble, {
            toValue: -100,
            duration: 3000 + (index * 500),
            useNativeDriver: true,
            delay: index * 300,
          }),
          Animated.timing(bubble, {
            toValue: height,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    });

    // Start all animations
    Animated.parallel([
      slideUpAnimation,
      progressAnimation,
      fadeInAnimation,
      ...bubbleAnimations,
    ]).start();

    // Set up navigation timer
    const navigationTimer = setTimeout(() => {
      // Navigate to Start screen after animations complete
      navigation.replace('Start'); // Using replace to prevent going back to loading screen
    }, 5000); // Same duration as progress animation

    return () => {
      // Cleanup animations and timer
      bubbleAnimations.forEach(animation => animation.stop());
      clearTimeout(navigationTimer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Floating bubbles */}
      {bubbles.map((bubble, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bubble,
            {
              left: `${15 + (index * 18)}%`,
              transform: [{ translateY: bubble }],
            },
          ]}
        />
      ))}

      {/* Main content container */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            transform: [
              { translateY },
              { scale: fadeInScale },
            ],
            opacity: fadeInOpacity,
          },
        ]}
      >
        <Text style={styles.title}>Preparing your Hydration Plan</Text>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>

        {/* Progress percentage */}
        <Animated.Text style={styles.percentage}>
          {progress.interpolate({
            inputRange: [0, 100],
            outputRange: ['100%', '100%'],
          })}
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006994',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressContainer: {
    width: 200,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  percentage: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  bubble: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});