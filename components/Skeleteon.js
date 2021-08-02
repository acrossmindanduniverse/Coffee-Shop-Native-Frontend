import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Easing} from 'react-native-reanimated';

const Skeleteon = () => {
  const {width} = Dimensions.get('window');
  const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);
  const animateValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animateValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear.inOut,
        useNativeDriver: true,
      }),
    ).start();
  });

  const translateX = animateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={styles.parent}>
      <AnimatedLG
        colors={['#a0a0a0', 'b0b0b0', 'b0b0b0', '#a0a0a0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{translateX: translateX}],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#a0a0a0',
  },
});

export default Skeleteon;
