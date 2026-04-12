import Navigo from 'navigo';

// Creamos la instancia del router
export const router = new Navigo('/', { hash: false });

/**
 * Función global para navegar desde cualquier parte del código
 * @param path La ruta a la que quieres ir (ej: '/perfil')
 */
export const navigate = (path: string) => {
    router.navigate(path);
};

//go back function
export const goBack = () => {
    window.history.back();
}

/**
 * Inicializa las rutas. Aquí solo definimos QUÉ se renderiza,
 * NO definimos qué hacen los botones internos de las páginas.
 */
export function initRouter(routes: Record<string, (match?: any) => void>) {
    router.on(routes).resolve();
}