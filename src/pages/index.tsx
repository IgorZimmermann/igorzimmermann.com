import { Box, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LanguagePicker } from '../components/LanguagePicker'
import { Paragraph } from '../components/Paragraph'
import { Section } from '../components/Section'
import { Title } from '../components/Title'
import { config } from '../config'

const Index = () => {
	const { t } = useTranslation()

	return (
		<Box>
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
			</Section>
			<LanguagePicker pos="fixed" bottom="10px" right="10px"></LanguagePicker>
		</Box>
	)
}

export default Index
