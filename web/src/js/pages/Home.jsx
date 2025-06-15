import { Helmet } from 'react-helmet';

import Carousel from '@components/common/Carousel/Carousel';
import ContenidoHome from '@components/common/ContenidoHome/ContenidoHome';
import Navbar from '@components/common/Navbar/Navbar';
import TopBar from '@components/common/TopBar/TopBar';

const Home = () => {

    return (
        <>
            <Helmet>
                <title>Reactiv</title>
            </Helmet>

            <header>
                <TopBar />

                <Carousel />

                <Navbar />
            </header>

            <main>
                <ContenidoHome />
            </main>
        </>
    );
}

export default Home;
