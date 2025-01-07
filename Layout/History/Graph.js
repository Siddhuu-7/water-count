import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';


const WaterConsumptionScroll = ({ data }) => {
  const formatTime = (time) => {
    return time;
  };
  const Day=()=>{
  const formatDate = (date) => {
      return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
      });
  };
  
  const currentDate = new Date();
  return formatDate(currentDate)
  }


  const getDailyTotal = (dayData) => {
    // console.log("dara",dayData)
    return dayData.reduce((sum, entry) => sum + entry.water, 0);
  };

  if (!data) {
    return ;
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {data.map((dayData, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dateHeader}>{dayData[0].date + (dayData[0].date === Day() ? "(Today)" : "")}</Text>
            
            <View style={styles.chartContainer}>
              <LineChart
                data={{
                  labels: dayData.map(entry => formatTime(entry.time)),
                  datasets: [{
                    data: dayData.map(entry => entry.water)
                  }]
                }}
                width={300}
                height={180}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
                  labelColor: () => '#666',
                  propsForLabels: {
                    fontSize: 10
                  },
                  
                }}
                bezier
                style={styles.chart}
              />
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.totalText}>Daily Total: {getDailyTotal(dayData)}ml</Text>
              <ScrollView style={styles.entriesContainer}>
                {dayData.map((entry, entryIndex) => (
                  <View key={entryIndex} style={styles.entryRow}>
                    <Text style={styles.timeText}>{entry.time}</Text>
                    <Text style={styles.waterText}>{entry.water}ml</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
  dayContainer: {
    width: 300,
    marginHorizontal: 8,
    marginBottom: 20,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1f2937',
  },
  chartContainer: {
    marginBottom: 16,
  },
  chart: {
    borderRadius: 8,
  },
  detailsContainer: {
    marginTop: 8,
    
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2563eb',
  },
  entriesContainer: {
    maxHeight: 350,
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  timeText: {
    color: '#666',
  },
  waterText: {
    fontWeight: '500',
    color: '#1f2937',
  },
});

export default WaterConsumptionScroll;