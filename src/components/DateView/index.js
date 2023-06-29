import styles from "./styles";
import "datejs";
import { Text, View } from "react-native";

const DateView = ({ index, isLoaded }) => {
  const month = Date.today().addDays(index).toString("MM");
  const day = Date.today().addDays(index).toString("dd");

  if (isLoaded) {
    return (
      <View style={styles.dateBox}>
        <Text style={styles.date}>{month}</Text>
        <Text style={styles.dateDeco}> ­– </Text>
        <Text style={styles.date}>{day}</Text>
      </View>
    );
  } else {
    return null;
  }
};

export default DateView;
