// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const Navbar = ({ onMenuPress }) => {
//   const navigation = useNavigation();

//   const onProfilePress = () => {
//     navigation.navigate('profile'); 
//   };

//   return (
//     <View style={styles.container}>
//       {/* Left: Hamburger Menu */}
//       <TouchableOpacity onPress={onMenuPress} style={styles.iconContainer}>
//         <Image
//           source={require('../assets/images/menu-fill.png')} // Replace with your hamburger icon
//           style={styles.icon}
//         />
//       </TouchableOpacity>

//       {/* Center: Organization Name */}
//       <Text style={styles.title}>DirectTickets</Text>
      
//       {/* Right: Profile Button */}
//       <TouchableOpacity onPress={onProfilePress} style={styles.iconContainer}>
//         <Image
//           source={require('../assets/images/account.png')} // Replace with your profile icon
//           style={styles.icon}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: '#000', 
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   iconContainer: {
//     padding: 8,
//   },
//   icon: {
//     width: 32,
//     height: 32,
//     tintColor: '#fff', 
//   },
// });

// export default Navbar;


import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const slideAnim = new Animated.Value(-Dimensions.get('window').width); // Initialize animation

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    Animated.timing(slideAnim, {
      toValue: isDrawerOpen ? -Dimensions.get('window').width : 0, // Open or close
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const navigateTo = (screen) => {
    setIsDrawerOpen(false);
    navigation.navigate(screen);
  };

  const onProfilePress = () => {
    navigation.navigate('profile');
  };

  return (
    <>
      {/* Navbar */}
      <View style={styles.container}>
        {/* Left: Hamburger Menu */}
        <TouchableOpacity onPress={toggleDrawer} style={styles.iconContainer}>
          <Image
            source={require('../assets/images/menu-fill.png')} 
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Center: Organization Name */}
        <Text style={styles.title}>DirectTickets</Text>

        {/* Right: Profile Button */}
        <TouchableOpacity onPress={onProfilePress} style={styles.iconContainer}>
          <Image
            source={require('../assets/images/account.png')} 
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Sliding Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <TouchableOpacity
          style={styles.drawerOption}
          onPress={() => navigateTo('airplane')}
        >
          <Text style={styles.drawerText}>Airplane</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerOption}
          onPress={() => navigateTo('buses')}
        >
          <Text style={styles.drawerText}>Buses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerOption}
          onPress={() => navigateTo('hotel')}
        >
          <Text style={styles.drawerText}>Hotel</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Backdrop */}
      {isDrawerOpen && (
        <TouchableOpacity style={styles.backdrop} onPress={toggleDrawer} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconContainer: {
    padding: 8,
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: '#fff',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: Dimensions.get('window').width * 0.75, // 75% width of the screen
    backgroundColor: '#333',
    padding: 20,
    zIndex: 1000,
  },
  drawerOption: {
    marginBottom: 20,
    color: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  drawerText: {
    fontSize: 18,
    color: '#fff',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});

export default Navbar;
