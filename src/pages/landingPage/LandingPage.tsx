import Sobrenos from '../../components/landingPage/Sobrenos';
import Footer from '../../components/landingPage/Footer';
import Guia from '../../components/landingPage/Guia';
import Home from '../../components/landingPage/Home';
import PesquisaContrato from '../../components/landingPage/PesquisaContrato';

function LandingPage() {
	return (
		<>
			<Home />
			<Guia />
			<Sobrenos />
			<PesquisaContrato />
			<Footer />
		</>
	);
}

export default LandingPage;
