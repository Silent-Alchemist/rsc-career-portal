export const statMap = {
  name: ['Player Name', 'Name'],
  id: ['RSC ID', 'RSC Id'],
  tier: ['Tier'],
  franchise: ['Franchise(s)'],
  team: ['Team(s)'],
  gp: ['GP'],
  wins: ['W'],
  losses: ['L'],
  winPct: ['W%', 'WP', 'W %', 'Win %'],
  sbv: ['SBV'],
  ppg: ['PPG', 'P/G', 'P/A'],
  gpg: ['GPG', 'G/G', 'G/A', 'Goals Per Game'],
  apg: ['APG', 'A/G', 'A/A', 'Assists Per Game'],
  svpg: ['SvPG', 'Sv/G', 'Sv/A', 'Saves Per Game'],
  shpg: ['ShPG', 'S/G', 'S/A', 'Shots Per Game'],
  shPct: ['Sh%', 'S%'],
};

export const getStat = (row, statKey) => {
  const aliases = statMap[statKey];
  if (!aliases) return '0.00';
  
  for (let alias of aliases) {
    if (row[alias] !== undefined && row[alias] !== null && row[alias] !== "") {
      // Clean up legacy fallback values inside the raw data sheets
      if (row[alias] === '---' || row[alias] === 'N/A') break;

      if (statKey === 'gp') {
        // GP Whole numbers Parse float
        return Math.floor(parseFloat(row[alias])) || 0;
      }

      return row[alias];
    }
  }
  
  // --- DEFAULT FALLBACK ---
  
  // 1. Textual Identifiers / Identity Metrics
  if (['id', 'name', 'franchise', 'team', 'tier'].includes(statKey)) {
    return 'N/A';
  }
  
  // 2. Raw Counting Metrics (Integer types)
  if (['gp', 'wins', 'losses'].includes(statKey)) {
    return 0; // Return a literal number 0 for cleaner UI/math execution
  }
  
  // 3. Performance / Averaged Skill Stats (Fallback to standard trailing decimals)
  return '0.00';
};