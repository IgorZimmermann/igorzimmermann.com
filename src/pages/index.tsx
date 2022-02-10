import { Box, Flex, Link } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/Button'
import { LanguagePicker } from '../components/LanguagePicker'
import { Modal } from '../components/Modal'
import { Paragraph } from '../components/Paragraph'
import { Section } from '../components/Section'
import { Title } from '../components/Title'
import { config } from '../config'

const Index = () => {
	const { t } = useTranslation()
	const [modalShow, setModalShow] = useState<boolean>(false)
	const [modalLink, setModalLink] = useState<string | undefined>(undefined)

	return (
		<Box>
			<Head>
				<title>Igor Zimmermann</title>
			</Head>
			{modalShow ? (
				<Modal link={modalLink} setShow={setModalShow}></Modal>
			) : null}
			<Section title={t('header')}>
				<Box maxW="50%">
					<Title>Igor Zimmermann</Title>
					<Paragraph>{t('header-p')}</Paragraph>
				</Box>
				<Flex flexDir="column" alignItems="flex-end">
					{config.links.map((x) => (
						<NextLink key={x.text} href={x.href}>
							<Link href={x.href} target={x.target} color={config.colors.white}>
								{x.text}
							</Link>
						</NextLink>
					))}
				</Flex>
			</Section>
			<Section
				title={t('favourite-movie')}
				bgImage="https://i.imgur.com/xVbTfR0.jpeg"
				height="70vh"
			>
				<Box maxW="50%">
					<Title>{t('the-social-network')}</Title>
					<Paragraph>{t('the-social-network-p')}</Paragraph>
				</Box>
				<Button
					onClick={() => {
						setModalLink('https://trailers.apple.com/movies/sony/thesocialnetwork/thesocialnetwork-tlr1b_h1080p.mov')
						setModalShow(true)
					}}
				>
					{t('play trailer')}
				</Button>
			</Section>
			<LanguagePicker pos="fixed" bottom="0" right="0"></LanguagePicker>
		</Box>
	)
}

export default Index
