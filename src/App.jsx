import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { toPng } from 'html-to-image';
import { getStat } from './mappings';

// --- 1. HELPERS: COLORS, GRADIENTS, & TIER LOGIC ---

const rlCars = [
  "007's Aston Martin DB5",
  "007's Aston Martin DBS",
  "007's Aston Martin Valhalla",
  "1966 Cadillac DeVille",
  "1999 Nissan Skyline GT-R R34",
  "89 Batmobile",
  "Ace",
  "Admiral",
  "Aftershock",
  "Animus GP",
  "Apex",
  "Armadillo",
  "Artemis",
  "Artemis G1",
  "Artemis GXT",
  "Azura",
  "Back to the Future Time Machine",
  "Backfire",
  "Batmobile (1989)",
  "Batmobile (2016)",
  "Batmobile (2022)",
  "Battle Bus",
  "Behemoth",
  "Beskar",
  "BMW 1 Series",
  "BMW 1 Series RLE",
  "BMW M2 Racing",
  "BMW M240i",
  "BMW M3 (E30)",
  "BMW M4 GT3 EVO",
  "Bone Shaker",
  "Breakout",
  "Breakout Type-S",
  "Breakout X",
  "Bugatti Centodieci",
  "Bumblebee",
  "Centio",
  "Chikara",
  "Chikara G1",
  "Chikara GXT",
  "Chevrolet Astro",
  "Chevrolet Corvette Stingray",
  "Chevrolet Corvette ZR1",
  "Chrysler Pacifica",
  "Corlay",
  "Cyclone",
  "Dark Knight's Tumbler",
  "Defender D7X-R",
  "DeLorean Time Machine",
  "Diesel",
  "Diestro",
  "Dingo",
  "Dodge Charger Daytona Scat Pack",
  "Dodge Charger SRT Hellcat",
  "Dominus",
  "Dominus GT",
  "Ecto-1",
  "Emperor",
  "Emperor II",
  "Emperor II: Scorched",
  "Endo",
  "Esper",
  "Fast & Furious Dodge Charger",
  "Fast & Furious Dodge Charger SRT Hellcat",
  "Fast & Furious Mazda RX-7",
  "Fast & Furious Nissan Skyline",
  "Fast & Furious Pontiac Fiero",
  "Fast 4WD",
  "Fennec",
  "Fennec ZR-F",
  "Ferrari 296 GTB",
  "Ferrari F40",
  "Ford Bronco Raptor",
  "Ford Bronco Raptor RLE",
  "Ford F-150 RLE",
  "Ford Mustang Classic Combo Bundle",
  "Ford Mustang GTD",
  "Ford Mustang Mach-E RLE",
  "Ford Mustang Shelby GT350R RLE",
  "Ford Mustang Shelby GT500",
  "Formula 1 2021",
  "Formula 1 2022",
  "Fuse",
  "Gazella GT",
  "Gizmo",
  "Grog",
  "Guardian",
  "Guardian G1",
  "Guardian GXT",
  "Harbinger",
  "Harbinger GXT",
  "Hogsticker",
  "Homer's Car",
  "Honda Civic Type R",
  "Honda Civic Type R-LE",
  "Hotshot",
  "Ice Charger",
  "Imperator DT5",
  "Insidio",
  "Jackal",
  "Jeep Wrangler",
  "Jurassic Jeep Wrangler",
  "Jäger 619",
  "K.I.T.T.",
  "Komodo",
  "Lamborghini Countach",
  "Lamborghini Huracán",
  "Lamborghini Huracán STO",
  "Lamborghini Urus SE",
  "Lightning McQueen",
  "Lockjaw",
  "Luigi NSR",
  "Maestro",
  "Magnifique",
  "Magnifique GXT",
  "Mako",
  "Mamba",
  "Mantis",
  "Marauder",
  "Mario NSR",
  "Masamune",
  "Maverick",
  "Maverick G1",
  "Maverick GXT",
  "Maven",
  "McLaren 570S",
  "McLaren 765LT",
  "McLaren P1",
  "McLaren Senna",
  "Megastar",
  "Merc",
  "Mercedes-AMG GT 63 S",
  "Mercedes-Benz CLA",
  "Miku Dark",
  "Miku Miku",
  "Miku Pink",
  "MR11",
  "Mudcat",
  "Mudcat G1",
  "Mudcat GXT",
  "NASCAR Chevrolet Camaro",
  "NASCAR Next Gen Ford Mustang",
  "NASCAR Next Gen Toyota Camry",
  "Nemesis",
  "Nexus",
  "Nexus SC",
  "Nimbus",
  "Nissan 350Z",
  "Nissan Fairlady Z",
  "Nissan Silvia",
  "Nissan Silvia RLE",
  "Nissan Z Performance Car",
  "Nomad",
  "Nomad GXT",
  "Octane",
  "Octane ZSR",
  "Outlaw",
  "Outlaw GXT",
  "Paladin",
  "Patty Wagon",
  "Peregrine TT",
  "Pizza Planet Delivery Truck",
  "Porsche 911 GT3 RS",
  "Porsche 911 Turbo",
  "Porsche 918 Spyder",
  "Porsche Cayenne Turbo Electric",
  "Primo",
  "Proteus",
  "Psyclops",
  "Quadra Turbo-R",
  "R3MX",
  "R3MX GXT",
  "Ram 1500 RHO",
  "Recoil AV",
  "Redline",
  "Ripper",
  "Rivian R1S",
  "Road Hog",
  "Road Hog XL",
  "Ronin",
  "Ronin G1",
  "Ronin GXT",
  "Samurai",
  "Samus' Gunship",
  "Scarab",
  "Scorpion",
  "Sentinel",
  "Shokunin",
  "Shokunin GXT",
  "Stampede",
  "Sweet Tooth",
  "Takumi",
  "Takumi RX-T",
  "Tesla Cybertruck",
  "The Incredibile",
  "The Mystery Machine",
  "Triton",
  "Turtle Van",
  "Twin Mill III",
  "Twinzer",
  "Tygris",
  "Tyranno",
  "Tyranno GXT",
  "Venom",
  "Void Burn",
  "Volkswagen Golf GTI",
  "Volkswagen Golf GTI RLE",
  "Vulcan",
  "Warthog",
  "Werewolf",
  "Whiplash",
  "X-Devil",
  "X-Devil MK2",
  "Xentari",
  "Zefira",
  "Zippy"
];

const lerpColor = (color1, color2, factor) => {
  const r = Math.round(color1[0] + factor * (color2[0] - color1[0]));
  const g = Math.round(color1[1] + factor * (color2[1] - color1[1]));
  const b = Math.round(color1[2] + factor * (color2[2] - color1[2]));
  return `rgb(${r}, ${g}, ${b})`;
};

const getStatStyle = (key, value, gp) => {
  const val = parseFloat(value) || 0;
  const games = parseInt(gp) || 0;
  const isElite = games >= 20;

  const RED = [239, 68, 68];
  const YELLOW = [250, 204, 21];
  const MED_GREEN = [167, 243, 208]; 
  const FULL_GREEN = [34, 197, 94];
  const CYAN = [0, 255, 255];

  let color = 'rgb(203, 213, 225)';
  let glow = '';

  const applyCyan = (threshold) => {
    if (val >= threshold && isElite) {
      color = `rgb(${CYAN.join(',')})`;
      glow = '0 0 8px rgba(0, 255, 255, 0.6)';
      return true;
    }
    return false;
  };

  if (key === 'winPct') {
    const p = val <= 1 ? val * 100 : val;
    if (!applyCyan(80)) {
      if (p <= 50) color = lerpColor(RED, YELLOW, p / 50);
      else if (p <= 80) color = lerpColor(YELLOW, FULL_GREEN, (p - 50) / 30);
      else color = `rgb(${FULL_GREEN.join(',')})`;
    }
  } else if (key === 'sbv') {
    if (!applyCyan(100)) {
      if (val <= 0) color = `rgb(${RED.join(',')})`;
      else if (val <= 45) color = lerpColor(RED, YELLOW, val / 45);
      else if (val <= 100) color = lerpColor(YELLOW, FULL_GREEN, (val - 45) / 55);
      else color = `rgb(${FULL_GREEN.join(',')})`;
    }
  } else if (key === 'shPct') {
    // Standardize to 0-100 scale for comparison
    const p = val <= 1 && val > 0 ? val * 100 : val;
    
    // Elite threshold: 60% with the games played requirement
    if (!applyCyan(60)) {
      if (p <= 18) {
        // 0 - 18%: Red to Orange (using Red to Yellow lerp)
        color = lerpColor(RED, YELLOW, p / 18);
      } else if (p <= 29) {
        // 19 - 29%: Deepening the Orange/Yellow
        color = lerpColor(YELLOW, [251, 146, 60], (p - 18) / 11); 
      } else if (p <= 39) {
        // 30 - 39%: Transition to Yellow
        color = lerpColor([251, 146, 60], YELLOW, (p - 29) / 10);
      } else if (p <= 50) {
        // 40 - 50%: Transition to Green
        color = lerpColor(YELLOW, FULL_GREEN, (p - 39) / 11);
      } else {
        // 51%+: Locked in Full Green
        color = `rgb(${FULL_GREEN.join(',')})`;
      }
    }
  } else if (key === 'ppg') {
    if (!applyCyan(500)) {
      if (val <= 200) color = lerpColor(RED, YELLOW, val / 200);
      else if (val <= 400) color = lerpColor(YELLOW, FULL_GREEN, (val - 200) / 200);
      else color = `rgb(${FULL_GREEN.join(',')})`;
    }
  } else if (key === 'gpg' || key === 'apg' || key === 'svpg' || key === 'shpg') {
    // Shared logic for per-game stats
    const thresholds = { gpg: 1.0, apg: 1.0, svpg: 2.0, shpg: 3.0 };
    const target = thresholds[key];
    const mid = target / 2;
    if (val <= mid) color = lerpColor(RED, YELLOW, val / mid);
    else if (val <= target) color = lerpColor(YELLOW, MED_GREEN, (val - mid) / mid);
    else color = `rgb(${FULL_GREEN.join(',')})`;
  }

  return { color, textShadow: glow };
};

const tierColors = {
  'Premier': '#D600D6', 'Master': '#9B59B6', 'Elite': '#3498DB',
  'Veteran': '#33FFDB', 'Major': '#33FFDB', 'Rival': '#2ECC72',
  'Minor': '#2ECC72', 'Challenger': '#CEB337', 'Prospect': '#E67E22',
  'Contender': '#D64694', 'Amateur': '#F3A9A9'
};

const getTierColor = (tierName) => {
  const cleanTier = tierName ? tierName.split('\n').pop().trim() : "";
  return tierColors[cleanTier] || '#94a3b8';
};

const normalizeId = (input) => {
  if (!input) return "";
  const digits = input.replace(/\D/g, "");
  return `RSC${digits.padStart(6, "0")}`;
};

const formatWinPct = (val) => {
  const num = parseFloat(val);
  if (isNaN(num)) return "0.0%";
  const percent = num <= 1 ? num * 100 : num;
  return `${percent.toFixed(1)}%`;
};

const formatShPct = (val) => {
  const num = parseFloat(val);
  if (isNaN(num)) return "0.0%";
  const percent = num <= 1 ? num * 100 : num;
  return `${percent.toFixed(1)}%`;
};

// --- 2. MAIN COMPONENT ---

