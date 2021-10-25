import { Text } from '@chakra-ui/react'
import React from 'react'
import { config } from '../config'

interface SectionLabelProps {
	text: string
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ text }) => {
	return (
		<Text
			zIndex={3}
			pos={'absolute'}
			left="3px"
			top="3px"
			fontFamily={'mono'}
			fontSize="10px"
			fontWeight={700}
			color={config.colors.lgrey}
		>
			{text.toUpperCase()}
		</Text>
	)
}
