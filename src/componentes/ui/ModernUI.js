import React from 'react';
import { StyleSheet, View, Animated, Dimensions, PanResponder } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const SwipeableRow = ({ children, leftActions, rightActions, onSwipeLeft, onSwipeRight }) => {
  const translateX = React.useRef(new Animated.Value(0)).current;
  const rowRef = React.useRef(null);

  const panResponder = React.useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        const threshold = width * 0.3;
        
        if (gestureState.dx < -threshold && onSwipeLeft) {
          Animated.spring(translateX, {
            toValue: -width,
            useNativeDriver: true,
          }).start(() => onSwipeLeft());
        } else if (gestureState.dx > threshold && onSwipeRight) {
          Animated.spring(translateX, {
            toValue: width,
            useNativeDriver: true,
          }).start(() => onSwipeRight());
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    });
  }, [translateX, onSwipeLeft, onSwipeRight]);

  return (
    <View style={styles.container}>
      {leftActions && (
        <View style={[styles.actions, styles.leftActions]}>
          {leftActions}
        </View>
      )}
      {rightActions && (
        <View style={[styles.actions, styles.rightActions]}>
          {rightActions}
        </View>
      )}
      <Animated.View
        ref={rowRef}
        style={[
          styles.rowContent,
          { transform: [{ translateX }] }
        ]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export const AnimatedCard = ({ children, style }) => {
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        style,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export const BottomSheet = ({ isVisible, onClose, children }) => {
  const translateY = React.useRef(new Animated.Value(Dimensions.get('window').height)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: Dimensions.get('window').height,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <View style={styles.bottomSheetOverlay}>
      <Animated.View
        style={[
          styles.bottomSheet,
          { transform: [{ translateY }] },
        ]}
      >
        <View style={styles.bottomSheetHandle} />
        {children}
      </Animated.View>
    </View>
  );
};

export const GradientHeader = () => (
  <LinearGradient
    colors={['#0084ff', '#0099ff']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.gradientHeader}
  />
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#f5f5f5',
  },
  rowContent: {
    backgroundColor: '#fff',
    zIndex: 2,
  },
  actions: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  leftActions: {
    left: 0,
  },
  rightActions: {
    right: 0,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bottomSheetOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    minHeight: '50%',
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  gradientHeader: {
    height: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});