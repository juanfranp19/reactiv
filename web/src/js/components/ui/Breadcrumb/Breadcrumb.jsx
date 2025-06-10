import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ propLastBC }) => {

    const location = useLocation();

    // convierte la url un array, y el filter para evitar el primer índice vacío del array, que es la raíz de la url
    const pathname = location.pathname.split('/').filter(p => p);

    //console.log(pathname);

    // renombramientos de algunos segmentos
    const pathnameRenames = {
        'add-calentamiento': 'Añadir calentamiento',
        'add-ejercicio': 'Añadir ejercicio',
    }

    // breadcrumbs sin link
    const noLinkArray = ['detalles', 'rutina'];

    return (
        <nav className='breadcrumb-nav' aria-label='breadcrumb'>
            <ol className='col-12 breadcrumb'>

                {/* el primer elemento del breadcrumb siempre es el inicio */}
                <li className='breadcrumb-item'>
                    <Link to='/'>
                        <i className='bi bi-house-door' />
                    </Link>
                </li>

                {/*  */}
                {
                    // recorre cada segmento del pathname
                    pathname.map((segment, index) => {

                        // obtenemos el último segmento del pathname
                        const lastBC = index === pathname.length - 1;

                        const noLink = noLinkArray.includes(segment);

                        // construimos el enlace de dirección de cada breadcrumb
                        const hrefBC = `/${pathname.slice(0, index + 1).join('/')}`;

                        const breadcrumb = (
                            // si es el último breadcrumb y además está el definido en el prop, se aplica el definico en el prop
                            lastBC && propLastBC
                                ? propLastBC
                                : (
                                    // si el segmento se encuentra en el array de renames, lo aplica
                                    pathnameRenames[segment] ?? (
                                        // si no, aplica el propio nombre del segmento pero formateándolo
                                        segment
                                            .replace(/-/g, ' ') // reemplaza todos los guiones
                                            .replace(/\b\w/g, letter => letter.toUpperCase()) // mayúscula a la primera letra de cada palabra
                                    )
                                )
                        );

                        return (
                            <li key={segment} className={`breadcrumb-item ${lastBC ? 'active' : ''}`}>
                                {
                                    // si es el último breadcrumb o está marcado como que no tiene ningún link, lo retorna sin Link ni enlace
                                    lastBC || noLink
                                        ? breadcrumb
                                        : <Link to={hrefBC}>{breadcrumb}</Link>
                                }
                            </li>
                        );
                    })
                }
            </ol>
        </nav>
    );
}

export default Breadcrumb;
