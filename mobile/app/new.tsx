import { useState } from "react";
import {
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Link, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import Icon from "@expo/vector-icons/Feather";

import { api } from "../src/lib/api";

import NLWLogo from "../src/assets/nlw-spacetime-logo.svg";

export default function NewMemories() {
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [media, setMedia] = useState<string | null>(null);

  const router = useRouter();

  async function openImagePicker() {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  }

  async function handleCreateMemory() {
    const token = await SecureStore.getItemAsync("token");

    let coverUrl = "";

    if (media) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", {
        name: "image.jpg",
        type: "image/jpeg",
        uri: media,
      } as any);

      const uploadResponse = await api.post("/upload", uploadFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      coverUrl = uploadResponse.data.fileURL;
    }

    await api.post(
      "/memories",
      {
        content,
        isPublic,
        coverUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    router.push("/memories");
  }

  return (
    <>
      <View className="flex-row items-center justify-between px-8">
        <NLWLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-10 h-10 items-center justify-center rounded-full bg-purple-500"
          >
            <Icon name="arrow-left" size={18} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="flex-1 mt-6 space-y-6 px-8">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            thumbColor={isPublic ? "#8257e5" : "#9e9ea0"}
            trackColor={{ false: "#767577", true: "#372560" }}
          />
          <Text
            className={`font-body text-base ${
              isPublic ? "text-gray-50" : "text-gray-200"
            }`}
          >
            Tornar memória pública
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={openImagePicker}
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-700 bg-black/20"
        >
          {media ? (
            <Image
              source={{ uri: media }}
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" size={18} color="#9e9ea0" />
              <Text className="font-body text-sm text-gray-200">
                Adicionar mídia
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          multiline
          textAlignVertical="top" // Android Only Vertical Align
          className="flex-1 p-0 font-body text-lg text-gray-50" // flex-1 only works here if it has on the container as well
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          placeholderTextColor="#56565a"
          onChangeText={setContent}
          value={content}
        />

        <TouchableOpacity
          className="px-5 py-2 bg-green-500 rounded-full self-end"
          activeOpacity={0.7}
          onPress={handleCreateMemory}
        >
          <Text className="font-alt text-sm text-black uppercase">Salvar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
