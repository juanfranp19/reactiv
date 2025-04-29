import { useRef } from 'react';

import imagenn1 from '@assets/carousel/crossfit-534615_1920.jpg';
import imagen2 from '@assets/carousel/fitness-3767876_1280.jpg';
import imagen3 from '@assets/carousel/gym-5977600_1920.jpg';

const Carousel = () => {

    const carruselRef = useRef(null);

    function bajarCarrusel() {
        if (carruselRef.current) {
            const carruselBottom = carruselRef.current.getBoundingClientRect().bottom + window.scrollY;
            window.scrollTo({ top: carruselBottom, behavior: 'smooth' });
        }
    }

    return (
        <div className='row'>

            <div id='demo' className='col-12 carousel slide carousel-fade'>
                <div className='carousel-indicators'>
                    <button type='button' data-bs-target='#demo' data-bs-slide-to='0' className='active' aria-current='true' aria-label='Slide 1'></button>
                    <button type='button' data-bs-target='#demo' data-bs-slide-to='1' aria-label='Slide 2'></button>
                    <button type='button' data-bs-target='#demo' data-bs-slide-to='2' aria-label='Slide 3'></button>
                </div>

                <div className='carousel-inner w-100'>
                    <div className='carousel-item active'>
                        <img src={imagenn1} className='d-block w-100' alt='...' />
                    </div>
                    <div className='carousel-item'>
                        <img src={imagen2} className='d-block w-100' alt='...' />
                    </div>
                    <div className='carousel-item'>
                        <img src={imagen3} className='d-block w-100' alt='...' />
                    </div>
                </div>

                <button className='carousel-control-prev' type='button' data-bs-target='#demo' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                </button>

                <button className='carousel-control-next' type='button' data-bs-target='#demo' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>

            <div ref={carruselRef} className='bajar-carousel col-12'>
                <button onClick={bajarCarrusel}>
                    <i className='bi bi-arrow-down'></i>
                </button>
            </div>

        </div>
    );
}

export default Carousel;
