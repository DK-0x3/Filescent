import './LangSwitcher.scss';
import { useTranslation } from 'react-i18next';

interface ILangSwitcherProps {
    className?: string;
}

export const LangSwitcher = (props: ILangSwitcherProps) => {
	const { t, i18n } = useTranslation();

	const {
        className,
	} = props;

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

	return (
		<div className={"lang-switcher " + className}
            onClick={() => toggleLang()}
        >
            {t('EN')}
		</div>
	);
};