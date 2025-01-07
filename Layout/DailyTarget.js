import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Record from './Record';
import { getTarget, getwater, putwater, customInTakeGoal } from './Logic/StoredValues';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopUpWaterAdd from './PopUpWaterAdd';

export default function DailyTarget() {
    const [dayTarget, setDayTarget] = useState(0);
    const [waterTaken, setWaterTaken] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [AddWater, setAddWater] = useState(0);
    
    // Animation related states
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const moveAnim = useRef(new Animated.Value(0)).current;
    const [showAnimation, setShowAnimation] = useState(false);
    
    const initializeValues = async () => {
        try {
            const water = await getwater();
            if(water === 0){
                await AsyncStorage.removeItem('waterRecords');
            }
            const IntakeCustomGoal = await customInTakeGoal(null);
            const target = IntakeCustomGoal ? IntakeCustomGoal : await getTarget();
            setWaterTaken(water);
            setDayTarget(target);
        } catch (error) {
            console.error('Error loading values:', error.message);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            initializeValues();
        }, [])
    );

    // Animation function
    const startAnimation = (amount) => {
        setShowAnimation(true);
        moveAnim.setValue(0);
        fadeAnim.setValue(1);

        Animated.parallel([
            Animated.timing(moveAnim, {
                toValue: -50,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 900,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => {
            setShowAnimation(false);
        });
    };

    const handleAddWater = async (amount) => {
        const newWaterTaken = Math.min(waterTaken + amount, dayTarget);
        setAddWater(amount);
        setWaterTaken(newWaterTaken);
        await putwater(newWaterTaken);
        startAnimation(amount);
    };

    const percentage = (waterTaken / dayTarget) * 100;
    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * percentage) / 100;

    return (
        <View style={styles.container}>
            <View style={styles.circleContainer}>
                <Svg width="300" height="300">
                    <Circle
                        cx="150"
                        cy="150"
                        r={radius}
                        stroke="#E8E8E8"
                        strokeWidth="15"
                        fill="transparent"
                    />
                    <Circle
                        cx="150"
                        cy="150"
                        r={radius}
                        stroke="#2196F3"
                        strokeWidth="15"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </Svg>
                <View style={styles.textContainer}>
                    {showAnimation && (
                        <Animated.Text
                            style={[
                                styles.animatedText,
                                {
                                    opacity: fadeAnim,
                                    transform: [{ translateY: moveAnim }],
                                },
                            ]}
                        >
                            +{AddWater}ml Well Done!
                        </Animated.Text>
                    )}
                    <Text style={styles.waterText}>
                        <Text style={{color: '#2196F3'}}>{waterTaken}</Text>/{dayTarget}ml
                    </Text>
                    <Text>Daily Drink Target</Text>
                </View>
            </View>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => setShowPopup(true)}
            >
                <Text style={styles.buttonText}>Add ml</Text>
            </TouchableOpacity>
            <Record waterTaken={AddWater} dayTarget={dayTarget}/>
            <PopUpWaterAdd 
                visible={showPopup}
                onClose={() => setShowPopup(false)} 
                onAdd={(amount) => handleAddWater(amount)} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 150
    },
    circleContainer: {
        position: 'relative',
        width: 300,
        height: 300,
    },
    textContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    waterText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    animatedText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2196F3',
        position: 'absolute',
        alignSelf: 'center',
        top: '40%',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 25,
        width: 150,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});