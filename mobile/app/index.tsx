import { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { api } from "../src/lib/api";

import NLWLogo from "../src/assets/nlw-spacetime-logo.svg";

// Endpoint
const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/c5c0c2cc6471b4b653ea",
};

export default function App() {
  const router = useRouter();

  const [_request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: "c5c0c2cc6471b4b653ea",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "nlwspacetime",
      }),
    },
    discovery
  );

  async function handleAuthenticationWithGithub(code: string) {
    const response = await api.post("/register", {
      code,
    });

    const { token } = response.data;

    await SecureStore.setItemAsync("token", token);

    router.push("/memories");
  }

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      handleAuthenticationWithGithub(code);
    }
  }, [response]);

  return (
    <>
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl text-gray-50 leading-tight">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base text-gray-100 leading-relaxed">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          className="px-5 py-2 bg-green-500 rounded-full"
          activeOpacity={0.7}
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm text-black uppercase">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm text-gray-200 leading-relaxed">
        Feito com 🤬 no NLW da Rocketseat
      </Text>
    </>
  );
}
