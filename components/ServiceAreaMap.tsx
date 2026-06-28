'use client'
import { useEffect, useRef } from 'react'
import { SERVICE_AREA_GEO } from '@/lib/serviceArea'
import { VENTURA_COUNTY_GEO } from '@/lib/countyBorders'

// Ventura's own coverage shape (mirrors the Ventura site): the whole county
// clipped to a horizontal cut just above Moorpark so it reads as a service
// area, not the full administrative county.
const VENTURA_CLIP_LAT = 34.34

function clipRing(ring: number[][], maxLat: number): number[][] {
  const out: number[][] = []
  const n = ring.length - 1 // GeoJSON rings repeat first point at end
  for (let i = 0; i < n; i++) {
    const cur = ring[i]
    const nxt = ring[(i + 1) % n]
    const curIn = cur[1] <= maxLat
    const nxtIn = nxt[1] <= maxLat
    if (curIn) out.push(cur)
    if (curIn !== nxtIn) {
      const t = (maxLat - cur[1]) / (nxt[1] - cur[1])
      out.push([cur[0] + t * (nxt[0] - cur[0]), maxLat])
    }
  }
  if (out.length >= 3) out.push(out[0])
  return out
}

function clipToMaxLat(geo: unknown, maxLat: number): unknown {
  const obj = geo as { type: string; coordinates?: unknown; geometry?: unknown; features?: unknown[] }
  if (obj.type === 'Polygon') {
    return {
      ...obj,
      coordinates: (obj.coordinates as number[][][])
        .map(r => clipRing(r, maxLat))
        .filter(r => r.length >= 4),
    }
  }
  if (obj.type === 'MultiPolygon') {
    return {
      ...obj,
      coordinates: (obj.coordinates as number[][][][])
        .map(poly => poly.map(r => clipRing(r, maxLat)).filter(r => r.length >= 4))
        .filter(poly => poly.length > 0),
    }
  }
  if (obj.type === 'Feature') {
    return { ...obj, geometry: clipToMaxLat(obj.geometry, maxLat) }
  }
  if (obj.type === 'FeatureCollection') {
    return { ...obj, features: (obj.features ?? []).map(f => clipToMaxLat(f, maxLat)) }
  }
  return geo
}

export default function ServiceAreaMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<ReturnType<typeof import('leaflet')['map']> | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import('leaflet').then((L) => {
      // @ts-expect-error leaflet internals
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({ iconRetinaUrl: '', iconUrl: '', shadowUrl: '' })

      // Clear stale Leaflet state left by React StrictMode's double-mount
      const container = containerRef.current! as HTMLElement & { _leaflet_id?: number }
      if (container._leaflet_id) delete container._leaflet_id

      const map = L.map(containerRef.current!, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 14,
      }).addTo(map)

      // Ventura sister-company coverage — lighter red, drawn first so the LA
      // navy area sits on top where they meet at the county line.
      const venturaClipped = clipToMaxLat(VENTURA_COUNTY_GEO, VENTURA_CLIP_LAT)
      const ventura = L.geoJSON(venturaClipped as GeoJSON.GeoJsonObject, {
        style: { color: '#e0656f', fillColor: '#e0656f', fillOpacity: 0.22, weight: 2 },
      }).addTo(map).bindTooltip('The Plumbing Stars — Ventura', { sticky: true, className: 'map-tooltip' })

      // Los Angeles service area — navy shape
      const area = L.geoJSON(SERVICE_AREA_GEO as GeoJSON.GeoJsonObject, {
        style: { color: '#1D4B91', fillColor: '#1D4B91', fillOpacity: 0.22, weight: 2 },
      }).addTo(map).bindTooltip('The Plumbing Stars — Los Angeles', { sticky: true, className: 'map-tooltip' })

      mapRef.current = map

      // Leaflet paints blank if it measures the container before the (async)
      // CSS + layout settle. Recalc size, then frame both areas — on ready and
      // again after a tick so tiles render reliably.
      const bounds = L.featureGroup([area, ventura]).getBounds()
      const fit = () => {
        map.invalidateSize(false)
        map.fitBounds(bounds, { padding: [24, 24] })
      }
      map.whenReady(fit)
      setTimeout(fit, 250)
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div className="service-map-wrap">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div ref={containerRef} className="service-map" />
      <div className="map-legend">
        <span className="legend-item"><span className="legend-dot legend-dot--la" /> The Plumbing Stars Los Angeles</span>
        <span className="legend-item"><span className="legend-dot legend-dot--ventura" /> The Plumbing Stars Ventura</span>
      </div>
    </div>
  )
}
