export function dateStringToTime(dateString) {
  const time = new Date(dateString).toLocaleTimeString();
  return time;
}

export function dateStringToLocalString(dateString) {
  return new Date(dateString).toLocaleString();
}

export function getImagePathFromFirebaseImageUrl(url) {
  const baseUrl =
    "https://firebasestorage.googleapis.com/v0/b/opendoor-db7d9.appspot.com/o/";
  let imagePath = url.replace(baseUrl, "");
  const indexOfEndPath = imagePath.indexOf("?");
  imagePath = imagePath.substring(0, indexOfEndPath);
  imagePath = decodeURIComponent(imagePath);
  return imagePath;
}

export function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}