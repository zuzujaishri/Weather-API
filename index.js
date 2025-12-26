// // import { View, Text, Alert,SafeAreaView,StyleSheet,ActivityIndicator,
// //     ScrollView,RefreshControl,Image,Dimensions,FlatList } from 'react-native';
// // import React from 'react';
// // import * as Location from 'expo-location';
// // import { useEffect, useState } from 'react';



// // const openWeatherKey = '73fac81d521b2c0cf1d48fe55e0f8c2f';

// // // let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`;
// // let url=`https://api.openweathermap.org/data/2.5/weather?lat=23.1347&lon=72.5601&units=metric&appid=${openWeatherKey}`;



// // const Weather = () => {
// //     const [forecast, setForecast] = useState(null);
// //     const [refreshing, setRefreshing] = useState(false);

// //    const loadForecast = async () => {
// //   setRefreshing(true);

// //   try {
// //     const { status } = await Location.requestForegroundPermissionsAsync();
// //     if (status !== 'granted') {
// //       Alert.alert('Permission to access location was denied');
// //       setRefreshing(false);
// //       return;
// //     }

// //     let location = await Location.getCurrentPositionAsync({ enabledHighAccuracy: true });
// //     console.log('Location:', location);

// //     const fullUrl = `${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`;
// //     console.log('Fetching from URL:', fullUrl);

// //     const response = await fetch(fullUrl);
// //     const data = await response.json();
// //     console.log('Response JSON:', data);

// //     if (!response.ok) {
// //       // Log actual error from API response
// //       Alert.alert('Error fetching weather data', data.message || 'Unknown error');
// //     } else {
// //       setForecast(data);
// //     }
// //   } catch (error) {
// //     console.error('Exception during fetch:', error);
// //     Alert.alert('Error', error.message);
// //   }

// //   setRefreshing(false);
// // };

// //     useEffect(() => {
// //         loadForecast();
// //     }, []);

// //     if (!forecast) {
// //         return(
// //             <SafeAreaView style={styles.loading}>
// //                 <ActivityIndicator size="large" color="#0000ff" />
// //                 {/* <Text>Loading weather data...</Text> */}
// //             </SafeAreaView>
// //         );
// //     }

// //     // const current =forecast.current.weather[0];
// //     // const current = forecast.weather[0];
// //     // const temperature = forecast.main.temp;
// //     // const humidity = forecast.main.humidity;
// //     // const windSpeed = forecast.wind.speed;
// // const current = forecast.current.weather[0];
// // // const temperature = forecast.current.temp;
// // // const humidity = forecast.current.humidity;
// // // const windSpeed = forecast.current.wind_speed;



// //     const daily = forecast.daily;

// //     return (
// //         <SafeAreaView style={styles.container}>
// //             <ScrollView refreshControl={
// //                 <RefreshControl refreshing={refreshing}
// //                  onRefresh={() => loadForecast()} />
// //             }
// //              style={{marginTop: 50}}>
// //            <Text style={styles.title}>
// //             Current Weather
// //            </Text>
// //             <Text style={{alignItems: 'center' ,textAlign: 'center', fontSize: 20, marginTop: 10}}>
// //                 Your location
// //             </Text>
// //            <View style={styles.current}>
// //   <Image
// //     style={styles.largeIcon}
// //     source={{ uri: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png` }}
// //   />
// //   <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#C84B31' }}>
// //     {Math.round(forecast.main.temp)}°C
// //   </Text>
// // </View>

// // <Text style={styles.currentDescription}>
// //   {forecast.weather[0].description.charAt(0).toUpperCase() +
// //     forecast.weather[0].description.slice(1)}
// // </Text>

// // <View style={styles.extraInfo}>
// //   <View style={styles.info}>
// //     <Image
// //       source={require('../assets/temp.png')}
// //       style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 50 }}
// //     />
// //     {/* <Text style={styles.text}>{forecast.main.feels_like}°C</Text>  */}
// //     <Text style={styles.text}>{forecast.current.feels_like}°C</Text>
// //     <Text style={styles.text}>Feels Like</Text>
// //   </View>

// //   <View style={styles.info}>
// //     <Image
// //       source={require('../assets/humidity.png')}
// //       style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 50 }}
// //     />
// //     <Text style={styles.text}>{forecast.main.humidity}%</Text>
// //     <Text style={styles.text}>Humidity</Text>
// //   </View>
// // </View>

