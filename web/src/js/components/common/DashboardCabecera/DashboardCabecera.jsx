import Breadcrumb from '@components/ui/Breadcrumb/Breadcrumb';

const DashboardCabecera = ({ breadcrumb, children, propLastBC }) => {

    return (
        <section className='row'>

            <div className='col-12 titulo-dashboard'>
                {children}
            </div>

            {
                // si se señala el prop breadcrumb como false, no aparecerá

                breadcrumb !== 'false' && (
                    <Breadcrumb propLastBC={propLastBC} />
                )
            }

        </section>
    );
}

export default DashboardCabecera;
