const avatarColors = [
  'orange', 'purple', 'blue', 'yellow', 'green', 'red', 'pink', 'brown'
];

const usedAvatarColors: string[] = [];

const pickColor = () => {
  if (avatarColors.length === 0) {
    avatarColors.push(...usedAvatarColors);
    usedAvatarColors.splice(0, usedAvatarColors.length);
  }

  const color = avatarColors.pop() as string;
  usedAvatarColors.push(color);
  return color;
}

export default pickColor;