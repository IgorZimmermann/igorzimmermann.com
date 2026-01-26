import type { Metadata } from "next"

import moment from "moment"
import { redirect } from "next/navigation"
import { cache } from "react"

import type { Project, ProjectsQuery } from "../../../types/generated/graphql"

import ProjectContainer from "../../../components/project/container"
import ProjectContent from "../../../components/project/content"
import ProjectHeader from "../../../components/project/header"
import { ProjectsDocument } from "../../../types/generated/graphql"
import { query } from "../../apollo-client"

export const revalidate = 60

const getProject = cache(async (slug: string) => {
	const content = await query<ProjectsQuery>({ query: ProjectsDocument, variables: {
		filters: {
			slug: {
				eq: slug,
			},
		},
	} })
	return content
})

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}): Promise<Metadata> {
	const { slug } = await params

	const content = await getProject(slug)

	let data: Omit<Project, "documentId"> | null = null

	if (content.data && content.data.projects) {
		if (content.data.projects.length !== 0 && content.data.projects[0] !== null) {
			data = content.data.projects[0]

			return {
				title: data.title,
				description: data.description,
				keywords: data.keywords.split(",").map(x => x.trim()),
				authors: [
					{
						name: "Igor Zimmermann",
					},
				],
			}
		}
	}

	return {}
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	const content = await getProject(slug)

	let data: Omit<Project, "documentId"> | null = null

	if (content.data && content.data.projects) {
		if (content.data.projects.length === 0) {
			return redirect("/")
		}
		else {
			data = content.data.projects[0]
		}
	}

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
