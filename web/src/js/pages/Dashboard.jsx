import usePermission from '@hooks/usePermission';

const Dashboard = () => {

    const { isEntrenador } = usePermission();

    return (
        <>
            {
                isEntrenador ? (
                    'ENTRENADOR DASHBOARD'
                ) : (
                    'SOCIO DASHBOARD'
                )
            }
        </>
    );
}

export default Dashboard;
