import Link from "next/link";
import { Camera, ChevronLeft } from "lucide-react";

import { MediaPicker } from "@/components/MediaPicker";
import { NewMemoryForm } from "@/components/NewMemoryForm";

export default function NewMemory() {
  return (
    <div className="flex-1 flex flex-col gap-4 p-16">
      <Link
        href="/"
        className=" flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="w-4 h-4" />
        voltar a timeline
      </Link>

      <NewMemoryForm>
        <div className="flex items-center gap-4">
          <label
            htmlFor="media"
            className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100 cursor-pointer select-none"
          >
            <Camera className="w-4 h-4" />
            Anexar mídia
          </label>

          <label
            htmlFor="isPublic"
            className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-400 rounded"
            />
            Tornar memória pública
          </label>
        </div>

        <MediaPicker />

        <textarea
          name="content"
          spellCheck={false}
          className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />

        <button
          type="submit"
          className="inline-block px-5 py-3 bg-green-500 rounded-full font-alt text-sm text-black uppercase leading-none self-end hover:bg-green-600 transition-colors"
        >
          Salvar
        </button>
      </NewMemoryForm>
    </div>
  );
}
