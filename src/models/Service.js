class Service {
  constructor(service = {}) {
    this.id = Number.isInteger(service.id) ? service.id : null;
    this.name = typeof service.name === 'string' ? service.name : '';
    this.steps = Array.isArray(service.steps) ? service.steps : [];
  }

  set(service) {
    this.id = service.id;
    this.name = service.name;
    this.near_venues = service.near_venues;
  }
}

export default Service;
