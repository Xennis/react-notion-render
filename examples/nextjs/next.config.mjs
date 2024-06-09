/** @type {import('next').NextConfig} */
const nextConfig = {
  // Just set for GitHub Page: https://<username>.github.io/<basePath>/
  basePath: process.env.GITHUB_PAGE_BASE_PATH,
  output: "export",
}

export default nextConfig
