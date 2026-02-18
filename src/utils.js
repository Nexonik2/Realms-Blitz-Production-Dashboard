export const getIconPath = (name) => {
  const lower = name.toLowerCase();
  if (lower === "worker's hut") return "/images/workershut.png";
  if (lower === 'cold iron') return '/images/coldiron.png';
  if (lower.includes('knight')) return '/images/knight.png';
  if (lower.includes('crossbowman')) return '/images/crossbowman.png';
  if (lower.includes('paladin')) return '/images/paladin.png';
  return `/images/${name}.png`;
};

export const getDisplayName = (name) => {
  if (name === "Worker's Hut") return "Hut";
  const tierMatch = name.match(/^(T\d)\s/); 
  if (tierMatch) {
    return tierMatch[1]; // Returns "T1", "T2", "T3"
  }
  return name;
};