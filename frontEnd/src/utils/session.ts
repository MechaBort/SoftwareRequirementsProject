export type UserRole = "admin" | "organizador" | "estudiante";

export interface SessionUser {
    email: string;
    role: UserRole;
    eventsId: number[];
}

const SESSION_KEY = "sessionUser";

const roleByEmail: Record<string, UserRole> = {
    "admin@itcr.ac.cr": "admin",
    "organizador@itcr.ac.cr": "organizador",
    "estudiante@itcr.ac.cr": "estudiante"
};

export function getRoleForEmail(email: string): UserRole {
    return roleByEmail[email.toLowerCase()] ?? "estudiante";
}


export function setActiveSession(email: string, role: UserRole, eventsId: number[]) {
    const sessionUser: SessionUser = {email, role, eventsId};
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
}

export function clearActiveSession() {
    localStorage.removeItem(SESSION_KEY);
}

export function getActiveSession() {
    const rawSession = localStorage.getItem(SESSION_KEY);

    if (!rawSession) {
        return null;
    }

    try {
        return JSON.parse(rawSession) as SessionUser;
    } catch {
        localStorage.removeItem(SESSION_KEY);
        return null;
    }
}

export function hasActiveSession() {
    return getActiveSession() !== null;
}

export function getEmail(): string {
    const session = getActiveSession();
    if (session) {
        return session.email;
    }

    return ''
}

export function getEvents(): number[] {
    const session = getActiveSession();
    if (session) {
        return session.eventsId
    }
    return []

}

export function addEvent(eventId: number): boolean {
    const session = getActiveSession();

    if (!session) {
        return false
    }

    if (isAlreadyRegistered(eventId)) {
        return false;
    }

    session.eventsId.push(eventId);
    setActiveSession(session.email, session.role, session.eventsId);
    return true;
}

export function isAlreadyRegistered(eventId: number) {
    const session = getActiveSession();
    if (!session) {
        return false;
    }
    return session.eventsId?.includes(eventId);

}

export function removeEvent(eventId: number) {
    const session = getActiveSession();
    if (!session) {
        return false;
    }
    if (!isAlreadyRegistered(eventId)) {
        return true;
    }
    const index = session.eventsId.indexOf(eventId);
    session.eventsId.splice(index, 1);
    setActiveSession(session.email, session.role, session.eventsId);
    return true;
}