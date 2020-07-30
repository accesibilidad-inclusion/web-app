class Task {

    constructor() {
        this.id = null
        this.title = ''
        this.steps = []
    }

    set(task) {
        this.id = task.id
        this.title = task.title
        this.steps = task.the_steps
    }

}

export default Task
