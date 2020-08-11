class Venue {
  constructor(venue) {
    this.id = venue.id;
    this.name = venue.name;
    this.url = venue.url;
    this.position = venue.position;
    this.evaluation = venue.evaluation;
    this.tasks = venue.tasks;
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
