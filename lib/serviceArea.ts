/**
 * Service-area boundary for the map on /service-areas.
 *
 * Approximate polygon of the real coverage: the whole San Fernando Valley,
 * south over the hills to the Westside (Santa Monica → Culver City), and east
 * along the foothills to Pasadena. The southern edge tracks the 10 freeway and
 * the eastern edge tracks the 110 — the owner's own rule of thumb:
 * "anything north of the 10 and west of the 110."
 *
 * Coordinates are [lng, lat] (GeoJSON order) and are intentionally approximate —
 * this is a marketing coverage illustration, not a survey boundary.
 */
export const SERVICE_AREA_GEO = {
  type: 'Feature',
  properties: { name: 'The Plumbing Stars Service Area' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-118.670, 34.280], // West Hills / Calabasas — NW foothills
      [-118.580, 34.310], // Chatsworth / Porter Ranch — north Valley rim
      [-118.470, 34.320], // Granada Hills — north Valley rim
      [-118.370, 34.280], // Sunland-Tujunga — NE Valley foothills
      [-118.280, 34.260], // above La Crescenta
      [-118.200, 34.240], // La Crescenta / La Cañada Flintridge
      [-118.120, 34.210], // Altadena
      [-118.100, 34.160], // Pasadena — east edge (near the 110 terminus)
      [-118.130, 34.120], // South Pasadena
      [-118.190, 34.110], // Highland Park — along the 110
      [-118.230, 34.070], // NE LA — descending the 110
      [-118.270, 34.035], // Downtown — the 10/110 interchange
      [-118.340, 34.030], // Arlington Heights — along the 10
      [-118.400, 34.025], // Mid-City — along the 10
      [-118.430, 34.020], // Culver City — along the 10
      [-118.490, 34.010], // Santa Monica — the 10 meets the coast
      [-118.510, 34.030], // Santa Monica / Brentwood — west edge
      [-118.500, 34.070], // over the Sepulveda Pass (405)
      [-118.490, 34.130], // Encino — back into the Valley
      [-118.550, 34.150], // Tarzana
      [-118.610, 34.160], // Woodland Hills
      [-118.660, 34.180], // Calabasas
      [-118.670, 34.230], // West Hills — west edge
      [-118.670, 34.280], // close ring
    ]],
  },
} as const
