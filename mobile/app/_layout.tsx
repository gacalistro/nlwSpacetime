import { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { styled } from "nativewind";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";

import Stripes from "../src/assets/stripes.svg";
import blurBg from "../src/assets/bg-blur.png";

const StyledStripes = styled(Stripes);

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  const [fontLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  const { top, bottom } = useSafeAreaInsets();

  useEffect(() => {
    SecureStore.getItemAsync("token").then((token) => {
      setIsAuthenticated(!!token);
    });
  }, []);

  if (!fontLoaded) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar style="light" />

      <ImageBackground
        source={blurBg}
        className="relative flex-1 bg-gray-900"
        style={{ paddingTop: top + 16, paddingBottom: bottom + 16 }}
        imageStyle={{ position: "absolute", left: "-100%" }}
      >
        <StyledStripes className="absolute left-2" />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "transparent",
            },
            animation: "fade",
          }}
        >
          <Stack.Screen name="index" redirect={!!isAuthenticated} />
          <Stack.Screen name="memories" />
          <Stack.Screen name="new" />
        </Stack>
      </ImageBackground>
    </>
  );
}
