import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { trainServices } from "../services/api";

export default function LiveStatusScreen() {
  const [trainNumber, setTrainNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

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
      const data = await trainServices.getLiveStatus(trainNumber);
      setStatus(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch live status. Please try again.");
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
            <Text style={styles.buttonText}>Check Status</Text>
          )}
        </TouchableOpacity>
      </View>

      {status && (
        <View style={styles.statusContainer}>
          <View style={styles.statusHeader}>
            <Text style={styles.trainName}>{status.trainName}</Text>
            <Text style={styles.trainNumber}>#{status.trainNumber}</Text>
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location" size={24} color="#2196F3" />
            <Text style={styles.currentStation}>
              Current Station: {status.currentStation}
            </Text>
          </View>

          <View style={styles.delayContainer}>
            <Text
              style={[
                styles.delay,
                { color: status.delay > 0 ? "#F44336" : "#4CAF50" },
              ]}
            >
              {status.delay > 0
                ? `Delayed by ${status.delay} minutes`
                : "Running on time"}
            </Text>
          </View>

          <View style={styles.nextStationContainer}>
            <Text style={styles.label}>Next Station:</Text>
            <Text style={styles.value}>{status.nextStation}</Text>
            <Text style={styles.eta}>ETA: {status.expectedArrival}</Text>
          </View>
        </View>
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
    width: "100%",
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
    width: "100%",
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
  statusContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  trainName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  trainNumber: {
    fontSize: 16,
    color: "#888",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  currentStation: {
    fontSize: 16,
    color: "#555",
    marginLeft: 8,
  },
  delayContainer: {
    marginBottom: 12,
  },
  delay: {
    fontSize: 16,
    fontWeight: "600",
  },
  nextStationContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: "#888",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  eta: {
    fontSize: 14,
    color: "#2196F3",
  },
});
