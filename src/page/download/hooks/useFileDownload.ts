import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../app/env';
import ROUTES from '../../../app/rout/routes';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getFileParameters, IFilesDownloadParameters } from '../../../entities/file/model/thunks/getFileParameters';
import { PasswordValidationState } from '../DownloadPage';
import { getFileBlob } from '../../../entities/file/model/thunks/getFileBlob';

export const useFileDownload = (id: string | undefined) => {
	const [blob, setBlob] = useState<Blob | null>(null);
	const [blobUrl, setBlobUrl] = useState<string | null>(null);
	const [parameters, setParameters] = useState<IFilesDownloadParameters>();
	const [isPassword, setIsPassword] = useState<PasswordValidationState>(PasswordValidationState.VALID);

	const navigate = useNavigate();
	const { t } = useTranslation();

	const fetchFilesById = useCallback(
		async (fileId: string) => {
			try {
				const currentParameters = await getFileParameters(fileId);

				setParameters(currentParameters);

				if (currentParameters.password) {
					const password = sessionStorage.getItem(`file-password-${id}`);

					if (password) {
						try {
							const fileBlob = await getFileBlob(fileId, password);
							setBlob(fileBlob);
							setBlobUrl(URL.createObjectURL(fileBlob));
							setIsPassword(PasswordValidationState.VALID);
						} catch (error) {
							if (axios.isAxiosError(error)) {
								if (error.response?.status === 400) {
									setIsPassword(PasswordValidationState.INVALID);
								} else if (error.response?.status === 410) {
									alert(t('Файлы удалены'));
									navigate(ROUTES.HOME);
									console.error('Ошибка при получении файла:', error);
								}
								else {
									alert(t('Произошла непредвиденная ошибка'));
									navigate(ROUTES.HOME);
									console.error('Ошибка при получении файла:', error);
								}
							} else {
								console.error('Непредвиденная ошибка:', error);
							}
						}
					} else {
						setIsPassword(PasswordValidationState.EMPTY);
					}
				} else {
					// если файлы не защищены паролем
					const response = await axios.get<Blob>(`${API_URL}/api/file/${fileId}`, {
						responseType: 'blob',
					});
					setBlob(response.data);
					setBlobUrl(URL.createObjectURL(response.data));
				}
			} catch (error) {
				alert(t('Информация о файлах не найдена'));
				navigate(ROUTES.HOME);
				console.error('Ошибка при получении файла:', error);
			}
		},
		[id, navigate, t]
	);

	useEffect(() => {
		if (id) fetchFilesById(id);
	}, [id, fetchFilesById]);

	return { blob, blobUrl, parameters, isPassword, fetchFilesById };
};
