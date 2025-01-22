import './styles/App.css';
import { Navbar } from '../widgets/navbar';
import './styles/globaVariables.scss';
import { ParametersPanel } from '../widgets/parametersPanel';

const App = () => {

	return (
		<>
			<div className="App">
				<Navbar/>
				<ParametersPanel/>
			</div>
		</>
	);
};

export default App;
