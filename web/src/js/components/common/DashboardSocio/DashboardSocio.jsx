import useToken from '@hooks/useToken';

const DashboardSocio = () => {

    const { username } = useToken();

    return (
        <div className='row'>
            
            <div className="col-12 col-lg-9">
                <div className="row dashboard-menu">
                    <div className="col-12">
                            Bienvenido, {username}
                    </div>
                </div>
            
                <div className="row">
                    <div className="col-12">
                        <div className="row dashboard-menu">

                            <div className="col-12 item">Rutinas</div>

                            <div className="col-12 col-sm-6 ">
                                <div className="row p-right">
                                    <div className="col-12 item">Último acceso</div>
                                </div>
                            </div>

                            <div className="col-12 col-sm-6">
                                <div className="row p-left">
                                    <div className="col-12 item">Seguimientos</div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12 item">
                                        
                                        <div className="row">
                                            <div className="col-12">Tarifa actual: nombre_de_la_tarifa</div>
                                            <div className="col-12">Termina en: 20 días</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-sm-6">
                                <div className="row p-left">
                                    <div className="col-12 item">Productos</div>
                                </div>
                            </div>

                            <div className="col-12 col-sm-6">
                                <div className="row p-left">
                                    <div className="col-12 item">Taquilla</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-3 d-none d-lg-block">
                <div className="row dashboard-menu">
                    <div className="col-12 datos">
                        <div className="row">
                            <div className="col-12">DNI</div>
                            <div className="col-12">Nombre</div>
                            <div className="col-12">Apellidos</div>
                            <div className="col-12">Fecha Nacimiento</div>
                            <div className="col-12">Email</div>
                            <div className="col-12">Direccón</div>
                            <div className="col-12">Provincia</div>
                            <div className="col-12">Ciudad</div>
                        </div>
                    </div>
                </div>
            </div>

            










        </div>
    );
}

export default DashboardSocio;
