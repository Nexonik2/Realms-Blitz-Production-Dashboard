export const CATEGORIES = {
  BASIC: 'Basic',
  ADVANCED: 'Advanced',
  TIER1: 'Tier 1',
  TIER2: 'Tier 2',
  TIER3: 'Tier 3'
};

export const REALM_LEVELS = [
  { name: 'Settlement', slots: 6, cost: null },
  { name: 'City', slots: 18, cost: { labor: 180, Wheat: 1200, Essence: 250 } },
  { name: 'Kingdom', slots: 36, cost: { labor: 360, Wheat: 2400, Essence: 600, Wood: 180 } },
  { name: 'Empire', slots: 60, cost: { labor: 720, Wheat: 4800, Essence: 1200, Wood: 360, Coal: 180, Copper: 180 } }
];

export const FILTER_GROUPS = {
  'Food': ['Wheat'],
  'T1 Res': ['Wood', 'Coal', 'Copper'],
  'T2 Res': ['Ironwood', 'Cold Iron', 'Gold'],
  'T3 Res': ['Adamantine', 'Mithral', 'Dragonhide'],
  'Knights': ['T1 Knight', 'T2 Knight', 'T3 Knight'],
  'X-Bows': ['T1 Crossbowman', 'T2 Crossbowman', 'T3 Crossbowman'],
  'Paladins': ['T1 Paladin', 'T2 Paladin', 'T3 Paladin'],
};

export const DEFINITIONS = [
  { id: "Worker's Hut", category: CATEGORIES.BASIC, popCost: 0, foodCost: 0, essenceCost: 0, output: 6, inputs: [] },
  { id: 'Wheat', category: CATEGORIES.BASIC, popCost: 1, foodCost: 0, essenceCost: 0, output: 6, inputs: [] },
  { id: 'Wood', category: CATEGORIES.BASIC, popCost: 2, foodCost: 1, essenceCost: 0, output: 1, inputs: [{ id: 'Coal', amount: 0.2 }, { id: 'Copper', amount: 0.2 }] },
  { id: 'Coal', category: CATEGORIES.BASIC, popCost: 2, foodCost: 1, essenceCost: 0, output: 1, inputs: [{ id: 'Wood', amount: 0.3 }, { id: 'Copper', amount: 0.2 }] },
  { id: 'Copper', category: CATEGORIES.BASIC, popCost: 2, foodCost: 1, essenceCost: 0, output: 1, inputs: [{ id: 'Wood', amount: 0.3 }, { id: 'Coal', amount: 0.2 }] },
  { id: 'Ironwood', category: CATEGORIES.ADVANCED, popCost: 2, foodCost: 2, essenceCost: 0, output: 1, inputs: [{ id: 'Coal', amount: 0.6 }, { id: 'Copper', amount: 0.4 }] },
  { id: 'Cold Iron', category: CATEGORIES.ADVANCED, popCost: 2, foodCost: 2, essenceCost: 0, output: 1, inputs: [{ id: 'Coal', amount: 0.6 }, { id: 'Copper', amount: 0.4 }] },
  { id: 'Gold', category: CATEGORIES.ADVANCED, popCost: 2, foodCost: 2, essenceCost: 0, output: 1, inputs: [{ id: 'Coal', amount: 0.6 }, { id: 'Copper', amount: 0.4 }] },
  { id: 'Adamantine', category: CATEGORIES.ADVANCED, popCost: 2, foodCost: 3, essenceCost: 0, output: 1, inputs: [{ id: 'Coal', amount: 0.9 }, { id: 'Ironwood', amount: 0.6 }] },
  { id: 'Mithral', category: CATEGORIES.ADVANCED, popCost: 2, foodCost: 3, essenceCost: 0, output: 1, inputs: [{ id: 'Coal', amount: 0.9 }, { id: 'Cold Iron', amount: 0.6 }] },
  { id: 'Dragonhide', category: CATEGORIES.ADVANCED, popCost: 2, foodCost: 3, essenceCost: 0, output: 1, inputs: [{ id: 'Coal', amount: 0.9 }, { id: 'Gold', amount: 0.6 }] },
  { id: 'T1 Knight', category: CATEGORIES.TIER1, popCost: 3, foodCost: 2, essenceCost: 0, output: 5, inputs: [{ id: 'Copper', amount: 0.4 }] },
  { id: 'T1 Crossbowman', category: CATEGORIES.TIER1, popCost: 3, foodCost: 2, essenceCost: 0, output: 5, inputs: [{ id: 'Copper', amount: 0.4 }] },
  { id: 'T1 Paladin', category: CATEGORIES.TIER1, popCost: 3, foodCost: 2, essenceCost: 0, output: 5, inputs: [{ id: 'Copper', amount: 0.4 }] },
  { id: 'T2 Knight', category: CATEGORIES.TIER2, popCost: 3, foodCost: 3, essenceCost: 1, output: 5, inputs: [{ id: 'T1 Knight', amount: 10 }, { id: 'Copper', amount: 0.2 }, { id: 'Cold Iron', amount: 0.6 }] },
  { id: 'T2 Crossbowman', category: CATEGORIES.TIER2, popCost: 3, foodCost: 3, essenceCost: 1, output: 5, inputs: [{ id: 'T1 Crossbowman', amount: 10 }, { id: 'Copper', amount: 0.2 }, { id: 'Ironwood', amount: 0.6 }] },
  { id: 'T2 Paladin', category: CATEGORIES.TIER2, popCost: 3, foodCost: 3, essenceCost: 1, output: 5, inputs: [{ id: 'T1 Paladin', amount: 10 }, { id: 'Copper', amount: 0.2 }, { id: 'Gold', amount: 0.6 }] },
  { id: 'T3 Knight', category: CATEGORIES.TIER3, popCost: 3, foodCost: 4, essenceCost: 3, output: 5, inputs: [{ id: 'T2 Knight', amount: 10 }, { id: 'Cold Iron', amount: 0.4 }, { id: 'Mithral', amount: 0.8 }] },
  { id: 'T3 Crossbowman', category: CATEGORIES.TIER3, popCost: 3, foodCost: 4, essenceCost: 3, output: 5, inputs: [{ id: 'T2 Crossbowman', amount: 10 }, { id: 'Ironwood', amount: 0.4 }, { id: 'Adamantine', amount: 0.8 }] },
  { id: 'T3 Paladin', category: CATEGORIES.TIER3, popCost: 3, foodCost: 4, essenceCost: 3, output: 5, inputs: [{ id: 'T2 Paladin', amount: 10 }, { id: 'Gold', amount: 0.4 }, { id: 'Dragonhide', amount: 0.8 }] },
];

export const INITIAL_STATE = DEFINITIONS.reduce((acc, def) => ({ ...acc, [def.id]: 0 }), {});