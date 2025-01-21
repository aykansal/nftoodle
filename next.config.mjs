/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pbs.twimg.com',
            },
            {
                protocol: 'https',
                hostname: 'toc.otmnft.com',
            },
            {
                protocol: 'https',
                hostname: 'docs.looksrare.org',
            },
        ],
    },

};

export default nextConfig;
