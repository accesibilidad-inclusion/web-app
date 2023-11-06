import { PresentialVenue } from "./presential_venue";
import { Task } from "./task";

export class PresentialTask extends Task {
    venue: PresentialVenue = new PresentialVenue();
    preview: Array<any> = [];

    constructor(init: Partial<PresentialTask>) {
        super(init);
        Object.assign(this, init);
    }
}