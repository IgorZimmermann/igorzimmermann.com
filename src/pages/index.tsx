import { Box, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { Paragraph } from '../components/Paragraph'
import { Section } from '../components/Section'
import { Title } from '../components/Title'
import { config } from '../config'

const Index = () => (
	<Box>
		<Section title="header">
			<Box maxW="50%">
				<Title>Igor Zimmermann</Title>
				<Paragraph>
					A regular student from Budapest with a dream to become the next Big
					Thing.
				</Paragraph>
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
			title="favourite movie"
			bgImage="https://i.imgur.com/xVbTfR0.jpeg"
			height="70vh"
		>
			<Box maxW="50%">
				<Title>The Social Network</Title>
				<Paragraph>
					As Harvard student Mark Zuckerberg creates the social networking site
					that would become known as Facebook, he is sued by the twins who
					claimed he stole their idea, and by the co-founder who was later
					squeezed out of the business.
				</Paragraph>
			</Box>
		</Section>
	</Box>
)

export default Index
