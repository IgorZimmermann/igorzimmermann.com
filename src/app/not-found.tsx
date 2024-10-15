import type { NextPage } from 'next'

const NotFound: NextPage = () => {
	return (
		<div className="h-[100dvh] w-[100dvw] bg-black text-white relative">
			<h1 className="text-7xl m-0 absolute top-[50%] left-[50%] [transform:translateX(-50%)_translateY(-50%)]">
				404 - not found
			</h1>
		</div>
	)
}

export default NotFound
