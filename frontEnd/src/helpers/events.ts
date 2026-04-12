import {type Event, events} from "./data.ts";
import {addEvent, removeEvent} from "../utils/session.ts";

export type Category = "Academico" | "Cultural" | "Recreativo"
export type Modality = "Presencial" | "Virtual"

interface EventFilters {
    category: Category;
    modality: Modality;
    date: Date;
    title: string;
    organizer: string;
}


export function getEvents(filters?: EventFilters): Event[] {
    // TODO fetch from BE
    return events;
}


export function getEventsCreatedByMe(email: string): Event[] {
    const events: Event[] = getEvents();
    const me: Event[] = [];
    for (const event of events) {
        if (event.createdBy === email) {
            me.push(event);
        }
    }
    return me;
}

export function getEventsById(id: number[]): Event[] {
    const events: Event[] = getEvents();
    const me: Event[] = [];
    for (const num of id) {
        me.push(events[num - 1])
    }
    return me;
}

export function getEventsNotAccepted(): Event[] {
    const events: Event[] = getEvents();
    const me: Event[] = [];
    for (const event of events) {
        if (!event.accepted) {
            me.push(event);
        }
    }
    return me;
}

export function addParticipant(eventId: number, email: string): boolean {
    addEvent(eventId)
    // TODO llamar al BackEnd para agregar el usuario al evento
    return true
}

export function removeParticipant(eventId: number, email: string) {
    removeEvent(eventId)
    return true
}

export function filterEvents() {
}

export function createParticipant() {
    //TODO LLAMAR AL BACKEND LOS PARTICIPANTES INSCRITOS EN UN EVENTO

}