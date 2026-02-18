import { useState, useMemo } from 'react';
import { DEFINITIONS, INITIAL_STATE } from './constants';

export function useEconomy() {
  const [buildings, setBuildings] = useState(INITIAL_STATE);

  const updateBuilding = (id, delta) => {
    setBuildings(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const handleInputChange = (id, val) => {
    setBuildings(prev => ({
      ...prev,
      [id]: Math.max(0, parseInt(val) || 0)
    }));
  };

  const resetBuildings = () => setBuildings(INITIAL_STATE);

  const stats = useMemo(() => {
    const data = {};
    const allResources = new Set([...DEFINITIONS.map(d => d.id), 'Essence']);
    allResources.forEach(r => data[r] = { produced: 0, consumed: 0, net: 0 });
    
    let totalPopulation = 0;
    let totalPopulationCap = 6; 
    let totalBuildingsUsed = 0;

    DEFINITIONS.forEach(def => {
      const count = buildings[def.id] || 0;
      if (count > 0) {
        totalBuildingsUsed += count; 

        if (def.id === "Worker's Hut") {
             totalPopulationCap += (def.output * count);
        } else {
             data[def.id].produced += (def.output * count);
        }

        totalPopulation += (def.popCost * count);
        
        if (def.foodCost > 0) data['Wheat'].consumed += (def.foodCost * count);
        if (def.essenceCost > 0) data['Essence'].consumed += (def.essenceCost * count);

        def.inputs.forEach(input => {
          if (!data[input.id]) data[input.id] = { produced: 0, consumed: 0, net: 0 };
          data[input.id].consumed += (input.amount * count);
        });
      }
    });

    Object.keys(data).forEach(k => {
      data[k].net = data[k].produced - data[k].consumed;
    });

    return { resources: data, totalPopulation, totalPopulationCap, totalBuildingsUsed };
  }, [buildings]);

  const orderedResourceIds = [...DEFINITIONS.map(d => d.id), 'Essence'];

  return { buildings, updateBuilding, handleInputChange, resetBuildings, stats, orderedResourceIds };
}