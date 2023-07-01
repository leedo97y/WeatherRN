import styles from "./styles";
import { Fontisto } from "@expo/vector-icons";
import { Text, View } from "react-native";

const TempView = ({ data, weatherOption, isLoaded }) => {
  const dayTemp = Math.floor(data.temp.day);
  if (isLoaded) {
    return (
      <View style={styles.tempView}>
        <Text style={styles.temp}>{dayTemp}</Text>
        <Text style={styles.tempIcon}>℃</Text>
        <View>
          <Fontisto
            style={styles.icon}
            name={weatherOption[data.weather[0].main][0]}
            size={75}
            color="black"
          />
          <Text style={styles.percentage}>
            {data.clouds > 20 && data.clouds + " %"}
          </Text>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default TempView;
