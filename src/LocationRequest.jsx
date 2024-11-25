import React, {useState, useEffect} from 'react';
import {View, Text, Button, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const LocationRequest = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          setError('Location permission denied');
        }
      } else {
        getLocation(); // No need to request permission for iOS
      }
    };

    requestLocationPermission();
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
      },
      error => {
        setError(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {error ? (
        <Text>Error: {error}</Text>
      ) : location ? (
        <Text>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      ) : (
        <Text>Loading location...</Text>
      )}
    </View>
  );
};

export default LocationRequest;
