export default function getCloudinaryImageName(url: string) {
  const regex = /\/([^/]+)\.(jpg|avif|webp|png)/;
  const matches = url.match(regex);

  if (matches && matches.length >= 2) {
    const code = matches[1];
    return code;
  } else {
    return "";
  }
}
