

// import React from "react";
// import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
// import Weather from "./Weather";

// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" />
//       <Weather />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#222",
//   },
// });



import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";

const API_KEY = "73fac81d521b2c0cf1d48fe55e0f8c2f"; // Replace with your OpenWeatherMap API Key

export default function App() {
  const [city, setCity] = useState("Ahmedabad"); // Default city
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputCity, setInputCity] = useState("");

  // Fetch weather
  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setCity(cityName);
      } else {
        setError("City not found!");
      }
    } catch (err) {
      setError("Failed to fetch weather!");
    } finally {
      setLoading(false);
    }
  };

  // Default weather on first load
  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌦 Weather App-</Text>
       <Text style={styles.subtitle}>Created by - Jaishri</Text>

      {/* Search Input */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={inputCity}
          onChangeText={setInputCity}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (inputCity.trim() !== "") {
              fetchWeather(inputCity.trim());
              setInputCity("");
            }
          }}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Loading */}
      {loading && <ActivityIndicator size="large" color="#007AFF" />}

      {/* Error */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Weather Display */}
      {weather && !loading && (
        <View style={styles.weatherBox}>
          <Text style={styles.cityName}>{weather.name}, {weather.sys.country}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>
          <Text style={styles.details}>Humidity: {weather.main.humidity}%</Text>
          <Text style={styles.details}>Wind: {weather.wind.speed} m/s</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1565C0",
  },
  subtitle: {
  fontSize: 16,
  fontStyle: "italic",
  color: "#444",
  marginBottom: 20,
},
  searchBox: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#90CAF9",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1565C0",
    padding: 12,
    marginLeft: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  weatherBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  cityName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  temp: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF5722",
  },
  desc: {
    fontSize: 18,
    marginBottom: 10,
    textTransform: "capitalize",
  },
  details: {
    fontSize: 16,
    color: "#555",
  },
  error: {
    color: "red",
    fontSize: 16,
    marginVertical: 10,
  },
});
