import { Box, Flex } from '@chakra-ui/layout'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { config } from '../config'
import { SectionLabel } from './SectionLabel'

interface ModalProps {
	link: string | undefined
	setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal: React.FC<ModalProps> = ({ link, setShow }) => {
	const vidRef = useRef(HTMLVideoElement.prototype)

	const { t } = useTranslation()

	return (
		<>
			<Flex
				h="100vh"
				w="100%"
				pos={'fixed'}
				top={0}
				left={0}
				zIndex={100}
				p={5}
				bgColor={config.colors.grey}
				flexDir={'column'}
				justifyContent={'center'}
			>
				<SectionLabel
					text={t('close player')}
					onClick={() => {
						setShow(false)
					}}
				/>
				{link ? (
					<Box maxH="100vh" maxW="100vw" pos="relative">
						<SectionLabel text={t('video')} />
						<video
							src={link}
							ref={vidRef}
							autoPlay={true}
							onClick={() => {
								if (vidRef.current) {
									if (vidRef.current.paused) {
										vidRef.current.play()
									} else if (!vidRef.current.paused) {
										vidRef.current.pause()
									}
								}
							}}
						/>
					</Box>
				) : null}
			</Flex>
		</>
	)
}
