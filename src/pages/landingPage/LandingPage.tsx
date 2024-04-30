import Sobrenos from '../../components/landingPage/Sobrenos';
import Footer from '../../components/landingPage/Footer';
import Guia from '../../components/landingPage/Guia';
import Home from '../../components/landingPage/Home';
import Feature from '../../components/landingPage/Feature';

function LandingPage() {
	return (
		<>
			<Home />
			<Guia />
			<Sobrenos />
			<Feature />
			<Footer />
		</>
	);
}

export default LandingPage;
