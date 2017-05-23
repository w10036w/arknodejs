module.exports = (config) =>
`User-agent: *
Allow: /
Disallow: /admin
Sitemap: ${config.siteUrl}/sitemap.xml

User-agent: YisouSpider
Disallow: /
User-agent: EasouSpider
Disallow: /
User-agent: EtaoSpider
Disallow: /
User-agent: MJ12bot
Disallow: /`