function App() {

  const [theme, setTheme] = useState('midnight'); // 'midnight' (current) or 'royal' (new)

  const [activeTab, setActiveTab] = useState('profile'); // profile, versus, about

  const [isExpanded, setIsExpanded] = useState(false);

  const [searchId, setSearchId] = useState('');
  const [allData, setAllData] = useState([]);

  const [playerHistory, setPlayerHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seasonsList, setSeasonsList] = useState([]);

  const [percentileScope, setPercentileScope] = useState('tier');

  // Profile States
  const [mainCar, setMainCar] = useState('Octane');
  const [aliases, setAliases] = useState([]);
  const [newAlias, setNewAlias] = useState('');
  const [accolades, setAccolades] = useState([]);
  const [accSeason, setAccSeason] = useState('S26');
  const [accTier, setAccTier] = useState('Premier');
  const [accType, setAccType] = useState('Championship');

  // Comparison Tool
  const [compareId, setCompareId] = useState('');
  const [player2History, setPlayer2History] = useState([]);
  const [p2Aliases, setP2Aliases] = useState([]);
  const [p2NewAlias, setP2NewAlias] = useState('');
  const [compMode, setCompMode] = useState('raw'); // 'raw' or 'percentile'
  const [showAverage, setShowAverage] = useState(false); // Toggle the middle "Average" column
  const [averageType, setAverageType] = useState('tier'); // 'tier' or 'league'

  // For single-season comparison toggles
  const [p1TargetSeason, setP1TargetSeason] = useState('Career'); 
  const [p2TargetSeason, setP2TargetSeason] = useState('Career');

  // Player 3 Comparison (Three-way)
  const [player3Id, setPlayer3Id] = useState('');
  const [player3History, setPlayer3History] = useState([]);
  const [p3TargetSeason, setP3TargetSeason] = useState('Career');

  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null); // 'sync', 'veteran', 'p1', or 'p2'

  const performSearch = (idOrName, target) => {
    const isOnlyDigits = /^\d+$/.test(idOrName.trim());
    const isRscFormat = /^RSC\d+$/i.test(idOrName.trim());
    let matches = [];

    if (isOnlyDigits || isRscFormat) {
      const targetId = normalizeId(idOrName);
      matches = allData.filter(row => getStat(row, 'id') === targetId);
      if (matches.length > 0) {
        const discoveredNames = [...new Set(matches.map(row => getStat(row, 'name').toLowerCase()))];
        const legacyMatches = allData.filter(row => {
          const hasNoId = !row['RSC ID'] || row['RSC ID'] === '---';
          return hasNoId && discoveredNames.includes(getStat(row, 'name').toLowerCase());
        });
        matches = [...matches, ...legacyMatches];
      }
    } else {
      matches = allData.filter(row => getStat(row, 'name').toLowerCase() === idOrName.toLowerCase());
    }

    // Route the results to the correct state
    if (target === 'p1') updatePlayerHistory(matches);
    else if (target === 'p2') updatePlayer2History(matches);
    else if (target === 'p3') updatePlayer3History(matches);
  };

  // Mirrors the current update function for Player 2
  const updatePlayer2History = (newData) => {
    const uniqueData = [];
    const seenKeys = new Set();
    newData.forEach(row => {
      const fingerprint = `${row.seasonLabel}-${getStat(row, 'name')}-${getStat(row, 'gp')}`;
      if (!seenKeys.has(fingerprint)) {
        uniqueData.push(row);
        seenKeys.add(fingerprint);
      }
    });
    setPlayer2History(uniqueData.sort((a, b) => seasonsList.indexOf(a.seasonLabel) - seasonsList.indexOf(b.seasonLabel)));
  };

  // Mirrors the current update function for Player 3
  const updatePlayer3History = (newData) => {
    const uniqueData = [];
    const seenKeys = new Set();
    newData.forEach(row => {
      const fingerprint = `${row.seasonLabel}-${getStat(row, 'name')}-${getStat(row, 'gp')}`;
      if (!seenKeys.has(fingerprint)) {
        uniqueData.push(row);
        seenKeys.add(fingerprint);
      }
    });
    setPlayer3History(uniqueData.sort((a, b) => seasonsList.indexOf(a.seasonLabel) - seasonsList.indexOf(b.seasonLabel)));
  };

  const getVersusRadarData = (p1Data, p2Data, p3Data) => {
    const stats = ['gpg', 'shpg', 'apg', 'svpg', 'winPct'];
    
    const process = (history, targetSeason) => {
      if (!history || history.length === 0) return [0,0,0,0,0];
      
      let source = history;
      if (targetSeason !== 'Career') {
        source = history.filter(s => s.seasonLabel === targetSeason);
      } else {
        const unified = getUnifiedHistory(history);
        source = unified.filter(s => s.calculatedGP >= 20).length > 0 
          ? unified.filter(s => s.calculatedGP >= 20) 
          : unified;
      }
      
      // If no data was found after filtering, return zeros to prevent crash
      if (source.length === 0) return [0,0,0,0,0];

      return stats.map(key => {
        const sumPercentiles = source.reduce((acc, row) => {
          const p = getPercentileData(row, key);
          
          // Check if p exists before accessing .label
          if (!p) return acc + 0; 
          
          const val = (p.label === 'TOP' ? (100 - p.value) : p.value);
          return acc + (val || 0);
        }, 0);
        
        return sumPercentiles / source.length;
      });
    };

    return { 
      p1: process(p1Data, p1TargetSeason), 
      p2: process(p2Data, p2TargetSeason),
      p3: process(p3Data, p3TargetSeason)
    };
  };

  const getAverageStatline = (targetSeason, targetTier, type) => {
    const pool = allData.filter(d => {
      // If targetSeason is 'Career', we use all-time data for that Tier/League
      const seasonMatch = targetSeason === 'Career' || d.seasonLabel === targetSeason;
      const tierMatch = type === 'league' || getStat(d, 'tier') === targetTier;
      // We keep everyone with 1+ game in the pool initially
      return seasonMatch && tierMatch && (parseInt(getStat(d, 'gp')) || 0) >= 1;
    });

    if (pool.length === 0) return null;

    // If at least 20 people in this pool have 10+ games, we consider it "Mature"
    const isPoolMature = pool.filter(d => (parseInt(getStat(d, 'gp')) || 0) >= 10).length >= 20;

    const stats = ['sbv', 'gpg', 'apg', 'svpg', 'shpg', 'shPct', 'winPct', 'gp'];
    const avgData = {};

    stats.forEach(key => {
      // If it's a skill stat, filter the pool further to 10+ GP for that specific metric
      // 10 GP if mature, otherwise use 1 GP to avoid zeros in new seasons
      const threshold = (isPoolMature && key !== 'gp') ? 10 : 1;
      const metricPool = pool.filter(d => (parseInt(getStat(d, 'gp')) || 0) >= threshold);

      if (metricPool.length === 0) {
          avgData[key] = 0;
          return;
      }

      const sum = metricPool.reduce((acc, row) => acc + (parseFloat(getStat(row, key)) || 0), 0);

      // provide a league-standard fallback so the UI isn't empty.
      avgData[key] = sum / metricPool.length;
      if (avgData[key] === 0 && (key === 'winPct' || key === 'shPct')) {
          avgData[key] = key === 'winPct' ? 0.50 : 0.22; // Fallbacks
      }
    });
    return avgData;
  };

  const typeWeights = { 'Championship': 1, 'Tier MVP': 2, 'All Star': 3, 'Dev League Champ': 4, 'Combines Cup': 5 };
  const accoladeIcons = { 'Championship': '🏆', 'All Star': '🌟', 'Tier MVP': '🥇', 'Dev League Champ': '👑', 'Combines Cup': '🥤' };

  const getRadarData = () => {
    if (playerHistory.length === 0) return null;
    
    // Calculate average percentiles across all qualified seasons
    const stats = ['gpg', 'shpg', 'apg', 'svpg', 'winPct'];
    const results = stats.map(key => {
      const unified = getUnifiedHistory(playerHistory);
      const qualified = unified.filter(s => s.calculatedGP >= 20);
      const source = qualified.length > 0 ? qualified : unified;
      
      const sumPercentiles = source.reduce((acc, row) => {
        const p = getPercentileData(row, key);

        if (!p) return acc + 0; // Defaulting to 0 (No data)

        // Convert "Top 2%" to a score of 98, and "Bottom 10%" to 10
        const score = (p.label === 'TOP' ? (100 - p.value) : p.value);
        return acc + (score || 0);
      }, 0);
      
      return sumPercentiles / source.length;
    });

    return results; // Returns [Offense, Pressure, Support, Defense, Consistency]
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/data/seasons.json');
        const seasons = await res.json();
        setSeasonsList(seasons);
        let masterData = [];
        for (let s of seasons) {
          const response = await fetch(`/data/${s}.csv`);
          const csvText = await response.text();
          const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
          masterData = [...masterData, ...parsed.data.map(row => ({ ...row, seasonLabel: s }))];
        }
        setAllData(masterData);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    loadData();
  }, []);

  const getTrendData = () => {
    const seasonsMap = {};
    playerHistory.forEach(row => {
      const s = row.seasonLabel;
      if (!seasonsMap[s]) seasonsMap[s] = [];
      seasonsMap[s].push(row);
    });

    // Sort strictly by the order in seasonsList (from: Early -> Late)
    const chartPoints = Object.keys(seasonsMap)
      .sort((a, b) => seasonsList.indexOf(b) - seasonsList.indexOf(a))
      .map(s => {
        const entries = seasonsMap[s];
        const mainEntry = entries.reduce((prev, current) => 
          (parseInt(getStat(current, 'gp')) > parseInt(getStat(prev, 'gp'))) ? current : prev
        );
        
        return {
          season: s,
          sbv: parseFloat(getStat(mainEntry, 'sbv')) || 0,
          tier: getStat(mainEntry, 'tier'),
          gp: parseInt(getStat(mainEntry, 'gp'))
        };
      });

    return chartPoints;
  };

  const calculateOVR = (history) => {
    if (!history || history.length === 0) return "50";
    
    // 1. Unify duplicates first (combines dual-roster or mid-season shifts) -- Future possible
    const unified = getUnifiedHistory(history);
    
    // 2. Identify the absolute baseline anchor: What is the player's most recent active season overall?
    // Sort unified history by seasonsList index (0 is newest/latest) to find the absolute latest print
    const sortedByRecency = [...unified].sort(
      (a, b) => seasonsList.indexOf(a.seasonLabel) - seasonsList.indexOf(b.seasonLabel)
    );
    const latestActiveSeason = sortedByRecency[0]?.seasonLabel;
    const latestSeasonIndex = seasonsList.indexOf(latestActiveSeason);

    // 3. Filter and parse valid performance pools based on qualified GP AND recency
    const valid = unified
      .filter(s => {
        const currentSeasonIndex = seasonsList.indexOf(s.seasonLabel);
        // Calculate the physical season gap (e.g., S26 index 0 to S22 index 4 = distance of 4)
        const seasonDistance = currentSeasonIndex - latestSeasonIndex;
        
        // CONDITION A: Must be a Qualified Season (20+ GP)
        // CONDITION B: Must fall strictly within a 4-season max window from their latest activity
        return s.calculatedGP >= 20 && seasonDistance <= 4;
      })
      // Sort by highest SBV first to prioritize their peak performances within that valid timeframe
      .sort((a, b) => b.calculatedSBV - a.calculatedSBV)
      // Take up to the top 3 highest-impact qualified seasons
      .slice(0, 3);

    let weightedSBV = 0;
    
    if (valid.length > 0) {
      // If we found qualified seasons within the recency window, compute the standard weighted average
      const totalGP = valid.reduce((acc, s) => acc + s.calculatedGP, 0);
      const sumProd = valid.reduce((acc, s) => acc + (s.calculatedSBV * s.calculatedGP), 0);
      weightedSBV = sumProd / totalGP;
    } else { 
      // FALLBACK: If NO seasons qualify or everything is historic, drop completely to their absolute latest season
      weightedSBV = sortedByRecency[0]?.calculatedSBV || 0; 
    }

    let rawOvr;
    
    if (weightedSBV < 0) {
      // NEGATIVE ZONE: For every 5 SBV below 0, drop 1 OVR from the 50 base.
      // Example: -25 SBV = 45 OVR. -50 SBV = 40 OVR.
      rawOvr = 50 + (weightedSBV / 5); 
    } else if (weightedSBV <= 50) {
      // ROOKIE/CONTENDER ZONE: 0 to 50 SBV scales from 50 to 75 OVR.
      rawOvr = 50 + (weightedSBV * 0.5);
    } else {
      // ELITE ZONE: 50+ SBV scales towards 99.
      rawOvr = 75 + ((weightedSBV - 50) * 0.48);
    }

    // Set an absolute floor of 40 (The "Deep Bench" limit) and cap at 99.
    return Math.min(99, Math.max(40, Math.round(rawOvr)));
  };

  const getPercentileData = (row, statKey) => {
    const season = row.seasonLabel;
    const tier = getStat(row, 'tier');
    const playerVal = parseFloat(getStat(row, statKey)) || 0;

    // Mature league check -- check if season is mature (at least 30 people with 20-game qual season)
    const mature = allData.filter(d => 
      d.seasonLabel === season && 
      parseInt(getStat(d, 'gp')) >= 20
    ).length >= 30;

    const peers = allData.filter(d => 
      d.seasonLabel === season && 
      (percentileScope === 'league' || getStat(d, 'tier') === tier) &&
      parseInt(getStat(d, 'gp')) >= (mature ? 20 : 1)
    );

    if (peers.length === 0) return null;

    const peerValues = peers.map(p => parseFloat(getStat(p, statKey)) || 0).sort((a, b) => a - b);
    const total = peerValues.length;
    
    // Flip logic: How many people are BETTER than the player
    const rankFromTop = peerValues.filter(v => v > playerVal).length + 1;
    const rankFromBottom = peerValues.filter(v => v < playerVal).length + 1;

    const topPercent = Math.max(1, Math.round((rankFromTop / total) * 100));
    const bottomPercent = Math.max(1, Math.round((rankFromBottom / total) * 100));
    const isTopHalf = rankFromTop <= rankFromBottom;
    
    return {
      label: isTopHalf ? "TOP" : "BOTTOM",
      value: isTopHalf ? topPercent : bottomPercent,
      isElite: isTopHalf && topPercent <= 5,
      isNumberOne: rankFromTop === 1
    };
  };

  // --- HALL OF FAME LOGIC ---
  const getCareerMilestones = () => {
    if (playerHistory.length === 0) return [];
    
    // 1. Get unified data first
    const unified = getUnifiedHistory(playerHistory);
    
    const totalGP = playerHistory.reduce((acc, s) => acc + (parseInt(getStat(s, 'gp')) || 0), 0);
    const totalWins = playerHistory.reduce((acc, s) => {
      const gp = parseInt(getStat(s, 'gp')) || 0;
      const winPct = parseFloat(getStat(s, 'winPct')) || 0;
      const pct = winPct < 1 ? winPct : winPct / 100;
      return acc + Math.round(gp * pct);
    }, 0);

    const totalGoals = playerHistory.reduce((acc, s) => acc + (Math.round((parseInt(getStat(s, 'gp')) || 0) * (parseFloat(getStat(s, 'gpg')) || 0))), 0);
    const totalSaves = playerHistory.reduce((acc, s) => acc + (Math.round((parseInt(getStat(s, 'gp')) || 0) * (parseFloat(getStat(s, 'svpg')) || 0))), 0);
    
    // 2. Use unified data for Peak SBV logic (REPLACED OLD BLOCK)
    const qualifiedSeasons = unified.filter(s => s.calculatedGP >= 20);
    const sourceSeasons = qualifiedSeasons.length > 0 ? qualifiedSeasons : unified;
    
    const peakSBV = Math.max(...sourceSeasons.map(s => s.calculatedSBV));
    const peakSeason = sourceSeasons.find(s => s.calculatedSBV === peakSBV)?.seasonLabel;

    return [
      { label: "Career Games", value: totalGP, icon: "🎮" },
      { label: "Career Wins", value: totalWins, icon: "🏅" },
      { label: "Peak SBV", value: peakSBV.toFixed(1), sub: peakSeason, icon: "🚀" },
      { label: "Goals  /  Saves", value: `${totalGoals} / ${totalSaves}`, icon: "⚽" },
      { label: "Seasons Active", value: unified.length, icon: "⏳" }
    ];
  };

  const handleSearch = () => {
    setAliases([]); 
    const cleanInput = searchId.trim().toLowerCase();
    let matches = [];

    // 1. Determine if the initial input is an ID
    let isOnlyDigits = /^\d+$/.test(cleanInput);
    let isRscFormat = /^RSC\d+$/i.test(cleanInput);
    let targetId = (isOnlyDigits || isRscFormat) ? normalizeId(cleanInput) : null;

    // 2. If it's a name, find ANY instance of this name that has a valid RSC ID
    if (!targetId) {
      // We use .find() on a filtered list to ensure we only get a row that HAS an ID
      const rowsWithName = allData.filter(row => getStat(row, 'name').toLowerCase() === cleanInput);
      const rowWithValidId = rowsWithName.find(row => {
        const id = row['RSC ID'];
        return id && id !== '---' && id !== '';
      });

      if (rowWithValidId) {
        targetId = normalizeId(getStat(rowWithValidId, 'id'));
        isOnlyDigits = true; // Pivot to ID processing
      }
    }

    // 3. Process as an ID Search (Catches all name changes)
    if (targetId) {
      matches = allData.filter(row => getStat(row, 'id') === targetId);
      
      if (matches.length > 0) {
        const discoveredNames = [...new Set(matches.map(row => getStat(row, 'name').toLowerCase()))];
        const legacyMatches = allData.filter(row => {
          const hasNoId = !row['RSC ID'] || row['RSC ID'] === '---' || row['RSC ID'] === '';
          return hasNoId && discoveredNames.includes(getStat(row, 'name').toLowerCase());
        });
        updatePlayerHistory([...matches, ...legacyMatches]);
        return;
      }
    }

    // 4. Fallback: Direct Name Search (For players who NEVER had an RSC ID)
    const nameMatches = allData.filter(row => getStat(row, 'name').toLowerCase() === cleanInput);
    updatePlayerHistory(nameMatches);
  };

  const addAlias = () => {
    if (!newAlias) return;
    const lowerAlias = newAlias.toLowerCase();
    
    // Get the primary name from the current search to prevent linking itself
    const primaryName = latest ? getStat(latest, 'name').toLowerCase() : "";

    if (lowerAlias === primaryName) {
      alert("This user is already the primary search result.");
      return;
    }

    if (aliases.includes(lowerAlias)) return;

    // Verify the name exists in the database
    const aliasMatches = allData.filter(row => getStat(row, 'name')?.toLowerCase() === lowerAlias);
    
    if (aliasMatches.length === 0) {
      alert(`User "${newAlias}" not found in RSC database.`);
      return;
    }

    setAliases(prev => [...prev, lowerAlias]);
    updatePlayerHistory([...playerHistory, ...aliasMatches]);
    setNewAlias('');
  };

  const updatePlayerHistory = (newData) => {
    const uniqueData = [];
    const seenKeys = new Set();

    newData.forEach(row => {
      // Create a unique fingerprint: Season + Name + GP
      // This prevents the same player-season entry from appearing twice
      const fingerprint = `${row.seasonLabel}-${getStat(row, 'name')?.toLowerCase()}-${getStat(row, 'gp')}`;
      
      if (!seenKeys.has(fingerprint)) {
        uniqueData.push(row);
        seenKeys.add(fingerprint);
      }
    });

    // Sort by season using existing seasonsList order
    const sorted = uniqueData.sort((a, b) => 
      seasonsList.indexOf(a.seasonLabel) - seasonsList.indexOf(b.seasonLabel)
    );

    setPlayerHistory(sorted);
  };

  const getUnifiedHistory = (history) => {
    const unifiedMap = {};

    history.forEach(row => {
      const s = row.seasonLabel;
      if (!unifiedMap[s]) {
        unifiedMap[s] = { ...row, combinedGP: 0, weightedSumSBV: 0 };
      }
      
      const gp = parseInt(getStat(row, 'gp')) || 0;
      const sbv = parseFloat(getStat(row, 'sbv')) || 0;
      
      unifiedMap[s].combinedGP += gp;
      unifiedMap[s].weightedSumSBV += (sbv * gp);
    });

    return Object.values(unifiedMap).map(s => ({
      ...s,
      // Use the weighted average for the season if multiple entries exist
      calculatedSBV: s.combinedGP > 0 ? s.weightedSumSBV / s.combinedGP : 0,
      calculatedGP: s.combinedGP
    }));
  };

  const addAccolade = () => {
    const isDuplicate = accolades.some(a => 
      a.season === accSeason && 
      a.tier === accTier && 
      a.type === accType
    );

    if (!isDuplicate) {
      setAccolades([...accolades, { season: accSeason, tier: accTier, type: accType }]);
    }
  };

  // Remove an accolade by its index
  const removeAccolade = (index) => {
    setAccolades(accolades.filter((_, i) => i !== index));
  };

  const removeAlias = (nameToRemove) => {
    const updatedAliases = aliases.filter(a => a !== nameToRemove);
    setAliases(updatedAliases);

    // 1. Identify the primary search target (ID or Name)
    const isOnlyDigits = /^\d+$/.test(searchId.trim());
    const isRscFormat = /^RSC\d+$/i.test(searchId.trim());
    
    let baseData = [];
    if (isOnlyDigits || isRscFormat) {
      const targetId = normalizeId(searchId);
      baseData = allData.filter(row => getStat(row, 'id') === targetId);
      
      // Include auto-discovered legacy stats for the primary ID
      const discoveredNames = [...new Set(baseData.map(row => getStat(row, 'name').toLowerCase()))];
      const legacyMatches = allData.filter(row => {
        const hasNoId = !row['RSC ID'] || row['RSC ID'] === '---' || row['RSC ID'] === '';
        return hasNoId && discoveredNames.includes(getStat(row, 'name').toLowerCase());
      });
      baseData = [...baseData, ...legacyMatches];
    } else {
      // Primary search was a name
      baseData = allData.filter(row => getStat(row, 'name').toLowerCase() === searchId.toLowerCase());
    }

    // 2. Filter for only the remaining aliases
    const aliasData = allData.filter(row => 
      updatedAliases.includes(getStat(row, 'name').toLowerCase())
    );

    // 3. Update the history with the primary data + remaining aliases
    updatePlayerHistory([...baseData, ...aliasData]);
  };

  // Hide a specific season row from the history
  const hideSeason = (index) => {
    setPlayerHistory(prev => prev.filter((_, i) => i !== index));
  };

