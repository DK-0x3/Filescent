import './Navbar.scss';
import logo from '../../../shared/assets/svg/logo.svg';
import {LangSwitcher} from "../../../shared/ui/langSwitcher/LangSwitcher.tsx";
import {useTranslation} from "react-i18next";

interface INavbarProps {
    className?: string;
}

export const Navbar = (props: INavbarProps) => {
	const {
		className,
	} = props;

	const {t} = useTranslation();

	return (
		<div className={'Navbar ' + (className || '')}>
			<img src={logo} className="logo" alt="Vite logo"/>

			<label className='Title'>Filescent</label>
			<label className='title-end'>{t('the best file exchanger!')}</label>

			<LangSwitcher/>
		</div>
	);
};