// //                 <View >
// //                 <Text style={styles.subtitle}>Hourly forecast</Text>
// //                 </View>

// //                 <FlatList
// //                 horizontal
// //                 data={forecast.hourly.slice(0,24)}
// //                 // data={forecast.hourly?.slice(0, 24) || []}

// //                 keyExtractor={(item,index)=> index.toString()}
// //                 renderItem={(hour) =>{
// //                     const weather=hour.item.weather[0];
// //                     var dt=new Date(hour.item.dt * 1000);
// //                     return(
// //                         <View style={styles.hour}>
// //                             <Text style={{fontSize: 16, fontWeight: 'bold', color: '#346751'}}>
// //                                 {dt.toLocaleTimeString().replace(/:\d+ /,' ')}
// //                             </Text>
                           
// //                             <Text style={{fontSize: 16, fontWeight: 'bold', color: '#346751'}}>
// //                                 {Math.round(hour.item.temp)}°C
// //                             </Text>
// //                              <Image
// //                                 style={styles.smallIcon}
// //                                 source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@4x.png` }}
// //                             />
// //                             <Text style={{fontWeight: 'bold', color: '#346751'}}>
// //                                 {weather.description}
// //                             </Text>
// //                         </View>
// //                     );
// //                 }
// //                     }
// //                 />
// //             </ScrollView>
// //         </SafeAreaView>
// //     );
// // }


// // export default Weather;
// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: '#ECDBBA',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //     },
// //     loading: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// //     title: {
// //         fontSize: 36,
// //         fontWeight: 'bold',
// //         textAlign: 'center',
// //         // marginVertical: 20,
// //         color: '#C84B31',
// //     },
// //     current: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         marginVertical: 20,
// //         alignContent: 'center',
// //     },
// //     largeIcon: {
// //         width: 300,
// //         height: 250,
// //     },
// //     currentTemp: {
// //         fontSize: 32,
// //         fontWeight: 'bold',
// //         color: '#C84B31',
// //         textAlign: 'center',
// //         marginTop: 10,
// //     },
// //     currentDescription: {
// //         width: '100%',
// //         fontSize: 24,
// //         fontWeight: '200',
// //         textAlign: 'center',
// //         color: '#333',
// //         marginBottom: 5,
// //         // marginTop: 10,
// //     },
// //     extraInfo: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         marginTop: 20,
// //         padding: 10,
// //     },
// //     info: {
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         width: Dimensions.get('screen').width / 3,
// //         backgroundColor: '#01060412',
// //         padding: 10,
// //         borderRadius: 15,
// //     },
// //     text: {
// //         fontSize: 20,
// //         color: '#fff',
// //         textAlign: 'center',
// //         marginTop: 5,
// //     },
// //     subtitle :{
// //         fontSize: 24,
// //         fontWeight: 'bold',
// //         textAlign: 'center',
// //         marginVertical: 12,
// //         marginLeft: 7,
// //         color: '#C84B31',
// //     },
// //     hour: {
        
// //         padding: 6,
// //         // borderRadius: 10,
// //         // marginHorizontal: 5,
// //         alignItems: 'center',
// //         // justifyContent: 'center',
// //     },
// //     smallIcon: {
// //         width: 50,
// //         height: 100,
// //     },
// // });


// import { 
//   View, 
//   Text, 
//   Alert, 
//   SafeAreaView, 
//   StyleSheet, 
//   ActivityIndicator,
//   ScrollView, 
//   RefreshControl, 
//   Image, 
//   Dimensions, 
//   FlatList 
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import * as Location from 'expo-location';

// const openWeatherKey = '73fac81d521b2c0cf1d48fe55e0f8c2f';  // your API key

// const Weather = () => {
//   const [weather, setWeather] = useState(null);   // current weather
//   const [forecast, setForecast] = useState(null); // forecast data
//   const [refreshing, setRefreshing] = useState(false);

//   const loadWeather = async () => {
//     setRefreshing(true);

//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission to access location was denied');
//         setRefreshing(false);
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
//       const { latitude, longitude } = location.coords;
//       console.log("Location:", latitude, longitude);

//       // Current weather API
//       const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherKey}`;
//       // Forecast API
//       const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherKey}`;

//       const weatherRes = await fetch(weatherUrl);
//       const weatherData = await weatherRes.json();

//       const forecastRes = await fetch(forecastUrl);
//       const forecastData = await forecastRes.json();

