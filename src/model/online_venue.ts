import { Venue } from "./venue";

export class OnlineVenue extends Venue {
    url: string = '';

    constructor(init?: Partial<OnlineVenue>) {
        super(init);
        Object.assign(this, init);
    }
}