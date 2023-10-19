import type { Evaluation } from "./evaluation";

export interface VenueOnline {
    id: number;
    name: string;
    slug: string;
    url: string;
    show_evaluation?: boolean;
    evaluation: Evaluation;
}