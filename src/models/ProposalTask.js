class ProposalTask {
  constructor() {
    this.id = null;
    this.service = null;
    this.venue = null;
    this.task = null;
    this.pictograms = null;
    this.created_at = null;
  }

  set(proposalTask) {
    this.id = proposalTask.id;
    this.service = proposalTask.service;
    this.venue = proposalTask.venue;
    this.task = proposalTask.task;
    this.pictograms = proposalTask.pictograms;
    this.created_at = proposalTask.created_at;
  }

  // eslint-disable-next-line class-methods-use-this
  form() {
    return {
      title: 'Apoyos visuales propuesto por usuarios',
      fields: [
        {
          id: 'venue',
          value: 'name',
          label: 'Nombre del lugar',
          type: 'read',
        },
        {
          id: 'service',
          value: 'name',
          label: 'Servicio al que pertenece',
          type: 'read',
        },
        {
          id: 'task',
          value: 'title',
          label: 'Titulo de la tarea',
          type: 'read',
        },
        {
          id: 'pictograms',
          type: 'pictograms',
        },
      ],
      actions: [
        {
          label: 'Eliminar',
          color: 'error',
          callback: 'request',
          url: 'api/proposal_tasks/delete',
          method: 'post',
          confirm: '¿Esta seguro de eliminar esta propuesta?',
          emit: 'updated',
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
          emit: 'updated',
        },
      ],
    };
  }
}

export default ProposalTask;
