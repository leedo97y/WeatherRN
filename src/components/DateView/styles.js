import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dateBox: {
    gap: 15,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
    marginBottom: 20,
  },

  date: {
    fontSize: 27,
    fontFamily: "Unbounded-Regular",
    marginTop: 0,
    marginBottom: 0,
  },

  dateDeco: {
    fontSize: 27,
    fontFamily: "Unbounded-Regular",
    margin: -20,
    marginLeft: 5,
    padding: 0,
    transform: [{ rotate: "-10deg" }],
  },
});

export default styles;
