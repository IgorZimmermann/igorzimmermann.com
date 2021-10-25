import { Box, Text } from '@chakra-ui/layout'
import React from 'react'
import { config } from '../config'

interface ButtonProps {
	color?: keyof typeof config.colors
	onClick: React.MouseEventHandler<HTMLDivElement>
}

export const Button: React.FC<ButtonProps> = ({
	children,
	color = config.colors.grey,
	onClick,
	...props
}) => {
	return (
		<Box
			py="10px"
			px="20px"
			backgroundColor={color}
			onClick={onClick}
			_hover={{ cursor: 'pointer' }}
			{...props}
		>
			<Text
				color={
					(config.colors as any)[color] === config.colors.white
						? 'black'
						: config.colors.lgrey
				}
				_hover={{
					color: config.colors.white,
				}}
				fontWeight={700}
				fontFamily={'mono'}
			>
				{children?.toString().toUpperCase()}
			</Text>
		</Box>
	)
}
