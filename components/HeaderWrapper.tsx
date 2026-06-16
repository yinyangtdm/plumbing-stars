import { getCurrentCity } from '@/lib/city'
import Header from './Header'

export default async function HeaderWrapper() {
  const city = await getCurrentCity()
  return <Header city={city.name} />
}
