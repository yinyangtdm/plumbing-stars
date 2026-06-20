/**
 * Service-area boundary for the map on /service-areas.
 *
 * The owner's rule of thumb: "north of the 10, west of the 110." The northern
 * edge is capped at the San Gabriel foothill line — La Crescenta, La Cañada
 * Flintridge, Altadena, Pasadena — and the polygon then sweeps west to cover
 * everything past that: the whole San Fernando Valley, south over the Santa
 * Monica Mountains to the Westside coast, and the Central-LA / NE-LA corridor.
 * The southern edge tracks the 10 freeway; the eastern edge tracks the 110.
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
      [-118.670, 34.270], // West Hills / Calabasas — NW Valley foothills
      [-118.600, 34.300], // Chatsworth / Porter Ranch — north Valley rim
      [-118.500, 34.310], // Granada Hills / Mission Hills — north Valley rim
      [-118.420, 34.310], // Sylmar / San Fernando — NE Valley rim
      [-118.350, 34.290], // Sunland-Tujunga — NE Valley foothills
      [-118.280, 34.255], // Shadow Hills / above La Crescenta
      [-118.230, 34.235], // La Crescenta / Montrose — foothill line
      [-118.190, 34.230], // La Cañada Flintridge — foothill line
      [-118.130, 34.215], // Altadena — foothill line
      [-118.085, 34.190], // Pasadena — NE corner (foothills, 210)
      [-118.095, 34.140], // Pasadena / South Pasadena — east edge near the 110
      [-118.150, 34.115], // South Pasadena
      [-118.195, 34.105], // Highland Park — along the 110
      [-118.225, 34.075], // Mount Washington — descending the 110
      [-118.255, 34.045], // Cypress Park — along the 110
      [-118.270, 34.035], // Downtown — the 10/110 interchange
      [-118.340, 34.030], // Arlington Heights — along the 10
      [-118.400, 34.025], // Mid-City — along the 10
      [-118.430, 34.020], // Culver City — along the 10
      [-118.490, 34.010], // Santa Monica — the 10 meets the coast
      [-118.520, 34.030], // Santa Monica — west edge at the coast
      [-118.555, 34.055], // Pacific Palisades — coast
      [-118.520, 34.095], // up over the Sepulveda Pass (405)
      [-118.500, 34.140], // Encino — back into the Valley
      [-118.560, 34.160], // Tarzana
      [-118.610, 34.165], // Woodland Hills
      [-118.660, 34.180], // Calabasas
      [-118.670, 34.230], // West Hills — west edge
      [-118.670, 34.270], // close ring
    ]],
  },
} as const

/**
 * The San Fernando Valley — the home-base sub-region, drawn in a distinct color
 * on top of the full service area. Northern/western edges share the coverage
 * boundary above; the southern edge tracks the Santa Monica Mountains / Hollywood
 * Hills ridge and the eastern edge runs along Burbank, where the Valley ends.
 */
export const VALLEY_AREA_GEO = {
  type: 'Feature',
  properties: { name: 'San Fernando Valley' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-118.670, 34.270], // West Hills — NW Valley
      [-118.600, 34.300], // Chatsworth / Porter Ranch — north rim
      [-118.500, 34.310], // Granada Hills / Mission Hills — north rim
      [-118.420, 34.310], // Sylmar / San Fernando — NE rim
      [-118.350, 34.290], // Sunland-Tujunga — NE foothills
      [-118.300, 34.250], // Shadow Hills — east Valley foothills
      [-118.285, 34.190], // Burbank — east Valley edge
      [-118.310, 34.150], // Burbank / Universal City — south rim (Hollywood Hills)
      [-118.370, 34.140], // Studio City — south rim
      [-118.430, 34.140], // Sherman Oaks — south rim
      [-118.490, 34.145], // Encino — south rim
      [-118.560, 34.160], // Tarzana
      [-118.610, 34.165], // Woodland Hills
      [-118.660, 34.180], // Calabasas
      [-118.670, 34.230], // West Hills — west edge
      [-118.670, 34.270], // close ring
    ]],
  },
} as const
