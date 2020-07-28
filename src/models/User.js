class User {

    constructor() {
        this.id = null
        this.name = ''
        this.url = ''
        this.category = {
            'id': null,
            'name': ''
        }
        this.venues = []
        this.tags_text = ''
        this.tags = []
        this.status = ''
    }

    set(user) {
        this.id = user.id
        this.name = user.name
        this.url = user.url
        this.category = {
            'id': user.category.id,
            'name': user.category.name
        }
        this.venues = user.venues
        this.tags_text = user.tags.join(', ')
        this.tags = user.tags
        this.status = user.status
    }

    form() {
        let form = {
            title: this.id ? 'Editar usuario' : 'Agregar nuevo usuario',
            fields: [
                {
                    id: 'name',
                    name: 'nombre',
                    label: 'Nombre del usuario',
                    rules: 'required|max:100',
                    type: 'text'
                },
                {
                    id: 'email',
                    name: 'correo electronico',
                    label: 'Correo electronico',
                    rules: 'required|email|unique_email',
                    type: 'text'
                }
            ],
            actions: [
                {
                    label: 'Cancelar',
                    color: 'grey',
                    callback: 'cancel',
                },
                {
                    label: this.id ? 'Actualizar usuario' : 'Crear usuario',
                    color: 'primary',
                    callback: 'request',
                    url: this.id ? 'api/users/update' : 'api/users/store',
                    method: this.id ? 'put' : 'post',
                    validate: true,
                    emit: 'updated'
                }
            ]
        }
        return form
    }

}

export default User
