const mapping: Record<string, string> = {
  'energy-solutions': 'energy_solution',
  'energy-usages': 'energy_usage',
  forums: 'forum',
  'posh-smart-homes': 'posh_smart_home',
  projects: 'project',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
