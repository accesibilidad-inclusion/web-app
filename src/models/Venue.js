class Venue {

    constructor() {
        this.id = null
        this.name = ''
        this.position = null
        this.evaluation = null
        this.tasks = []
        this.evaluations = []
    }

    set(venue) {
        this.id = venue.id
        this.name = venue.name
        this.url = venue.ur
        this.position = {
            lat: parseFloat(venue.position.lat),
            lng: parseFloat(venue.position.lng)
        }
        this.evaluation = venue.evaluation
        this.tasks = venue.tasks
        this.evaluations = venue.evaluations
    }

}

export default Venue
