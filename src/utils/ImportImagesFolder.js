export const importAllImagesFromFolder = (r) => {
  const images = {};
  r.keys().forEach((item) => {
    const imageName = item.replace('./', '').replace(/\.\w+$/, '');
    images[imageName] = r(item);
  });
  return images;
};