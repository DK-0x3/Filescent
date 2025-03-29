import './Navbar.scss';
import logo from '../../../shared/assets/svg/logo.svg';
import { LangSwitcher } from '../../../shared/ui/lang-switcher/LangSwitcher';
import { useTranslation } from 'react-i18next';

interface INavbarProps {
    className?: string;
}

export const Navbar = (props: INavbarProps) => {
	const {
		className,
	} = props;

	const { t } = useTranslation();

	return (
		<div className={'Navbar ' + (className || '')}>
			<img src={logo} className="logo" alt="Vite logo"/>

			{/* eslint-disable-next-line i18next/no-literal-string */}
			<label className='Title'>Filescent</label>
			<label className='title-end'>{t('Лучший обменник файлами!')}</label>

			<LangSwitcher/>
		</div>
	);
};