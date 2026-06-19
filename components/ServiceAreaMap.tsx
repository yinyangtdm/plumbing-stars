'use client'
import { useEffect, useRef } from 'react'
import { LA_COUNTY_GEO, VENTURA_COUNTY_GEO } from '@/lib/countyBorders'

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

      const la = L.geoJSON(LA_COUNTY_GEO as GeoJSON.GeoJsonObject, {
        style: { color: '#1D4B91', fillColor: '#1D4B91', fillOpacity: 0.28, weight: 2 },
      }).addTo(map).bindTooltip('Los Angeles County', { sticky: true, className: 'map-tooltip' })

      const ventura = L.geoJSON(VENTURA_COUNTY_GEO as GeoJSON.GeoJsonObject, {
        style: { color: '#B81F2A', fillColor: '#B81F2A', fillOpacity: 0.12, weight: 1 },
      }).addTo(map).bindTooltip('Ventura County', { sticky: true, className: 'map-tooltip' })

      // Auto-frame both counties (data is mainland-only, so no offshore
      // islands drag the view out to sea).
      const bounds = la.getBounds().extend(ventura.getBounds())
      map.fitBounds(bounds, { padding: [20, 20] })

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
        <span className="legend-dot legend-dot--la" /> Los Angeles County
        <span className="legend-dot legend-dot--ventura" /> Ventura County
      </div>
    </div>
  )
}
