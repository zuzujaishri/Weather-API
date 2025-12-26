// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   RefreshControl,
//   ScrollView,
//   FlatList,
// } from "react-native";
// import * as Location from "expo-location";
// import { LinearGradient } from "expo-linear-gradient";
// import { Feather } from "@expo/vector-icons";

// const API_KEY = "73fac81d521b2c0cf1d48fe55e0f8c2f";

// const weatherOptions = {
//   Clear: { gradient: ["#56CCF2", "#2F80ED"], icon: "sun" },
//   Clouds: { gradient: ["#757F9A", "#D7DDE8"], icon: "cloud" },
//   Rain: { gradient: ["#00C6FB", "#005BEA"], icon: "cloud-rain" },
//   Thunderstorm: { gradient: ["#141E30", "#243B55"], icon: "zap" },
//   Snow: { gradient: ["#83a4d4", "#b6fbff"], icon: "cloud-snow" },
//   Drizzle: { gradient: ["#89F7FE", "#66A6FF"], icon: "cloud-drizzle" },
//   Mist: { gradient: ["#606c88", "#3f4c6b"], icon: "wind" },
// };

// export default function Weather() {
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchWeather = async () => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setWeather("Permission denied");
//         setLoading(false);
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = location.coords;

//       // Current weather
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
//       );
//       const data = await response.json();
//       setWeather(data);

//       // 5-day forecast
//       const forecastRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
//       );
//       const forecastData = await forecastRes.json();

//       // pick one forecast per day (every 24h at 12:00)
//       const dailyData = forecastData.list.filter((item) =>
//         item.dt_txt.includes("12:00:00")
//       );
//       setForecast(dailyData);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchWeather();
//   }, []);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchWeather();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#fff" />
//         <Text style={{ color: "white", marginTop: 10 }}>
//           Fetching Weather...
//         </Text>
//       </View>
//     );
//   }

//   if (!weather || !weather.main) {
//     return (
//       <View style={styles.centered}>
//         <Text style={{ color: "white" }}>Error fetching weather</Text>
//       </View>
//     );
//   }

//   const condition = weather.weather[0].main;
//   const { gradient, icon } = weatherOptions[condition] || weatherOptions["Clear"];

//   // Render forecast card
//   const renderForecast = ({ item }) => {
//     const date = new Date(item.dt * 1000);
//     const day = date.toLocaleDateString("en-US", { weekday: "short" });
//     const temp = Math.round(item.main.temp);
//     const cond = item.weather[0].main;
//     const { icon: iconName } = weatherOptions[cond] || weatherOptions["Clear"];

//     return (
//       <View style={styles.forecastCard}>
//         <Text style={styles.forecastDay}>{day}</Text>
//         <Feather name={iconName} size={30} color="white" />
//         <Text style={styles.forecastTemp}>{temp}°C</Text>
//       </View>
//     );
//   };

//   return (
//     <LinearGradient colors={gradient} style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         <Feather name={icon} size={100} color="white" />
//         <Text style={styles.city}>{weather.name}</Text>
//         <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
//         <Text style={styles.description}>{weather.weather[0].description}</Text>

//         {/* Current details */}
//         <View style={styles.cardsContainer}>
//           <View style={styles.card}>
//             <Feather name="droplet" size={24} color="white" />
//             <Text style={styles.cardText}>{weather.main.humidity}%</Text>
//             <Text style={styles.cardLabel}>Humidity</Text>
//           </View>

//           <View style={styles.card}>
//             <Feather name="wind" size={24} color="white" />
//             <Text style={styles.cardText}>{weather.wind.speed} m/s</Text>
//             <Text style={styles.cardLabel}>Wind</Text>
//           </View>

//           <View style={styles.card}>
//             <Feather name="thermometer" size={24} color="white" />
//             <Text style={styles.cardText}>{weather.main.feels_like}°C</Text>
//             <Text style={styles.cardLabel}>Feels Like</Text>
//           </View>
//         </View>

//         {/* Forecast Section */}
//         <Text style={styles.forecastTitle}>5-Day Forecast</Text>
//         <FlatList
//           data={forecast}
//           renderItem={renderForecast}
//           keyExtractor={(item) => item.dt.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.forecastList}
//         />
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   scrollContainer: {
//     flexGrow: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 40,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#222",
//   },
//   city: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "white",
//     marginTop: 10,
//   },
//   temp: {
//     fontSize: 72,
//     fontWeight: "200",
//     color: "white",
//     marginVertical: 10,
//   },
//   description: {
//     fontSize: 20,
//     fontStyle: "italic",
//     color: "white",
//     marginBottom: 20,
//   },
//   cardsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "90%",
//     marginTop: 30,
//   },
//   card: {
//     backgroundColor: "rgba(255,255,255,0.2)",
//     padding: 15,
//     borderRadius: 15,
//     alignItems: "center",
//     width: 100,
//   },
//   cardText: {
//     fontSize: 20,
//     color: "white",
//     marginTop: 5,
//   },
//   cardLabel: {
//     fontSize: 14,
//     color: "white",
//     marginTop: 2,
//   },
//   forecastTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "white",
//     marginTop: 40,
//     marginBottom: 15,
//     alignSelf: "flex-start",
//     marginLeft: 20,
//   },
//   forecastList: { paddingHorizontal: 20 },
//   forecastCard: {
//     backgroundColor: "rgba(255,255,255,0.2)",
//     padding: 15,
//     borderRadius: 15,
//     alignItems: "center",
//     marginRight: 15,
//     width: 80,
//   },
//   forecastDay: { fontSize: 16, color: "white", marginBottom: 5 },
//   forecastTemp: { fontSize: 18, color: "white", marginTop: 5 },
// });










import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";

const API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API Key

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
      <Text style={styles.title}>🌦 Weather App</Text>

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
