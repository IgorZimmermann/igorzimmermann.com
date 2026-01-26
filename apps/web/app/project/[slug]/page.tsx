import moment from "moment"
import { redirect } from "next/navigation"

import type { Project, ProjectsQuery } from "../../../types/generated/graphql"

import ProjectContainer from "../../../components/project/container"
import ProjectContent from "../../../components/project/content"
import ProjectHeader from "../../../components/project/header"
import { ProjectsDocument } from "../../../types/generated/graphql"
import { query } from "../../apollo-client"

export const revalidate = 60

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	const content = await query<ProjectsQuery>({ query: ProjectsDocument, variables: {
		filters: {
			slug: {
				eq: slug,
			},
		},
	} })

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
