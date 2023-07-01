import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tempView: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
  },
  temp: {
    fontSize: 105,
    fontWeight: 500,
    fontFamily: "Unbounded-Medium",
    marginBottom: 20,
    paddingLeft: 10,
  },
  tempIcon: {
    fontSize: 35,
    fontWeight: 500,
    fontFamily: "Unbounded-SemiBold",
    marginLeft: -37,
    marginBottom: -40,
  },
  icon: {
    paddingBottom: 25,
    paddingRight: 10,
  },

  percentage: {
    fontSize: 20,
    fontWeight: 500,
    fontFamily: "Unbounded-Medium",
    marginTop: -30,
    marginLeft: 10,
  },
});

export default styles;
