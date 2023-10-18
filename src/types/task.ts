import type { Category } from "./category";
import type { Step } from "./step";

export interface Task {
    id: number;
    title: string;
    slug: string;
    steps: Array<Step>;
    category: Category;
    service: Category;
    venue: Category;
}