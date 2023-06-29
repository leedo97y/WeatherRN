import styles from "./styles";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { useLoadResources } from "./src/hooks/useLoadResource";

import DateView from "./src/components/DateView";
import TempView from "./src/components/TempView";

const API_KEY = "c085c85ef7adac74dca0cca6afe4cb80";

const weatherOption = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Thunderstorm: "lightning",
  Drizzle: "rain",
  Rain: "rains",
  Snow: "snow",
  Mist: "fog",
  Smoke: "fog",
  Haze: "fog",
  Ash: "fog",
  Dust: "fog",
  Sand: "fog",
  Fog: "fog",
  Squall: "fog",
  Tornado: "fog",
};
export default function App() {
  const isLoaded = useLoadResources();
  const [city, setCity] = useState("Loading...");
  const [forecast, setForecast] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    setCity(location[0].city);

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts,minutely,hourly&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    setForecast(data.daily);

    // console.log(forecast.length);
    // console.log(forecast[0]);
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (isLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.city}>
          <Text style={styles.cityname}>{city}</Text>
        </View>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weather}
        >
          {forecast.length == 0 ? (
            <View style={styles.day}>
              <ActivityIndicator color="black" size="large" />
            </View>
          ) : (
            forecast.map((data, index) => {
              return (
                <View key={index} style={styles.day}>
                  <DateView index={index} isLoaded={isLoaded} />
                  <TempView
                    weatherOption={weatherOption}
                    data={data}
                    isLoaded={isLoaded}
                  />
                  <Text style={styles.weatherText}>{data.weather[0].main}</Text>
                  <Text style={styles.tinyText}>
                    {data.weather[0].description}
                  </Text>
                  <Text></Text>
                </View>
              );
            })
          )}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return null;
  }
}
