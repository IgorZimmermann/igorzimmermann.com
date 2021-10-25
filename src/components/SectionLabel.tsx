import { Text } from '@chakra-ui/react'
import React from 'react'
import { config } from '../config'

interface SectionLabelProps {
	text: string
	onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
	text,
	onClick,
}) => {
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
			onClick={onClick || undefined}
			_hover={{
				cursor: onClick ? 'pointer' : 'auto',
			}}
		>
			{text.toUpperCase()}
		</Text>
	)
}
