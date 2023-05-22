export function findColor(input: string[]) {
  const colors = [
    "blue",
    "red",
    "green",
    "yellow",
    "pink",
    "black",
    "white",
    "any",
  ];

  for (const color of input) {
    if (colors.includes(color)) {
      return color;
    }
  }

  return null;
}
export function findShape(input: string[]) {
  const shapes = ["circle", "square", "rounded"];

  for (const shape of input) {
    if (shapes.includes(shape)) {
      return shape;
    }
  }

  return null;
}

export function findStyle(input: string[]) {
  const styles = [
    "claymorphic",
    "flat",
    "3d rendered",
    "pixelated",
    "realistic",
    "sticker",
    "cartoonish",
    "hand drawn",
    // "water color",
  ];

  for (const style of input) {
    if (styles.includes(style)) {
      return style;
    }
  }

  return null;
}

export function findAsset(input: string[]) {
  const assets = [
    "Logo",
    "Icon",
    "App Icon",
    "Photo",
    "Vector",
    "Digital Art",
    "Letters",
  ];

  for (const asset of input) {
    if (assets.includes(asset)) {
      return asset;
    }
  }

  return null;
}

export function findBackground(input: string[]) {
  const backgroundColors = [
    "dark background",
    "light background",
    "gradient background",
    "black background",
    "white background",
    "rainbow background",
    "blue background",
    "any background",
  ];

  for (const background of input) {
    if (backgroundColors.includes(background)) {
      return background;
    }
  }

  return null;
}
