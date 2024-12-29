import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Modal,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
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

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateType, setDateType] = useState<null | 'departureDate' | 'returnDate'>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState([]);


  const handleInputChange = (field: keyof FormData, value: string | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSwap = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from,
      fromStation: prev.toStation,
      toStation: prev.fromStation
    }));
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange(dateType!, selectedDate);
    }
  };

  const handleSearch = async() => {
    const fromShort = stationShortNames[formData.fromStation] || formData.fromStation;
    const toShort = stationShortNames[formData.toStation] || formData.toStation;
  
    const newSearch = {
      from: fromShort,
      to: toShort,
      date: formData.departureDate.toLocaleDateString()
    };
    console.log(newSearch);
  
    setRecentSearches(prev => [newSearch, ...prev.slice(0, 4)]);
    try {
      // Make the POST request to the backend
      const response = await fetch("https:", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSearch),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Search Results:", data);
        setSearchResults(data);
      } else {
        console.error("Failed to fetch search results:", response.statusText);
      }
    } catch (error) {
      console.error("Error making the request:", error);
    }
  };

  const handleSuggestionSelect = (stationName: string, field: 'from' | 'to') => {
    const shortName = stationShortNames[stationName] || stationName;
    if (field === 'from') {
      handleInputChange('from', shortName);
      handleInputChange('fromStation', stationName);
    } else if (field === 'to') {
      handleInputChange('to', shortName);
      handleInputChange('toStation', stationName);
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
        "Visakhapatnam Junction"
      ];

      const filteredSuggestions = suggestions.filter(station => 
        station.toLowerCase().includes(query.toLowerCase())
      );

      return (
        <View style={styles.suggestionsContainer}>
          <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 200 }}>
            {filteredSuggestions.map((station, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.suggestionItem}
                onPress={() => handleSuggestionSelect(station, field)}
              >
                <Ionicons name="train-outline" size={20} color="#666666" style={styles.suggestionIcon} />
                <Text style={styles.suggestionText}>{station}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );
    }
    return null;
  };

  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appNameText}>DirectTickets</Text>
        </View>

        {/* Search Form */}
        <View style={styles.formContainer}>
          {/* From Field */}
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="location-outline" size={24} color="#FFFFFF" />
            </View>
            
            <View style={styles.inputWrapper}>
              
              <TextInput
                style={styles.input}
                value={formData.from}
                onChangeText={(text) => {
                  handleInputChange('from', text);
                  setShowSuggestions(true);
                }}
                placeholder="Enter departure station"
                placeholderTextColor="#666666"
              />
              {formData.fromStation && (
                <Text style={styles.stationName}>{formData.fromStation}</Text>
              )}
            </View>
            {renderSuggestions('from')}
          </View>

          {/* Swap Button */}
          <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
            <Ionicons name="swap-vertical" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* To Field */}
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="location-outline" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={formData.to}
                onChangeText={(text) => {
                  handleInputChange('to', text);
                  setShowSuggestions(true);
                }}
                placeholder="Enter destination station"
                placeholderTextColor="#666666"
              />
              {formData.toStation && (
                <Text style={styles.stationName}>{formData.toStation}</Text>
              )}
            </View>
            {renderSuggestions('to')}
          </View>

          {/* Date Selection */}
          <TouchableOpacity 
            style={styles.dateContainer}
            onPress={() => {
              setDateType('departureDate');
              setShowDatePicker(true);
            }}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.dateWrapper}>
              <Text style={styles.label}>Travel Date</Text>
              <Text style={styles.dateText}>
                {formData.departureDate.toLocaleDateString()}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search Trains</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Searches */}
        <View style={styles.recentSearchesContainer}>
          <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
          
          {recentSearches.length === 0 ? (
            <View style={styles.noSearchesContainer}>
              <Ionicons name="search-outline" size={48} color="#666666" />
              <Text style={styles.noSearchesText}>No recent searches</Text>
            </View>
          ) : (
            recentSearches.map((search, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.recentSearchItem}
                onPress={() => {
                  handleInputChange('from', search.from);
                  handleInputChange('to', search.to);
                }}
              >
                <View style={styles.recentSearchIcon}>
                  <Ionicons name="time-outline" size={24} color="#FFFFFF" />
                </View>
                <View style={styles.recentSearchInfo}>
                  <Text style={styles.recentSearchRoute}>
                    {search.from} → {search.to}
                  </Text>
                  <Text style={styles.recentSearchDate}>{search.date}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
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
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <DateTimePicker
                value={formData[dateType!]}
                mode="date"
                display="inline"
                onChange={handleDateChange}
                minimumDate={new Date()}
                textColor="#FFFFFF"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.modalButton} 
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonConfirm]}
                  onPress={() => {
                    setShowDatePicker(false);
                    handleDateChange(null, formData[dateType!]);
                  }}
                >
                  <Text style={styles.modalButtonText}>Confirm</Text>
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
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 20,
  },
  header: {
    marginTop: 8,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  appNameText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  formContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  iconContainer: {
    flex:1,
    flexDirection: 'row',
    width: 40,
    height: 40,
    backgroundColor: '#333333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    color: '#FFFFFF',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    paddingVertical: 8,
    fontWeight: '400',
  },
  stationName: {
    color: '#666666',
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  swapButton: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#333333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateWrapper: {
    flex: 1,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  searchButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  suggestionsContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#333333',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
    maxHeight: 200,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  suggestionIcon: {
    marginRight: 10,
  },
  suggestionText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
  recentSearchesContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  recentSearchesTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  noSearchesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  noSearchesText: {
    color: '#666666',
    fontSize: 16,
    marginTop: 10,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  recentSearchIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#333333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  recentSearchInfo: {
    flex: 1,
  },
  recentSearchRoute: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  recentSearchDate: {
    color: '#666666',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '50%',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonConfirm: {
    backgroundColor: '#FFFFFF',
  },
  modalButtonText: {
    color: 'grey',
    fontSize: 16,
    fontWeight: '500',
  },
  modalButtonConfirmText: {
    color: 'white',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 4,
  },
  inputFocused: {
    borderBottomColor: '#FFFFFF',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  suggestionItemHovered: {
    backgroundColor: '#333333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
  },
  searchResult: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
    textAlign: "center",
  }
});