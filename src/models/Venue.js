class Venue {
  constructor(venue = {}) {
    this.id = Number.isInteger(venue.id) ? venue.id : null;
    this.name = typeof venue.name === 'string' ? venue.name : '';
    this.url = typeof venue.url === 'string' ? venue.url : '';
    this.position = Array.isArray(venue.position) ? venue.position : [];
    this.evaluation = typeof venue.evaluation === 'object' && venue.evaluation !== null ? venue.evaluation : null;
    this.tasks = Array.isArray(venue.tasks) ? venue.tasks : [];
    this.evaluations = venue.evaluations;
  }

  set(venue) {
    this.id = venue.id;
    this.name = venue.name;
    this.url = venue.ur;
    this.position = {
      lat: parseFloat(venue.position.lat),
      lng: parseFloat(venue.position.lng),
    };
    this.evaluation = venue.evaluation;
    this.tasks = venue.the_tasks;
    this.evaluations = venue.evaluations;
  }
}

export default Venue;
