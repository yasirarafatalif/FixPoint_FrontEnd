interface UploadImageResponse {
  success: boolean;
  message: string;
  data?: {
    url: string;
    displayUrl: string;
    deleteUrl: string;
  };
}

export async function uploadImage(file: File): Promise<string> {
  if (!file) {
    throw new Error("Image file is required.");
  }

  const formData = new FormData();

  formData.append("image", file);

  const response = await fetch("/api/upload-image", {
    method: "POST",
    body: formData,
  });

  const result: UploadImageResponse = await response.json();

  if (!response.ok || !result.success || !result.data?.url) {
    throw new Error(result.message || "Image upload failed.");
  }

  return result.data.url;
}