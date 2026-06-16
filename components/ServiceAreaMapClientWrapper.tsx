import { getCurrentCity } from '@/lib/city'
import ServiceAreaMapClient from './ServiceAreaMapClient'

export default async function ServiceAreaMapClientWrapper() {
  const city = await getCurrentCity()
  return <ServiceAreaMapClient city={city.slug} />
}
