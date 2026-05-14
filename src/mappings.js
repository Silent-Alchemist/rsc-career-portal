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
      return row[alias];
    }
  }
  return '0.00';
};