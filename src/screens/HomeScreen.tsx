import React, {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {fetchWeather} from '../services/weatherApi';

import {WeatherData} from '../types/weather';

function HomeScreen(): React.JSX.Element {
  const [city, setCity] =
    useState('London');

  const [weather, setWeather] =
    useState<WeatherData | null>(
      null,
    );

  const [loading, setLoading] =
    useState(false);

  const getWeather = async () => {
    try {
      setLoading(true);

      const data =
        await fetchWeather(city);

      if (data.cod !== 200) {
        Alert.alert(
          'City Not Found',
          'Enter valid city',
        );

        return;
      }

      setWeather(data);
    } catch (error) {
      Alert.alert(
        'Error',
        'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const isDay =
    weather?.weather[0]?.icon.includes(
      'd',
    );

  const gradientColors = isDay
    ? ['#4FACFE', '#00F2FE']
    : ['#141E30', '#243B55'];

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.gradient}>

      <SafeAreaView
        style={styles.container}>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#FFFFFF"
            style={{marginTop: 100}}
          />
        ) : (
          weather && (
            <>
              {/* Location */}
              <View style={styles.topSection}>
                <Text style={styles.city}>
                  {weather.name}
                </Text>

                <Text
                  style={styles.condition}>
                  {
                    weather.weather[0]
                      .description
                  }
                </Text>
              </View>

              {/* Weather */}
              <View
                style={styles.centerSection}>
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
                  }}
                  style={styles.icon}
                />

                <Text
                  style={styles.temp}>
                  {Math.round(
                    weather.main.temp,
                  )}
                  °
                </Text>

                <Text
                  style={styles.highLow}>
                  Humidity:{' '}
                  {
                    weather.main
                      .humidity
                  }
                  %
                </Text>

                <Text
                  style={styles.highLow}>
                  Wind:{' '}
                  {
                    weather.wind.speed
                  }{' '}
                  km/h
                </Text>
              </View>
            </>
          )
        )}

        {/* Search */}
        <View
          style={styles.searchContainer}>
          <TextInput
            value={city}
            onChangeText={setCity}
            placeholder="Search city"
            placeholderTextColor="#DDD"
            style={styles.input}
          />

          <TouchableOpacity
            onPress={getWeather}
            style={styles.searchButton}>
            <Text
              style={styles.searchText}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent:
      'space-between',
    paddingHorizontal: 24,
    paddingBottom: 30,
  },

  topSection: {
    marginTop: 20,
    alignItems: 'center',
  },

  city: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '700',
  },

  condition: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 10,
    textTransform: 'capitalize',
  },

  centerSection: {
    alignItems: 'center',
  },

  icon: {
    width: 220,
    height: 220,
  },

  temp: {
    color: '#FFFFFF',
    fontSize: 92,
    fontWeight: '200',
  },

  highLow: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 10,
  },

  searchContainer: {
  flexDirection: 'row',
  backgroundColor:
    'rgba(0,0,0,0.25)',
  borderRadius: 25,
  padding: 8,
  alignItems: 'center',
  borderWidth: 1,
  borderColor:
    'rgba(255,255,255,0.25)',
},

  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 14,
  },

  searchButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  searchText: {
    color: '#000000',
    fontWeight: '600',
  },
});

export default HomeScreen;