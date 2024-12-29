import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, ScrollView, Dimensions } from 'react-native';
// import {obj} from './Streak';
import SetLimit from './SetLimit';
import { OutButton } from './Buttons';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Login from './Login';
// import RocketLaunchAnimation from './RocketLaunchAnimation';
export default function Profile() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    // Add animated values for both name and streak
    const nameShake = new Animated.Value(0);
    const streakShake = new Animated.Value(0);
    const navigation = useNavigation();
    // Add state for streak
    const [streak, setStreak] = useState(0);
    const [parsedData,setParsedData]=useState({})
    // Add useEffect to fetch streak
    useEffect(() => {
        const getStreak = async () => {
            try {
                const value = await AsyncStorage.getItem('StreakArrayLength');
                const userData = await AsyncStorage.getItem('userData')
                setParsedData(JSON.parse(userData))
                console.log(parsedData, "userdata");
                setStreak(value);
                console.log(streak,"this is the streak")
            } catch (error) {
                console.error('Error fetching streak:', error);
                setStreak(0);
            }
        };
        getStreak();
    }, []);

    useEffect(() => {
        // Create shake animation sequence
        const shakeAnimation = (value) => {
            return Animated.sequence([
                Animated.timing(value, {
                    toValue: 10,
                    duration: 100,
                    useNativeDriver: true
                }),
                Animated.timing(value, {
                    toValue: -10,
                    duration: 100,
                    useNativeDriver: true
                }),
                Animated.timing(value, {
                    toValue: 10,
                    duration: 100,
                    useNativeDriver: true
                }),
                Animated.timing(value, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                })
            ]);
        };

    
        Animated.sequence([
            shakeAnimation(nameShake),
            Animated.delay(150),
            shakeAnimation(streakShake)
        ]).start();
    }, []);

    
    const getResponsiveStyles = () => {
        if (windowWidth < 380) { 
            return {
                profilePic: {
                    width: 120,
                    height: 120,
                },
                label: {
                    fontSize: 16,
                },
                value: {
                    fontSize: 14,
                },
                infoContainer: {
                    width: '95%',
                }
            };
        } else if (windowWidth < 768) { 
            return {
                profilePic: {
                    width: 120,
                    height: 120,
                },
                label: {
                    fontSize: 18,
                },
                value: {
                    fontSize: 16,
                },
                infoContainer: {
                    width: '85%',
                }
            };
        } else { 
            return {
                profilePic: {
                    width: 150,
                    height: 150,
                },
                label: {
                    fontSize: 22,
                },
                value: {
                    fontSize: 20,
                },
                infoContainer: {
                    width: '70%',
                }
            };
        }
    };

    const responsiveStyles = getResponsiveStyles();

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.pic}>
                    <Image
                        style={[styles.profilePic, responsiveStyles.profilePic]}
                        source={require('../assets/drinking.jpg')}
                        resizeMode="cover"
                    />
                </View>
                
                <View style={[styles.infoContainer, responsiveStyles.infoContainer]}>
                    <View style={styles.labelContainer}>
                        <Text style={[styles.label, responsiveStyles.label]}>Hello !</Text>
                    </View>               
                    <Animated.Text 
                        style={[
                            styles.value,
                            responsiveStyles.value,
                            {transform: [{translateX: nameShake}]}
                        ]}
                    >
                       {parsedData.username}
                    </Animated.Text>
                    <View style={styles.labelContainer}>
                        <Text style={[styles.label, responsiveStyles.label]}>Streak:</Text>
                    </View>
                    <Animated.Text 
                        style={[
                            styles.value,
                            responsiveStyles.value,
                            {paddingBottom: 2},
                            {transform: [{translateX: streakShake}]}
                        ]}
                    >
                        🔥 {streak}
                    </Animated.Text>
                    <View style={styles.labelContainer}>
                        <Text style={[styles.label, responsiveStyles.label]}>Date of Birth:</Text>
                    </View>
                    <Animated.Text 
                        style={[
                            styles.value,
                            responsiveStyles.value,
                            {paddingBottom: 2},
                            {transform: [{translateX: streakShake}]}
                        ]}
                    >
                         {parsedData.dob}
                    </Animated.Text>
{/* <RocketLaunchAnimation rl={rl}/> */}
                    <View style={styles.labelContainer}>
                        <Text style={[styles.label, responsiveStyles.label]}>Email:</Text>
                    </View>
                    <Text style={[styles.value, responsiveStyles.value, {fontFamily:'Italiana'}]}>{parsedData.email}</Text>
                </View>
                <SetLimit/>
               
            </View>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingTop:100,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        paddingBottom: 400,
    },
    pic:{
        paddingRight:200,
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 60, 
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#4caf50',
    },
    infoContainer: {
        width: '80%',
        alignItems: 'flex-start',
        padding: 10,
    },
    labelContainer: {
        width: '100%',
        marginBottom: 5,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    value: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
});
