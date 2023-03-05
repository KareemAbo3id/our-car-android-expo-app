/* eslint-disable no-alert */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function MapNav() {
  // local hooks:
  const Palette = usePalette();
  const [userLoc, setUserLoc] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('الرجاء السماح للتطبيق بالوصول الى الموقع الحالي');
      return;
    }
    const currentLocation = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setUserLoc({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  React.useEffect(() => {
    getPermission();
  }, []);

  // local handlers:

  // local ui:
  return (
    <View style={styles.container}>
      <FAB
        icon="map-marker"
        style={[styles.fab, { backgroundColor: Palette.White }]}
        color={Palette.Primary2}
        onPress={getPermission}
      />
      <MapView style={styles.map} region={userLoc}>
        <Marker coordinate={userLoc} title="Marker" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  fab: {
    borderRadius: 1000,
    position: 'absolute',
    left: 20,
    bottom: 30,
    zIndex: 55,
  },
});
