import noImg from '@assets/no-img.svg';

const CalentamientoCard = ({ nombre, tiempo }) => {

    return (
        <div class='card' style={{width: 150}}>
            <img src={noImg} class='' style={{ height: 200}} alt='...' />
            <div class='card-body'>
                <h5 class='card-title'>{nombre}</h5>
                <p class='card-text'>{tiempo} minutos</p>
                <a href='#' class='btn btn-primary'>Go</a>
                <a href='#' class='btn btn-primary'>Go</a>
            </div>
        </div>
    );
}

export default CalentamientoCard;
