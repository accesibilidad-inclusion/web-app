class Category {

    constructor() {
        this.id = null
        this.name = ''
        this.near_services = null
        this.slug = ''
    }

    set(category) {
        this.id = category.id
        this.name = category.name
        this.near_services = category.near_services
        this.slug = category.slug
    }

}

export default Category
