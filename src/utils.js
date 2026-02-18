export const getIconPath = (name) => {
  // 1. Convert to lowercase: "Worker's Hut" -> "worker's hut"
  // 2. Remove all non-alphanumeric characters (spaces, apostrophes, etc.): 
  //    "worker's hut" -> "workershut"
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Handle specific shared icons for troops
  if (cleanName.includes('knight')) return "/images/knight.png";
  if (cleanName.includes('crossbowman')) return "/images/crossbowman.png";
  if (cleanName.includes('paladin')) return "/images/paladin.png";
  
  // This correctly maps "Worker's Hut" to "/images/workershut.png"
  // and "Cold Iron" to "/images/coldiron.png"
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