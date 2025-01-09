import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

import app from "@/config/firebase";
import { getImagePathFromFirebaseImageUrl } from "@/utils/dataFormater";

function useUploadImage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  const storage = getStorage(app);

  async function uploadImageToFirebase(file) {
    if (!file) return;
    setError(null);
    setIsError(false);
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
          setIsError(true);
          console.log(error, "Error while uploading image");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            setIsUploading(false);
          });
        }
      );
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsUploading(false);
    }
  }

  async function deleteImageFromFirebase(url) {
    if (
      !url ||
      !url.startsWith(
        "https://firebasestorage.googleapis.com/v0/b/opendoor-db7d9.appspot.com/o/"
      )
    )
      return;

    try {
      setIsDeletingImage(true);
      const imagePath = getImagePathFromFirebaseImageUrl(url);
      const storageRef = ref(storage, imagePath);
      await deleteObject(storageRef);
      setIsDeleteSuccess(true);
      setIsDeleteError(false);
      setIsDeletingImage(false);
      console.log("Image deleted from Firebase");
    } catch (error) {
      console.log(error);
      setIsDeleteError(true);
      setIsDeleteSuccess(false);
      setIsDeletingImage(false);
    }
  }

  return {
    imageUrl,
    loadingPercentage,
    error,
    isUploading,
    uploadImageToFirebase,
    isError,
    setImageUrl,
    deleteImageFromFirebase,
    isDeleteSuccess,
    isDeleteError,
    isDeletingImage,
  };
}

export default useUploadImage;
