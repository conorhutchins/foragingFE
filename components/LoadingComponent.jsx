import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingComponent = ({ size, color }) => (
  <View style={styles.container}>
    <ActivityIndicator size={size || 'large'} color={color || '#fff68f'} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#35bb42',
  },
});

export default LoadingComponent;
