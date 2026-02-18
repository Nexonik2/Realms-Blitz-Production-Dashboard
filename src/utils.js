export const getIconPath = (name) => {
  // 1. Convert to lowercase: "Cold Iron" -> "cold iron"
  // 2. Remove all spaces: "cold iron" -> "coldiron"
  const cleanName = name.toLowerCase().replace(/\s+/g, '');

  // Handle specific shared icons or overrides
  if (cleanName.includes('knight')) return "/images/knight.png";
  if (cleanName.includes('crossbowman')) return "/images/crossbowman.png";
  if (cleanName.includes('paladin')) return "/images/paladin.png";
  
  // This points to the public/images folder in your local dev
  // In production, Vite serves these from the root /images/ path
  return `/images/${cleanName}.png`;
};

export const getDisplayName = (name) => {
  if (name === "Worker's Hut") return "Hut";
  const tierMatch = name.match(/^(T\d)\s/); 
  if (tierMatch) {
    return tierMatch[1]; 
  }
  return name;
};