//       if (!weatherRes.ok || !forecastRes.ok) {
//         Alert.alert("Error fetching weather", weatherData.message || forecastData.message);
//       } else {
//         setWeather(weatherData);
//         setForecast(forecastData);
//       }
//     } catch (error) {
//       console.error("Exception during fetch:", error);
//       Alert.alert("Error", error.message);
//     }

//     setRefreshing(false);
//   };

//   useEffect(() => {
//     loadWeather();
//   }, []);

//   if (!weather || !forecast) {
//     return (
//       <SafeAreaView style={styles.loading}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading weather data...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={loadWeather} />
//         }
//         style={{ marginTop: 40 }}
//       >
//         <Text style={styles.title}>Current Weather</Text>
//         <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 6 }}>
//           {weather.name}
//         </Text>

//         {/* Current Weather */}
//         <View style={styles.current}>
//           <Image
//             style={styles.largeIcon}
//             source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png` }}
//           />
//           <Text style={{ fontSize: 32, fontWeight: "bold", color: "#C84B31" }}>
//             {Math.round(weather.main.temp)}°C
//           </Text>
//         </View>

//         <Text style={styles.currentDescription}>
//           {weather.weather[0].description.charAt(0).toUpperCase() +
//             weather.weather[0].description.slice(1)}
//         </Text>

//         {/* Extra Info */}
//         <View style={styles.extraInfo}>
//           <View style={styles.info}>
//             <Image source={require("../assets/temp.png")} style={styles.iconSmall} />
//             <Text style={styles.text}>{weather.main.feels_like}°C</Text>
//             <Text style={styles.text}>Feels Like</Text>
//           </View>
//           <View style={styles.info}>
//             <Image source={require("../assets/humidity.png")} style={styles.iconSmall} />
//             <Text style={styles.text}>{weather.main.humidity}%</Text>
//             <Text style={styles.text}>Humidity</Text>
//           </View>
//         </View>

//         {/* Forecast */}
//         <Text style={styles.subtitle}>Hourly Forecast (next 24h)</Text>
//         <FlatList
//           horizontal
//           data={forecast.list.slice(0, 8)} // next 24h (8 * 3h = 24h)
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => {
//             const dt = new Date(item.dt * 1000);
//             return (
//               <View style={styles.hour}>
//                 <Text style={{ fontSize: 16, fontWeight: "bold", color: "#346751" }}>
//                   {dt.getHours()}:00
//                 </Text>
//                 <Image
//                   style={styles.smallIcon}
//                   source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
//                 />
//                 <Text style={{ fontWeight: "bold", color: "#346751" }}>
//                   {Math.round(item.main.temp)}°C
//                 </Text>
//               </View>
//             );
//           }}
//         />

//         <Text style={styles.subtitle}>Next Days</Text>
//         {forecast.list.filter((item) => item.dt_txt.includes("12:00:00")).map((day, index) => {
//           const dt = new Date(day.dt * 1000);
//           return (
//             <View key={index} style={styles.daily}>
//               <Text style={{ fontSize: 18, flex: 1 }}>{dt.toDateString()}</Text>
//               <Image
//                 style={styles.smallIcon}
//                 source={{ uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png` }}
//               />
//               <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//                 {Math.round(day.main.temp)}°C
//               </Text>
//             </View>
//           );
//         })}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Weather;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ECDBBA",
//   },
//   loading: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#C84B31",
//   },
//   current: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 20,
//   },
//   largeIcon: {
//     width: 150,
//     height: 150,
//   },
//   currentDescription: {
//     fontSize: 22,
//     textAlign: "center",
//     color: "#333",
//     marginBottom: 10,
//   },
//   extraInfo: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 10,
//   },
//   info: {
//     alignItems: "center",
//     backgroundColor: "#01060412",
//     padding: 12,
//     borderRadius: 15,
//   },
//   text: {
//     fontSize: 16,
//     color: "#333",
//     marginTop: 5,
//   },
//   subtitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 12,
//     color: "#C84B31",
//   },
//   hour: {
//     alignItems: "center",
//     marginHorizontal: 10,
//   },
//   daily: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginHorizontal: 20,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//   },
//   smallIcon: {
//     width: 50,
//     height: 50,
//   },
//   iconSmall: {
//     width: 40,
//     height: 40,
//     marginBottom: 5,
//   },
// });




import { registerRootComponent } from "expo";
import App from "./src/App";

registerRootComponent(App);
