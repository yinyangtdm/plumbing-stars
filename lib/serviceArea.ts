/**
 * Service-area boundary for the map on /service-areas.
 *
 * The owner's rule of thumb: "north of the 10, west of the 110." The northern
 * edge is capped at the San Gabriel foothill line — La Crescenta, La Cañada
 * Flintridge, Altadena, Pasadena — and the polygon then sweeps west to cover
 * everything past that: the whole San Fernando Valley, the Santa Monica
 * Mountains, and the Central-LA / NE-LA corridor. The eastern edge tracks the
 * 110; the southern edge follows the coast from Santa Monica west through
 * Malibu to County Line Beach; the western edge then snaps to the real
 * LA/Ventura county line (the shared vertices from countyBorders.ts:
 * [-118.941, 34.0748] → [-118.6682, 34.1682] → [-118.6335, 34.2696]).
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
      [-118.6509, 34.3205], // LA/Ventura county line — top of the west edge (meets the north rim)
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
      [-118.270, 34.035], // Downtown — near the 10/110 interchange
      [-118.345, 34.028], // Arlington Heights — meet the existing line, then dip south
      [-118.380, 34.018], // Mid-City / West Adams
      [-118.395, 34.000], // Culver City — east edge
      [-118.405, 33.987], // Culver City — south edge
      [-118.445, 33.984], // Mar Vista / Marina del Rey edge
      [-118.470, 33.988], // Venice
      [-118.495, 34.010], // Santa Monica — Ocean Park
      [-118.525, 34.022], // Santa Monica — beachfront
      [-118.580, 34.038], // Pacific Palisades / Topanga — coast
      [-118.680, 34.033], // Malibu — Civic Center / pier
      [-118.800, 34.000], // Point Dume / Zuma — Malibu
      [-118.875, 34.028], // western Malibu — coast
      [-118.941, 34.0748], // County Line Beach — LA/Ventura county line (coast)
      [-118.7889, 34.1682], // county line through the Santa Monica Mountains
      [-118.6682, 34.1682], // county line — jog east
      [-118.6335, 34.2696], // county line — up past Calabasas / West Hills
      [-118.6509, 34.3205], // close ring at the top of the county line
    ]],
  },
} as const

/**
 * The San Fernando Valley — drawn in a distinct color as a sub-region
 * on top of the full service area. Northern/western edges share the coverage
 * boundary above — the northwest edge snaps to the LA/Ventura county line — the
 * southern edge tracks the Santa Monica Mountains / Hollywood Hills ridge, and
 * the eastern edge runs along Burbank, where the Valley ends.
 */
export const VALLEY_AREA_GEO = {
  type: 'Feature',
  properties: { name: 'San Fernando Valley' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-118.6335, 34.2696], // West Hills / Chatsworth — LA/Ventura county line (NW)
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
      [-118.660, 34.168], // Calabasas
      [-118.6682, 34.1682], // Calabasas west — LA/Ventura county line (SW)
      [-118.6335, 34.2696], // close ring along the county line
    ]],
  },
} as const
