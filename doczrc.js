export default {
  title: 'Lorikeet',
  src: '.',
  port: 3333,
  // files: '**/*.{md,mdx}',
  // theme: 'docz-theme',
  themeConfig: {
    mode: 'light',
  },
  menu: [
    'Overview',
    {
      name: 'Design Guidelines',
      menu: ['Principles'],
    },
    {
      name: 'Components',
      menu: ['Slider', 'TabBar'],
    },
  ],
}
