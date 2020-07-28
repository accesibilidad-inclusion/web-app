class Task {

    constructor() {
        this.id = null
        this.title = ''
        this.venue = null
        this.service = null
        this.url = ''
        this.tags_text = ''
        this.tags = []
        this.steps = []
        this.visible = 0
        this.status = ''
    }

    set(task) {
        this.id = task.id
        this.title = task.title
        this.service = {
            'id': task.service.id,
            'name': task.service.name
        }
        this.venue = {
            'id': task.venue.id,
            'name': task.venue.name
        }
        this.url = task.url
        this.tags_text = task.tags.join(', ')
        this.tags = task.tags
        this.steps = task.steps
        this.visible = task.visible
        this.status = task.status
    }

    form() {
        let form = {
            title: this.status == "Enviado por usuario" ? 'Tarea propuesta por usuario' : 
            ( this.id ? 'Editar tarea' : 'Agregar nueva tarea' ),
            fields: this.status == "Enviado por usuario" ? [
                {
                    id: 'venue',
                    value: 'name',
                    label: 'Nombre del lugar',
                    type: 'read'
                },
                {
                    id: 'service',
                    value: 'name',
                    label: 'Servicio al que pertenece',
                    type: 'read'
                },
                {
                    id: 'title',
                    name: 'titulo',
                    label: 'Titulo de la tarea',
                    rules: 'required|max:500',
                    type: 'text'
                },
                {
                    id: 'steps',
                    label: 'Pasos de la tarea',
                    type: 'iteration',
                    value: 'label'
                }
            ] : [
                {
                    id: 'title',
                    name: 'titulo',
                    label: 'Titulo de la tarea',
                    rules: 'required|max:500',
                    type: 'text'
                },
                {
                    id: 'venue',
                    name: 'lugar',
                    label: 'Lugar al que pertenece',
                    rules: 'required',
                    type: 'select',
                    data: 'venues',
                    textOption: ['name']
                },
                {
                    id: 'tags_text',
                    name: 'sinonimos',
                    label: 'Sinónimos de búsqueda (Separados por coma)',
                    rules: '',
                    type: 'text'
                }
            ],
            actions: this.status == "Enviado por usuario" ? [
                {
                    label: 'Eliminar',
                    color: 'error',
                    callback: 'request',
                    url: 'api/tasks/delete',
                    method: 'post',
                    confirm: '¿Esta seguro de eliminar esta tarea?',
                    emit: 'updated'
                },
                {
                    label: 'Cancelar',
                    color: 'grey',
                    callback: 'cancel',
                },
                {
                    label: 'Agregar tarea',
                    color: 'primary',
                    callback: 'request',
                    url: 'api/tasks/accept_contribution',
                    method: 'put',
                    validate: true,
                    emit: 'updated'
                }
            ] : [
                {
                    label: 'Cancelar',
                    color: 'grey',
                    callback: 'cancel',
                },
                {
                    label: this.id ? 'Actualizar tarea' : 'Crear tarea',
                    color: 'primary',
                    callback: 'request',
                    url: this.id ? 'api/tasks/update' : 'api/tasks/store',
                    method: this.id ? 'put' : 'post',
                    validate: true,
                    emit: 'updated'
                }
            ]
        }

        return form
    }

}

export default Task
