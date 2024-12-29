import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Days() {
    const [dats, setDats] = useState([
        { day: "Ⓢ", isComplete: false, key: 0 },
        { day: "Ⓜ", isComplete: false, key: 1 },
        { day: "Ⓣ", isComplete: false, key: 2 },
        { day: "Ⓦ", isComplete: false, key: 3 },
        { day: "Ⓣ", isComplete: false, key: 4 },
        { day: "Ⓕ", isComplete: false, key: 5 },
        { day: "Ⓢ", isComplete: false, key: 6 },
    ]);

    useEffect(() => {
        const initializeWeek = async () => {
            const today = new Date();
            const currentDay = today.getDay(); // Get current day (0 = Sunday, 1 = Monday, etc.)
            const currentWeek = getWeekNumber(today); // Get current week number

            try {
                const storedWeek = await AsyncStorage.getItem('currentWeek');

                if (storedWeek === null || parseInt(storedWeek, 10) !== currentWeek) {
                   
                    setDats((prevDats) =>
                        prevDats.map((item) => ({ ...item, isComplete: false }))
                    );
                    await AsyncStorage.setItem('currentWeek', currentWeek.toString());
                } else {
                    
                    setDats((prevDats) =>
                        prevDats.map((item) =>
                            item.key <= currentDay || (currentDay === 0 && item.key === 0)
                                ? { ...item, isComplete: true }
                                : item
                        )
                    );
                }
            } catch (error) {
                console.error('Error accessing AsyncStorage:', error);
            }
        };

        initializeWeek();
    }, []);

 
    const getWeekNumber = (date) => {
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + startOfYear.getDay() + 1) / 7);
    };

    return (
        <View style={styles.container}>
            {dats.map((item, index) => (
                <TouchableOpacity key={index}>
                    <Text
                        style={[
                            styles.text,
                            item.isComplete && { color: 'blue' }
                        ]}
                    >
                        {item.day}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#e8f5e9',
        paddingTop:80,
        // paddingBlock:10,
        // padding: 1,
    },
    text: {
        fontSize: 30,
        fontWeight: '500',
        color: 'black',
        margin: 10, 
    },
});
