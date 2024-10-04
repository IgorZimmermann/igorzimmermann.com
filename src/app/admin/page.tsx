'use client'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'

const AdminPage: NextPage = () => {
	const [imageBufferUrl, setImageBufferUrl] = useState<string | null>(null)
	const [imageModal, setImageModal] = useState<boolean>(false)

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
							value={'zsoltzimmermann'}
							disabled
							className="bg-white border-0 rounded-none text-base px-2 disabled:hover:cursor-not-allowed"
						/>
					</div>
					<div className="flex flex-col mb-4">
						<label className="uppercase text-xs font-bold" htmlFor="folder">
							folder
						</label>
						<select
							name=""
							id=""
							className="bg-white border-0 appearance-none rounded-none text-base px-2"
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
							type="file"
							name="files"
							id="files"
							className="
                [&::-webkit-file-upload-button]:invisible
                text-transparent bg-white border-0 appearance-none rounded-none p-2 relative
                [&::before]:[content:_'upload_file'] [&::before]:block [&::before]:p-2 [&::before]:bg-white [&::before]:text-black [&::before]:text-center [&::before]:absolute [&::before]:top-[50%] [&::before]:left-[50%] [&::before]:[transform:translateX(-50%)_translateY(-50%)] [&::before]:uppercase [&::before]:font-bold"
							onChange={(ev) => {
								if (ev.target.files) {
									setImageBufferUrl(URL.createObjectURL(ev.target.files[0]))
									ev.target.value = ''
									setImageModal(true)
								}
							}}
						/>
					</div>
				</form>
			</div>
			{imageModal && imageBufferUrl && (
				<div className="z-10 absolute top-[50%] left-[50%] w-[30dvw] bg-black [transform:translateX(-50%)_translateY(-50%)]">
					<form
						action=""
						onSubmit={() => {
							setImageModal(false)
						}}
					>
						<h2 className="uppercase text-xl m-0">upload image</h2>
						<Image
							src={imageBufferUrl}
							alt="xy"
							height={600}
							width={600}
							className="w-auto h-auto max-h-[50dvh] my-5"
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
							/>
						</div>
						<div className="flex flex-row">
							<input
								type="button"
								value="cancel"
								className="bg-black border-2 border-white border-solid text-white rounded-none text-xs p-2 uppercase font-bold mr-2 hover:cursor-pointer hover:opacity-85"
								onClick={() => {
									setImageModal(false)
									setImageBufferUrl(null)
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
