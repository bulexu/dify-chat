import type { NextConfig } from 'next'
import path from 'path'

const workspaceRoot = path.resolve(__dirname, '../../')
const workspaceAliases = {
	'@dify-chat/api': '../api/src/index.ts',
	'@dify-chat/components': '../components/src/index.tsx',
	'@dify-chat/core': '../core/src/index.ts',
	'@dify-chat/helpers': '../helpers/src/index.ts',
	'@dify-chat/theme': '../theme/src/index.ts',
}

const nextConfig: NextConfig = {
	output: 'standalone',
	transpilePackages: [
		'@dify-chat/api',
		'@dify-chat/components',
		'@dify-chat/core',
		'@dify-chat/helpers',
		'@dify-chat/theme',
	],
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					// 支持跨域
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{ key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
					{
						key: 'Access-Control-Allow-Headers',
						value:
							'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-USER-ID',
					},
				],
			},
		]
	},
	turbopack: {
		root: workspaceRoot,
		resolveAlias: workspaceAliases,
	},
}

export default nextConfig
