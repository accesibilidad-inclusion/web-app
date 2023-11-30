import type { Commune } from "./commune"

export class Location {
  gpsLat: string = ''
  gpsLng: string = ''
  commune: Commune|null = null 

  constructor(init?: Partial<Location>) {
    Object.assign(this, init)
  }

  isGpsActivated = () : boolean => {
    return this.gpsLat !== '' && this.gpsLng !== ''
  }
  
  isCommuneSelected = () : boolean => {
    return !!this.commune
  }

  getCoordinates = () : {lat: number, lng: number} => {
    return !this.isGpsActivated() && this.commune ? { lat: parseFloat(this.commune.lat), lng: parseFloat(this.commune.lng) } : { lat: parseFloat(this.gpsLat), lng: parseFloat(this.gpsLng) }
  }

  
}
