import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5caeff",
  },
  city: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  cityname: {
    color: "black",
    fontSize: 50,
    fontFamily: "Unbounded-Regular",
    fontWeight: 500,
    paddingTop: 80,
  },

  day: {
    marginTop: 30,
    width: SCREEN_WIDTH,
    paddingLeft: 25,
  },

  weatherText: {
    marginTop: -20,
    marginLeft: 10,
    fontSize: 25,
    fontFamily: "Unbounded-Regular",
  },
  tinyText: {
    marginTop: -3,
    marginLeft: 10,
    fontSize: 15,
    fontFamily: "Unbounded-Regular",
  },
});

export default styles;
