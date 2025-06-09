const AccessCard = ({ socioData, cargando }) => {

    return (
        <div className='flip-card-access-card'>
            <div className='flip-card-inner'>
                <div className='flip-card-front'>

                    {/* contenido delantero de la card */}

                    <p className='title'>Código de acceso</p>
                    <p>Pasa el ratón</p>

                </div>
                <div className='flip-card-back'>

                    {/* código de acceso */}

                    <p className='title'>{cargando ? 'cargando...' : socioData.cod_acceso}</p>

                </div>
            </div>
        </div>
    );
}

export default AccessCard;
