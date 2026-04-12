type Category = "Academico" | "Cultural" | "Recreativo"
type Modality = "Presencial" | "Virtual"

export interface Event {
    id: number
    name: string
    description: string
    category: Category
    organizer: string
    date: Date
    modality: Modality
    spaces: number
    place: string
    link: string
    createdBy: string
    accepted: boolean
    participants: number
}

export interface Usuario {
    id: number
    name: string
    apellido1: string
    apellido2: string
    correo: string
    password: string
    carnet: number
    eventsCreated: number
}

export const events: Event[] = [
    {
        id: 1,
        name: "Charla IA",
        description: "Charla comunicativa sobre la etica en el uso de IA",
        category: "Academico",
        organizer: "TEC",
        date: new Date(),
        modality: "Presencial",
        spaces: 30,
        place: "Centro de las artes",
        link: "",
        createdBy: "organizador@tec.cr",
        accepted: true,
        participants: 25
    },
    {
        id: 2,
        name: "Dia de la mujer",
        description: "marcha de la mujer",
        category: "Cultural",
        organizer: "FEITEC",
        date: new Date(),
        modality: "Presencial",
        spaces: 200,
        place: "Entrada del TEC",
        link: "",
        createdBy: "organizador@tec.cr",
        accepted: true,
        participants: 150
    },
    {
        id: 3,
        name: "Noche de peliculas",
        description: "Una noche de peliculas con una gran variedad de estas, miedo, suspenso, comicas, etc",
        category: "Recreativo",
        organizer: "ASODEC",
        date: new Date(),
        modality: "Presencial",
        spaces: 50,
        place: "B3",
        link: "",
        createdBy: "organizador@tec.cr",
        accepted: true,
        participants: 45
    },
    {
        id: 4,
        name: "Taller de Linux",
        description: "Taller de linux para borrar el SO de m13rda",
        category: "Recreativo",
        organizer: "Aurelio",
        date: new Date(),
        modality: "Presencial",
        spaces: 30,
        place: "B6-01",
        link: "",
        createdBy: "",
        accepted: false,
        participants: 20
    }
]

export const usuarios: Usuario[] = [
    {
        id: 1,
        name: "Jaime",
        apellido1: "Solano",
        apellido2: "Soto",
        correo: "admin@itcr.ac.cr",
        password: "1234",
        carnet: 0,
        eventsCreated: 0
    },
    {
        id: 2,
        name: "Fabricio",
        apellido1: "Hernandez",
        apellido2: "Ramires",
        correo: "organizador@itcr.ac.cr",
        password: "1234",
        carnet: 0,
        eventsCreated: 5
    },
    {
        id: 3,
        name: "",
        apellido1: "",
        apellido2: "",
        correo: "e.blanco.1@estudiantec.cr",
        password: "1234",
        carnet: 0,
        eventsCreated: 0
    }
]