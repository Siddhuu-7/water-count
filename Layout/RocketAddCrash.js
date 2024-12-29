import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Dimensions, Easing } from 'react-native';

const { width, height } = Dimensions.get('window');

// Number of raindrops to create
const RAINDROP_COUNT = 50;

const RainAnimation = () => {
  
  const [raindrops, setRaindrops] = useState([]);

  
  const createRaindrop = () => {
    const startX = Math.random() * width;
    const startY = -50;
    const duration = Math.random() * 1000 + 1000; 
    const dropPosition = new Animated.ValueXY({ x: startX, y: startY });

    // Create the falling animation
    const animation = Animated.timing(dropPosition, {
      toValue: { x: startX + 50, y: height + 50 }, // Add slight horizontal movement
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    // Reset and restart animation
    const restart = () => {
      dropPosition.setValue({ x: startX, y: startY });
      animation.start(restart);
    };

    return {
      position: dropPosition,
      start: () => animation.start(restart),
      style: {
        opacity: Math.random() * 0.6 + 0.4, // Random opacity
        transform: dropPosition.getTranslateTransform(),
      },
    };
  };

  // Initialize raindrops
  useEffect(() => {
    const drops = Array(RAINDROP_COUNT)
      .fill()
      .map(() => createRaindrop());

    setRaindrops(drops);

    // Start all raindrop animations
    drops.forEach(drop => drop.start());

    return () => {
      // Clean up animations if needed
    };
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {raindrops.map((drop, index) => (
        <Animated.View
          key={index}
          style={[styles.raindrop, drop.style]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: -1, // Ensure rain appears behind other components
  },
  raindrop: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: '#ADD8E6',
    borderRadius: 1,
    transform: [{ rotate: '20deg' }],
  },
});

export default RainAnimation;