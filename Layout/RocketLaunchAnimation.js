import React, { useRef, useEffect, useState } from 'react';
import { 
  View, 
  Animated, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Text 
} from 'react-native';
import { Svg, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');





const RocketLaunchAnimation = ({shouldLaunch}) => {
  const rocketPosition = useRef(new Animated.Value(height - 200)).current;
  const smokeOpacity = useRef(new Animated.Value(0)).current;
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    if (shouldLaunch && !isLaunched) {
      launchRocket();
    }
  }, [shouldLaunch]);






  const createSmoke = () => {
    smokeOpacity.setValue(1);
    Animated.timing(smokeOpacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      if (isLaunched) createSmoke();
    });
  };

  const resetAnimation = () => {
    setIsLaunched(false);
    rocketPosition.setValue(height - 200);
    smokeOpacity.setValue(0);
  };

  const launchRocket = () => {
    setIsLaunched(true);
    createSmoke();
    // setDrl(false);
    Animated.timing(rocketPosition, {
      toValue: -200,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // Reset animation after rocket goes off screen
      setTimeout(resetAnimation, 500);
    });
  };

  const AnimatedSmokeParticle = Animated.createAnimatedComponent(View);
// launchRocket();
// drl ? launchRocket() : null;
  return (
    <View style={styles.container}>

      {/* Smoke Effect */}
      <AnimatedSmokeParticle
        style={[
          styles.smoke,
          {
            opacity: smokeOpacity,
            transform: [
              { translateY: rocketPosition },
              { scale: smokeOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [2, 0.5],
              })},
            ],
          },
        ]}
      />

      {/* Rocket */}
      <Animated.View
        style={[
          styles.rocketContainer,
          {
            transform: [{ translateY: rocketPosition }],
          },
        ]}
      >
        <Svg width={40} height={120} viewBox="0 0 40 120">
          <Path
            d="M20 0 L40 80 L35 85 L25 80 L15 80 L5 85 L0 80 Z"
            fill="#ff4444"
          />
          <Path
            d="M15 80 L25 80 L20 120 Z"
            fill="#cc0000"
          />
          {isLaunched && (
            <>
              <Path
                d="M15 80 L20 120 L10 100 Z"
                fill="#ff9933"
              />
              <Path
                d="M25 80 L20 120 L30 100 Z"
                fill="#ff9933"
              />
            </>
          )}
        </Svg>
      </Animated.View>

      {/* Launch Button */}
      {/* <TouchableOpacity
        style={[
          styles.button,
          isLaunched && styles.buttonDisabled,
        ]}
        onPress={launchRocket}
        disabled={isLaunched}
      >
        <Text style={styles.buttonText}>
          {isLaunched ? 'Launching...' : 'Launch Rocket'}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  rocketContainer: {
    position: 'absolute',
    left: width / 2 - 20,
  },
  smoke: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    left: width / 2 - 20,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    left: width / 2 - 75,
    backgroundColor: '#ff4444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: 150,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RocketLaunchAnimation;