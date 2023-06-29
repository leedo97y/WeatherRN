import { useEffect, useState } from "react";
import * as Font from "expo-font";

export const useLoadResources = () => {
  const [isLoadOk, setIsLoadOk] = useState(false);

  const getResources = async () => {
    try {
      await Font.loadAsync({
        "AdventPro-VariableFont": require("../../assets/Fonts/AdventPro-VariableFont.ttf"),
        "AdventPro-Medium": require("../../assets/Fonts/AdventPro-Medium.ttf"),
        "AdventPro-SemiBold": require("../../assets/Fonts/AdventPro-SemiBold.ttf"),
        "Unbounded-Bold": require("../../assets/Fonts/Unbounded-Bold.ttf"),
        "Unbounded-ExtraBold": require("../../assets/Fonts/Unbounded-ExtraBold.ttf"),
        "Unbounded-Medium": require("../../assets/Fonts/Unbounded-Medium.ttf"),
        "Unbounded-Regular": require("../../assets/Fonts/Unbounded-Regular.ttf"),
        "Unbounded-SemiBold": require("../../assets/Fonts/Unbounded-SemiBold.ttf"),
        "Unbounded-Light": require("../../assets/Fonts/Unbounded-Light.ttf"),
      });
    } catch (err) {
      console.warn(err);
    } finally {
      setIsLoadOk(true);
    }
  };
  useEffect(() => {
    getResources();
  }, [isLoadOk]);

  return isLoadOk;
};
