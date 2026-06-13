import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  /** deslocamento inicial em Y (px) */
  offset?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Faz fade + slide-up de entrada, ao montar.
 * Usa a API Animated nativa (native driver) — sem dependências extra.
 */
export default function Reveal({
  children,
  delay = 0,
  offset = 22,
  duration = 650,
  style,
}: RevealProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(offset)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [opacity, translateY, delay, duration]);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}
