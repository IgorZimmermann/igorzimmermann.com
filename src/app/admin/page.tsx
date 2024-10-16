'use client'
import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import { useState } from 'react'
import { Navbar } from '../../components/admin/Navbar'
import { graphql } from '../../gql'
import useFileUpload from './useFileUpload'

const getFoldersInContainerQueryDocument = graphql(`
	query GetFoldersInContainer($container: String!) {
		getFoldersInContainer(container: $container) {
			status
			message
		}
	}
`)

const AdminPage: NextPage = () => {
	const { ImageModal, showImageModal } = useFileUpload()

	const [container, setContainer] = useState<string>(
		process.env.NEXT_PUBLIC_PB_DEFAULT_CONTAINER!
	)
	const [folder, setFolder] = useState<string>(
		process.env.NEXT_PUBLIC_PB_DEFAULT_FOLDER!
	)

	const { data, loading } = useQuery(getFoldersInContainerQueryDocument, {
		variables: { container: process.env.NEXT_PUBLIC_PB_DEFAULT_CONTAINER! },
	})

	return (
		<>
			<Navbar />
			<div className="h-[100dvh] w-full flex justify-center items-center bg-black text-white font-sans relative">
				<div>
					<form action="" className="flex flex-col w-[22dvw]">
						<div className="flex flex-col mb-4">
							<label
								className="uppercase text-xs font-bold"
								htmlFor="container"
							>
								container
							</label>
							<input
								type="text"
								name="container"
								id="container"
								value={container}
								onChange={(ev) => {
									setContainer(ev.target.value)
								}}
								disabled
								className="bg-white border-0 rounded-none text-base px-2 disabled:hover:cursor-not-allowed"
							/>
						</div>
						<div className="flex flex-col mb-4">
							<label className="uppercase text-xs font-bold" htmlFor="folder">
								folder
							</label>
							<select
								name="folder"
								id="folder"
								className="bg-white border-0 appearance-none rounded-none text-base px-2"
								value={folder}
								onChange={(ev) => {
									setFolder(ev.target.value)
								}}
							>
								{!loading &&
									data &&
									data.getFoldersInContainer.message.map((x) => (
										<option value={x} key={x}>
											{x}
										</option>
									))}
								<hr />
								<option value="new">new</option>
							</select>
						</div>
						<div className="flex flex-col mb-4">
							<label className="uppercase text-xs font-bold" htmlFor="files">
								files
							</label>
							<input
								type="button"
								value="upload a file"
								className="bg-white border-0 rounded-none text-xs p-2 uppercase font-bold hover:cursor-pointer hover:opacity-85"
								onClick={() => {
									showImageModal(container, folder)
								}}
							/>
						</div>
					</form>
				</div>
				<ImageModal />
			</div>
		</>
	)
}

export default AdminPage
