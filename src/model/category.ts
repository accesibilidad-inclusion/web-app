export class Category {

    id: number = 0;
    name: string = '';
    description: string = '';
    slug: string = '';

    constructor(init?: Partial<Category>) {
        Object.assign(this, init);
    }
}