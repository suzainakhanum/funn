import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Animated,
  Easing 
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SecretMessageApp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const hearts = ['💖', '💕', '💗', '✨', '🌸'];

  useEffect(() => {
    // Initial bounce in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const nextPage = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(200),
    ]).start(() => {
      setCurrentPage(2);
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
    });
  };

  const renderPage = () => {
    if (currentPage === 1) {
      return (
        <>
          <Text style={styles.title1}>This is from suzaina</Text>
          <TouchableOpacity style={styles.button} onPress={nextPage} activeOpacity={0.8}>
            <Text style={styles.buttonText}>click me 💕</Text>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.title2}>hello cutie!!</Text>
          <Text style={styles.subtitle}>get well soon 💖</Text>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Floating hearts background */}
      {hearts.map((heart, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.floatingHeart,
            {
              left: `${10 + index * 25}%`,
              fontSize: 24 + index * 4,
              transform: [{
                translateY: scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }),
              }],
            },
          ]}
        >
          {heart}
        </Animated.Text>
      ))}

      <Animated.View 
        style={[
          styles.page, 
          { 
            opacity: fadeAnim, 
            transform: [{ scale: scaleAnim }] 
          }
        ]}
      >
        {renderPage()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
  },
  title1: {
    fontSize: 44,
    color: '#ff4081',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 100,
    textShadowColor: 'rgba(255, 182, 193, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
    letterSpacing: 2,
  },
  title2: {
    fontSize: 52,
    color: '#ff1493',
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(255, 105, 180, 0.6)',
    textShadowOffset: { width: 0, height: 6 },
    textShadowRadius: 12,
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 40,
    color: '#ff69b4',
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(255, 192, 203, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  button: {
    backgroundColor: '#ff69b4',
    paddingHorizontal: 70,
    paddingVertical: 28,
    borderRadius: 60,
    elevation: 20,
    shadowColor: '#ff1493',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  floatingHeart: {
    position: 'absolute',
    top: '10%',
    fontSize: 28,
    opacity: 0.7,
  },
});

export default SecretMessageApp;
