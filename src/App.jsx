import React, { useState, useMemo } from 'react';
import { Plus, Minus, Crown, RefreshCw, Users, ArrowLeft, Filter, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { DEFINITIONS, FILTER_GROUPS, REALM_LEVELS } from './constants';
import { getIconPath, getDisplayName } from './utils';
import { useEconomy } from './useEconomy';

// --- SHARED UI COMPONENT: Status Badge ---
const StatusBadge = ({ icon: Icon, label, current, max, isOverLimit, colorClass }) => (
  <div className={`flex items-center gap-3 bg-white px-4 py-2 rounded-lg border shadow-sm transition-all duration-200 ${
    isOverLimit ? 'border-red-300 bg-red-50 ring-1 ring-red-100' : 'border-slate-200'
  }`}>
    <Icon className={`h-5 w-5 ${isOverLimit ? 'text-red-500' : 'text-slate-400'}`} />
    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
    <div className="w-px h-5 bg-slate-200 mx-1" />
    <span className={`font-black text-xl tabular-nums ${isOverLimit ? 'text-red-600' : colorClass}`}>
      {current} <span className="text-slate-400 text-sm font-medium">/ {max}</span>
    </span>
  </div>
);

// --- SHARED UI COMPONENT: Resource Icon ---
const ResourceDisplay = ({ name, amount, type = 'neutral' }) => {
  const colorClass = type === 'burn' ? 'text-red-600' : type === 'produce' ? 'text-green-600' : 'text-slate-700';
  const prefix = type === 'burn' ? '-' : type === 'produce' ? '+' : '';
  const isCap = name === "Worker's Hut";
  const shortName = getDisplayName(name);
  const isTierLabel = shortName.startsWith('T') && shortName.length === 2;

  if (amount === 0 && type === 'burn') return null;

  return (
    <div className={`flex flex-col items-center justify-center w-18 shrink-0 p-1 rounded-lg border shadow-sm transition-colors h-22 ${
      type === 'burn' ? 'bg-red-50/50 border-red-100' : 'bg-slate-50 border-slate-100'
    }`}>
      <div className={`text-center w-full truncate mb-0.5 ${isTierLabel ? 'text-[11px] font-black text-slate-700' : 'text-[9px] text-slate-500 font-medium'}`} title={name}>
        {shortName}
      </div>
      <div className="w-7 h-7 relative flex items-center justify-center mb-0.5">
        <img src={getIconPath(name)} alt={name} className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
        <div className="hidden w-7 h-7 bg-slate-200 rounded-full items-center justify-center text-[9px] font-bold text-slate-500">{name.charAt(0)}</div>
      </div>
      <div className="text-[9px] font-bold tabular-nums"><span className={colorClass}>{isCap ? `+${amount}` : `${prefix}${amount.toFixed(1)}`}</span></div>
    </div>
  );
};

export default function RealmsDashboard() {
  const { buildings, updateBuilding, handleInputChange, resetBuildings, stats, orderedResourceIds } = useEconomy();
  const [realmIdx, setRealmIdx] = useState(0);
  const currentRealm = REALM_LEVELS[realmIdx];

  const buildingsOver = stats.totalBuildingsUsed > currentRealm.slots;
  const populationOver = stats.totalPopulation > stats.totalPopulationCap;

  const [activeFilters, setActiveFilters] = useState(Object.keys(FILTER_GROUPS).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
  const toggleFilter = (key) => setActiveFilters(prev => ({ ...prev, [key]: !prev[key] }));

  const visibleResourceIds = useMemo(() => {
    const ids = new Set(["Worker's Hut"]); 
    Object.keys(FILTER_GROUPS).forEach(groupKey => { if (activeFilters[groupKey]) FILTER_GROUPS[groupKey].forEach(id => ids.add(id)); });
    return ids;
  }, [activeFilters]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 pb-12">
      
      {/* --- TWO-ROW STICKY HEADER --- */}
      <div className="sticky top-0 z-50 bg-slate-100/95 backdrop-blur pt-4 px-4 pb-2 shadow-sm border-b border-slate-200 min-w-fit">
        <div className="max-w-[1400px] mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* ROW 1: Branding */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-xl shadow-inner">
                        <Crown className="h-6 w-6 text-amber-600" />
                    </div>
                    {/* DASHBOARD RENAME */}
                    <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase">Realms: Blitz Production Dashboard</h1>
                </div>
                <button onClick={resetBuildings} className="flex items-center gap-2 px-3 py-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all font-bold text-xs uppercase" title="Reset Simulation">
                    <RefreshCw className="h-4 w-4" /> Reset
                </button>
            </div>

            {/* ROW 2: Navigation & Status */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
                
                {/* Realm Level Navigation */}
                <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 px-4 py-2 rounded-lg shadow-inner min-w-[200px] justify-between">
                    {realmIdx > 0 ? (
                        <button onClick={() => setRealmIdx(i => i - 1)} className="p-1 hover:bg-white rounded shadow-sm text-slate-600 transition-all"><ChevronLeft className="h-5 w-5" /></button>
                    ) : <div className="w-7" />}
                    
                    <span className="font-black text-slate-900 uppercase tracking-tighter text-lg">{currentRealm.name}</span>
                    
                    {realmIdx < REALM_LEVELS.length - 1 ? (
                        <button onClick={() => setRealmIdx(i => i + 1)} className="p-1 hover:bg-white rounded shadow-sm text-slate-600 transition-all"><ChevronRight className="h-5 w-5" /></button>
                    ) : <div className="w-7" />}
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-4">
                    <StatusBadge 
                      icon={Home} 
                      label="Buildings" 
                      current={stats.totalBuildingsUsed} 
                      max={currentRealm.slots} 
                      isOverLimit={buildingsOver} 
                      colorClass="text-slate-700" 
                    />
                    <StatusBadge 
                      icon={Users} 
                      label="Population" 
                      current={stats.totalPopulation} 
                      max={stats.totalPopulationCap} 
                      isOverLimit={populationOver} 
                      colorClass="text-slate-700" 
                    />
                </div>
            </div>

            {/* Filter Bar */}
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
               <div className="flex items-center gap-1 mr-2 text-slate-400"><Filter className="h-3 w-3" /><span className="text-[10px] font-bold uppercase tracking-wider">Filters:</span></div>
               {Object.keys(FILTER_GROUPS).map(group => (
                 <label key={group} className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-md cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all select-none">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0 w-3.5 h-3.5" checked={activeFilters[group]} onChange={() => toggleFilter(group)} />
                    <span className="text-[11px] font-semibold text-slate-600">{group}</span>
                 </label>
               ))}
            </div>

            {/* Net Flow Grid */}
            <div className="px-4 py-3 bg-white overflow-x-auto no-scrollbar">
                <div className="flex gap-2">
                    {orderedResourceIds.map(resId => {
                        const row = stats.resources[resId];
                        if (!row || resId === "Worker's Hut") return null;
                        if (Math.abs(row.produced) < 0.01 && Math.abs(row.consumed) < 0.01) return null;
                        const isPositive = row.net > 0;
                        const isNegative = row.net < 0;
                        return (
                            <div key={resId} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-100 bg-slate-50 shadow-sm min-w-[110px]">
                                <div className="w-5 h-5 shrink-0 relative"><img src={getIconPath(resId)} className="w-full h-full object-contain" onError={(e) => {e.target.style.display='none'}}/></div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[10px] font-medium text-slate-500 mb-0.5">{getDisplayName(resId)}</span>
                                    <span className={`text-xs font-mono font-bold ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-slate-400'}`}>{isPositive && '+'}{row.net.toFixed(1)}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-4 flex flex-col gap-3">
          {DEFINITIONS.filter(def => visibleResourceIds.has(def.id)).map(def => {
             const count = buildings[def.id];
             const isActive = count > 0;
             return (
              <div key={def.id} className={`p-3 rounded-xl border shadow-sm transition-all bg-white ${isActive ? 'border-blue-200 shadow-md ring-1 ring-blue-100' : 'border-slate-200'}`}>
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex flex-col items-center justify-center gap-0.5 shrink-0 w-10">
                      <button onClick={() => updateBuilding(def.id, 1)} className="w-full h-7 flex items-center justify-center rounded bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:text-blue-600 transition-all"><Plus className="h-3 w-3" /></button>
                      <input type="number" min="0" className="w-full text-center font-bold text-base bg-transparent focus:outline-none py-0.5 h-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={buildings[def.id]} onChange={(e) => handleInputChange(def.id, e.target.value)} />
                      <button onClick={() => updateBuilding(def.id, -1)} className="w-full h-7 flex items-center justify-center rounded bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:text-red-600 transition-all"><Minus className="h-3 w-3" /></button>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-start gap-2.5 overflow-x-auto no-scrollbar">
                    <ResourceDisplay name={def.id} amount={isActive ? def.output * count : def.output} type="produce" />
                    {(def.foodCost > 0 || def.essenceCost > 0 || def.inputs.length > 0) && (<ArrowLeft className="h-4 w-4 text-slate-300 shrink-0" />)}
                    <div className="flex items-center gap-1.5">
                        {def.foodCost > 0 && <ResourceDisplay name="Wheat" amount={isActive ? def.foodCost * count : def.foodCost} type="burn" />}
                        {def.essenceCost > 0 && <ResourceDisplay name="Essence" amount={isActive ? def.essenceCost * count : def.essenceCost} type="burn" />}
                        {((def.foodCost > 0 || def.essenceCost > 0) && def.inputs.length > 0) && (<div className="w-px h-8 bg-slate-200 mx-0.5 shrink-0" />)}
                        {def.inputs.map(input => (<ResourceDisplay key={input.id} name={input.id} amount={isActive ? input.amount * count : input.amount} type="burn" />))}
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-end border-l pl-3 border-slate-100 min-w-[70px] justify-center">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 mb-0.5">Population</span>
                    <div className="flex items-center gap-1.5 font-bold text-slate-700 bg-slate-50 px-1.5 py-0.5 rounded-lg border border-slate-100">
                      <Users className="h-3 w-3 text-slate-400" />
                      <span className="text-sm">{def.popCost}</span>
                    </div>
                  </div>
                </div>
              </div>
             );
          })}
      </div>
    </div>
  );
}