import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "c085c85ef7adac74dca0cca6afe4cb80";

const icons = {
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

    console.log(forecast.length);
    console.log(forecast[0]);
  };

  useEffect(() => {
    getWeather();
  }, []);

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
            const dayTemp = Math.floor(data.temp.day);

            return (
              <View key={index} style={styles.day}>
                <View style={styles.tempView}>
                  <Text style={styles.temp}>{dayTemp}</Text>
                  <Fontisto
                    style={styles.icon}
                    name={icons[data.weather[0].main]}
                    size={75}
                    color="black"
                  />
                </View>
                <Text style={styles.weatherText}>{data.weather[0].main}</Text>
                <Text style={styles.tinyText}>
                  {data.weather[0].description}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5caeff",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityname: {
    color: "black",
    fontSize: 50,
    fontWeight: 500,
    marginTop: 100,
  },

  day: {
    marginTop: 50,
    width: SCREEN_WIDTH,
    paddingLeft: 25,
  },

  tempView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
  },
  temp: {
    fontSize: 130,
    fontWeight: 500,
  },
  icon: {
    marginTop: -30,
    paddingBottom: 15,
    paddingRight: 10,
  },

  weatherText: {
    marginTop: -20,
    marginLeft: 10,
    fontSize: 25,
  },
  tinyText: {
    marginTop: -3,
    marginLeft: 10,
    fontSize: 15,
  },
});
