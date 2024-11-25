import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import LocationRequest from './src/LocationRequest';
import LocationDisplay from './src/LocationDispaly';
const App = () => {
  const [location, setLocation] = useState(null);

  return (
    <SafeAreaView style={{flex: 1}}>
      <LocationRequest setLocation={setLocation} />
      <LocationDisplay location={location} />
    </SafeAreaView>
  );
};

export default App;
