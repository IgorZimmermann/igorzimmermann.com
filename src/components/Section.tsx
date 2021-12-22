import { Box } from '@chakra-ui/layout'
import React from 'react'
import { config } from '../config'
import { SectionLabel } from './SectionLabel'

interface SectionProps {
	title: string
	background?: keyof typeof config.colors
	height?: string | number
	bgImage?: string
}

export const Section: React.FC<SectionProps> = ({
	children,
	title,
	background = 'grey',
	height = '40vh',
	bgImage,
}) => {
	return (
		<Box
			backgroundColor={!bgImage ? config.colors[background] : undefined}
			pos={'relative'}
			h={height}
			w="100%"
			paddingX="50px"
			display="flex"
			flexDir="row"
			alignItems="center"
			justifyContent="space-between"
			backgroundImage={bgImage}
			backgroundPosition="center"
			backgroundSize="cover"
		>
			<SectionLabel text={title} />
			{children}
		</Box>
	)
}
