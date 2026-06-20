'use client'
import { useEffect, useRef } from 'react'
import { SERVICE_AREA_GEO, VALLEY_AREA_GEO } from '@/lib/serviceArea'

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

      // Greater-LA coverage — navy base layer
      const area = L.geoJSON(SERVICE_AREA_GEO as GeoJSON.GeoJsonObject, {
        style: { color: '#1D4B91', fillColor: '#1D4B91', fillOpacity: 0.16, weight: 2 },
      }).addTo(map).bindTooltip('The Plumbing Stars — Service Area', { sticky: true, className: 'map-tooltip' })

      // San Fernando Valley — red home-base layer, drawn on top
      L.geoJSON(VALLEY_AREA_GEO as GeoJSON.GeoJsonObject, {
        style: { color: '#B81F2A', fillColor: '#B81F2A', fillOpacity: 0.30, weight: 2 },
      }).addTo(map).bindTooltip('San Fernando Valley — Our Home Base', { sticky: true, className: 'map-tooltip' })

      // Center on the full LA service area
      map.fitBounds(area.getBounds(), { padding: [24, 24] })

      mapRef.current = map
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
        <span className="legend-item"><span className="legend-dot legend-dot--valley" /> San Fernando Valley — home base</span>
        <span className="legend-item"><span className="legend-dot legend-dot--la" /> Greater LA — north of the 10, west of the 110, up to the Pasadena foothills</span>
      </div>
    </div>
  )
}
