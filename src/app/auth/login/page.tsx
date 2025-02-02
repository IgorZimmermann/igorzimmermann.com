'use client'
import { useMutation, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { graphql } from '../../../gql'

const loginMutationDocument = graphql(`
	mutation LoginUser($password: String!, $username: String!) {
		loginUser(password: $password, username: $username) {
			status
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

const LoginPage: NextPage = () => {
	const { loading: loadingUser, data: dataUser } = useQuery(meQueryDocument)
	const [login] = useMutation(loginMutationDocument)

	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const router = useRouter()

	return (
		<div className="z-10 fixed top-0 left-0 h-[100dvh] w-full flex justify-center items-center bg-black text-white">
			{!loadingUser && (
				<>
					{dataUser && dataUser.me.isAuthorised === false ? (
						<form
							onSubmit={async (ev) => {
								ev.preventDefault()

								const response = await login({
									variables: { username, password },
								})
								if (response.data?.loginUser.status === 'okay') {
									router.push('/admin')
								}
							}}
							className="flex flex-col w-[22dvw]"
						>
							<h2 className="uppercase text-xl m-0">login</h2>
							<div className="flex flex-col mb-4">
								<label
									htmlFor="username"
									className="uppercase text-xs font-bold"
								>
									username
								</label>
								<input
									type="text"
									name="username"
									id="username"
									className="bg-white border-0 rounded-none text-base px-2"
									value={username}
									onChange={(ev) => setUsername(ev.target.value)}
								/>
							</div>
							<div className="flex flex-col mb-4">
								<label
									htmlFor="password"
									className="uppercase text-xs font-bold"
								>
									password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									className="bg-white border-0 rounded-none text-base px-2"
									value={password}
									onChange={(ev) => setPassword(ev.target.value)}
								/>
							</div>
							<input
								type="submit"
								value="login"
								className="bg-white border-0 rounded-none text-xs p-2 uppercase font-bold hover:cursor-pointer hover:opacity-85"
							/>
						</form>
					) : (
						<div className="flex flex-col w-[22dvw]">
							<h2 className="uppercase text-xl m-0 mb-4">
								already logged in as {dataUser?.me.user?.username}
							</h2>
							<a
								href="/"
								className="bg-white border-0 rounded-none text-xs p-2 uppercase font-bold text-center no-underline text-black text-opacity-[0.847] hover:cursor-pointer hover:opacity-85"
							>
								go home
							</a>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default LoginPage
