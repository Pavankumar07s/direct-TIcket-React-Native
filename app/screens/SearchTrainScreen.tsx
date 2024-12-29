import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  FlatList,
  Modal,
  Text,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

// Mock train service for API calls
const trainServices = {
  searchTrain: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{ trainName: 'Train 1', departure: '10:00 AM', arrival: '2:00 PM' }]);
      }, 2000);
    });
  },
};

const stationSuggestions = ['Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Bangalore', 'Hyderabad'];

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  error,
  suggestions = [],
  onSelectSuggestion,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={[styles.inputWrapper, error && styles.inputError]}>
      <Ionicons name={icon} size={20} color="grey" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
    {value.length > 0 && suggestions.length > 0 && (
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => onSelectSuggestion(item)}
          >
            <Text style={styles.suggestionText}>{item}</Text>
          </TouchableOpacity>
        )}
        style={styles.suggestionsContainer}
      />
    )}
  </View>
);

export default function SearchTrainScreen() {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateInputs = () => {
    const newErrors = {};
    if (!fromStation.trim()) newErrors.fromStation = 'From station is required';
    if (!toStation.trim()) newErrors.toStation = 'To station is required';
    if (!date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = async () => {
    if (!validateInputs()) return;
    try {
      setLoading(true);
      const data = await trainServices.searchTrain({
        from: fromStation,
        to: toStation,
        date: date.toISOString(),
      });
      Alert.alert('Success', `Found ${data.length} trains`);
    } catch (error) {
      Alert.alert('Error', 'Failed to search trains.');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <FlatList
      ListHeaderComponent={
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>Search Trains</Text>
          <CustomInput
            label="From Station"
            value={fromStation}
            onChangeText={setFromStation}
            icon="location-outline"
            placeholderTextColor="#B0B0B0"
            error={errors.fromStation}
            suggestions={stationSuggestions.filter((station) =>
              station.toLowerCase().includes(fromStation.toLowerCase())
            )}
            onSelectSuggestion={setFromStation}
          />
          <CustomInput
            label="To Station"
            value={toStation}
            onChangeText={setToStation}
            icon="location-outline"
            placeholder={toStation}
            placeholderTextColor="#B0B0B0"
            error={errors.toStation}
            suggestions={stationSuggestions.filter((station) =>
              station.toLowerCase().includes(toStation.toLowerCase())
            )}
            onSelectSuggestion={setToStation}
          />
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={20} color="grey" />
            <Text style={styles.datePickerText}>{date.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.searchButtonText}>Search Trains</Text>
            )}
          </TouchableOpacity>
        </View>
      }
      data={[]}
      renderItem={null}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white", 
  },
  formContainer: {
    padding: 16,
    color : 'grey',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: 'white',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color : 'grey',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginTop: 16,
    color : '#666',
  },
  datePickerText: {
    marginLeft: 8,
    fontSize: 16,
    color: 'grey',
  },
  searchButton: {
    marginTop: 16,
    backgroundColor: 'grey',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  suggestionsContainer: {
    maxHeight: 150,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    marginTop: 8,
  },
  suggestionItem: {
    padding: 10,
  },
  suggestionText: {
    fontSize: 16,
    color: 'white',
  },
});
