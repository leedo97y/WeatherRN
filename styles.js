import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  city: {
    flex: 1,
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
    paddingTop: 30,
    width: SCREEN_WIDTH,
    paddingLeft: 25,
  },

  weatherText: {
    marginTop: -10,
    marginLeft: 10,
    fontSize: 25,
    fontFamily: "Unbounded-Regular",
  },
  tinyText: {
    marginTop: -1,
    marginLeft: 10,
    fontSize: 15,
    fontFamily: "Unbounded-Regular",
  },
  minMaxTemp: {
    paddingTop: 30,
    marginLeft: 10,
    fontSize: 20,
    fontFamily: "Unbounded-Medium",
  },
  humidity: {
    marginLeft: 10,
    paddingTop: 20,
    fontSize: 16,
    fontFamily: "Unbounded-Regular",
  },
  uvIndex: {
    flexDirection: "row",
    alignContent: "center",
    paddingTop: 20,
    marginLeft: 10,
  },
  uviText: {
    alignContent: "center",
    fontSize: 16,
    fontFamily: "Unbounded-Regular",
    marginRight: 10,
  },
  uviCircle: {
    width: 18,
    height: 18,
    backgroundColor: "#000",
    borderRadius: "100%",
  },
  uviWarning: {
    fontSize: 16,
    fontFamily: "Unbounded-Regular",
    marginLeft: 10,
  },
});

export default styles;
