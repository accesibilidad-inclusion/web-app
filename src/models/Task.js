class Task {
  constructor(task = {}) {
    this.id = Number.isInteger(task.id) ? task.id : null;
    this.title = typeof task.title === 'string' ? task.title : '';
    this.steps = Array.isArray(task.the_steps) ? task.the_steps : [];
    this.prerequisites = typeof task.prerequisites === 'string' ? task.prerequisites : '';
  }

  set(task) {
    this.id = task.id;
    this.title = task.title;
    this.steps = task.the_steps;
    this.prerequisites = task.prerequisites;
  }
}

export default Task;
