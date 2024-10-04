'use client'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'

const AdminPage: NextPage = () => {
	const [imageShowModal, setShowImageModal] = useState<boolean>(false)

	const [container] = useState<string>(
		process.env.NEXT_PUBLIC_PB_DEFAULT_CONTAINER!
	)
	const [folder, setFolder] = useState<string>(
		process.env.NEXT_PUBLIC_PB_DEFAULT_FOLDER!
	)
	const [label, setLabel] = useState<string>('')
	const [file, setFile] = useState<File>()

	const uploadFile = (): Promise<boolean> => {
		return new Promise((resolve, reject) => {
			if (!file) return reject('no file')
			const formData = new FormData()
			formData.append('container', container)
			formData.append('folder', folder)
			formData.append('label', label)
			formData.append('extension', file.name.split('.').at(-1) || 'jpg')
			formData.append('files', new Blob([file]))

			fetch(process.env.NEXT_PUBLIC_PB_DEFAULT_UPLOAD_URL!, {
				method: 'post',
				body: formData,
			})
				.then((resp) => resp.json())
				.then((data) => {
					if (data.status === 'okay') {
						resolve(true)
					} else {
						resolve(false)
					}
				})
				.catch((e) => reject(e))
		})
	}

	return (
		<div className="h-[100dvh] w-full flex justify-center items-center bg-black text-white font-sans relative">
			<div>
				<form action="" className="flex flex-col w-[22dvw]">
					<div className="flex flex-col mb-4">
						<label className="uppercase text-xs font-bold" htmlFor="container">
							container
						</label>
						<input
							type="text"
							name="container"
							id="container"
							value={container}
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
							<option value="images">images</option>
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
								setShowImageModal(true)
							}}
						/>
					</div>
				</form>
			</div>
			{imageShowModal && (
				<div className="z-10 py-10 absolute top-[50%] left-[50%] w-[30dvw] bg-black [transform:translateX(-50%)_translateY(-50%)]">
					<form
						onSubmit={async (ev) => {
							ev.preventDefault()

							uploadFile().then((val) => {
								if (val === true) {
									setShowImageModal(false)
									setLabel('')
									setFile(undefined)
								}
							})
						}}
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
						/>
						<input
							type="text"
							name="folder"
							id="folder"
							value={folder}
							className="invisible"
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
		</div>
	)
}

export default AdminPage
