export function capitalizeFirstLetter(sentence) {
  if (!sentence) return sentence;
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export function capitalizeEachWord(sentence) {
  if (!sentence) return sentence;
  const words = sentence.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
}

export function getImageName(imgUrl) {
  return imgUrl.substring(imgUrl.indexOf("/o/") + 3, imgUrl.lastIndexOf("?"));
}
