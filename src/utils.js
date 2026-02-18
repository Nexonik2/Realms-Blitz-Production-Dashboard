export const getIconPath = (name) => {
  // Always work with lowercase to match the file system in /public/images/
  const lower = name.toLowerCase();

  // Handle specific overrides for buildings/units with unique or shared icons
  if (lower === "worker's hut") return "/images/workershut.png";
  if (lower.includes('knight')) return '/images/knight.png';
  if (lower.includes('crossbowman')) return '/images/crossbowman.png';
  if (lower.includes('paladin')) return '/images/paladin.png';
  
  // For all other resources (Wheat, Coal, Ironwood, etc.), 
  // use the lowercase name to match the .png filename exactly.
  return `src/images/${lower}.png`;
};

export const getDisplayName = (name) => {
  if (name === "Worker's Hut") return "Hut";
  const tierMatch = name.match(/^(T\d)\s/); 
  if (tierMatch) {
    return tierMatch[1]; // Returns "T1", "T2", "T3"
  }
  return name;
};