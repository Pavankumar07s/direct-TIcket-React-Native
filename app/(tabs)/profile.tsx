// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
//   TextInput,
//   Alert,
//   Button,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// export default function Profile() {
//   const navigation = useNavigation(); 

//   const [userInfo, setUserInfo] = useState({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     memberSince: '2023',
//     profileImage: 'https://via.placeholder.com/150',
//     upcomingEvents: 3,
//     pastEvents: 12,
//   });

//   const [isEditingName, setIsEditingName] = useState(false);
//   const [isEditingEmail, setIsEditingEmail] = useState(false);

//   const handleChangeProfileImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setUserInfo((prev) => ({ ...prev, profileImage: result.assets[0].uri }));
//     }
//   };

//   const handleEditField = (field, value) => {
//     setUserInfo((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       // Replace with your backend API endpoint
//       const response = await fetch('https://your-backend-api.com/save-profile', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userInfo),
//       });

//       if (response.ok) {
//         Alert.alert('Success', 'Your profile has been updated!');
//       } else {
//         Alert.alert('Error', 'Failed to update your profile.');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'An error occurred while saving your profile.');
//     }
//   };

//   const menuItems = [
//     {
//       icon: 'ticket-outline',
//       title: 'My Tickets',
//       subtitle: 'View your upcoming and past events',
//       onPress: () => navigation.navigate('TicketsScreen'), // Navigate to Tickets Screen
//     },
//     {
//       icon: 'card-outline',
//       title: 'Payment Methods',
//       subtitle: 'Manage your payment options',
//     },
//     {
//       icon: 'notifications-outline',
//       title: 'Notifications',
//       subtitle: 'Configure your notification preferences',
//       onPress: () => navigation.navigate('NotificationsScreen'), // Navigate to Notifications Screen
//     },
//     {
//       icon: 'shield-checkmark-outline',
//       title: 'Privacy & Security',
//       subtitle: 'Manage your account security',
//     },
//     {
//       icon: 'help-circle-outline',
//       title: 'Help & Support',
//       subtitle: 'Get assistance and FAQs',
//     },
//   ];

//   const renderMenuItem = ({ icon, title, subtitle, onPress }) => (
//     <TouchableOpacity key={title} style={styles.menuItem} onPress={onPress}>
//       <View style={styles.menuIconContainer}>
//         <Ionicons name={icon} size={24} color="white" />
//       </View>
//       <View style={styles.menuTextContainer}>
//         <Text style={styles.menuTitle}>{title}</Text>
//         <Text style={styles.menuSubtitle}>{subtitle}</Text>
//       </View>
//       <Ionicons name="chevron-forward" size={24} color="#999" />
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header Section */}
//         <View style={styles.header}>
//           <View style={styles.profileImageContainer}>
//             <TouchableOpacity onPress={handleChangeProfileImage}>
//               <Image
//                 source={{ uri: userInfo.profileImage }}
//                 style={styles.profileImage}
//               />
//               <View style={styles.editButton}>
//                 <Ionicons name="camera" size={20} color="Black" />
//               </View>
//             </TouchableOpacity>
//           </View>
//           {isEditingName ? (
//             <TextInput
//               style={styles.nameInput}
//               value={userInfo.name}
//               onChangeText={(text) => handleEditField('name', text)}
//               onBlur={() => setIsEditingName(false)}
//             />
//           ) : (
//             <Text style={styles.name} onPress={() => setIsEditingName(true)}>
//               {userInfo.name}
//             </Text>
//           )}
//           {isEditingEmail ? (
//             <TextInput
//               style={styles.emailInput}
//               value={userInfo.email}
//               onChangeText={(text) => handleEditField('email', text)}
//               onBlur={() => setIsEditingEmail(false)}
//             />
//           ) : (
//             <Text style={styles.email} onPress={() => setIsEditingEmail(true)}>
//               {userInfo.email}
//             </Text>
//           )}
//         </View>

//         {/* Stats Section */}
//         <View style={styles.statsContainer}>
//           <View style={styles.statItem}>
//             <Text style={styles.statNumber}>{userInfo.upcomingEvents}</Text>
//             <Text style={styles.statLabel}>Upcoming</Text>
//           </View>
//           <View style={styles.statDivider} />
//           <View style={styles.statItem}>
//             <Text style={styles.statNumber}>{userInfo.pastEvents}</Text>
//             <Text style={styles.statLabel}>Past Events</Text>
//           </View>
//           <View style={styles.statDivider} />
//           <View style={styles.statItem}>
//             <Text style={styles.statNumber}>{userInfo.memberSince}</Text>
//             <Text style={styles.statLabel}>Member Since</Text>
//           </View>
//         </View>

//         {/* Save Button */}
//         <View style={styles.saveButtonContainer}>
//           <Button style={styles.saveButton}title="Save Profile" onPress={handleSave} color="grey" />
//         </View>

//         {/* Menu Section */}
//         <View style={styles.menuContainer}>{menuItems.map(renderMenuItem)}</View>

