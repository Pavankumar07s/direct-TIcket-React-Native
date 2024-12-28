import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { trainServices } from "../services/api";

export default function ScheduleScreen() {
  const [trainNumber, setTrainNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState(null);

  const validateInput = () => {
    if (!trainNumber || trainNumber.length < 5) {
      Alert.alert("Invalid Input", "Please enter a valid train number");
      return false;
    }
    return true;
  };

  const handleCheck = async () => {
    if (!validateInput()) return;

    try {
      setLoading(true);
      const data = await trainServices.getSchedule(trainNumber);
      setSchedule(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch schedule. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Train Number"
          value={trainNumber}
          onChangeText={setTrainNumber}
          keyboardType="numeric"
          maxLength={5}
          placeholderTextColor="#B0B0B0"
        />
      </View>
      <View>
        <TouchableOpacity
          style={[styles.checkButton, loading && styles.disabledButton]}
          onPress={handleCheck}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Get Schedule</Text>
          )}
        </TouchableOpacity>
      </View>

      {schedule && (
        <ScrollView style={styles.scheduleContainer}>
          <View style={styles.trainInfo}>
            <Text style={styles.trainName}>{schedule.trainName}</Text>
            <Text style={styles.trainNumber}>#{schedule.trainNumber}</Text>
            <Text style={styles.runningDays}>
              Runs on: {schedule.runningDays.join(", ")}
            </Text>
          </View>

          {schedule.stations.map((station, index) => (
            <View key={station.code} style={styles.stationCard}>
              <View style={styles.stationDot} />
              {index !== schedule.stations.length - 1 && (
                <View style={styles.stationLine} />
              )}
              <View style={styles.stationInfo}>
                <Text style={styles.stationName}>{station.name}</Text>
                <Text style={styles.stationCode}>{station.code}</Text>
                <View style={styles.timeContainer}>
                  <Text style={styles.arrivalTime}>
                    Arr: {station.arrivalTime}
                  </Text>
                  <Text style={styles.departureTime}>
                    Dep: {station.departureTime}
                  </Text>
                  <Text style={styles.distance}>{station.distance} km</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
    borderRadius: 8,
    paddingLeft: 16,
    backgroundColor: "#F1F1F1",
  },
  checkButton: {
    marginLeft: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#2196F3",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#B0B0B0",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  scheduleContainer: {
    marginTop: 20,
  },
  trainInfo: {
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  trainName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  trainNumber: {
    fontSize: 16,
    color: "#888",
    marginTop: 4,
  },
  runningDays: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
  },
  stationCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  stationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2196F3",
    marginRight: 12,
  },
  stationLine: {
    width: 2,
    height: "100%",
    backgroundColor: "#2196F3",
    marginLeft: 6,
  },
  stationInfo: {
    flex: 1,
  },
  stationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  stationCode: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  timeContainer: {
    marginTop: 8,
  },
  arrivalTime: {
    fontSize: 14,
    color: "#2196F3",
  },
  departureTime: {
    fontSize: 14,
    color: "#4CAF50",
  },
  distance: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});
