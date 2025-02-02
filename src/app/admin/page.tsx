'use client'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
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

const getImagesInFolderQueryDocument = graphql(`
	query GetBlobUrlsByFolder($folder: String!, $container: String!) {
		getBlobUrlsByFolder(folder: $folder, container: $container) {
			message {
				label
				url
				serial
			}
			status
		}
	}
`)

const getImageByIdQueryDocument = graphql(`
	query GetBlobById($getBlobByIdId: String!) {
		getBlobById(id: $getBlobByIdId) {
			status
			message {
				label
				serial
				url
			}
		}
	}
`)

const changeBlobSerialMutationDocument = graphql(`
	mutation ChangeBlobSerial($serial: Int!, $changeBlobSerialId: String!) {
		changeBlobSerial(serial: $serial, id: $changeBlobSerialId) {
			status
			message
		}
	}
`)

const changeBlobLabelMutationDocument = graphql(`
	mutation ChangeBlobLabel($label: String!, $changeBlobLabelId: String!) {
		changeBlobLabel(label: $label, id: $changeBlobLabelId) {
			status
			message
		}
	}
`)

const deleteBlobMutationDocument = graphql(`
	mutation DeleteBlob($deleteBlobId: String!) {
		deleteBlob(id: $deleteBlobId) {
			status
			message
		}
	}
`)

const createFolderInContainerMutationDocument = graphql(`
	mutation CreateFolderInContainer($folder: String!, $container: String!) {
		createFolderInContainer(folder: $folder, container: $container) {
			status
			message
		}
	}
`)

const meQueryDocument = graphql(`
	query Me {
		me {
			isAuthorised
			user {
				username
				containers
			}
		}
	}
`)

