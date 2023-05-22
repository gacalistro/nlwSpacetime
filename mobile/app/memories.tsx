import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";

import Icon from "@expo/vector-icons/Feather";

import { api } from "../src/lib/api";

import NLWLogo from "../src/assets/nlw-spacetime-logo.svg";

dayjs.locale(ptBr);

interface Memory {
  coverUrl: string;
  excerpt: string;
  id: string;
  createdAt: string;
}

export default function Memories() {
  const [memories, setMemories] = useState<Memory[]>([]);

  const router = useRouter();

  async function signOut() {
    await SecureStore.deleteItemAsync("token");
    router.push("/");
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync("token");

    const response = await api.get("/memories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMemories(response.data);
  }

  useEffect(() => {
    loadMemories();
  }, []);

  return (
    <>
      <View className="flex-row items-center justify-between px-8">
        <NLWLogo />

        <View className="flex-row space-x-2">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={signOut}
            className="w-10 h-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={18} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity
              activeOpacity={0.7}
              className="w-10 h-10 items-center justify-center rounded-full bg-green-500"
            >
              <Icon name="plus" size={18} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <ScrollView className="flex-1 mt-5 space-y-10">
        {memories &&
          memories.map((memory) => (
            <View className="space-y-4" key={memory.id}>
              <View className="flex-row items-center space-x-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="font-body text-xs text-gray-100">
                  {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
                </Text>
              </View>

              <View className="space-y-4 px-8">
                <Image
                  source={{
                    uri: memory.coverUrl,
                  }}
                  className="w-full aspect-video rounded-lg"
                />

                <Text className="font-body text-base leading-relaxed text-gray-100">
                  {memory.excerpt}
                </Text>

                <Link href="/memories/id" asChild>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center space-x-2"
                  >
                    <Text className="font-body text-sm text-gray-200">
                      Ler mais
                    </Text>
                    <Icon name="arrow-right" size={18} color="#9e9ea0" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          ))}
      </ScrollView>
    </>
  );
}
