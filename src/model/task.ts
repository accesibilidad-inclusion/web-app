import { Category } from "./category";
import { Service } from "./service";

export class Task {
    id: number = 0;
    title: string = '';
    slug: string = '';
    prerequisites: string = '';
    count_steps: number = 0;
    steps: Array<any> = [];
    category: Category = new Category();
    service: Service = new Service();

    constructor(init?: Partial<Task>) {
        Object.assign(this, init);
    }
}