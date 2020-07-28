class ProposalTask {

    constructor() {
        this.id = null
        this.service = null
        this.venue = null
        this.task = null
        this.pictograms = null
        this.created_at = null
    }

    set(proposal_task) {
        this.id = proposal_task.id
        this.service = proposal_task.service
        this.venue = proposal_task.venue
        this.task = proposal_task.task
        this.pictograms = proposal_task.pictograms
        this.created_at = proposal_task.created_at
    }

    form() {
        let form = {
            title: 'Apoyos visuales propuesto por usuarios',
            fields:[
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
                    id: 'task',
                    value: 'title',
                    label: 'Titulo de la tarea',
                    type: 'read'
                },
                {
                    id: 'pictograms',
                    type: 'pictograms'
                }
            ],
            actions: [
                {
                    label: 'Eliminar',
                    color: 'error',
                    callback: 'request',
                    url: 'api/proposal_tasks/delete',
                    method: 'post',
                    confirm: '¿Esta seguro de eliminar esta propuesta?',
                    emit: 'updated'
                },
                {
                    label: 'Cancelar',
                    color: 'grey',
                    callback: 'cancel',
                },
                {
                    label: 'Agregar pictos',
                    color: 'primary',
                    callback: 'request',
                    url: 'api/proposal_tasks/accept_contribution',
                    method: 'put',
                    validate: true,
                    emit: 'updated'
                }
            ] 
        }

        return form
    }

}

export default ProposalTask
