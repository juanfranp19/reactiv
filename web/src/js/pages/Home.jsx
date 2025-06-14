import Carousel from '@components/common/Carousel/Carousel';
import ListaEjercicios from '@components/common/ListaEjercicios/ListaEjercicios';
import Navbar from '@components/common/Navbar/Navbar';
import TopBar from '@components/common/TopBar/TopBar';

const Home = () => {

    return (
        <>
            <header>
                <TopBar />

                <Carousel />

                <Navbar />
            </header>

            <main>
                <ListaEjercicios />
            </main>
        </>
    );
}

export default Home;
