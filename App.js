import styles from "./styles";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { useLoadResources } from "./src/hooks/useLoadResource";

import DateView from "./src/components/DateView";
import TempView from "./src/components/TempView";

import { weatherOption, uviOption } from "./src/util/optionDatas";

const API_KEY = "c085c85ef7adac74dca0cca6afe4cb80";

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
              const simpleUvi = Math.floor(data.uvi);

              return (
                <View
                  key={index}
                  style={{
                    ...styles.day,
                    backgroundColor: weatherOption[data.weather[0].main][1],
                  }}
                >
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
                  <Text style={styles.minMaxTemp}>
                    {Math.floor(data.temp.min)}℃ &nbsp; / &nbsp;{" "}
                    {Math.floor(data.temp.max)}℃
                  </Text>
                  <Text style={styles.humidity}>
                    Humidity &nbsp; {data.humidity}%
                  </Text>
                  <View style={styles.uvIndex}>
                    <Text style={styles.uviText}>UVI &nbsp; {data.uvi}</Text>
                    <View
                      style={{
                        ...styles.uviCircle,
                        backgroundColor:
                          simpleUvi <= 2
                            ? uviOption["2"][1]
                            : simpleUvi <= 5 && simpleUvi > 3
                            ? uviOption["5"][1]
                            : simpleUvi <= 7 && simpleUvi > 5
                            ? uviOption["7"][1]
                            : simpleUvi <= 10 && simpleUvi > 7
                            ? uviOption["10"][1]
                            : uviOption["11"][1],
                      }}
                    ></View>
                    <Text style={styles.uviWarning}>
                      {simpleUvi <= 2
                        ? uviOption["2"][0]
                        : simpleUvi <= 5 && simpleUvi > 3
                        ? uviOption["5"][0]
                        : simpleUvi <= 7 && simpleUvi > 5
                        ? uviOption["7"][0]
                        : simpleUvi <= 10 && simpleUvi > 7
                        ? uviOption["10"][0]
                        : simpleUvi >= 11
                        ? uviOption["11"][0]
                        : "--"}
                    </Text>
                  </View>
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
