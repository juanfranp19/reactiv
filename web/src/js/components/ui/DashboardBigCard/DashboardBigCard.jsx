const DashboardBigCard = ({ children }) => {

    return (
        <div className='col-12 item'>
            <div className='row'>
                {/* cada hijo debe tener una clase col */}
                {children}
            </div>
        </div>
    );
}

export default DashboardBigCard;
