import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Coloretic",

    description: "A library for creating and manipulating various color spaces",

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        // logo: "/logo.svg",

        nav: [
            { text: 'Home', link: '/' },
        ],

        search: {
            provider: 'local'
        },

        sidebar: [
            {
                text: 'Guide',
                base: '/guide',
                items: [
                    { text: 'Getting started', link: '/' },
                    { text: 'Implementing color space', link: '/implementing-color-space' },
                ]
            },
            {
                text: 'Color spaces',
                base: '/color-spaces',
                items: [
                    { text: 'RGB color space', link: '/rgb' },
                    { text: 'HSL color space', link: '/hsl' },
                ]
            },
            {
                text: 'Reference',
                base: '/reference',
                items: [
                    { text: "API Reference", link: '/' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/toombez/coloretic' },
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present Timur Tokaev'
        }
    }
})
