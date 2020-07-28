class Service {

    constructor() {
        this.id = null
        this.name = ''
        this.near_venues = null
    }

    set(service) {
        this.id = service.id
        this.name = service.name
        this.near_venues = service.near_venues
    }

}

export default Service
