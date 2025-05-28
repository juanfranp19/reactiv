import Breadcrumb from '@components/ui/Breadcrumb/Breadcrumb';

const DashboardCabecera = ({ children, propLastBC }) => {

    return (
        <section className='row'>

            <div className='col-12 titulo-dashboard'>
                {children}
            </div>

            <Breadcrumb propLastBC={propLastBC} />

        </section>
    );
}

export default DashboardCabecera;
