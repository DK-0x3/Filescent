import './Navbar.scss';
import logo from '../../../shared/assets/svg/logo.svg';

interface INavbarProps {
    className?: string;
}

export const Navbar = (props: INavbarProps) => {
	const {
		className,
	} = props;

	return (
		<div className={'Navbar ' + (className || '')}>
			<img src={logo} className="logo" alt="Vite logo"/>

			<label className='Title'>Filescent</label>

			{/*<LangSwitcher/>*/}
		</div>
	);
};