import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

import app from "@/config/firebase";

function useUploadImage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const storage = getStorage(app);

  async function uploadImageToFirebase(file) {
    if (!file) return;
    setIsUploading(true);
    try {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          if (snapshot.state === "paused") {
            console.log("Upload is paused");
          }
          console.log("Upload is " + progress + "% done");
          setLoadingPercentage(progress);
        },
        (error) => {
          setError(error);
          console.log(error, "Error while uploading image");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
          });
        }
      );
    } catch (error) {
      setError(error);
    } finally {
      setIsUploading(false);
    }
  }

  return {
    imageUrl,
    loadingPercentage,
    error,
    isUploading,
    uploadImageToFirebase,
  };
}

export default useUploadImage;
