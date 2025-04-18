import './LangSwitcher.scss';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { setSessionLanguage } from '../../../store/services/session/slice/sessionSlice';
import { Language } from '../../types/language';

interface ILangSwitcherProps {
    className?: string;
}

export const LangSwitcher = (props: ILangSwitcherProps) => {
	const { t, i18n } = useTranslation();
	const dispatch = useAppDispatch();

	const {
		className,
	} = props;

	const toggleLang = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
		dispatch(setSessionLanguage(i18n.language === 'ru' ? Language.RUSSIAN : Language.ENGLISH));
	};

	return (
		<div className={'lang-switcher ' + className}
			onClick={() => toggleLang()}
		>
			{t('Короткий язык')}
		</div>
	);
};