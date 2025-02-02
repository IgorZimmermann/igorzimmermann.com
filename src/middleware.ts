import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/* if (request.nextUrl.pathname.startsWith('/admin')) {
  if (!request.cookies.has('Authentication')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  } else {
    return NextResponse.next()
  }
} else {
  return NextResponse.next()
} */

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	return new Promise((resolve) => {
		fetch(process.env.NEXT_PUBLIC_PB_API_URL!, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				query: `
        query Me {
          me {
            isAuthorised
            user {
              username
              containers
            }
          }
        }
      `,
			}),
			headers: {
				'content-type': 'application/json',
				Cookie: `Authentication=${
					request.cookies.get('Authentication')?.value || ''
				}`,
			},
		})
			.then((resp) => {
				return resp.json()
			})
			.then((data) => {
				if (data.data.me.isAuthorised === false) {
					resolve(NextResponse.redirect(new URL('/auth/login', request.url)))
				} else {
					resolve(NextResponse.next())
				}
			})
	})
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: '/admin/:path*',
}
