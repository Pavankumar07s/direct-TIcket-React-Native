import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemedText } from '@/components/ThemedText';
export default function HomeScreen() {
  // Form state
  interface FormData {
    from: string;
    fromStation: string;
    to: string;
    toStation: string;
    departureDate: Date;
    returnDate: Date;
    travelers: string;
    class: string;
  }

  const [formData, setFormData] = useState<FormData>({
    from: "",
    fromStation: "",
    to: "",
    toStation: "",
    departureDate: new Date(),
    returnDate: new Date(),
    travelers: "1 Adult",
    class: "3rd AC"
  });

  const stationShortNames: { [key: string]: string } = {
    "New Delhi Railway Station": "NDLS",
    "Mumbai Central Railway Station": "MMCT",
    "Howrah Junction": "HWH",
    "Chennai Central Railway Station": "MAS",
    "Sealdah Railway Station": "SDAH",
    "Secunderabad Junction": "SC",
    "Ernakulam Junction": "ERS",
    "Bandra Terminus": "BDTS",
    "Lokmanya Tilak Terminus": "LTT",
    "Rajiv Gandhi International Airport": "RGIA",
    "Ahmedabad Junction": "ADI",
    "Patna Junction": "PNBE",
    "Kanpur Central": "CNB",
    "Lucknow Charbagh": "LKO",
    "Varanasi Junction": "BSB",
    "Kolkata Railway Station": "KOAA",
    "Pune Junction": "PUNE",
    "Bangalore City Railway Station": "SBC",
    "Madurai Junction": "MDU",
    "Coimbatore Junction": "CBE",
    "Jaipur Junction": "JP",
    "Thiruvananthapuram Central": "TVC",
    "Visakhapatnam Junction": "VSKP"
  };
  

  
  // Modal states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateType, setDateType] = useState<null | 'departureDate' | 'returnDate'>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Handle form input changes
  const handleInputChange = (field: keyof FormData, value: string | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle location swap
  const handleSwap = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from,
      fromStation: prev.toStation,
      toStation: prev.fromStation
    }));
  };

  // Handle date changes
  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange(dateType!, selectedDate);
    }
  };

  // Handle search
  const handleSearch = () => {
    // Convert station names to their short codes before sending
    const fromShort = stationShortNames[formData.fromStation] || formData.fromStation;
    const toShort = stationShortNames[formData.toStation] || formData.toStation;
  
    const newSearch = {
      from: fromShort, 
      to: toShort,     
      date: formData.departureDate.toLocaleDateString()
    };
  
    setRecentSearches(prev => [newSearch, ...prev.slice(0, 4)]);
    // yaha pe backend call karna hai
  };
  
  const handleSuggestionSelect = (stationName: string, field: 'from' | 'to') => {
    const shortName = stationShortNames[stationName] || stationName; // Fallback to full name if no short name found
    if (field === 'from') {
      handleInputChange('from', shortName);
      handleInputChange('fromStation', stationName); // Display the full station name
    } else if (field === 'to') {
      handleInputChange('to', shortName);
      handleInputChange('toStation', stationName); // Display the full station name
    }
    setShowSuggestions(false); 
  };
  

  const renderSuggestions = (field: 'from' | 'to') => {
    const query = field === 'from' ? formData.from : formData.to;
  
    if (query.length > 0 && showSuggestions) { 
      const suggestions = [
  "New Delhi Railway Station",
  "Mumbai Central Railway Station",
  "Howrah Junction",
  "Chennai Central Railway Station",
  "Sealdah Railway Station",
  "Secunderabad Junction",
  "Ernakulam Junction",
  "Bandra Terminus",
  "Lokmanya Tilak Terminus",
  "Rajiv Gandhi International Airport",
  "Ahmedabad Junction",
  "Patna Junction",
  "Kanpur Central",
  "Lucknow Charbagh",
  "Varanasi Junction",
  "Kolkata Railway Station",
  "Pune Junction",
  "Bangalore City Railway Station",
  "Madurai Junction",
  "Coimbatore Junction",
  "Jaipur Junction",
  "Thiruvananthapuram Central",
  "Visakhapatnam Junction",
  "Dehradun Railway Station",
  "Pune Railway Station",
  "Kings Cross, London, UK"
]

      return (
        <View style={styles.suggestionsContainer}>
          {suggestions
            .filter(station => station.toLowerCase().includes(query.toLowerCase())) 
            .map((station, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => handleSuggestionSelect(station, field)}
                style={styles.suggestionItem}
              >
                <Text style={styles.suggestionText}>{station}</Text>
              </TouchableOpacity>
            ))}
        </View>
      );
    }
    return null;
  };
  
  

  const renderContent = () => {
        return (
          <>
            {/* Train Image */}
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/images/banner.png')} // Update the path to your PNG file
                style={styles.trainImage}
                resizeMode="contain"
              />
            </View>

            {/* Travel Form */}
            <View style={styles.formContainer}>
              {/* From Field */}
              <View style={styles.inputRow}>
                <Ionicons name="location-outline" size={24} color="#000" />
                <View style={styles.inputSection}>
                  <Text style={styles.label}>From</Text>
                  <TextInput
                      style={styles.input}
                      value={formData.from}
                      onChangeText={(text) => {
                        handleInputChange('from', text);
                        setShowSuggestions(true);  // Show suggestions when typing
                      }}
                      placeholder="From"
                      placeholderTextColor="#333"
                    />
                  <Text style={styles.subLabel}>{formData.fromStation}</Text>
                </View>
                {renderSuggestions('from')}
              </View>
              

              {/* Swap Button */}
              <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
                <Ionicons name="swap-vertical-outline" size={24} color="#007AFF" />
              </TouchableOpacity>

              {/* To Field */}
              <View style={styles.inputRow}>
                <Ionicons name="location-outline" size={24} color="#000" />
                <View style={styles.inputSection}>
                  <Text style={styles.label}>To</Text>
                  <TextInput
                      style={styles.input}
                      value={formData.to}
                      onChangeText={(text) => {
                        handleInputChange('to', text);
                        setShowSuggestions(true); 
                      }}
                      placeholder="To"
                      placeholderTextColor="#333"
                    />
                    <Text style={styles.subLabel}>{formData.toStation}</Text>
                </View>
              {renderSuggestions('to')}
              </View>
              
              

              {/* Date Fields */}
              <View style={styles.dateContainer}>
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={() => {
                    setDateType('departureDate');
                    setShowDatePicker(true);
                  }}
                >
                  <Text style={styles.label}>Departure</Text>
                  <Text style={styles.input}>
                    {formData.departureDate.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Search Button */}
              <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>

            {/* Recent Searches */}
            <View style={styles.recentSearchContainer}>
                <ThemedText style={styles.searchResult}type="title">Search Results</ThemedText>

            {/* Check if there are recent searches */}
            {recentSearches.length === 0 ? (
              // Display message and icon if no results
              <View style={styles.noResultsContainer}>
                <Ionicons name="search-outline" size={50} color="#ccc" />
                <Text style={styles.noResultsText}>No search results</Text>
              </View>
            ) : (
              // Display recent searches if there are any
              recentSearches.map((search, index) => (
                <View key={index} style={styles.recentSearch}>
                  <Ionicons name="time-outline" size={24} color="#000" />
                  <View style={styles.recentSearchTextContainer}>
                    <Text style={styles.recentSearchText}>
                      {search.from} → {search.to}
                    </Text>
                    <Text style={styles.recentSearchDate}>{search.date}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
          </>
        );  
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        {renderContent()}
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <View style={{ width: "90%", backgroundColor: "#fff", borderRadius: 10, padding: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Select {dateType === 'departureDate' ? 'Departure' : 'Return'} Date</Text>
              <DateTimePicker
                value={formData[dateType!]}
                mode="date"
                display="inline"
                onChange={handleDateChange}
              />
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                <TouchableOpacity onPress={() => setShowDatePicker(false)} style={{ padding: 10 }}>
                  <Text style={{ color: "#007AFF" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowDatePicker(false);
                    handleDateChange(null, formData[dateType!]);
                  }}
                  style={{ padding: 10 }}
                >
                  <Text style={{ color: "#007AFF", fontWeight: "bold" }}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  trainImage: {
    width: "100%",
    height: 100, 
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  formContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputSection: {
    flex: 1,
    paddingLeft: 10,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
    color: "#333",
  },
  subLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  swapButton: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f0f8ff",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  dateInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  recentSearchContainer: {
    backgroundColor: "#fff",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  recentSearch: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  recentSearchTextContainer: {
    marginLeft: 10,
  },
  recentSearchText: {
    fontSize: 14,
    fontWeight: "600",
  },
  recentSearchDate: {
    fontSize: 12,
    color: "#888",
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 60,  // Adjust according to the position of your input field
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    maxHeight: 200,  // Limit the height of suggestions
    overflow: 'scroll',
    zIndex: 10,
  },
  
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
  },
  
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },

  suggestionItemHovered: {
    backgroundColor: '#f0f0f0',  
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 10,
  },
  searchResult:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  }
});
