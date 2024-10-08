/** @type {import('next').NextConfig} */
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

const nextConfig = {
	transpilePackages: ["@smartleadmagnet/ui"],
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com'
			},
			{
				protocol: 'https',
				hostname: '*.public.blob.vercel-storage.com'
			},
			{
				protocol: 'https',
				hostname: 'cdn.smartereply.com',
			},
			{
				protocol: 'https',
				hostname: 'canny.io',
			},
			{
				protocol: 'https',
				hostname: 'via.placeholder.com',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'smartereply.com',
			},
			{
				protocol: 'https',
				hostname: 'example.com',
			},
			{
				protocol: 'https',
				hostname: 'daisyui.com'
			},
			{
				protocol: 'https',
				hostname: 'img.youtube.com'
			},
			{
				protocol: 'https',
				hostname: 'media.licdn.com'
			},
			{
				protocol: 'https',
				hostname: 'api.producthunt.com'
			},
			{
				protocol: 'https',
				hostname: 'smartereply.canny.io'
			}
		],
	},
};

if (process.env.NODE_ENV === 'development') {
	await setupDevPlatform();
}

export default nextConfig;
