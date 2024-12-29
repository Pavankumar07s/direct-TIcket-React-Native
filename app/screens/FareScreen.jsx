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

export default function FareScreen() {
  const [trainNumber, setTrainNumber] = useState("");
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [travelClass, setTravelClass] = useState("");
  const [quota, setQuota] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [fares, setFares] = useState(null);

  const validateInputs = () => {
    if (!trainNumber || trainNumber.length < 5) {
      Alert.alert("Invalid Input", "Please enter a valid train number");
      return false;
    }
    if (!fromStation || !toStation) {
      Alert.alert("Invalid Input", "Please enter both stations");
      return false;
    }
    if (!travelClass) {
      Alert.alert("Invalid Input", "Please select a travel class");
      return false;
    }
    if (!date) {
      Alert.alert("Invalid Input", "Please enter a valid date");
      return false;
    }
    return true;
  };

  const handleCheck = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);
      const data = await trainServices.getFare({
        trainNumber,
        fromStation,
        toStation,
        travelClass,
        quota,
        date,
      });
      setFares(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch fare details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Check Train Fare</Text>
      <TextInput
        style={styles.input}
        placeholder="Train Number"
        value={trainNumber}
        onChangeText={setTrainNumber}
        keyboardType="numeric"
        placeholderTextColor="#B0B0B0"
      />
      <TextInput
        style={styles.input}
        placeholder="From Station Code"
        value={fromStation}
        onChangeText={setFromStation}
        placeholderTextColor="#B0B0B0"
      />
      <TextInput
        style={styles.input}
        placeholder="To Station Code"
        value={toStation}
        onChangeText={setToStation}
        placeholderTextColor="#B0B0B0"
      />
      <TextInput
        style={styles.input}
        placeholder="Travel Class (e.g., SL, 3A, 2A)"
        value={travelClass}
        onChangeText={setTravelClass}
        placeholderTextColor="#B0B0B0"
      />
      <TextInput
        style={styles.input}
        placeholder="Quota (e.g., GN, LD)"
        value={quota}
        onChangeText={setQuota}
        placeholderTextColor="#B0B0B0"
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        placeholderTextColor="#B0B0B0"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleCheck}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Check Fare</Text>
        )}
      </TouchableOpacity>
      {fares && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Fare Details:</Text>
          {Object.entries(fares).map(([key, value]) => (
            <Text key={key} style={styles.resultText}>
              {key}: {value}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white", 
  },
  input: {
    height: 50,
    borderColor: "grey",
    color: "white",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey",
  },
  button: {
    backgroundColor: "grey",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#e9ecef",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
