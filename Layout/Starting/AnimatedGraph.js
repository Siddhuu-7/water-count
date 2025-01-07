import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Circle,
  Text,
  Line,
  Rect,
  LinearGradient,
  Stop,
  Defs,
  G,
} from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const data = [
  { month: 'Q1', value: 60, trend: 150 },
  { month: 'Q2', value: 80, trend: 100 },
  { month: 'Q3', value: 70, trend: 130 },
  { month: 'Q4', value: 90, trend: 70 },
];

const AnimatedGraph = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const lineProgress = useRef(new Animated.Value(0)).current;
  const barHeights = useRef(data.map(() => new Animated.Value(0))).current;

  const points = data.map((d, i) => ({
    x: 50 + i * 100,
    y: d.trend,
    value: d.value,
    month: d.month,
  }));

  const getCurrentPath = () => {
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      const controlX = (prevPoint.x + currentPoint.x) / 2;
      path += ` C ${controlX} ${prevPoint.y}, ${controlX} ${currentPoint.y}, ${currentPoint.x} ${currentPoint.y}`;
    }
    
    return path;
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 800);

    // Start animations when loading is complete
    const startAnimation = () => {
      // Animate line
      Animated.timing(lineProgress, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();

      // Animate bars
      const barAnimations = barHeights.map((barHeight, index) =>
        Animated.timing(barHeight, {
          toValue: data[index].value,
          duration: 1500,
          useNativeDriver: true,
        })
      );

      Animated.parallel(barAnimations).start();
    };

    if (!isLoading) {
      startAnimation();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Performance Metrics</Text>
        </View>
        <Svg height={300} width={SCREEN_WIDTH - 32}>
          {/* Y-axis labels and grid lines */}
          {[0, 25, 50, 75, 100].map((value, i) => (
            <G key={`label-${i}`}>
              <Text
                x="10"
                y={250 - value * 2}
                textAnchor="end"
                fill="#6B7280"
                fontSize="12"
              >
                {value}
              </Text>
              <Line
                x1="25"
                y1={250 - value * 2}
                x2="375"
                y2={250 - value * 2}
                stroke="#E5E7EB"
                strokeWidth="0.5"
              />
            </G>
          ))}

          {/* Bars */}
          {barHeights.map((barHeight, i) => (
            <G key={`bar-group-${i}`}>
              <AnimatedRect
                x={20 + i * 100}
                y={barHeight.interpolate({
                  inputRange: [0, 100],
                  outputRange: [250, 50],
                })}
                width={60}
                height={barHeight.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 200],
                })}
                fill="#60A5FA"
                fillOpacity={0.3}
              />
              <Text
                x={50 + i * 100}
                y={270}
                textAnchor="middle"
                fill="#6B7280"
                fontSize="12"
              >
                {data[i].month}
              </Text>
            </G>
          ))}

          {/* Animated line */}
          <Defs>
            <LinearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#3B82F6" />
              <Stop offset="1" stopColor="#60A5FA" />
            </LinearGradient>
          </Defs>
          <AnimatedPath
            d={getCurrentPath()}
            stroke="url(#lineGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray={[1000]}
            strokeDashoffset={lineProgress.interpolate({
              inputRange: [0, 1],
              outputRange: [1000, 0],
            })}
          />

          {/* Data points */}
          {points.map((point, i) => (
            <AnimatedCircle
              key={`point-${i}`}
              cx={point.x}
              cy={point.y}
              r={4}
              fill="white"
              stroke="#3B82F6"
              strokeWidth={2}
              opacity={lineProgress.interpolate({
                inputRange: [i / points.length, (i + 1) / points.length],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              })}
            />
          ))}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  card: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedGraph;