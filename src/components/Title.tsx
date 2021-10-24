import { Heading } from '@chakra-ui/layout'
import React from 'react'
import { config } from '../config'

interface TitleProps {
	color?: keyof typeof config.colors
}

export const Title: React.FC<TitleProps> = ({ children, color = 'white' }) => {
	return (
		<Heading
			fontSize="45px"
			marginBottom="10px"
			color={color}
			fontFamily={'heading'}
		>
			{children}
		</Heading>
	)
}
