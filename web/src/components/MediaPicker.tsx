"use client";

import { ChangeEvent, useState } from "react";

export function MediaPicker() {
  const [preview, setPreview] = useState<null | string>(null);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previewURL = URL.createObjectURL(files[0]);

    setPreview(previewURL);
  }

  return (
    <>
      <input
        type="file"
        name="media"
        id="media"
        accept="image/*"
        onChange={onFileSelected}
        className="invisible w-0 h-0"
      />

      {preview && (
        <img
          src={preview}
          alt="image preview"
          className="w-full aspect-video object-cover rounded-lg"
        />
      )}
    </>
  );
}
