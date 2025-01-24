import './styles/App.css';
import { Navbar } from '../widgets/navbar';
import './styles/globaVariables.scss';
import { ParametersPanel } from '../widgets/parametersPanel';
import QRCodeComponent from '../shared/ui/qrStyle';

const App = () => {

	return (
		<>
			<div className="App">
				<Navbar/>
				<QRCodeComponent/>
				<ParametersPanel/>
			</div>
		</>
	);
};

export default App;
