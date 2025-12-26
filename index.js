import { View, Text, Alert,SafeAreaView,StyleSheet,ActivityIndicator,
    ScrollView,RefreshControl,Image,Dimensions,FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';




const openWeatherKey = 'YOUR OPEN API KEY HERE';

let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`;


const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

   const loadForecast = async () => {
    setRefreshing(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        setRefreshing(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({ enabledHighAccuracy: true });
      console.log('Location:', location);

      const fullUrl = `${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`;
      console.log('Fetching from URL:', fullUrl);

      const response = await fetch(fullUrl);
      const data = await response.json();
      console.log('Response JSON:', data);

      if (!response.ok) {
        // Log actual error from API response
        Alert.alert('Error fetching weather data', data.message || 'Unknown error');
      } else {
        setForecast(data);
      }
    } catch (error) {
      console.error('Exception during fetch:', error);
      Alert.alert('Error', error.message);
    }

    setRefreshing(false);
  };

    useEffect(() => {
        loadForecast();
    }, []);

    if (!forecast) {
        return(
            <SafeAreaView style={styles.loading}>
                <ActivityIndicator size="large" color="#0000ff" />
                {/* <Text>Loading weather data...</Text> */}
            </SafeAreaView>
        );
    }

    // const current =forecast.current.weather[0];
    // const current = forecast.weather[0];
    // const temperature = forecast.main.temp;
    // const humidity = forecast.main.humidity;
    // const windSpeed = forecast.wind.speed;
const current = forecast.current.weather[0];
// const temperature = forecast.current.temp;
// const humidity = forecast.current.humidity;
// const windSpeed = forecast.current.wind_speed;



    const daily = forecast.daily;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing}
                 onRefresh={() => loadForecast()} />
            }
             style={{marginTop: 50}}>
           <Text style={styles.title}>
            Current Weather
           </Text>
            <Text style={{alignItems: 'center' ,textAlign: 'center', fontSize: 20, marginTop: 10}}>
                Your location
            </Text>
           <View style={styles.current}>
  <Image
    style={styles.largeIcon}
    source={{ uri: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png` }}
  />
  <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#C84B31' }}>
    {Math.round(forecast.main.temp)}°C
  </Text>
</View>

<Text style={styles.currentDescription}>
  {forecast.weather[0].description.charAt(0).toUpperCase() +
    forecast.weather[0].description.slice(1)}
</Text>

<View style={styles.extraInfo}>
  <View style={styles.info}>
    <Image
      source={require('../assets/temp.png')}
      style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 50 }}
    />
    {/* <Text style={styles.text}>{forecast.main.feels_like}°C</Text>  */}
    <Text style={styles.text}>{forecast.current.feels_like}°C</Text>
    <Text style={styles.text}>Feels Like</Text>
  </View>

  <View style={styles.info}>
    <Image
      source={require('../assets/humidity.png')}
      style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 50 }}
    />
    <Text style={styles.text}>{forecast.main.humidity}%</Text>
    <Text style={styles.text}>Humidity</Text>
  </View>
</View>

                <View >
                <Text style={styles.subtitle}>Hourly forecast</Text>
                </View>

                <FlatList
                horizontal
                data={forecast.hourly.slice(0,24)}
                // data={forecast.hourly?.slice(0, 24) || []}

                keyExtractor={(item,index)=> index.toString()}
                renderItem={(hour) =>{
                    const weather=hour.item.weather[0];
                    var dt=new Date(hour.item.dt * 1000);
                    return(
                        <View style={styles.hour}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#346751'}}>
                                {dt.toLocaleTimeString().replace(/:\d+ /,' ')}
                            </Text>
                           
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#346751'}}>
                                {Math.round(hour.item.temp)}°C
                            </Text>
                             <Image
                                style={styles.smallIcon}
                                source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@4x.png` }}
                            />
                            <Text style={{fontWeight: 'bold', color: '#346751'}}>
                                {weather.description}
                            </Text>
                        </View>
                    );
                }
                    }
                />
            </ScrollView>
        </SafeAreaView>
    );
}


export default Weather;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECDBBA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        // marginVertical: 20,
        color: '#C84B31',
    },
    current: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        alignContent: 'center',
    },
    largeIcon: {
        width: 300,
        height: 250,
    },
    currentTemp: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#C84B31',
        textAlign: 'center',
        marginTop: 10,
    },
    currentDescription: {
        width: '100%',
        fontSize: 24,
        fontWeight: '200',
        textAlign: 'center',
        color: '#333',
        marginBottom: 5,
        // marginTop: 10,
    },
    extraInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        padding: 10,
    },
    info: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width / 3,
        backgroundColor: '#01060412',
        padding: 10,
        borderRadius: 15,
    },
    text: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginTop: 5,
    },
    subtitle :{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 12,
        marginLeft: 7,
        color: '#C84B31',
    },
    hour: {
        
        padding: 6,
        // borderRadius: 10,
        // marginHorizontal: 5,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    smallIcon: {
        width: 50,
        height: 100,
    },
});




