import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const LocationDisplay = () => {
  const [location, setLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);

  useEffect(() => {
    if (isTracking) {
      const id = Geolocation.watchPosition(
        position => {
          setLocation(position.coords);
        },
        error => {
          console.error(error);
        },
        {enableHighAccuracy: true, distanceFilter: 10, timeout: 20000},
      );
      setWatchId(id);
    } else {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    }

    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking]);

  const handleToggleTracking = () => {
    setIsTracking(!isTracking);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {location ? (
        <Text>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      ) : (
        <Text>Location not available</Text>
      )}

      <Button
        title={isTracking ? 'Stop Tracking' : 'Start Tracking'}
        onPress={handleToggleTracking}
      />
    </View>
  );
};

export default LocationDisplay;