//         {/* Logout Button */}
//         <TouchableOpacity
//           style={styles.logoutButton}
//           onPress={() => Alert.alert('Logout', 'You have been logged out.')}
//         >
//           <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
//           <Text style={styles.logoutText}>Log Out</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     paddingTop: 20,
//   },
//   header: {
//     alignItems: 'center',
//     paddingVertical: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEE',
    
//   },
//   saveButtonContainer: {
//     width: '100%',
//     justifyContent: 'center',
//     alignContent: 'center',
//     borderRadius: 20,
//   },
//   saveButton: {
//     width: '40%'},
    
//   profileImageContainer: {
//     position: 'relative',
//     marginBottom: 10,
//   },

//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   editButton: {
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#2196F3',
//     padding: 8,
//     borderRadius: 20,
//     borderWidth: 3,
//     borderColor: 'Black',
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: 'white',
//   },
//   nameInput: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     borderBottomWidth: 1,
//     borderBottomColor: '#2196F3',
//     marginBottom: 5,
//     color: 'white',
//   },
//   email: {
//     fontSize: 16,
//     color: '#666',
//   },
//   emailInput: {
//     fontSize: 16,
//     color: '#666',
//     borderBottomWidth: 1,
//     borderBottomColor: '#2196F3',
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 20,
//     backgroundColor: 'black',
//     marginTop: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEE',
//   },
//   statItem: {
//     alignItems: 'center',
//   },
//   statNumber: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   statLabel: {
//     fontSize: 14,
//     color: 'grey',
//     marginTop: 5,
//   },
//   statDivider: {
//     width: 1,
//     backgroundColor: 'grey',
//   },
//   menuContainer: {
//     backgroundColor: 'Black',
//     marginTop: 10,
//     color: 'white',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     color: 'white',
//   },
//   menuIconContainer: {
//     width: 40,
//     alignItems: 'center',
//   },
//   menuTextContainer: {
//     flex: 1,
//     marginLeft: 10,
//     color: 'white',
//   },
//   menuTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: 'white',
//   },
//   menuSubtitle: {
//     fontSize: 14,
//     marginTop: 2,
//     color: 'white',
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'Black',
//     marginTop: 10,
//     padding: 15,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//   },
//   logoutText: {
//     color: '#FF3B30',
//     fontSize: 16,
//     fontWeight: '500',
//     marginLeft: 10,
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: '2023',
    profileImage: 'https://via.placeholder.com/150',
    upcomingEvents: 3,
    pastEvents: 12,
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleChangeProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserInfo((prev) => ({ ...prev, profileImage: result.assets[0].uri }));
    }
  };

  const handleEditField = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('https://your-backend-api.com/save-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save changes');
    }
  };

  const menuItems = [
    {
      icon: 'ticket-outline',
      title: 'My Tickets',
      subtitle: 'View your upcoming and past events',
      onPress: () => navigation.navigate('TicketsScreen'),
    },
    {
      icon: 'card-outline',
      title: 'Payment Methods',
      subtitle: 'Manage your payment options',
    },
    {
      icon: 'notifications-outline',
      title: 'Notifications',
      subtitle: 'Configure your notification preferences',
      onPress: () => navigation.navigate('NotificationsScreen'),
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Privacy & Security',
      subtitle: 'Manage your account security',
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      subtitle: 'Get assistance and FAQs',
    },
  ];

  const renderMenuItem = ({ icon, title, subtitle, onPress }) => (
    <TouchableOpacity 
      key={title} 
      style={styles.menuItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuIconContainer}>
        <Ionicons name={icon} size={24} color="#FFFFFF" />
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#666666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <TouchableOpacity 
              onPress={handleChangeProfileImage}
              style={styles.profileImageWrapper}
            >
              <Image
                source={{ uri: userInfo.profileImage }}
                style={styles.profileImage}
              />
              <View style={styles.editButton}>
                <Ionicons name="camera" size={20} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            <View style={styles.profileInfo}>
              {isEditingName ? (
                <TextInput
                  style={styles.nameInput}
                  value={userInfo.name}
                  onChangeText={(text) => handleEditField('name', text)}
                  onBlur={() => setIsEditingName(false)}
                  placeholderTextColor="#666666"
                />
              ) : (
                <TouchableOpacity onPress={() => setIsEditingName(true)}>
                  <Text style={styles.name}>{userInfo.name}</Text>
                </TouchableOpacity>
              )}

              {isEditingEmail ? (
                <TextInput
                  style={styles.emailInput}
                  value={userInfo.email}
                  onChangeText={(text) => handleEditField('email', text)}
                  onBlur={() => setIsEditingEmail(false)}
                  placeholderTextColor="#666666"
                />
              ) : (
                <TouchableOpacity onPress={() => setIsEditingEmail(true)}>
                  <Text style={styles.email}>{userInfo.email}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userInfo.upcomingEvents}</Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userInfo.pastEvents}</Text>
              <Text style={styles.statLabel}>Past Events</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userInfo.memberSince}</Text>
              <Text style={styles.statLabel}>Member Since</Text>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Section */}
        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#333333',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#333333',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000000',
  },
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  nameInput: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666666',
  },
  emailInput: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
  },
  saveButton: {
    backgroundColor: '#333333',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  menuContainer: {
    marginTop: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    marginBottom: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    marginTop: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});