const AdminPage: NextPage = () => {
	const { ImageModal, showImageModal } = useFileUpload()

	const router = useRouter()

	/* UI States */
	const [showNewFolderModal, setShowNewFolderModal] = useState<boolean>(false)
	const [newFolderName, setNewFolderName] = useState<string>('')

	const [imageLabelEdit, setImageLabelEdit] = useState<string>('')

	/* Data States */
	const [containersList, setContainersList] = useState<string[]>([])
	const [currentContainer, setCurrentContainer] = useState<string>()

	const [foldersList, setFoldersList] = useState<string[]>([])
	const [currentFolder, setCurrentFolder] = useState<string>('new')

	const [imagesList, setImagesList] = useState<
		{
			url: string
			label: string
			serial: number
			id: string
		}[]
	>([])
	const [currentImage, setCurrentImage] = useState<{
		url: string
		label: string
		serial: number
		id: string
	}>()

	/* Queries */
	const [queryImageById] = useLazyQuery(getImageByIdQueryDocument, {
		nextFetchPolicy: 'cache-and-network',
		onCompleted: (data) => {
			if (
				data.getBlobById.status !== 'not okay' &&
				data.getBlobById.message !== undefined &&
				data.getBlobById.message !== null
			) {
				const responseImageData = data.getBlobById.message
				setCurrentImage({
					...responseImageData,
					id: responseImageData.url.split('/').slice(3).join('/'),
				})

				setImageLabelEdit(responseImageData.label)
			}
		},
	})

	const [queryImagesInFolder, { refetch: refetchQueryImagesInFolder }] =
		useLazyQuery(getImagesInFolderQueryDocument, {
			nextFetchPolicy: 'cache-and-network',
			onCompleted: (data) => {
				if (
					data.getBlobUrlsByFolder.status !== 'not okay' &&
					data.getBlobUrlsByFolder.message !== undefined &&
					data.getBlobUrlsByFolder.message !== null
				) {
					if (data.getBlobUrlsByFolder.message.length > 0) {
						setImagesList(
							data.getBlobUrlsByFolder.message.map((x) => {
								return { ...x, id: x.url.split('/').slice(3).join('/') }
							})
						)
					} else {
						setImagesList([])
					}
				}
			},
		})

	const [
		queryFoldersInContainer,
		{
			refetch: refetchQueryFoldersInContainer,
			loading: loadingQueryFoldersInContainer,
			called: calledQueryFoldersInContainer,
		},
	] = useLazyQuery(getFoldersInContainerQueryDocument, {
		nextFetchPolicy: 'cache-and-network',
		onCompleted: async (data) => {
			if (
				data.getFoldersInContainer.status !== 'not okay' &&
				data.getFoldersInContainer.message !== undefined &&
				data.getFoldersInContainer.message !== null
			) {
				if (data.getFoldersInContainer.message.length > 0) {
					setFoldersList(data.getFoldersInContainer.message)
					setCurrentFolder(foldersList[0])

					if (currentContainer && currentFolder) {
						await queryImagesInFolder({
							variables: {
								container: currentContainer,
								folder: currentFolder,
							},
						})
					}
				}
			}
		},
	})

	useEffect(() => {
		if (
			loadingQueryFoldersInContainer === false &&
			calledQueryFoldersInContainer === true &&
			currentFolder !== undefined &&
			currentFolder === 'new'
		) {
			setShowNewFolderModal(true)
		}
	}, [
		currentFolder,
		setNewFolderName,
		loadingQueryFoldersInContainer,
		calledQueryFoldersInContainer,
	])

	useEffect(() => {
		if (currentContainer !== undefined && currentFolder !== undefined) {
			queryImagesInFolder({
				variables: { container: currentContainer, folder: currentFolder },
			})
		}
	}, [currentContainer, currentFolder, queryImagesInFolder])

	const { loading: loadingUser } = useQuery(meQueryDocument, {
		onCompleted: async (data) => {
			if (
				data.me.isAuthorised === false ||
				data.me.user === undefined ||
				data.me.user === null
			) {
				router.push('/auth/login')
			} else {
				setContainersList(data.me.user.containers)
				setCurrentContainer(data.me.user.containers[0])
			}
		},
	})

	useEffect(() => {
		if (currentContainer !== undefined) {
			queryFoldersInContainer({ variables: { container: currentContainer } })
		}
	}, [currentContainer, queryFoldersInContainer])

	/* Mutations */
	const [changeBlobSerial] = useMutation(changeBlobSerialMutationDocument)
	const [changeBlobLabel] = useMutation(changeBlobLabelMutationDocument)
	const [deleteBlob] = useMutation(deleteBlobMutationDocument)

	const [createFolderInContainer] = useMutation(
		createFolderInContainerMutationDocument
	)

	return (
		<>
			<ImageModal
				cb={() => refetchQueryImagesInFolder({ container: currentContainer })}
			/>
			{/* New Folder Modal */}
			{showNewFolderModal && (
				<div className="z-10 fixed top-0 left-0 h-[100dvh] w-full flex justify-center items-center bg-black text-white">
					<form
						onSubmit={async (ev) => {
							ev.preventDefault()

							if (currentContainer !== undefined) {
								await createFolderInContainer({
									variables: {
										container: currentContainer,
										folder: newFolderName,
									},
								})

								setShowNewFolderModal(false)
								await refetchQueryFoldersInContainer({
									container: currentContainer,
								})

								setCurrentFolder(newFolderName)
							}
						}}
						className="flex flex-col w-[22dvw]"
					>
						<h2 className="uppercase text-xl m-0">create folder</h2>
						<div className="flex flex-col mb-4">
							<label
								htmlFor="newFolder"
								className="uppercase text-xs font-bold"
							>
								folder name
							</label>
							<input
								type="text"
								name="newFolder"
								id="newFolder"
								className="bg-white border-0 rounded-none text-base px-2"
								value={newFolderName}
								onChange={(ev) => {
									setNewFolderName(ev.target.value)
								}}
							/>
						</div>
						<div className="flex flex-row">
							<input
								type="button"
								value="cancel"
								className="bg-black border-2 border-white border-solid text-white rounded-none text-xs p-2 uppercase font-bold mr-2 hover:cursor-pointer hover:opacity-85"
								onClick={() => {
									setShowNewFolderModal(false)
									setNewFolderName('')

									setCurrentFolder(foldersList[0])
								}}
							/>
							<input
								type="submit"
								value="create"
								className="bg-white border-0 rounded-none text-xs p-2 uppercase font-bold hover:cursor-pointer hover:opacity-85"
							/>
						</div>
					</form>
				</div>
			)}
			<Navbar />
			<div className="min-h-[100dvh] w-full flex flex-row bg-black text-white font-sans relative">
				{!loadingUser ? (
					<>
						{/* Sidebar */}
						<div className="h-[90dvh] pt-[10dvh] px-5 w-[20dvw] fixed">
							{currentImage === undefined ? (
								<form
									onSubmit={(ev) => ev.preventDefault()}
									className="flex flex-col"
								>
									<div className="flex flex-col mb-4">
										<label
											htmlFor="container"
											className="uppercase text-xs font-bold"
										>
											container
										</label>
										<select
											name="container"
											id="container"
											className="bg-white border-0 appearance-none rounded-none text-base px-2"
											value={currentContainer}
											onChange={(ev) => {
												setCurrentContainer(ev.target.value)
												refetchQueryFoldersInContainer({
													container: currentContainer,
												})
											}}
										>
											{containersList.map((x) => (
												<option value={x} key={x}>
													{x}
												</option>
											))}
										</select>
									</div>
									<div className="flex flex-col mb-16">
										<label
											htmlFor="folder"
											className="uppercase text-xs font-bold"
										>
											folder
										</label>
										<select
											name="folder"
											id="folder"
											className="bg-white border-0 appearance-none rounded-none text-base px-2"
											value={currentFolder}
											onChange={(ev) => {
												if (ev.target.value === 'new') {
													setShowNewFolderModal(true)
												} else {
													setCurrentFolder(ev.target.value)
													refetchQueryImagesInFolder({
														container: currentContainer,
														folder: currentFolder,
													})
												}
											}}
										>
											{foldersList.map((x) => (
												<option value={x} key={x}>
													{x}
												</option>
											))}
											<hr />
											<option value="new">new</option>
										</select>
									</div>
									<div className="flex flex-col mb-16">
										<label
											htmlFor="uploadFile"
											className="uppercase text-xs font-bold"
										>
											upload
										</label>
										<input
											type="button"
											value="upload a file"
											className="bg-white border-0 rounded-none text-xs p-2 uppercase font-bold hover:cursor-pointer hover:opacity-85"
											onClick={async () => {
												if (
													currentContainer !== undefined &&
													currentFolder !== undefined
												) {
													await showImageModal(currentContainer, currentFolder)

													await refetchQueryImagesInFolder({
														container: currentContainer,
														folder: currentFolder,
													})
												}
											}}
										/>
									</div>
									<div className="flex flex-col">
										<label
											htmlFor="saveOrder"
											className="uppercase text-xs font-bold"
										>
											save order
										</label>
										<input
											type="button"
											value="save image order"
											className="bg-white border-0 rounded-none text-xs p-2 uppercase font-bold hover:cursor-pointer hover:opacity-85"
											onClick={async () => {
												await Promise.all(
													imagesList.map(async (x, i) => {
														if (i + 1 !== x.serial) {
															await changeBlobSerial({
																variables: {
																	serial: i + 1,
																	changeBlobSerialId: x.id,
																},
															})
														} else {
															return
														}
													})
												)

												await refetchQueryImagesInFolder({
													container: currentContainer,
													folder: currentFolder,
												})
											}}
										/>
									</div>
								</form>
							) : (
								<form
									onSubmit={(ev) => ev.preventDefault()}
									className="flex flex-col"
								>
									<div className="flex flex-col mb-4">
										<label
											htmlFor=""
											className="uppercase text-xs font-bold"
											onClick={() => {
												setCurrentImage(undefined)
												setImageLabelEdit('')
											}}
										>
											back
										</label>
									</div>
									<div className="flex flex-col mb-4">
										<label
											htmlFor="preview"
											className="uppercase text-xs font-bold"
										>
											preview
										</label>
										<img
											src={currentImage.url}
											alt={currentImage.label}
											className="max-h-[40dvh] w-auto mx-auto"
										/>
									</div>
									<div className="flex flex-col mb-12">
										<label
											htmlFor="imageLabel"
											className="uppercase text-xs font-bold"
										>
											label
										</label>
										<textarea
											name="imageLabel"
											id="imageLabel"
											rows={3}
											className="bg-white border-0 rounded-none text-base px-2 mb-4"
											value={imageLabelEdit}
											onChange={(ev) => setImageLabelEdit(ev.target.value)}
										/>
										<input
											type="button"
											value="save label"
											className="bg-white border-0 rounded-none text-xs p-2 uppercase font-bold hover:cursor-pointer hover:opacity-85"
											onClick={async () => {
												await changeBlobLabel({
													variables: {
														changeBlobLabelId: currentImage.id,
														label: imageLabelEdit,
													},
												})

												await refetchQueryImagesInFolder({
													container: currentContainer,
													folder: currentFolder,
												})
											}}
										/>
									</div>
									<div className="flex flex-col mb-4">
										<label
											htmlFor="delete"
											className="uppercase text-xs font-bold"
										>
											delete
										</label>
										<input
											type="button"
											name="delete"
											id="delete"
											value="delete image"
											className="bg-white border-0 rounded-none text-xs p-2 uppercase font-bold hover:cursor-pointer hover:opacity-85"
											onClick={async () => {
												await deleteBlob({
													variables: {
														deleteBlobId: currentImage.id,
													},
												})

												setCurrentImage(undefined)
												setImageLabelEdit('')

												await refetchQueryImagesInFolder({
													container: currentContainer,
													folder: currentFolder,
												})
											}}
										/>
									</div>
								</form>
							)}
						</div>

						{/* Image Grid */}
						{imagesList.length > 0 ? (
							<ReactSortable
								list={imagesList}
								setList={(newState) => {
									setImagesList(newState)
								}}
								className="grid grid-cols-4 auto-rows-[calc((80dvw-1.5rem)/4)] gap-2 w-[80dvw] pt-[10dvh] pl-10 pr-5 ml-[20dvw]"
							>
								{imagesList.map((x) => (
									<img
										src={x.url}
										alt={x.label}
										key={x.id}
										className="w-full object-cover aspect-square hover:cursor-pointer"
										onClick={async () => {
											await queryImageById({
												variables: {
													getBlobByIdId: x.id,
												},
											})
										}}
									/>
								))}
							</ReactSortable>
						) : (
							<h2 className="uppercase text-xl m-0 pt-[10dvh] ml-[30dvw]">
								no images in folder
							</h2>
						)}
					</>
				) : (
					<h2 className="uppercase text-xl m-0 pt-[10dvh] ml-[30dvw]">
						loading...
					</h2>
				)}
			</div>
		</>
	)
}

export default AdminPage
