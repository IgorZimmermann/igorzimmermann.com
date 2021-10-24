import { Text } from '@chakra-ui/react'
import React from 'react'
import { config } from '../config'

interface ParagraphProps {
	color?: keyof typeof config.colors
}

export const Paragraph: React.FC<ParagraphProps> = ({
	children,
	color = 'white',
}) => {
	return <Text color={color}>{children}</Text>
}
