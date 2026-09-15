import type { Metadata } from "next"

import moment from "moment"
import { notFound } from "next/navigation"
import { cache } from "react"

import type { ProjectSlugsQuery, ProjectsQuery } from "../../../types/generated/graphql"

import ProjectContainer from "../../../components/project/container"
import ProjectContent from "../../../components/project/content"
import ProjectHeader from "../../../components/project/header"
import { ProjectsDocument, ProjectSlugsDocument } from "../../../types/generated/graphql"
import { getClient, query } from "../../apollo-client"

export const revalidate = 120

export async function generateStaticParams() {
	const client = getClient()
	const content = await client.query<ProjectSlugsQuery>({
		query: ProjectSlugsDocument,
	})

	return content.data?.projects?.flatMap(project =>
		project?.slug ? [{ slug: project.slug }] : [],
	) ?? []
}

const getProject = cache(async (slug: string) => {
	const content = await query<ProjectsQuery>({
		query: ProjectsDocument,
		variables: { filters: { slug: { eq: slug } } },
	})

	return content.data?.projects?.[0] ?? null
})

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params

	const data = await getProject(slug)

	if (!data)
		return {}

	return {
		title: data.title,
		description: data.description,
		keywords: data.keywords.split(",").map((key: string) => key.trim()),
		authors: [{ name: "Igor Zimmermann" }],
	}
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	const data = await getProject(slug)

	if (!data)
		notFound()

	return (
		<ProjectContainer>
			{data && (
				<>
					<ProjectHeader title={data.title} date={moment(data.date)} description={data.description} />
					<ProjectContent content={data.content} />
				</>
			)}
		</ProjectContainer>
	)
}
