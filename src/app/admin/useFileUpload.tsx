import { useLazyQuery } from '@apollo/client'
import Image from 'next/image'
import { useState } from 'react'
import { graphql } from '../../gql'

const getBlobUrlsByLabelQueryDocument = graphql(`
	query GetBlobUrlsByLabel(
		$label: String!
		$folder: String!
		$container: String!
	) {
		getBlobUrlsByLabel(label: $label, folder: $folder, container: $container) {
			status
			message {
				url
				label
			}
		}
	}
`)

export default function useFileUpload() {
	const [getImageUrl] = useLazyQuery(getBlobUrlsByLabelQueryDocument)
	const [imageUrl, setImageUrl] = useState<undefined | string>()

	const [imageShowModal, setShowImageModal] = useState<boolean>(false)

	const [container, setContainer] = useState<string>('')
	const [folder, setFolder] = useState<string>('')

	const [resolveModal, setResolveModal] = useState<
		((value: string | PromiseLike<string>) => void) | undefined
	>(undefined)

	function showImageModal(container: string, folder: string): Promise<string> {
		return new Promise((resolve) => {
			setContainer(container)
			setFolder(folder)
			setResolveModal(() => resolve)
			setShowImageModal(true)
		})
	}

	const [label, setLabel] = useState<string>('')
	const [file, setFile] = useState<File>()

	const uploadFile = (): Promise<string | undefined> => {
		return new Promise((resolve, reject) => {
			if (!file) return reject('no file')
			const formData = new FormData()
			formData.append('container', container)
			formData.append('folder', folder)
			formData.append('label', label)
			formData.append('extension', file.name.split('.').at(-1) || 'jpg')
			formData.append('files', new Blob([file]))

			fetch(process.env.NEXT_PUBLIC_PB_UPLOAD_URL!, {
				method: 'post',
				body: formData,
			})
				.then((resp) => resp.json())
				.then((data) => {
					if (data.status === 'okay') {
						getImageUrl({ variables: { container, folder, label } }).then(
							(resp) => {
								if (
									resp.data &&
									resp.data.getBlobUrlsByLabel.status !== 'not okay' &&
									resp.data.getBlobUrlsByLabel.message !== null &&
									resp.data.getBlobUrlsByLabel.message
								) {
									setImageUrl(resp.data?.getBlobUrlsByLabel.message[0].url)
									resolve(resp.data?.getBlobUrlsByLabel.message[0].url)
								} else {
									resolve(undefined)
								}
							}
						)
					} else {
						resolve(undefined)
					}
				})
				.catch((e) => reject(e))
		})
	}

	const ImageModal = () => (
		<>
			{imageShowModal && resolveModal && (
				<div className="z-10 absolute top-0 left-0 h-[100dvh] w-full flex justify-center items-center bg-black text-white">
					<form
						onSubmit={async (ev) => {
							ev.preventDefault()

							uploadFile().then((val) => {
								if (val !== undefined) {
									setShowImageModal(false)
									setLabel('')
									setFile(undefined)
									resolveModal(val)
								}
							})
						}}
						className="flex flex-col w-[22dvw]"
					>
						<h2 className="uppercase text-xl m-0">upload image</h2>
						{file && (
							<Image
								src={URL.createObjectURL(file)}
								alt="uploaded image"
								width={1200}
								height={1200}
								className="h-[50dvh] w-auto w-max-[30dvw]"
							/>
						)}
						<input
							type="text"
							name="container"
							id="container"
							value={container}
							className="invisible"
							onChange={() => setContainer}
						/>
						<input
							type="text"
							name="folder"
							id="folder"
							value={folder}
							className="invisible"
							onChange={() => setFolder}
						/>
						<input
							type="file"
							name="files"
							id="files"
							className="
                [&::-webkit-file-upload-button]:invisible
                text-transparent bg-white border-0 appearance-none rounded-none p-2 relative my-5
                [&::before]:[content:_'upload_file'] [&::before]:block [&::before]:p-2 [&::before]:bg-white [&::before]:text-black [&::before]:text-center [&::before]:absolute [&::before]:top-[50%] [&::before]:left-[50%] [&::before]:[transform:translateX(-50%)_translateY(-50%)] [&::before]:uppercase [&::before]:font-bold"
							onChange={async (ev) => {
								if (ev.target.files) {
									setFile(ev.target.files[0])
									setLabel(ev.target.files[0].name.split('.')[0])
								}
							}}
							style={{ display: file ? 'none' : 'initial' }}
						/>
						<div className="flex flex-col mb-4">
							<label htmlFor="label" className="uppercase text-xs font-bold">
								label
							</label>
							<input
								type="text"
								name="label"
								id="label"
								className="bg-white border-0 rounded-none text-base px-2"
								value={label}
								onChange={(ev) => {
									setLabel(ev.target.value)
								}}
							/>
						</div>
						<div className="flex flex-row">
							<input
								type="button"
								value="cancel"
								className="bg-black border-2 border-white border-solid text-white rounded-none text-xs p-2 uppercase font-bold mr-2 hover:cursor-pointer hover:opacity-85"
								onClick={() => {
									setShowImageModal(false)
									setFile(undefined)
								}}
							/>
							<input
								type="submit"
								value="upload"
								className="bg-white border-0 rounded-none text-xs p-2 uppercase font-bold hover:cursor-pointer hover:opacity-85"
							/>
						</div>
					</form>
				</div>
			)}
		</>
	)

	return {
		imageUrl,
		ImageModal,
		showImageModal,
		hideImageModal: () => setShowImageModal(false),
	}
}
