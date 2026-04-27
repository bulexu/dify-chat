import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const getStatusCheckUrl = (request: NextRequest) => {
	const url = request.nextUrl.clone()
	url.pathname = '/api/init/status'
	url.search = ''
	url.hash = ''

	if (
		process.env.NODE_ENV !== 'production' &&
		url.protocol === 'https:' &&
		(url.hostname === 'localhost' || url.hostname === '127.0.0.1')
	) {
		url.protocol = 'http:'
	}

	return url
}

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	// 跳过 API 和静态资源
	if (pathname.startsWith('/api')) return NextResponse.next()
	if (pathname.startsWith('/_next') || pathname === '/favicon.ico') return NextResponse.next()

	// 允许访问初始化页面本身
	if (pathname.startsWith('/init')) return NextResponse.next()

	try {
		const res = await fetch(getStatusCheckUrl(request), { cache: 'no-store' })
		const data = await res.json()
		const isInitialized = !!data.initialized

		if (!isInitialized) {
			const url = new URL('/init', request.url)
			return NextResponse.redirect(url)
		}
	} catch (error) {
		console.error('初始化状态检查失败:', error)
		// 状态检查失败时不阻断访问，允许后续页面处理
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
