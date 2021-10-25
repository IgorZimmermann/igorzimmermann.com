import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { config } from '../config'
import { SectionLabel } from './SectionLabel'

export const LanguagePicker: React.FC<any> = ({ ...props }) => {
	const { i18n, t } = useTranslation()

	function changeLanguage(lan: string) {
		if (i18n.language !== lan) {
			i18n.changeLanguage(lan)
		}
	}

	return (
		<Flex
			pl="5px"
			pr="10px"
			pt="20px"
			pb="10px"
			backgroundColor={config.colors.grey}
			pos="relative"
			{...props}
		>
			<SectionLabel text={t('language')} />
			{Object.keys(config.flags).map((x) => (
				<Box
					key={x}
					backgroundImage={(config.flags as any)[x]}
					backgroundPosition="center"
					backgroundSize="cover"
					h="20px"
					w="30px"
					_notLast={{
						marginRight: '5px',
					}}
					outline={
						i18n.language === x
							? `1.5px solid ${config.colors.white}`
							: undefined
					}
					_hover={{
						cursor: 'pointer',
					}}
					onClick={() => {
						changeLanguage(x)
					}}
				></Box>
			))}
		</Flex>
	)
}