const downloadCard = () => {
  const node = document.getElementById('stat-card');
  
  // 1. Capture current state to revert later
  const originalStyle = node.style.cssText;

  // 2. Force a high-fidelity "Desktop" layout for the snapshot
  node.style.width = '1200px';
  node.style.height = 'auto';

  const blurElements = node.querySelectorAll('.backdrop-blur-sm, .backdrop-blur-md');
  blurElements.forEach(el => el.style.backdropFilter = 'none');

  toPng(node, { 
    filter: (n) => !n.classList?.contains('no-print'),
    cacheBust: true,
    pixelRatio: 3, // Ultra-HD (4K quality)
    backgroundColor: '#010205',
    style: {
      'image-rendering': 'crisp-edges',
      'transform': 'scale(1)'
    }
  })
    .then((dataUrl) => {
      // REVERT STYLES
      node.style.cssText = originalStyle;
      blurElements.forEach(el => el.style.backdropFilter = '');
      
      const link = document.createElement('a');
      link.download = `RSC-Career-${getStat(latest, 'name')}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.error("Download failed", err);
      node.style.cssText = originalStyle;
      blurElements.forEach(el => el.style.backdropFilter = '');
    });
};

  const sortedAccolades = [...accolades].sort((a, b) => {
    if (typeWeights[a.type] !== typeWeights[b.type]) return typeWeights[a.type] - typeWeights[b.type];
    return b.season.localeCompare(a.season);
  });

  const latest = playerHistory[0] || null;

  return (
    <div className={`min-h-screen transition-colors duration-1000 p-2 md:p-8 font-sans overflow-x-hidden ${
      theme === 'midnight' 
        ? 'bg-[#03050a] text-slate-200' 
        : 'bg-[#0a1931] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e3a8a]/20 via-[#0a1931] to-[#020617] text-blue-100'
    }`}>

      {/* --- TECH GRID BACKGROUND LAYERS --- */}
      <div className="tech-bg-overlay no-print">
         <div className="dots-pattern" />

         {/* --- HIGH-TECH GEOMETRY NETWORK --- */}
        <div className="network-bg no-print" />
        <div className="scanlines no-print" />
        
        {/* --- SITE PULSES --- */}
        <div className="tech-lines-container no-print">
          <div className="circuit-line" style={{ left: '20%', animationDelay: '1s' }} />
          <div className="circuit-line" style={{ left: '70%', animationDelay: '5s' }} />
        </div>
      </div>

      {/* --- UNIFIED BRANDED HEADER --- */}
      <header className="relative w-full px-4 md:px-12 py-6 md:py-10 no-print flex flex-col items-center gap-6">
        <div className="w-full flex flex-row items-center justify-between">
          {/* Left: RSC Logo (Absolute Position) */}
          <div 
            onClick={() => setActiveTab('profile')} 
            className="flex items-center gap-3 cursor-pointer group transition-all"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 transition-all">
              <img src="/assets/rsc-shield.png" alt="RSC" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm md:text-xl font-black italic uppercase tracking-tighter text-white leading-none">
                RSC <span className="text-cyan-500">Portal</span>
              </h1>
              <p className="text-[6px] md:text-[7px] font-black uppercase tracking-[0.3em] text-slate-500 mt-1">Intelligence</p>
            </div>
          </div>

          {/* Right: Interaction Hub (Absolute Position) */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* Theme Toggle */}
            <button 
              onClick={() => setTheme(theme === 'midnight' ? 'royal' : 'midnight')}
              className="relative p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 transition-all hover:scale-105 active:scale-95 overflow-hidden flex items-center justify-center"
            >
              <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'royal' ? 'bg-blue-500/20 opacity-100' : 'opacity-0'}`} />
              {theme === 'midnight' ? (
                <span className="relative z-10 text-slate-400 group-hover:text-cyan-400 text-lg transition-colors">🌙</span>
              ) : (
                <span className="relative z-10 text-blue-300 group-hover:text-white text-lg transition-colors">❄️</span>
              )}
            </button>
  
            {/* Discord Link */}
            <a 
              href="https://discord.gg/rsc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 transition-all hover:scale-105 active:scale-95 overflow-visible"
            >
              <div className="absolute inset-0 bg-yellow-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              <svg 
                className="w-6 h-6 text-yellow-500 [filter:drop-shadow(0_0_2px_rgba(234,179,8,0.8))] transition-all group-hover:[filter:drop-shadow(0_0_8px_rgba(234,179,8,0.5))]" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* CENTER: RSC MyCareer Title */}
        <div className="text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black italic tracking-tighter text-blue-500 uppercase drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            RSC <span className="bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent underline decoration-yellow-500 decoration-4 pr-2 animate-gold-glow drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">MyCareer</span> 
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.4em] mt-2 text-[10px]">Legacy Statistics Portal</p>
        </div>
      </header>

      <nav className="flex justify-center gap-12 mb-12 border-b border-white/5 pb-4 no-print">
        {['profile', 'versus', 'about'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[12px] font-black uppercase tracking-[0.4em] transition-all relative ${
              activeTab === tab ? 'text-blue-500' : 'text-slate-600 hover:text-slate-400'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute -bottom-[18px] left-0 right-0 h-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            )}
          </button>
        ))}
      </nav>
      <main className={`mx-auto grid gap-8 transition-all duration-700 ease-in-out ${isExpanded ? 'max-w-[98%] grid-cols-[300px_1fr]' : 'max-w-7xl grid-cols-1 lg:grid-cols-4'}`}>
        {activeTab === 'profile' && (
          <>
            <aside className="space-y-4">
              <div className={`border p-6 rounded-3xl shadow-xl transition-all ${theme === 'royal' ? 'bg-black/40 border-white/10' : 'bg-slate-900 border-white/5'}`}>
                <h2 className="text-[12px] font-black uppercase text-blue-500 mb-4 tracking-widest">Player Sync</h2>
                <input 
                  className="w-full bg-black/50 border border-white/10 p-3 rounded-xl mb-1 text-xs outline-none focus:border-blue-500/50 transition-all text-white" 
                  placeholder="RSC ID or Username..." 
                  value={searchId}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchId(val);
                    if (val.length > 1) {
                      // Filter unique player names from allData
                      const matches = [...new Set(allData
                        .map(d => getStat(d, 'name'))
                        .filter(name => name?.toLowerCase().includes(val.toLowerCase()))
                      )].slice(0, 5); // Limit to top 5 matches
                      setSuggestions(matches);
                    } else {
                      setSuggestions([]);
                    }
                  }} 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                      setSuggestions([]);
                    }
                  }}
                />
                {/* --- SMART SEARCH SUGGESTIONS --- */}
                {suggestions.length > 0 && (
                  <div className="relative w-full z-50">
                    <div className="absolute top-0 left-0 w-full bg-[#03050a] border border-white/10 rounded-xl mt-1 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      {suggestions.map((name) => (
                        <div 
                          key={name}
                          onClick={() => {
                            setSearchId(name);
                            setSuggestions([]);
                          }}
                          className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 hover:bg-blue-600/20 hover:text-cyan-400 cursor-pointer border-b border-white/5 last:border-0 transition-colors italic"
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  onClick={handleSearch} 
                  className="w-full bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white py-3 rounded-xl font-black uppercase italic text-xs transition-all border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.1)] hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                >
                  New Search
                </button>

                <button onClick={downloadCard} className="w-full mt-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white py-3 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 cursor-pointer flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Export as PNG
                </button>
              </div>

              <div className={`p-6 rounded-3xl shadow-xl transition-all border ${theme === 'royal' ? 'bg-black/40 border-white/10' : 'bg-slate-900 border-white/5'}`}>
                <h2 className="text-[12px] font-black uppercase text-emerald-500 mb-4 tracking-widest">Veteran Link</h2>
                <div className="flex gap-2">
                  <input 
                    className="flex-1 bg-black/50 border border-white/10 p-2 rounded-lg text-xs outline-none focus:border-emerald-500/50 transition-all" 
                    placeholder="Add Old Username(s)..." 
                    value={newAlias} 
                    onChange={(e)=>setNewAlias(e.target.value)} 
                    onKeyDown={(e)=>e.key==='Enter' && addAlias()}
                  />
                  <button 
                    onClick={addAlias} 
                    className="bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600 hover:text-white px-4 rounded-lg font-black uppercase italic text-[10px] transition-all border border-emerald-500/30 cursor-pointer"
                  >
                    Link
                  </button>
                </div>
                {aliases.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {aliases.map((alias) => (
                      <div key={alias} className="bg-emerald-600/20 border border-emerald-500/20 px-2 py-1 rounded-md flex items-center gap-2 group">
                        <span className="text-[9px] font-black uppercase text-emerald-200/60">{alias}</span>
                        <button onClick={() => removeAlias(alias)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] cursor-pointer">✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SCOPE TOGGLE */}
              <div className={`p-6 rounded-3xl shadow-xl transition-all border ${theme === 'royal' ? 'bg-black/40 border-white/10' : 'bg-slate-900 border-white/5'}`}>
                <h2 className="text-[12px] font-black uppercase text-blue-400 mb-4 tracking-widest">Percentile Scope</h2>
                <div className="grid grid-cols-2 gap-2 bg-black/30 p-1 rounded-xl border border-white/5">
                  <button 
                    onClick={() => setPercentileScope('tier')} 
                    className={`py-2 rounded-lg text-[10px] font-black uppercase italic transition-all cursor-pointer ${percentileScope === 'tier' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    In-Tier
                  </button>
                  <button 
                    onClick={() => setPercentileScope('league')} 
                    className={`py-2 rounded-lg text-[10px] font-black uppercase italic transition-all cursor-pointer ${percentileScope === 'league' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    League
                  </button>
                </div>
              </div>

              <div className={`p-6 rounded-3xl shadow-xl transition-all border ${theme === 'royal' ? 'bg-black/40 border-white/10' : 'bg-slate-900 border-white/5'}`}>
                <h2 className="text-[12px] font-black uppercase text-yellow-500 mb-4 tracking-widest">Accolade Builder</h2>
                <div className="space-y-3">
                  <select className="w-full bg-[#070B15] border border-white/10 p-2 rounded text-xs outline-none focus:border-yellow-500/50 transition-all cursor-pointer" value={accSeason} onChange={(e)=>setAccSeason(e.target.value)}>{seasonsList.map(s => <option key={s} value={s}>{s}</option>)}</select>
                  <select className="w-full bg-[#070B15] border border-white/10 p-2 rounded text-xs outline-none focus:border-yellow-500/50 transition-all cursor-pointer" value={accTier} onChange={(e)=>setAccTier(e.target.value)}>{Object.keys(tierColors).map(t => <option key={t} value={t}>{t}</option>)}</select>
                  <select className="w-full bg-[#070B15] border border-white/10 p-2 rounded text-xs outline-none focus:border-yellow-500/50 transition-all cursor-pointer" value={accType} onChange={(e)=>setAccType(e.target.value)}>{Object.keys(typeWeights).map(type => <option key={type} value={type}>{type}</option>)}</select>
                  <button onClick={addAccolade} className="w-full bg-yellow-600/20 text-yellow-500 py-2 rounded font-bold text-xs uppercase border border-yellow-600/50 hover:bg-yellow-600/40 cursor-pointer">Add Trophy</button>
                </div>
              </div>

              <div className={`p-6 rounded-3xl shadow-xl transition-all border ${theme === 'royal' ? 'bg-black/40 border-white/10' : 'bg-slate-900 border-white/5'}`}>
                <h2 className="text-[12px] font-black uppercase text-purple-500 mb-4 tracking-widest">Select Main Car</h2>
                <div className="space-y-3">
                  <select
                    value={mainCar}
                    onChange={(e) => setMainCar(e.target.value)}
                    className="w-full bg-[#03050a] border border-white/20 rounded-lg px-4 py-2 text-[10px] font-black uppercase text-white outline-none cursor-pointer hover:border-purple-500/50 transition-colors"
                  >
                    <optgroup label="Select Your Car" className="bg-[#03050a]">
                      {rlCars.map(car => (
                        <option key={car} value={car} className="bg-[#03050a] text-white">
                          {car.toUpperCase()}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Radar Chart Sidebar */}
              <div className={`p-6 rounded-3xl shadow-xl transition-all no-print border ${theme === 'royal' ? 'bg-black/40 border-white/10' : 'bg-slate-900 border-white/5'}`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[14px] font-black uppercase text-blue-400 tracking-[0.2em]">Attribute Matrix</h2>
                  <span className="text-[10px] font-bold text-blue-50">BY {percentileScope.toUpperCase()}</span>
                </div>
                
                <div className="relative aspect-square w-full flex items-center justify-center">
                  <svg viewBox="-20 -15 140 125" className="w-full h-auto overflow-visible">
                    {/* Reference Numbers */}
                    <text x="50" y="52" fill="white" fontSize="4" opacity="0.3" textAnchor="middle">0</text>
                    <text x="50" y="26" fill="white" fontSize="4" opacity="0.3" textAnchor="middle">50</text>
                    <text x="50" y="0" fill="white" fontSize="4" opacity="0.4" textAnchor="middle">100</text>

                    {/* Background Web Polygons */}
                    {[0.2, 0.4, 0.6, 0.8, 1].map(scale => (
                      <polygon
                        key={scale}
                        points="50,0 98,35 79,90 21,90 2,35"
                        fill="none"
                        stroke="white"
                        strokeOpacity="0.05"
                        transform={`scale(${scale}) translate(${(50/scale)-50} ${(50/scale)-50})`}
                      />
                    ))}
                    
                    {/* Axis Labels */}
                    <text x="50" y="-5" textAnchor="middle" fontSize="6" fill="white" opacity="0.8" fontWeight="bold">OFF</text>
                    <text x="105" y="35" textAnchor="start" fontSize="6" fill="white" opacity="0.8" fontWeight="bold">PRS</text>
                    <text x="85" y="98" textAnchor="start" fontSize="6" fill="white" opacity="0.8" fontWeight="bold">DEF</text>
                    <text x="15" y="98" textAnchor="end" fontSize="6" fill="white" opacity="0.8" fontWeight="bold">SUP</text>
                    <text x="-5" y="35" textAnchor="end" fontSize="6" fill="white" opacity="0.8" fontWeight="bold">WIN</text>

                    {/* The Data Polygon */}
                    {getRadarData() && (() => {
                      // 1. Use 'latest' -- season
                      // 2. Use 'getStat' to find the GP of that latest season -- note to self
                      const activeGP = latest ? (parseInt(getStat(latest, 'gp')) || 0) : 0;
                      const isQualified = activeGP >= 20;

                      return (
                        <polygon
                          points={getRadarData().map((val, i) => {
                            const angle = (i * 72 - 90) * (Math.PI / 180);
                            const r = (val / 100) * 50;
                            return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
                          }).join(' ')}
                          fill={isQualified ? "rgba(59, 130, 246, 0.2)" : "rgba(148, 163, 184, 0.1)"}
                          stroke={isQualified ? "#3b82f6" : "#94a3b8"}
                          strokeWidth="1.5"
                          strokeDasharray={isQualified ? "0" : "3,3"} 
                        />
                      );
                    })()}
                  </svg>
                </div>
              </div>
            </aside>

            <section className={`transition-all duration-700 w-full ${isExpanded ? 'md:col-span-1' : 'md:lg:col-span-3'}`}>
              <div className="relative">
                <div className={`
                  absolute -top-[3px] -right-[3px] w-56 h-56 
                  rounded-tr-[3.5rem] transition-all duration-500 opacity-0 
                  ${isExpanded ? '' : 'md:group-hover/expand:opacity-100'} 
                  pointer-events-none z-0 
                  /* Sharp Arc Line */
                  border-t-[2.5px] border-r-[2.5px] border-blue-400
                  /* Primary Radiating Glow */
                  shadow-[15px_-15px_35px_rgba(59,130,246,0.6)]
                  /* Secondary Outer Bloom */
                  after:content-[''] after:absolute after:inset-0 after:rounded-tr-[3.5rem]
                  after:shadow-[25px_-25px_60px_rgba(59,130,246,0.3)]
                `} />

                <div id="stat-card" className="relative z-10 bg-[#010205] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative">
                  <div className="absolute top-0 right-0 w-24 h-24 group/expand z-50 no-print hidden md:block">
                    
                    <button 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="absolute top-5 right-5 text-slate-500 hover:text-blue-400 transition-colors p-2"
                    >
                      {isExpanded ? (
                        /* Collapse SVG */
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 15 6 6m-6-6v6m0-6h6M9 9 3 3m6 6V3m0 6H3"/></svg>
                      ) : (
                        /* Expand SVG */
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 9 6-6m-6 6V3m0 6h6M9 15l-6 6m6-6v6m0-6H3"/></svg>
                      )}
                    </button>
                  </div>
                  {latest ? (
                    <>
                      <div className="p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 border-b border-white/5 bg-gradient-to-br from-blue-900/10 to-transparent">
                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 min-w-0 text-center md:text-left">
                          <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-[#0a0f1a] rounded-3xl md:rounded-[2.5rem] flex items-center justify-center border border-white/10 relative z-10 backdrop-blur-sm shadow-2xl">
                              <img 
                                src={`/assets/franchises/${getStat(latest, 'franchise').split('\n').pop().trim()}.png`} 
                                onError={(e) => e.target.src = '/assets/rsc-shield.png'} 
                                className="w-16 h-16 md:w-24 md:h-24 object-contain"
                                style={{ imageRendering: 'auto' }} 
                              />
                            </div>
                          </div>
                          <div className="min-w-0">
                            <p className="font-black text-[16px] uppercase tracking-[0.6em] mb-2 truncate" style={{color: getTierColor(getStat(latest, 'tier'))}}>{getStat(latest, 'tier').split('\n').pop()}</p>
                            <h2 
                              className="font-black italic uppercase tracking-tighter leading-none mb-3 text-4xl sm:text-5xl md:text-7xl"
                              style={{ 
                                fontSize: getStat(latest, 'name').length > 10 
                                  ? `clamp(24px, 8vw, 52px)` // Clamp to prevent it from ever getting too big/small
                                  : '' 
                              }}
                            >
                              {getStat(latest, 'name')}
                            </h2>

                            {/* --- PLAYER ID: RSC ID (RSC######) --- */}
                            {getStat(latest, 'id') && getStat(latest, 'id') !== 'N/A' && (
                              <p className="font-mono text-[11px] font-black uppercase tracking-[0.25em] text-slate-500/80 mb-3 block">
                                PLAYER ID | <span className="text-slate-400 select-all">{getStat(latest, 'id')}</span>
                              </p>
                            )}

                            <div className="flex items-center gap-6 text-slate-400 font-bold uppercase text-[12px] tracking-[0.2em] truncate">
                              {(() => {
                                  const franchise = getStat(latest, 'franchise').split('\n').pop();
                                  const team = getStat(latest, 'team').split('\n').pop();
                                  const fullSub = `${franchise}${team}${mainCar}`;
                                  const dynamicSize = fullSub.length > 30 
                                    ? `${Math.max(8, 12 - (fullSub.length - 30) * 0.2)}px` 
                                    : '12px';

                                  return (
                                    <div 
                                      className="flex flex-wrap justify-center md:justify-start items-center gap-2 md:gap-3 text-slate-400 font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] whitespace-nowrap"
                                      style={{ fontSize: dynamicSize }}
                                    >
                                      <span className="text-white">{franchise}</span> 
                                      <span className="opacity-20 hidden md:inline">|</span>
                                      <span>{team}</span> 
                                      <span className="opacity-20 hidden md:inline">|</span> 
                                      <span className="text-blue-500 font-black">CAR: {mainCar}</span>
                                    </div>
                                  );
                                })()}
                            </div>
                          </div>
                        </div>
                        {/* --- REFINED EVOLUTIONARY OVR BADGE --- */}
                        <div className="md:ml-auto relative group flex flex-col items-center justify-center min-w-[140px] md:min-w-[160px] flex-shrink-0 mt-6 md:mt-0">
                          {/* Dynamic Aura Glow */}
                          <div className={`absolute inset-0 blur-[60px] rounded-full transition-all duration-1000 
                            ${calculateOVR(playerHistory) >= 99 ? 'bg-yellow-400/30 scale-110 animate-pulse' : 
                              calculateOVR(playerHistory) >= 90 ? 'bg-yellow-500/20 scale-100' : 
                              calculateOVR(playerHistory) >= 80 ? 'bg-indigo-500/20 scale-95 animate-[pulse_4s_infinite]' : 
                              'bg-cyan-500/10 scale-90 opacity-40'}`} 
                          />
                          
                          <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                              <circle cx="64" cy="64" r="58" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                              
                              {/* The Dynamic Ring */}
                              <circle
                                cx="64" cy="64" r="58"
                                fill="transparent"
                                stroke={
                                  calculateOVR(playerHistory) >= 90 ? "url(#fireGradient)" : 
                                  calculateOVR(playerHistory) >= 80 ? "url(#electricGradient)" : 
                                  "url(#iceGradient)"
                                }
                                strokeWidth="8"
                                strokeDasharray="364.4"
                                strokeDashoffset={364.4 - (364.4 * (calculateOVR(playerHistory) / 99))}
                                strokeLinecap="round"
                                className={`transition-all duration-1000 ease-out 
                                  ${calculateOVR(playerHistory) >= 95 ? 'animate-[pulse_2s_infinite]' : 
                                    calculateOVR(playerHistory) >= 80 ? 'animate-[pulse_5s_infinite]' : ''}`}
                              />

                              <defs>
                                {/* Ice Theme (79 and Below) */}
                                <linearGradient id="iceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#06b6d4" />
                                  <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                                {/* Electric Theme (80-89) */}
                                <linearGradient id="electricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#22d3ee" />
                                  <stop offset="100%" stopColor="#818cf8" />
                                </linearGradient>
                                {/* Fire Theme (90+) */}
                                <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#fbbf24" />
                                  <stop offset="100%" stopColor="#ef4444" />
                                </linearGradient>
                              </defs>
                            </svg>

                            {/* The Central OVR Text */}
                            <div className="z-10 flex flex-col items-center">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-[-4px]">OVR</span>
                              <span className={`text-5xl font-black italic tracking-tighter transition-all duration-500
                                ${calculateOVR(playerHistory) >= 99 ? 'text-white [text-shadow:_0_0_20px_#fbbf24,_0_0_40px_#f59e0b] scale-110' : 
                                  calculateOVR(playerHistory) >= 90 ? 'text-yellow-400 [text-shadow:_0_0_15px_rgba(251,191,36,0.6)]' : 
                                  calculateOVR(playerHistory) >= 80 ? 'text-cyan-200 [text-shadow:_0_0_15px_rgba(34,211,238,0.5)]' : 
                                  calculateOVR(playerHistory) < 50 ? 'text-slate-200 opacity-60' : 
                                  'text-white'}`}>
                                {calculateOVR(playerHistory)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* MILESTONES (HALL OF FAME) */}
                      <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10 px-6 md:px-12 py-8 border-b border-white/5 bg-white/[0.01]">
                        {getCareerMilestones().map((m, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <span className="text-2xl">{m.icon}</span>
                            <div>
                              <p className="text-[14px] font-black italic uppercase leading-none">{m.value} {m.sub && <span className="text-[10px] text-blue-500 not-italic ml-1">({m.sub})</span>}</p>
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">{m.label}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {sortedAccolades.length > 0 && (
                        <div className="bg-yellow-500/5 p-8 px-12 border-b border-white/5 no-scrollbar">
                          {/* Use a grid that forces 4 columns by default, and stays side-by-side */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-8 gap-x-10">
                            {sortedAccolades.map((a, i) => (
                              <div key={i} className="relative group flex items-center gap-3 min-w-0">
                                <button 
                                  onClick={() => removeAccolade(i)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg no-print"
                                >
                                  ✕
                                </button>
                                
                                <span className="text-2xl drop-shadow-[0_0_8px_rgba(234,179,8,0.4)] flex-shrink-0">
                                  {accoladeIcons[a.type]}
                                </span>
                                <div className="leading-none min-w-0">
                                  <p className="text-[8px] font-black uppercase mb-0.5 truncate" style={{color: getTierColor(a.tier)}}>
                                    {a.season} {a.tier}
                                  </p>
                                  <p className="text-[11px] font-black text-slate-200 uppercase tracking-widest truncate">
                                    {a.type}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div id="table-wrapper" className="p-4 md:p-12 overflow-x-auto scrollbar-hide">
                        <table className="min-w-[800px] md:w-full text-left border-collapse">
                          <thead>
                            <tr className="text-slate-600 text-[10px] font-black uppercase border-b border-white/5 pb-6">
                              <th className="pb-6" title="The competitive RSC season period">Season</th>
                              <th className="pb-6" title="The league tier level the player played in">Tier</th>
                              <th className="pb-6" title="The organization the player represented">Franchise</th>
                              {/*<th className="pb-6" title="Overall Rating calculated for this specific season execution">OVR</th> --- Scrapped for now*/}
                              <th className="pb-6 text-center pr-10" title="Games Played">GP</th>
                              <th className="pb-6" title="Stats-Based Value: A composite metric of overall impact">SBV</th>
                              <th className="pb-6" title="Points Per Game: Total score divided by games played">PPG</th>
                              <th className="pb-6" title="Goals Per Game: Raw scoring frequency">GPG</th>
                              <th className="pb-6" title="Shots Per Game: Offensive pressure frequency">ShPG</th>
                              <th className="pb-6" title="Shooting Percentage: Goal conversion efficiency">Sh%</th>
                              <th className="pb-6" title="Assists Per Game: Playmaking and support frequency">APG</th>
                              <th className="pb-6" title="Saves Per Game: Defensive reliability frequency">SvPG</th>
                              <th className="pb-6 text-right" title="Percentage of games won">Win%</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs font-bold">
                            {playerHistory.map((row, idx) => {
                              const gp = getStat(row, 'gp');
                              const tier = getStat(row, 'tier');

                              {/*const seasonOvr = calculateOVR([row]);*/}

                              return (
                                <tr key={`${row.seasonLabel}-${idx}`} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group relative">
                                  <td className="py-6 text-blue-500 italic font-black pl-2">
                                    <div className="grid grid-cols-[15px_1fr] items-center gap-1">
                                      <div className="flex justify-start">
                                        {(() => {
                                          const rawId = row['RSC ID']; 
                                          const rowId = getStat(row, 'id');
                                          const rowName = getStat(row, 'name').toLowerCase();
                                          
                                          // ID anchors from the current search/profile
                                          const masterId = latest ? getStat(latest, 'id') : null;
                                          const masterName = latest ? getStat(latest, 'name').toLowerCase() : '';
                                          const cleanSearch = searchId.trim().toLowerCase();

                                          // Checks row for valid ID entry
                                          const hasRealRowId = rowId && rowId !== '---' && rowId !== '';
                                          const hasRealMasterId = masterId && masterId !== '---' && masterId !== '';

                                          // SCENARIO C: MANUAL VETERAN LINK
                                          const isManualLink = aliases.some(a => a.toLowerCase() === rowName);

                                          // SCENARIO A: HARD MISMATCH (Yellow Warning)
                                          // Trigger warning if: 1. It's a manual link with a different ID, OR 2. It's an auto-result with a different ID
                                          const isManualConflict = isManualLink && hasRealRowId && hasRealMasterId && rowId !== masterId;
                                          const isAutoMismatch = !isManualLink && rowName === cleanSearch && hasRealRowId && hasRealMasterId && rowId !== masterId;
                                          const isConflict = isManualConflict || isAutoMismatch;

                                          // SCENARIO B: NAME CHANGE (Emerald ⊕)
                                          const isNameChange = hasRealMasterId && rowId === masterId && rowName !== masterName;
                                          
                                          // SCENARIO D: GHOST MATCH (Emerald ⊕)
                                          const isGhostMatch = rowName === masterName && !hasRealRowId;

                                          // --- RENDERING PRIORITY ---

                                          // Priority 1: Yellow Warning (ID Mismatches)
                                          if (isConflict) {
                                            return (
                                              <span 
                                                className="text-yellow-500 text-[12px] animate-pulse cursor-help" 
                                                title={isManualConflict 
                                                  ? `Warning: Manual link "${getStat(row, 'name')}" belongs to a different RSC ID than the profile.` 
                                                  : "Warning: ID mismatch. This player shares a name with your search but has a different ID."}
                                              >
                                                ⚠
                                              </span>
                                            );
                                          }

                                          // Priority 2: Verified Connections (The Green Light)
                                          if (isManualLink || isNameChange || isGhostMatch) {
                                            let tooltip = "Linked Row";
                                            if (isManualLink) tooltip = `Veteran Link: Manually linked via alias "${getStat(row, 'name')}"`;
                                            else if (isNameChange) tooltip = "Verified Identity: Name change detected via RSC ID";
                                            else if (isGhostMatch) tooltip = "Legacy Link: Verified via name match (No ID available)";

                                            return (
                                              <span className="text-emerald-500 text-[10px] cursor-help" title={tooltip}>
                                                ⊕
                                              </span>
                                            );
                                          }

                                          return null;
                                        })()}
                                      </div>
                                      <span className="text-sm">{row.seasonLabel}</span>
                                    </div>
                                  </td>
                                  <td className="py-6 text-[10px] uppercase font-black" style={{color: getTierColor(tier)}}>{tier.split('\n').pop()}</td>
                                  <td className="py-6 text-slate-400 text-[10px] uppercase">{getStat(row, 'franchise').split('\n').pop()}</td>
                                  {/*<td className="py-6 font-black font-mono text-sm text-yellow-500/90 italic tracking-tighter">{seasonOvr}</td>*/}
                                  <td className="py-6 text-center font-mono opacity-40 pr-10">{gp}</td>

                                  {/* REPLACEMENT FOR RENDERCELL: Dynamic Stat Mapping */}
                                  {['sbv', 'ppg', 'gpg', 'shpg', 'shPct', 'apg', 'svpg'].map(key => {
                                      const val = getStat(row, key);
                                      const pData = getPercentileData(row, key);

                                      const displayValue = key === 'shPct' ? formatShPct(val) : val;

                                      return (
                                        <td key={key} className="py-6 font-mono group/stat relative" style={getStatStyle(key, val, gp)}>
                                          <span className="cursor-default text-[13px] font-bold tracking-tight">{displayValue}</span>
                                          {pData && (
                                            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 rounded-lg text-[12px] font-black uppercase italic tracking-tighter opacity-0 group-hover/stat:opacity-100 transition-all transform group-hover/stat:-translate-y-2 pointer-events-none whitespace-nowrap z-50 shadow-2xl border-2 ${pData.isElite ? "bg-yellow-500 text-black border-yellow-300 animate-gold-glow shadow-[0_0_25px_rgba(250,204,21,0.7)]" : "bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]"}`}>
                                              {pData.isNumberOne ? <span className="flex items-center gap-1">👑 #1 IN {percentileScope.toUpperCase()}</span> : `${pData.label} ${pData.value}%`}
                                            </div>
                                          )}
                                        </td>
                                      );
                                  })}

                                  <td className="py-6 text-right font-mono" style={getStatStyle('winPct', getStat(row, 'winPct'), gp)}>
                                    {formatWinPct(getStat(row, 'winPct'))}
                                  </td>

                                  <td className="absolute right-[-60px] top-1/2 -translate-y-1/2 no-print">
                                    <button 
                                      onClick={() => hideSeason(idx)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white text-[9px] font-black px-2 py-1 rounded border border-red-500/40 shadow-xl"
                                    >
                                      REMOVE
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}

                            {/* --- CAREER SUMMARY (WEIGHTED AVERAGE) ROW --- */}
                            {playerHistory.length > 0 && (() => {
                              const validHistory = playerHistory.filter(row => (parseInt(getStat(row, 'gp')) || 0) > 0);
                              const totalGP = validHistory.reduce((acc, row) => acc + (parseInt(getStat(row, 'gp')) || 0), 0);
                              
                              if (totalGP === 0) return null;

                              const averageGP = Math.round(totalGP / validHistory.length);

                              // To calculate weighted average for a specific key
                              const getWeightedAvg = (key) => {
                                const weightedSum = validHistory.reduce((acc, row) => {
                                  const stat = parseFloat(getStat(row, key)) || 0;
                                  const gp = parseInt(getStat(row, 'gp')) || 0;
                                  return acc + (stat * gp);
                                }, 0);
                                return weightedSum / totalGP;
                              };

                              return (
                                <tr className="border-t-2 border-blue-500/30 bg-blue-500/5 font-black italic">
                                  <td className="py-6 pl-2 text-blue-400 uppercase tracking-tighter">CAREER</td>
                                  <td className="py-6 text-[10px] text-slate-500"></td>
                                  <td className="py-6 text-[10px] text-slate-500">WEIGHTED AVERAGE</td>
                                  {/*<td className="py-6 text-[10px] text-slate-500"></td>*/}
                                  <td className="py-6 text-center pr-10 text-white opacity-100 font-mono text-sm">{averageGP}</td>
                                  
                                  {['sbv', 'ppg', 'gpg', 'shpg', 'shPct', 'apg', 'svpg'].map(key => {
                                    const avgVal = getWeightedAvg(key);
                                    const style = getStatStyle(key, avgVal, totalGP);
                                    const displayValue = key === 'shPct' ? formatShPct(avgVal) : avgVal.toFixed(2);
                                    
                                    return (
                                      <td key={key} className="py-6 font-mono" style={style}>
                                        <span className="text-[13px]">{displayValue}</span>
                                      </td>
                                    );
                                  })}

                                  <td className="py-6 text-right font-mono pr-2" style={getStatStyle('winPct', getWeightedAvg('winPct'), totalGP)}>
                                    {formatWinPct(getWeightedAvg('winPct'))}
                                  </td>
                                </tr>
                              );
                            })()}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <div className="py-72 text-center opacity-10 font-black italic tracking-[1.5em] text-xl uppercase">Scanning RSC Database...</div>
                  )}
                </div>
              </div>
            </section>

            <div className="col-span-full">
              {playerHistory.length > 0 && (() => {
                const data = getTrendData(); // Data is now Early -> Late
                const width = 1000;
                const height = 300;
                const padding = 60;

                const getX = (i) => padding + (i * (width - 2 * padding) / (data.length - 1));
                const getY = (sbv) => {
                  const min = -50;
                  const max = 150;
                  const percentage = (sbv - min) / (max - min);
                  return (height - padding) - (percentage * (height - 2 * padding));
                };

                return (
                  <div className={`max-w-[95%] mx-auto mt-12 p-4 sm:p-6 md:p-10 rounded-3xl no-print mb-20 shadow-2xl transition-all duration-1000 border ${theme === 'royal' ? 'bg-black/40 border-white/10' : 'bg-slate-900/50 border-white/5'}`}>
                  {/* Header Section: Stacked on mobile, split row on desktop */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-6 md:mb-10 text-center sm:text-left">
                    <h3 className="text-xs md:text-[14px] font-black uppercase text-yellow-500 tracking-[0.3em] italic">
                      Career Performance Journey
                    </h3>
                    <div className="flex gap-4">
                      <span className="text-[10px] md:text-[14px] font-bold text-white uppercase opacity-60 md:opacity-100">Range: -50 to 150 SBV</span>
                    </div>
                  </div>
                  
                  {/* Scroll Container: Prevents the graph from turning into an unreadable squished sliver on phones */}
                  <div className="w-full overflow-x-auto scrollbar-hide touch-pan-x">
                    {/* Setting a min-width ensures a guaranteed smooth canvas aspect ratio for swiping on portrait layouts */}
                    <div className="relative w-full min-w-[650px] md:min-w-full">
                      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
                        {/* Y-Axis Grid Lines */}
                        {[0, 50, 100, 150].map(val => (
                          <g key={val}>
                            <line x1={padding} y1={getY(val)} x2={width - padding} y2={getY(val)} stroke="white" strokeOpacity="0.05" strokeDasharray="4" />
                            <text 
                              x={padding - 20} y={getY(val) + 4} 
                              fill={theme === 'royal' ? '#60a5fa' : '#475569'} 
                              fontSize="11" 
                              textAnchor="end" 
                              fontWeight="900"
                              className="transition-colors duration-1000"
                            >
                              {val}
                            </text>
                          </g>
                        ))}

                        {/* Chronological Segmented Lines */}
                        {data.map((point, i) => {
                          if (i === 0) return null;
                          const prev = data[i - 1];
                          return (
                            <g key={i}>
                              {/* The Glow (Outer Line) */}
                              <line 
                                x1={getX(i - 1)} y1={getY(prev.sbv)}
                                x2={getX(i)} y2={getY(point.sbv)}
                                stroke={getTierColor(prev.tier)}
                                strokeWidth="12"
                                strokeLinecap="round"
                                opacity={prev.gp < 20 ? "0.05" : "0.15"}
                                className="blur-md transition-all duration-700"
                              />
                              {/* The Core (Inner Line) */}
                              <line 
                                x1={getX(i - 1)} y1={getY(prev.sbv)}
                                x2={getX(i)} y2={getY(point.sbv)}
                                stroke={getTierColor(prev.tier)}
                                strokeWidth="4"
                                strokeLinecap="round"
                                opacity={prev.gp < 20 ? "0.2" : "1"}
                                className="transition-all duration-500"
                              />
                            </g>
                          );
                        })}

                        {/* Season Nodes */}
                        {data.map((point, i) => (
                          <g key={i} className="group/node">
                            <circle 
                              cx={getX(i)} cy={getY(point.sbv)} r="6" 
                              fill={getTierColor(point.tier)} 
                              className={`transition-all duration-300 group-hover/node:r-8 stroke-[#03050a] stroke-[3px] 
                                ${point.gp < 20 ? 'opacity-40' : 'opacity-100'}`}
                            />
                            {/* Tooltip */}
                            <g className="opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none">
                              <rect 
                                x={getX(i) - 50} y={getY(point.sbv) - 55} 
                                width="100" height="35" rx="12" 
                                fill="#03050a" 
                                stroke={getTierColor(point.tier)} 
                                strokeWidth="2" 
                              />
                              <text x={getX(i)} y={getY(point.sbv) - 33} fill="white" fontSize="11" textAnchor="middle" fontWeight="black" className="italic">
                                {point.sbv.toFixed(1)} <tspan fill={getTierColor(point.tier)}>SBV</tspan>
                                {point.gp < 20 ? ' *' : ''}
                              </text>
                            </g>
                            {/* Bottom Labels */}
                            <text 
                              x={getX(i)} y={height - 5} 
                              fill={theme === 'royal' ? '#94a3b8' : '#64748b'} 
                              fontSize="12" 
                              textAnchor="middle" 
                              fontWeight="900" 
                              className="uppercase italic tracking-widest transition-colors duration-1000"
                            >
                              {point.season}
                            </text>
                          </g>
                        ))}
                      </svg>
                    </div>
                  </div>
                </div>
                );
              })()}
            </div>

          </>
        )}

        {activeTab === 'versus' && (
          <div className="col-span-4 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 no-print">
              {/* PLAYER 1 SEARCH */}
              <div className={`p-6 rounded-3xl border border-blue-500/20 shadow-xl transition-all duration-1000 ${theme === 'royal' ? 'bg-black/40' : 'bg-slate-900/50'}`}>
                <h2 className="text-[12px] font-black uppercase text-blue-500 mb-4 tracking-widest text-center">Player 1</h2>

                <div className="relative">
                  <input 
                    className="w-full bg-black/50 border border-white/10 p-3 rounded-xl mb-3 outline-none text-white focus:border-blue-500/50" 
                    placeholder="ID or Username..." 
                    value={searchId}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchId(val);
                      setActiveField('p1');
                      if (val.length > 1 && allData?.length > 0) {
                        const matches = [...new Set(allData.map(d => getStat(d, 'name')).filter(n => n?.toLowerCase().includes(val.toLowerCase())))].slice(0, 5);
                        setSuggestions(matches);
                      } else { setSuggestions([]); }
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && (performSearch(searchId, 'p1'), setSuggestions([]))}
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* P1 Suggestions Overlay */}
                  {activeField === 'p1' && suggestions.length > 0 && (
                    <div className="absolute z-[100] w-full left-0 top-[calc(100%-8px)]">
                      <div className="bg-[#03050a] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                        {suggestions.map((name) => (
                          <div 
                            key={name}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSearchId(name);
                              setSuggestions([]);
                              setActiveField(null);
                            }}
                            className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 hover:bg-blue-600/20 hover:text-cyan-400 cursor-pointer border-b border-white/5 last:border-0 transition-colors italic"
                          >
                            {name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => performSearch(searchId, 'p1')} 
                    className="flex-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white py-2 rounded-lg font-black uppercase italic text-[11px] transition-all border border-blue-500/30 cursor-pointer"
                  >
                    Compare P1
                  </button>
                  <select 
                    value={p1TargetSeason} // Or p2
                    onChange={(e) => setP1TargetSeason(e.target.value)}
                    className="bg-[#03050a] border border-white/20 rounded-lg px-4 py-2 text-[10px] font-black uppercase text-white outline-none cursor-pointer hover:border-blue-500/50 transition-colors"
                  >
                    <option value="Career" className="bg-[#03050a] text-white">CAREER AVG</option>
                    {playerHistory.map(s => (
                      <option key={s.seasonLabel} value={s.seasonLabel}>
                        {s.seasonLabel} {getStat(s, 'tier').split('\n').pop()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PLAYER 2 SEARCH */}
              <div className={`p-6 rounded-3xl border border-red-500/20 shadow-xl transition-all duration-1000 ${theme === 'royal' ? 'bg-black/40' : 'bg-slate-900/50'}`}>
                <h2 className="text-[12px] font-black uppercase text-red-500 mb-4 tracking-widest text-center">Player 2</h2>

                <div className="relative">
                  <input 
                    className="w-full bg-black/50 border border-white/10 p-3 rounded-xl mb-3 outline-none text-white focus:border-red-500/50" 
                    placeholder="ID or Username..." 
                    value={compareId}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCompareId(val);
                      setActiveField('p2');
                      if (val.length > 1 && allData?.length > 0) {
                        const matches = [...new Set(allData.map(d => getStat(d, 'name')).filter(n => n?.toLowerCase().includes(val.toLowerCase())))].slice(0, 5);
                        setSuggestions(matches);
                      } else { setSuggestions([]); }
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && (performSearch(compareId, 'p2'), setSuggestions([]))}
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* P2 Suggestions Overlay */}
                  {activeField === 'p2' && suggestions.length > 0 && (
                    <div className="absolute z-[100] w-full left-0 top-[calc(100%-8px)]">
                      <div className="bg-[#03050a] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                        {suggestions.map((name) => (
                          <div 
                            key={name}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCompareId(name);
                              setSuggestions([]);
                              setActiveField(null);
                            }}
                            className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 hover:bg-red-600/20 hover:text-red-400 cursor-pointer border-b border-white/5 last:border-0 transition-colors italic"
                          >
                            {name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                
                <div className="flex gap-2">
                  <button 
                    onClick={() => performSearch(compareId, 'p2')} 
                    className="flex-1 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white py-2 rounded-lg font-black uppercase italic text-[11px] transition-all border border-red-500/30 cursor-pointer"
                  >
                    Compare P2
                  </button>
                  <select 
                    value={p2TargetSeason}
                    onChange={(e) => setP2TargetSeason(e.target.value)}
                    className="bg-[#03050a] border border-white/20 rounded-lg px-4 py-2 text-[10px] font-black uppercase text-white outline-none cursor-pointer hover:border-red-500/50 transition-colors"
                  >
                    <option value="Career">CAREER AVG</option>
                    {player2History.map(s => (
                      <option key={s.seasonLabel} value={s.seasonLabel}>
                        {s.seasonLabel} {getStat(s, 'tier').split('\n').pop()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            {/* PLAYER 3 SEARCH */}
              <div className={`p-6 rounded-3xl border border-amber-500/20 shadow-xl transition-all duration-1000 ${theme === 'royal' ? 'bg-black/40' : 'bg-slate-900/50'}`}>
                <h2 className="text-[12px] font-black uppercase text-amber-500 mb-4 tracking-widest text-center">Player 3</h2>
                <div className="relative">
                  <input 
                    className="w-full bg-black/50 border border-white/10 p-3 rounded-xl mb-3 outline-none text-white focus:border-amber-500/50" 
                    placeholder="ID or Username..." 
                    value={player3Id}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPlayer3Id(val);
                      setActiveField('p3');
                      if (val.length > 1 && allData?.length > 0) {
                        const matches = [...new Set(allData.map(d => getStat(d, 'name')).filter(n => n?.toLowerCase().includes(val.toLowerCase())))].slice(0, 5);
                        setSuggestions(matches);
                      } else { setSuggestions([]); }
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && (performSearch(player3Id, 'p3'), setSuggestions([]))}
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* P3 Suggestions Overlay */}
                  {activeField === 'p3' && suggestions.length > 0 && (
                    <div className="absolute z-[100] w-full left-0 top-[calc(100%-8px)]">
                      <div className="bg-[#03050a] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                        {suggestions.map((name) => (
                          <div 
                            key={name}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayer3Id(name);
                              setSuggestions([]);
                              setActiveField(null);
                            }}
                            className="px-4 py-3 text-[10px] font-black uppercase text-slate-400 hover:bg-amber-600/20 hover:text-amber-400 cursor-pointer border-b border-white/5 last:border-0 transition-colors italic"
                          >
                            {name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => performSearch(player3Id, 'p3')} 
                    className="flex-1 bg-amber-600/20 text-amber-400 hover:bg-amber-600 hover:text-white py-2 rounded-lg font-black uppercase italic text-[11px] transition-all border border-amber-500/30 cursor-pointer"
                  >
                    Compare P3
                  </button>
                  <select 
                    value={p3TargetSeason}
                    onChange={(e) => setP3TargetSeason(e.target.value)}
                    className="bg-[#03050a] border border-white/20 rounded-lg px-4 py-2 text-[10px] font-black uppercase text-white outline-none cursor-pointer hover:border-amber-500/50 transition-colors"
                  >
                    <option value="Career">CAREER AVG</option>
                    {player3History.map(s => (
                      <option key={s.seasonLabel} value={s.seasonLabel}>
                        {s.seasonLabel} {getStat(s, 'tier').split('\n').pop()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Option Buttons */}
            <div className="flex justify-center gap-4 mb-6 no-print">
              <button onClick={() => setCompMode(compMode === 'raw' ? 'percentile' : 'raw')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${compMode === 'percentile' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                {compMode === 'percentile' ? 'View Raw Stats' : 'View Percentiles'}
              </button>
              <button onClick={() => setShowAverage(!showAverage)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${showAverage ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                {showAverage ? 'Hide Average' : 'Show Average'}
              </button>
              {showAverage && (
                <select 
                  value={averageType} 
                  onChange={(e) => setAverageType(e.target.value)} 
                  className="bg-[#03050a] border border-white/20 rounded-xl px-4 text-[10px] font-black text-white outline-none cursor-pointer transition-colors hover:border-blue-500/50"
                >
                  <option value="tier" className="bg-[#03050a] text-white">Tier Average</option>
                  <option value="league" className="bg-[#03050a] text-white">League Wide</option>
                </select>
              )}
            </div>

            {/* PREVIEWS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {[
                { history: playerHistory, target: p1TargetSeason, color: 'blue', label: 'Player 1', textClass: 'text-blue-500', borderClass: 'border-blue-500/20', bgClass: 'bg-blue-500/5' },
                { history: player2History, target: p2TargetSeason, color: 'red', label: 'Player 2', textClass: 'text-red-500', borderClass: 'border-red-500/20', bgClass: 'bg-red-500/5' },
                { history: player3History, target: p3TargetSeason, color: 'amber', label: 'Player 3', textClass: 'text-amber-500', borderClass: 'border-amber-500/20', bgClass: 'bg-amber-500/5' }
              ].map((p, i) => {
                if (p.history.length === 0) return (
                  <div key={i} className="p-6 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 border bg-white/[0.01] border-white/5 text-slate-500 font-bold uppercase tracking-wider text-xs justify-center italic">
                    Awaiting {p.label}
                  </div>
                );
                
                // --- THE KEY CHANGE: Determine which season data to show ---
                const displayRow = p.target === 'Career' 
                  ? p.history[0] 
                  : p.history.find(s => s.seasonLabel === p.target) || p.history[0];

                // Calculate OVR for just that season if not 'Career'
                const displayOvr = p.target === 'Career' 
                  ? calculateOVR(p.history) 
                  : calculateOVR([displayRow]);

                const franchiseName = getStat(displayRow, 'franchise').split('\n').pop().trim();
                const tierName = getStat(displayRow, 'tier').split('\n').pop().trim();

                return (
                  <div key={i} className={`p-6 bg-${p.color}-500/5 border border-${p.color}-500/20 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden">
                      <img 
                        src={`/assets/franchises/${franchiseName}.png`} 
                        onError={(e) => e.target.src = '/assets/rsc-shield.png'} 
                        className="w-10 h-10 object-contain z-10" 
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase italic leading-none text-white">
                        {getStat(displayRow, 'name')}
                      </h3>
                      <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${p.textClass}`}>
                        {p.target === 'Career' ? 'Career' : p.target} {tierName} | OVR: {displayOvr}
                      </p>
                      <p className="text-[8px] text-slate-500 uppercase font-black mt-1 tracking-tighter italic">
                        {getStat(displayRow, 'team').split('\n').pop()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SHARED ATTRIBUTE MATRIX */}
            {(playerHistory.length > 0 || player2History.length > 0 || player3History.length > 0) && (
              <div className={`border border-white/5 p-12 rounded-3xl shadow-2xl mt-8 transition-all duration-1000 ${theme === 'royal' ? 'bg-black/60' : 'bg-slate-900/80'}`}>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8 md:mb-10 text-center lg:text-left">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-white">Attribute Comparison</h2>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">Direct Archetype Overlap</p>
                  </div>
                  {/* PLAYER LEGEND */}
                  <div className="grid grid-cols-3 sm:flex justify-center gap-4 sm:gap-6">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-sm shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                      <span className="text-[10px] font-black uppercase text-slate-300 whitespace-nowrap">Player 1</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-sm shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                      <span className="text-[10px] font-black uppercase text-slate-300 whitespace-nowrap">Player 2</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-sm shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                      <span className="text-[10px] font-black uppercase text-slate-300 whitespace-nowrap">Player 3</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative aspect-video w-full flex items-center justify-center">
                  <svg viewBox="0 -15 100 125" className="h-full w-auto overflow-visible">
                    {/* Reference Numbers */}
                    <text x="50" y="52" fill="white" fontSize="3" opacity="0.3" textAnchor="middle">0</text>
                    <text x="50" y="26" fill="white" fontSize="3" opacity="0.3" textAnchor="middle">50</text>
                    <text x="50" y="0" fill="white" fontSize="3" opacity="0.4" textAnchor="middle">100</text>

                    {/* Background Web Polygons */}
                    {[0.2, 0.4, 0.6, 0.8, 1].map(scale => (
                      <polygon key={scale} points="50,0 98,35 79,90 21,90 2,35" fill="none" stroke="white" strokeOpacity="0.05" transform={`scale(${scale}) translate(${(50/scale)-50} ${(50/scale)-50})`} />
                    ))}
                    
                    {/* Axis Labels */}
                    <text x="50" y="-8" textAnchor="middle" fontSize="5" fill="white" opacity="0.4" fontWeight="bold">OFFENSE</text>
                    <text x="108" y="35" textAnchor="start" fontSize="5" fill="white" opacity="0.4" fontWeight="bold">PRESSURE</text>
                    <text x="85" y="100" textAnchor="start" fontSize="5" fill="white" opacity="0.4" fontWeight="bold">DEFENSE</text>
                    <text x="15" y="100" textAnchor="end" fontSize="5" fill="white" opacity="0.4" fontWeight="bold">SUPPORT</text>
                    <text x="-8" y="35" textAnchor="end" fontSize="5" fill="white" opacity="0.4" fontWeight="bold">WINRATE</text>

                    {showAverage && (
                      <polygon
                        points={(() => {
                          // Logic to generate the Average Polygon
                          const p1Row = p1TargetSeason === 'Career' ? playerHistory[0] : playerHistory.find(s => s.seasonLabel === p1TargetSeason);
                          const tier = p1Row ? getStat(p1Row, 'tier') : "Premier";
                          const avg = getAverageStatline(p1TargetSeason, tier, averageType);
                          if (!avg) return "";
                          
                          const stats = ['gpg', 'shpg', 'apg', 'svpg', 'winPct'];
                          return stats.map((key, i) => {
                            const angle = (i * 72 - 90) * (Math.PI / 180);
                            // This is a simplified 50% "average" mark for the web
                            const r = 25; 
                            return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
                          }).join(' ');
                        })()}
                        fill="none"
                        stroke="rgba(16, 185, 129, 0.3)"
                        strokeWidth="1"
                        strokeDasharray="4"
                      />
                    )}

                    {/* DATA POLYGONS */}
                    {(() => {
                      const radar = getVersusRadarData(playerHistory, player2History, player3History);

                      // Helper to determine if a player's current view is "Qualified"
                      const getIsQualified = (history, targetSeason) => {
                        if (!history || history.length === 0) return false;
                        if (targetSeason === 'Career') {
                          // For career, check if they have at least one season with 20+ games
                          return getUnifiedHistory(history).some(s => (parseInt(getStat(s, 'gp')) || 0) >= 20);
                        }
                        // For specific seasons, find that season and check its GP
                        const seasonRow = history.find(s => s.seasonLabel === targetSeason);
                        return (parseInt(getStat(seasonRow || {}, 'gp')) || 0) >= 20;
                      };

                      const p1Qualified = getIsQualified(playerHistory, p1TargetSeason);
                      const p2Qualified = getIsQualified(player2History, p2TargetSeason);
                      const p3Qualified = getIsQualified(player3History, p3TargetSeason);

                      return (
                        <>
                          {/* Player 1 (Blue) */}
                          <polygon
                            points={radar.p1.map((val, i) => {
                              const angle = (i * 72 - 90) * (Math.PI / 180);
                              const r = (val / 100) * 50;
                              return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
                            }).join(' ')}
                            fill={p1Qualified ? "rgba(59, 130, 246, 0.2)" : "rgba(148, 163, 184, 0.1)"}
                            stroke={p1Qualified ? "#3b82f6" : "#94a3b8"}
                            strokeWidth="1"
                            strokeDasharray={p1Qualified ? "0" : "2,2"}
                            className="transition-all duration-1000"
                          />
                          {/* Player 2 (Red) */}
                          <polygon
                            points={radar.p2.map((val, i) => {
                              const angle = (i * 72 - 90) * (Math.PI / 180);
                              const r = (val / 100) * 50;
                              return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
                            }).join(' ')}
                            fill={p2Qualified ? "rgba(239, 68, 68, 0.2)" : "rgba(184, 148, 148, 0.1)"}
                            stroke={p2Qualified ? "#ef4444" : "#b89494"}
                            strokeWidth="1"
                            strokeDasharray={p2Qualified ? "0" : "2,2"}
                            className="transition-all duration-1000"
                          />
                        {/* Player 3 (Yellow) */}
                          <polygon
                            points={radar.p3.map((val, i) => {
                              const angle = (i * 72 - 90) * (Math.PI / 180);
                              const r = (val / 100) * 50;
                              return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
                            }).join(' ')}
                            fill={p3Qualified ? "rgba(245, 158, 11, 0.15)" : "rgba(212, 163, 115, 0.05)"}
                            stroke={p3Qualified ? "#f59e0b" : "#d4a373"}
                            strokeWidth="1"
                            strokeDasharray={p3Qualified ? "0" : "2,2"}
                            className="transition-all duration-1000"
                          />
                        </>
                      );
                    })()}
                  </svg>
                </div>
              </div>
            )}

            {/* STAT COMPARISON TABLE */}
            {(playerHistory.length > 0 || player2History.length > 0 || player3History.length > 0) && (
              <div className={`border border-white/5 rounded-3xl overflow-hidden mt-8 shadow-2xl transition-all duration-1000 ${theme === 'royal' ? 'bg-black/40' : 'bg-slate-900/50'}`}>
                
                <div className="w-full overflow-x-auto scrollbar-hide">
                  <table className="w-full text-left table-fixed min-w-[700px]">
                    <thead>
                      <tr className={`${theme === 'royal' ? 'bg-white/[0.03]' : 'bg-white/5'} border-b border-white/5 uppercase text-[10px] font-black`}>
                        
                        <th className={`p-6 text-slate-500 tracking-widest transition-all duration-300 ${showAverage ? 'w-[16%]' : 'w-[22%]'}`}>Metric</th>
                        
                        <th className={`p-6 text-center text-blue-400 italic transition-all duration-300 truncate ${showAverage ? 'w-[24%]' : 'w-[26%]'}`}>
                          <div className="truncate px-1" title={playerHistory[0] ? getStat(playerHistory[0], 'name') : "Player 1"}>
                            {playerHistory[0] ? getStat(playerHistory[0], 'name') : "Player 1"}
                          </div>
                        </th>
                        
                        <th className={`p-6 text-center text-red-400 italic transition-all duration-300 truncate ${showAverage ? 'w-[24%]' : 'w-[26%]'}`}>
                          <div className="truncate px-1" title={player2History[0] ? getStat(player2History[0], 'name') : "Player 2"}>
                            {player2History[0] ? getStat(player2History[0], 'name') : "Player 2"}
                          </div>
                        </th>
                        
                        <th className={`p-6 text-center text-amber-400 italic transition-all duration-300 truncate ${showAverage ? 'w-[24%]' : 'w-[26%]'}`}>
                          <div className="truncate px-1" title={player3History[0] ? getStat(player3History[0], 'name') : "Player 3"}>
                            {player3History[0] ? getStat(player3History[0], 'name') : "Player 3"}
                          </div>
                        </th>
                        
                        {showAverage && (
                          <th className="p-6 text-center text-emerald-400 italic border-l border-white/5 w-[12%]">
                            Ref ({averageType === 'tier' ? 'Tier' : 'Lg'})
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="text-sm font-bold uppercase">
                      {[
                        { label: 'OVR', key: 'ovr' },
                        { label: 'Games Played', key: 'gp' },
                        { label: 'SBV', key: 'sbv' },
                        { label: 'Goals PG (GPG)', key: 'gpg' },
                        { label: 'Assists PG (APG)', key: 'apg' },
                        { label: 'Saves PG (SvPG)', key: 'svpg' },
                        { label: 'Shots PG (ShPG)', key: 'shpg' },
                        { label: 'Shooting %', key: 'shPct', isPct: true },
                        { label: 'Win Rate', key: 'winPct', isPct: true }
                      ].map((metric, i) => {
                        const p1Row = p1TargetSeason === 'Career' ? playerHistory[0] : playerHistory.find(s => s.seasonLabel === p1TargetSeason);
                        const p2Row = p2TargetSeason === 'Career' ? player2History[0] : player2History.find(s => s.seasonLabel === p2TargetSeason);
                        const p3Row = p3TargetSeason === 'Career' ? player3History[0] : player3History.find(s => s.seasonLabel === p3TargetSeason);
                        
                        const p1Tier = p1Row ? getStat(p1Row, 'tier') : "Premier";
                        const avgStats = showAverage ? getAverageStatline(p1TargetSeason, p1Tier, averageType) : null;
                        const refVal = metric.key === 'ovr' ? 75 : (avgStats?.[metric.key] || 0);

                        const getVal = (hist, target) => {
                          if (!hist || hist.length === 0) return 0;
                          const validData = hist.filter(s => (parseInt(getStat(s, 'gp')) || 0) > 0);
                          const data = target === 'Career' ? validData : validData.filter(s => s.seasonLabel === target);
                          if (data.length === 0) return 0;

                          if (metric.key === 'ovr') {
                            return calculateOVR(data);
                          }

                          const totalGames = data.reduce((acc, s) => acc + (parseInt(getStat(s, 'gp')) || 0), 0);
                          const weightedSum = data.reduce((acc, s) => {
                            const stat = parseFloat(getStat(s, metric.key)) || 0;
                            const games = parseInt(getStat(s, 'gp')) || 0;
                            return acc + (stat * games);
                          }, 0);

                          return totalGames > 0 ? weightedSum / totalGames : 0;
                        };

                        const v1 = getVal(playerHistory, p1TargetSeason);
                        const v2 = getVal(player2History, p2TargetSeason);
                        const v3 = getVal(player3History, p3TargetSeason);

                        const renderCell = (val, colorClass, currentHistory, currentTarget, contextRow) => {
                          if (!currentHistory || currentHistory.length === 0) {
                            return <td className="p-6 text-center text-slate-700 font-mono text-base">-</td>;
                          }
                          
                          const roundedVal = metric.key === 'ovr' || metric.key === 'gp' ? Math.round(val) : val;
                          const roundedRef = metric.key === 'ovr' || metric.key === 'gp' ? Math.round(refVal) : refVal;
                          const diff = roundedVal - roundedRef;
                          const percentDiff = refVal > 0 ? (diff / refVal) : 0;

                          let finalColor = 'text-slate-500';
                          
                          if (showAverage) {
                            if (percentDiff > 0.40) {
                              finalColor = 'text-cyan-400 animate-pulse font-black';
                            } else if (val >= refVal) {
                              finalColor = colorClass;
                            } else if (percentDiff < -0.40) {
                              finalColor = 'text-red-500 opacity-40';
                            }
                          } else {
                            const maxVal = Math.max(v1, v2, v3);
                            if (val === maxVal && val > 0) finalColor = `${colorClass} font-black drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]`;
                          }

                          const indicator = diff > 0.01 ? <span className="text-emerald-500 ml-1 text-xs">▲</span> : 
                                            diff < -0.01 ? <span className="text-red-500 ml-1 text-xs">▼</span> : 
                                            <span className="text-slate-600 ml-1 font-extrabold">~</span>;

                          let display;
                          if (metric.key === 'ovr' || metric.key === 'gp') {
                            display = Math.round(val);
                          } else if (compMode === 'percentile') {
                            const pData = contextRow ? getPercentileData(contextRow, metric.key) : null;
                            let rawVal = metric.key === 'shPct' ? formatShPct(val) : metric.isPct ? formatWinPct(val) : val.toFixed(2);

                            display = pData ? (
                              <div className="flex flex-col items-center">
                                <span className="text-[10px] opacity-40 font-black mb-0.5">{rawVal}</span>
                                <span className="text-xs">{pData.label} {pData.value}%</span>
                              </div>
                            ) : rawVal;
                          } else {
                            display = metric.key === 'shPct' ? formatShPct(val) : metric.isPct ? formatWinPct(val) : val.toFixed(2);
                          }

                          return (
                            <td className={`p-6 text-center font-mono text-base transition-colors duration-300 ${finalColor}`}>
                              <div className="flex items-center justify-center gap-0.5">
                                {display}
                                {showAverage && indicator}
                              </div>
                            </td>
                          );
                        };

                        return (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="p-6 text-[10px] text-slate-500 font-black tracking-widest">{metric.label}</td>
                            {renderCell(v1, 'text-blue-400', playerHistory, p1TargetSeason, p1Row)}
                            {renderCell(v2, 'text-red-400', player2History, p2TargetSeason, p2Row)}
                            {renderCell(v3, 'text-amber-400', player3History, p3TargetSeason, p3Row)}
                            {showAverage && (
                              <td className="p-6 text-center font-mono opacity-30 border-l border-white/5 text-slate-400 text-sm">
                                {metric.key === 'shPct' ? formatShPct(refVal) : 
                                 metric.isPct ? formatWinPct(refVal) : 
                                 (metric.key === 'ovr' || metric.key === 'gp' ? Math.round(refVal) : refVal.toFixed(2))}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

        {activeTab === 'about' && (
          <div className="w-full col-span-4 max-w-4xl mx-auto space-y-8 md:space-y-12 py-6 md:py-10 px-2 sm:px-4 md:px-0 animate-in fade-in duration-700 box-border overflow-x-hidden">
            
            {/* --- CREDITS SECTION --- */}
            <section className="text-center bg-blue-500/5 border border-blue-500/20 p-6 md:p-10 rounded-2xl md:rounded-[3rem] shadow-2xl relative overflow-hidden overflow-x-auto ghost-scroll">
              <div className="min-w-[400px] md:min-w-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
                <h2 className="text-[12px] font-black uppercase text-blue-500 mb-4 tracking-[0.5em]">Portal Credits</h2>
                <div className="space-y-2">
                  <p className="text-2xl font-black italic uppercase text-white tracking-tighter">Developed by iSilently</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">In Dedication to the Rocket Soccar Confederation Community</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 no-print px-4">
                  <a href="https://www.rocketsoccarconfederation.com/" target="_blank" className="text-yellow-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-1">Website</a>
                  <a href="https://discord.gg/rsc" target="_blank" className="text-yellow-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-1">Discord</a>
                  <a href="https://x.com/rsconfederation" target="_blank" className="text-yellow-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-1">X / Twitter</a>
                  <a href="https://www.twitch.tv/rsc_na" target="_blank" className="text-yellow-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-1">Twitch</a>
                </div>
              </div>
            </section>

            {/* --- THE OVR ENGINE --- */}
            <section className="w-full overflow-x-auto ghost-scroll">
                <h2 className="text-3xl font-black italic uppercase text-blue-500 mb-6">The OVR Engine</h2>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  The Career OVR is a weighted measurement of a player's performance across their <span className="font-bold">top 3 qualified seasons</span>. 
                  A baseline of <span className="text-white font-bold">75 OVR</span> represents a standard rostered player (50 SBV). 
                  To reach the elusive <span className="text-white font-black italic [text-shadow:_0_0_20px_#fbbf24,_0_0_40px_#f59e0b] inline-block">99 OVR</span>, a player must maintain statistical 
                  dominance in elite tiers over a sustained period.
                </p>
            </section>

            {/* --- SEASON QUALIFICATION LOGIC --- */}
            <section className="bg-slate-900/50 border border-cyan-500/10 p-8 rounded-[3rem]">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-black uppercase italic text-cyan-400 mb-4">Season Qualification</h3>
                  <div className="space-y-4 text-[13px] text-slate-400 leading-relaxed">
                    <p>
                      A <span className="text-white font-bold">Qualified Season</span> is strictly defined as any season where a player 
                      completes <span className="text-cyan-400 font-black">20 or more games</span>. 
                    </p>
                    <p className="bg-black/30 p-4 rounded-2xl border-l-4 border-cyan-500 italic">
                      "This threshold accounts for 5 full match days, or roughly one-third of a standard RSC season. 
                      This ensures that our Tier Averages and Career OVRs recognize core roster consistency rather 
                      than provisional substitutions".
                    </p>
                    <p className="text-[12px] text-slate-500 mt-4 italic">
                      Note: The <span className="text-white">Season Progress</span> meter calculates your activity 
                      based on an average 60-game RSC season. While tiers can range from 56 to 64 games, any season with 20+ games (~33%) is considered 
                      "Qualified", the percentage shown represents your total participation for the current latest season period selected.
                    </p>
                  </div>
                </div>
                
                {/* Visual Representation of the 1/3 Season Rule */}
                <div className="w-full md:w-64 bg-black/40 p-6 rounded-3xl border border-white/5 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      {/* Background Circle */}
                      <path className="text-slate-800" strokeDasharray="100, 100" strokeWidth="3" fill="none" stroke="currentColor" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      
                      {/* Dynamic Foreground Circle */}
                      <path 
                        className="text-cyan-500 transition-all duration-1000 ease-out" 
                        // Logic: (Current GP / Total Season GP) * 100
                        strokeDasharray={`${Math.min(100, ((latest?.GP || 0) / 60) * 100)}, 100`} 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        fill="none" 
                        stroke="currentColor" 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center font-black text-white">
                      <span className="text-xs">{Math.min(100, Math.round(((latest?.GP || 0) / 60) * 100))}%</span>
                    </div>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white">
                    Season Progress
                  </p>
                </div>
              </div>
            </section>

            {/* --- METRIC DEFINITIONS --- */}
            <div className="w-full overflow-x-auto ghost-scroll pb-4">
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
                <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                  <h3 className="text-cyan-400 font-black uppercase text-xs mb-3 tracking-widest">SBV (Skill-Based Value)</h3>
                  <p className="text-[12px] text-slate-500 leading-relaxed italic">
                    The primary workload metric. It combines total score, efficiency, and impact. A higher SBV indicates a player who 
                    consistently drives their team's performance.
                  </p>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                  <h3 className="text-blue-500 font-black uppercase text-xs mb-3 tracking-widest">OFF (Offense)</h3>
                  <p className="text-[12px] text-slate-500 leading-relaxed italic">
                    Based on Goals Per Game (GPG). Measures raw finishing ability and scoring consistency. High OFF ratings identify 
                    the most clinical strikers in the league.
                  </p>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                  <h3 className="text-rose-400 font-black uppercase text-xs mb-3 tracking-widest">PRS (Pressure)</h3>
                  <p className="text-[12px] text-slate-500 leading-relaxed italic">
                    Derived from Shots Per Game (ShPG). Measures how often a player forces the opposing defense to react. 
                    High PRS players are often the primary aggressors in the offensive zone.
                  </p>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                  <h3 className="text-emerald-400 font-black uppercase text-xs mb-3 tracking-widest">SUP (Support)</h3>
                  <p className="text-[12px] text-slate-500 leading-relaxed italic">
                    Focuses on Assists Per Game (APG). High SUP values indicate a playmaker who facilitates 
                    scoring opportunities for their teammates through efficient passing.
                  </p>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                  <h3 className="text-purple-400 font-black uppercase text-xs mb-3 tracking-widest">DEF (Defense)</h3>
                  <p className="text-[12px] text-slate-500 leading-relaxed italic">
                    Calculated via Saves Per Game (SvPG). Represents a player's reliability as the last line of defense 
                    and their ability to nullify opposing scoring threats.
                  </p>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 border-emerald-500/10">
                  <h3 className="text-orange-500 font-black uppercase text-xs mb-3 tracking-widest">WIN (Win Impact)</h3>
                  <p className="text-[12px] text-slate-500 leading-relaxed italic">
                    Measures a player's Win Rate (Win%) relative to their tier. It identifies "Winners" whose statistical 
                    contributions translate directly into league standings and points.
                  </p>
                </div>
              </section>
            </div>

            {/* --- STATISTICAL LITERACY --- */}
            <section className="bg-slate-900/50 p-8 rounded-[3rem] border border-white/5">
              <h3 className="text-xl font-black uppercase italic text-white mb-6 text-center">Understanding Comparison Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full overflow-hidden">
                <div className="space-y-4">
                  <h4 className="text-yellow-300 font-black uppercase text-[14px] tracking-widest">Mean vs. Percentile</h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    <strong className="text-slate-300">AVERAGE:</strong> The mathematical sum of all players divided by count. 
                    Can be skewed by extreme outliers. <br/><br/>
                    <strong className="text-slate-300">PERCENTILE:</strong> Your rank. <span className="text-white">TOP 5% </span> 
                    means you are performing better than 95% of active players with 10+ games (minimalizes outliers).
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-blue-400 font-black uppercase text-[14px] tracking-widest">Workload Integrity</h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    <strong className="text-slate-300">Games Played (GP):</strong> In the Versus tool, GP is measured against the 
                    entire roster (1+ GP) to show true participation. <br/><br/>
                    <strong className="text-slate-300">Skill Stats:</strong> Metrics like SBV and GPG are measured against only 
                    active players (10+ GP) to ensure competitive accuracy.
                  </p>
                </div>
              </div>
            </section>

            {/* --- DEVELOPER SPOTLIGHT: iSilently --- */}
            <section className="relative mt-20 no-print">
              {/* The "Cold Energy" Glow Effect */}
              <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full scale-75 animate-pulse pointer-events-none" />
              
              <div className="relative z-10 bg-gradient-to-br from-[#050b14] to-[#020408] border border-sky-500/20 rounded-[3rem] p-6 md:p-12 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                <div className="flex flex-col md:flex-row items-center gap-10">
                  
                  {/* Profile Picture with Icy Ring */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                      <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-cyan-500 via-blue-500 to-transparent relative z-10 shadow-2xl overflow-hidden">
                        <img 
                          src="/assets/dev-pfp.png" 
                          alt="iSilently" 
                          alt="Silent" 
                          className="w-full h-full object-cover rounded-full relative z-10"
                          onError={(e) => e.target.src = '/assets/rsc-shield.png'} 
                        />
                      </div>
                    <div 
                      className="absolute inset-0 rounded-full pointer-events-none opacity-60 mix-blend-screen z-20"
                      style={{ 
                        backgroundImage: 'url("/assets/snowflakes.gif")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />

                    {/* Floating Winter Decoration */}
                    <div className="absolute -top-2 -right-2 text-2xl animate-bounce">❄️</div>
                  </div>

                  {/* Bio and Socials */}
                  <div className="flex-1 text-center md:text-left space-y-4">
                    <div>
                      <h2 className="text-4xl font-black italic uppercase text-blue-600 tracking-tighter leading-none mb-2">
                        Silent
                      </h2>
                      <p className="text-[12px] font-black uppercase text-sky-400 tracking-[0.4em]">
                        Developer & Digital Creator
                      </p>
                    </div>

                    <p className="text-[13px] italic text-slate-400 leading-relaxed font-medium max-w-xl">
                      Nothing lasts on this dirt. The seasons always change.❄️💙
                    </p>
                    <p className="text-[13px] text-slate-400 leading-relaxed font-medium max-w-xl">
                      Competitive Rocket League player and tech enthusiast. I built the RSC MyCareer 
                      portal as a resource for all RSC players to utilize and connect with. I love the color blue, 
                      cold aesthetics, art, strategic gameplay, and pushing the limits of my potential.
                    </p>

                    {/* Ebig Icy Social Links ;p */}
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center md:justify-start gap-3 pt-4">
                      {[
                        { label: 'My Page', url: 'https://guns.lol/i.silent' },
                        { label: 'Instagram', url: 'https://www.instagram.com/i.silently' },
                        { label: 'GitHub', url: 'https://github.com/Silent-Alchemist' },
                        { label: 'Discord', url: 'https://discord.gg/nCZrjm2Zw5' }
                      ].map((social) => (
                        <a 
                          key={social.label}
                          href={social.url} 
                          target="_blank"
                          className="bg-cyan-500/5 hover:bg-blue-500/20 border border-sky-500/20 px-2 py-3 rounded-xl text-[9px] md:text-[10px] font-black uppercase text-sky-400 transition-all hover:-translate-y-1 shadow-[0_4px_12px_rgba(6,182,212,0.1)] text-center break-all flex items-center justify-center min-h-[44px]"
                        >
                          {social.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- LATEST UPDATE LOG: v.2026.5.14 --- */}
            <section className="mt-12 mb-20 animate-in slide-in-from-bottom-8 duration-1000">
              <div className={`p-6 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden ${theme === 'royal' ? 'bg-black/40' : 'bg-slate-900/50'}`}>
                
                {/* Header with Version Badge */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-[11px] font-black uppercase text-yellow-500 mb-2 tracking-[0.3em]">System Intelligence Update</h3>
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full text-[10px] font-black text-blue-400">
                        v.2026.5.14
                      </div>
                      <span className="text-white font-black italic uppercase tracking-tighter text-xl">S26 Deadeye Overhaul</span>
                    </div>
                    <p className="text-[12px] text-sky-300 mt-2 italic max-w-md">
                      Welcoming the Next Generation of RSC! A massive system overhaul designed for the veterans of the past and the rookies of Season 26.
                    </p>
                  </div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest md:text-right">
                    Released: May 14, 2026 <br className="hidden md:block" /> Status: Stable Deployment
                  </div>
                </div>

                {/* The Changelog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-cyan-400 uppercase tracking-widest border-b border-white/5 pb-2">Analytical Upgrades</h4>
                    <ul className="space-y-3 text-[12px] text-slate-400 font-medium leading-relaxed italic">
                      <li className="flex gap-3"><span className="text-blue-500">→</span> Integrated S26 Mid-Season Intelligence sheets.</li>
                      <li className="flex gap-3"><span className="text-blue-500">→</span> New Shooting % (Sh%) tracking on all Player Cards.</li>
                      <li className="flex gap-3"><span className="text-blue-500">→</span> Implemented Weighted Career Average math for profile integrity.</li>
                      <li className="flex gap-3"><span className="text-blue-500">→</span> Added Tier/League Average dynamic benchmarking in Versus mode.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-widest border-b border-white/5 pb-2">Interface & Logic</h4>
                    <ul className="space-y-3 text-[12px] text-slate-400 font-medium leading-relaxed italic">
                      <li className="flex gap-3"><span className="text-blue-500">→</span> Deploying Cyberspace Network background with terminal flicker.</li>
                      <li className="flex gap-3"><span className="text-blue-500">→</span> New Identity Verification symbols (⊕) for name-change tracking.</li>
                      <li className="flex gap-3"><span className="text-blue-500">→</span> Optimized Mobile UX: Auto-stacking cards & fixed cutoffs.</li>
                      <li className="flex gap-3"><span className="text-blue-500">→</span> Resolved ID mismatch bugs in Legacy Season 09/10 data.</li>
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA for full technical log */}
                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest italic">
                    * Career OVR recalibrated for current tier standards.
                  </p>
                  <a 
                    href="https://github.com/Silent-Alchemist/rsc-career-portal/releases/tag/v2026.5.14" 
                    target="_blank" 
                    className="text-[10px] font-black text-slate-400 hover:text-white transition-all uppercase tracking-[0.3em] flex items-center gap-2 group"
                  >
                    View Full Technical Log 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}
        
      </main>

      {/* --- INSERT VERSION STAPLE HERE --- */}
      {/* --- v.YYYY.MM.D --- */}
      <div className="fixed bottom-4 right-6 no-print pointer-events-none z-[100]">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 opacity-30">
          v.2026.5.19
        </p>
      </div>

      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
