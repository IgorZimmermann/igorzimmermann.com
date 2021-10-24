import { Box, Text } from '@chakra-ui/layout'
import React from 'react'
import { config } from '../config'

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
			w="100vw"
			paddingX="50px"
			display="flex"
			flexDir="row"
			alignItems="center"
			justifyContent="space-between"
			backgroundImage={bgImage}
			backgroundPosition="center"
			backgroundSize="cover"
		>
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
				{title.toUpperCase()}
			</Text>
			{children}
		</Box>
	)
}
