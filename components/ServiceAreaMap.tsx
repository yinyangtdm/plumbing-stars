'use client'
import { useEffect, useRef } from 'react'
import type { City } from '@/lib/city'

// Simplified county boundary polygons [lat, lng]
const LA_COUNTY: [number, number][] = [
  [34.82, -118.95], [34.82, -118.20], [34.60, -117.65], [34.05, -117.65],
  [33.70, -117.90], [33.70, -118.15], [33.73, -118.50], [33.80, -118.82],
  [34.02, -118.95],
]

const VENTURA_COUNTY: [number, number][] = [
  [34.82, -119.72], [34.82, -118.95], [34.02, -118.95],
  [34.02, -119.12], [34.18, -119.48], [34.42, -119.72], [34.65, -120.00],
]

interface ServiceAreaMapProps {
  city?: City
}

export default function ServiceAreaMap({ city = 'los-angeles' }: ServiceAreaMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<ReturnType<typeof import('leaflet')['map']> | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import('leaflet').then((L) => {
      // Fix default marker icon path issue in webpack
      // @ts-expect-error leaflet internals
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({ iconRetinaUrl: '', iconUrl: '', shadowUrl: '' })

      const map = L.map(containerRef.current!, {
        center: [34.35, -119.05],
        zoom: 9,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: true,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 14,
      }).addTo(map)

      if (city === 'los-angeles' || city === 'ventura') {
        if (city === 'los-angeles') {
          L.polygon(LA_COUNTY, {
            color: '#083E85',
            fillColor: '#083E85',
            fillOpacity: 0.28,
            weight: 2,
          }).addTo(map).bindTooltip('Los Angeles County', { permanent: false, className: 'map-tooltip' })
        } else {
          L.polygon(VENTURA_COUNTY, {
            color: '#CB2431',
            fillColor: '#CB2431',
            fillOpacity: 0.22,
            weight: 2,
          }).addTo(map).bindTooltip('Ventura County', { permanent: false, className: 'map-tooltip' })
        }
      }

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
        {city === 'los-angeles' && (
          <>
            <span className="legend-dot legend-dot--la" /> Los Angeles County
          </>
        )}
        {city === 'ventura' && (
          <>
            <span className="legend-dot legend-dot--ventura" /> Ventura County
          </>
        )}
      </div>
    </div>
  )
}
