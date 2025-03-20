import { api } from ".";

export const uploadFile = async (file) => {
  const data = new FormData();
  data.append("file", file);

  try {
    const response = await api.post("upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log({ response });
    return { success: true, filePath: response?.data?.filePath };
  } catch (error) {
    console.error("Upload failed:", error?.response?.data);
    return { success: false, error: error?.response?.data };
  }
};
