'use client'
import MDEditor, { ICommand } from '@uiw/react-md-editor'
import type { NextPage } from 'next'
import { useState } from 'react'
import { Navbar } from '../../../components/admin/Navbar'
import useFileUpload from '../useFileUpload'

const AdminDocs: NextPage = () => {
	const [markdownEditorValue, setMarkdownEditorValue] = useState('')

	const { ImageModal, showImageModal } = useFileUpload()

	const [container] = useState<string>(
		process.env.NEXT_PUBLIC_PB_DEFAULT_CONTAINER!
	)
	const [folder] = useState<string>(process.env.NEXT_PUBLIC_PB_DEFAULT_FOLDER!)

	const imageUploadCommand: ICommand = {
		name: 'imageUpload',
		keyCommand: 'imageUpload',
		render: (command, disabled, executeCommand) => {
			return (
				<button
					aria-label="upload image"
					disabled={disabled}
					onClick={() => {
						executeCommand(command, command.groupName)
					}}
					className="font-sans text-xs"
				>
					image
				</button>
			)
		},
		execute: async (_state, api) => {
			showImageModal(container, folder).then((image) => {
				api.replaceSelection(`![](${image})`)
			})
		},
	}

	return (
		<>
			<Navbar />
			<div className="mt-[10dvh] h-[90dvh]">
				<MDEditor
					value={markdownEditorValue}
					onChange={(value) => setMarkdownEditorValue(value || '')}
					textareaProps={{
						placeholder: 'enter Markdown text',
					}}
					height={'90dvh'}
					commands={[imageUploadCommand]}
					className="![--md-editor-background-color:#000000] ![--color-fg-default:#ffffff]"
				/>
			</div>
			<ImageModal />
		</>
	)
}

export default AdminDocs
