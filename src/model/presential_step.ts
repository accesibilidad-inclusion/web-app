import type { Pictogram } from "./pictogram";
import { Step } from "./step";

export class PresentialStep extends Step {
    pictogram: Pictogram|null = null;

    constructor(init: Partial<PresentialStep>) {
        super(init);
        Object.assign(this, init);
    }
}