class Venue {
  constructor(venue = {}) {
    this.id = Number.isInteger(venue.id) ? venue.id : null;
    this.name = typeof venue.name === 'string' ? venue.name : '';
    this.position = typeof venue.position === 'object' && venue.position !== null
      ? {
        lat: parseFloat(venue.position.lat),
        lng: parseFloat(venue.position.lng),
      }
      : {};
    this.evaluation = typeof venue.evaluation === 'object' && venue.evaluation !== null ? venue.evaluation : null;
    this.tasks = Array.isArray(venue.the_tasks) ? venue.the_tasks : [];
    this.evaluations = venue.evaluations;
    this.url = typeof venue.url === 'string' ? venue.url : '';
  }

  get mapLink() {
    return typeof this.position === 'object' && this.position !== null
      ? `https://www.google.com/maps/search/?api=1&query=${this.position.lat},${this.position.lng}`
      : '';
  }
}

export default Venue;
