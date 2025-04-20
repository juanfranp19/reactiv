import Carousel from '@components/Carousel/Carousel';
import TopBar from '@components/TopBar/TopBar';

const App = () => {

    return (
        <div className='container-fluid'>

            <TopBar></TopBar>
                
            <Carousel></Carousel>

            <TopBar></TopBar>

        </div>
    );
}

export default App;
