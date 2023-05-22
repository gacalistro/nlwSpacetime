"use client";

import { api } from "@/lib/api";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";

interface NewMemoryFormProps {
  children: React.ReactNode;
}

export function NewMemoryForm({ children }: NewMemoryFormProps) {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get("media");

    let coverUrl = "";

    if (fileToUpload) {
      const uploadFormData = new FormData();

      uploadFormData.set("file", fileToUpload);

      const uploadResponse = await api.post("/upload", uploadFormData);

      coverUrl = uploadResponse.data.fileURL;
    }

    const token = cookies.get("token");

    await api.post(
      "/memories",
      {
        coverUrl,
        content: formData.get("content"),
        isPublic: formData.get("isPublic"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    router.push("/");
  }
  return (
    <form className="flex-1 flex flex-col gap-2" onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
