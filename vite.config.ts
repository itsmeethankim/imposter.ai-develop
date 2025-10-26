
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'configure-response-headers',
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          next();
        });
      },
    }
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.png'],
    alias: {
      'vaul': 'vaul',
      'sonner': 'sonner',
      'recharts': 'recharts',
      'react-resizable-panels': 'react-resizable-panels',
      'react-hook-form': 'react-hook-form',
      'react-day-picker': 'react-day-picker',
      'next-themes': 'next-themes',
      'lucide-react': 'lucide-react',
      'input-otp': 'input-otp',
      'figma:asset/f58413d1c28e72fe24a92fd94585299303fa101b.png': path.resolve(__dirname, './src/assets/f58413d1c28e72fe24a92fd94585299303fa101b.png'),
      'figma:asset/f1cdee4ec99bf1719ba404833d4625f1bf8cbdeb.png': path.resolve(__dirname, './src/assets/f1cdee4ec99bf1719ba404833d4625f1bf8cbdeb.png'),
      'figma:asset/eb80d8d62eeb36774902b552cc622063027ca8a4.png': path.resolve(__dirname, './src/assets/eb80d8d62eeb36774902b552cc622063027ca8a4.png'),
      'figma:asset/df93697aa11e7f903d0b6c677396204df4378256.png': path.resolve(__dirname, './src/assets/df93697aa11e7f903d0b6c677396204df4378256.png'),
      'figma:asset/de57ea74cc02b7b1f8eed18aca21806de60acb15.png': path.resolve(__dirname, './src/assets/de57ea74cc02b7b1f8eed18aca21806de60acb15.png'),
      'figma:asset/da905a3bd37f52aa006fcefa1f91f99a2530fc0a.png': path.resolve(__dirname, './src/assets/da905a3bd37f52aa006fcefa1f91f99a2530fc0a.png'),
      'figma:asset/d08a7c5d13e7f02feed925936d02e7a332327ac5.png': path.resolve(__dirname, './src/assets/d08a7c5d13e7f02feed925936d02e7a332327ac5.png'),
      'figma:asset/c98b507da933894ce9148962eff1f4db4391e0c2.png': path.resolve(__dirname, './src/assets/c98b507da933894ce9148962eff1f4db4391e0c2.png'),
      'figma:asset/c2f76c4c069286fde7f5378c7c0a47cbd74fad8a.png': path.resolve(__dirname, './src/assets/c2f76c4c069286fde7f5378c7c0a47cbd74fad8a.png'),
      'figma:asset/b5b2cbeb7c4b702df3f756e893f6a6f036d8044d.png': path.resolve(__dirname, './src/assets/b5b2cbeb7c4b702df3f756e893f6a6f036d8044d.png'),
      'figma:asset/b55dab5c3f20ed71654757bf093a3676f1c084a9.png': path.resolve(__dirname, './src/assets/b55dab5c3f20ed71654757bf093a3676f1c084a9.png'),
      'figma:asset/b243658522e63b71412aa73b51f21329033922e9.png': path.resolve(__dirname, './src/assets/b243658522e63b71412aa73b51f21329033922e9.png'),
      'figma:asset/a61de57e21482d799860e0f5a794ed36038cd166.png': path.resolve(__dirname, './src/assets/a61de57e21482d799860e0f5a794ed36038cd166.png'),
      'figma:asset/a473cc7860cc803094a14113196b5b8956fb6db1.png': path.resolve(__dirname, './src/assets/a473cc7860cc803094a14113196b5b8956fb6db1.png'),
      'figma:asset/a37de2083117c329a94890a28a2be90a432b50aa.png': path.resolve(__dirname, './src/assets/a37de2083117c329a94890a28a2be90a432b50aa.png'),
      'figma:asset/88f96b2be2ecf56e846ac1b153054bb388382435.png': path.resolve(__dirname, './src/assets/88f96b2be2ecf56e846ac1b153054bb388382435.png'),
      'figma:asset/7ee54ba2a1852d65051bf6787db5fa494a8fa1ba.png': path.resolve(__dirname, './src/assets/7ee54ba2a1852d65051bf6787db5fa494a8fa1ba.png'),
      'figma:asset/7d54c12f38138b7c59bb12b63ceda67be7d73a69.png': path.resolve(__dirname, './src/assets/7d54c12f38138b7c59bb12b63ceda67be7d73a69.png'),
      'figma:asset/7abaf3fb062d535b8210c91aaf788f5305fd60b2.png': path.resolve(__dirname, './src/assets/7abaf3fb062d535b8210c91aaf788f5305fd60b2.png'),
      'figma:asset/734f89d3888e17342f83a9ad7695b51ae1906e4c.png': path.resolve(__dirname, './src/assets/734f89d3888e17342f83a9ad7695b51ae1906e4c.png'),
      'figma:asset/6e7315c9010b47fcee1d3eb824142e2d633bd4e6.png': path.resolve(__dirname, './src/assets/6e7315c9010b47fcee1d3eb824142e2d633bd4e6.png'),
      'figma:asset/6986ab44b4742568f1f6d7835664094f8c9c869a.png': path.resolve(__dirname, './src/assets/6986ab44b4742568f1f6d7835664094f8c9c869a.png'),
      'figma:asset/5e0b12821583070be76f4bb50ed63461f8fbc85f.png': path.resolve(__dirname, './src/assets/5e0b12821583070be76f4bb50ed63461f8fbc85f.png'),
      'figma:asset/5d1ba539a2177307d851ca16ebe70f599f370265.png': path.resolve(__dirname, './src/assets/5d1ba539a2177307d851ca16ebe70f599f370265.png'),
      'figma:asset/59c0a4e06b03e790e70b1aefed30d61446132eb2.png': path.resolve(__dirname, './src/assets/59c0a4e06b03e790e70b1aefed30d61446132eb2.png'),
      'figma:asset/57f012b20529a2c9bc151ec516d758df494f7035.png': path.resolve(__dirname, './src/assets/57f012b20529a2c9bc151ec516d758df494f7035.png'),
      'figma:asset/5037a96775081331822ea0f5251de835167c7704.png': path.resolve(__dirname, './src/assets/5037a96775081331822ea0f5251de835167c7704.png'),
      'figma:asset/484f835aeb310a91b30d0d552bbebf3dedaf685b.png': path.resolve(__dirname, './src/assets/484f835aeb310a91b30d0d552bbebf3dedaf685b.png'),
      'figma:asset/370f9fb2a3d01ea94bcc93ebc837275d95c7b441.png': path.resolve(__dirname, './src/assets/370f9fb2a3d01ea94bcc93ebc837275d95c7b441.png'),
      'figma:asset/34dde22e12a16dc48bff95c0cd04a5e0a201a2ae.png': path.resolve(__dirname, './src/assets/34dde22e12a16dc48bff95c0cd04a5e0a201a2ae.png'),
      'figma:asset/334fcb0fdf74b28d9c247237e5b9df155373af95.png': path.resolve(__dirname, './src/assets/334fcb0fdf74b28d9c247237e5b9df155373af95.png'),
      'figma:asset/297dfecf5fd235a46a3ea9a2ff5d67d0b32caaa8.png': path.resolve(__dirname, './src/assets/297dfecf5fd235a46a3ea9a2ff5d67d0b32caaa8.png'),
      'figma:asset/23feede054303a9a16dfb54a81468cd3e1b619a7.png': path.resolve(__dirname, './src/assets/23feede054303a9a16dfb54a81468cd3e1b619a7.png'),
      'figma:asset/228d0abcec0ec16ca60b1b0e6bab4c50082d19f2.png': path.resolve(__dirname, './src/assets/228d0abcec0ec16ca60b1b0e6bab4c50082d19f2.png'),
      'figma:asset/1fbf6b4a194652072dd780b9916949a9839c17a4.png': path.resolve(__dirname, './src/assets/1fbf6b4a194652072dd780b9916949a9839c17a4.png'),
      'figma:asset/18c1b6c6793bdb9f1fd1f0a37060955e1e2cd99e.png': path.resolve(__dirname, './src/assets/18c1b6c6793bdb9f1fd1f0a37060955e1e2cd99e.png'),
      'figma:asset/0a2b70c25f5ad30d26944f9bc183dc7bf481f2d4.png': path.resolve(__dirname, './src/assets/0a2b70c25f5ad30d26944f9bc183dc7bf481f2d4.png'),
      'figma:asset/012c6eeb47ef835933c05125151d08390ba0986a.png': path.resolve(__dirname, './src/assets/012c6eeb47ef835933c05125151d08390ba0986a.png'),
      'embla-carousel-react@8.6.0': 'embla-carousel-react',
      'cmdk@1.1.1': 'cmdk',
      'class-variance-authority@0.7.1': 'class-variance-authority',
      '@supabase/supabase-js@2': '@supabase/supabase-js',
      '@radix-ui/react-tooltip': '@radix-ui/react-tooltip',
      '@radix-ui/react-toggle': '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group': '@radix-ui/react-toggle-group',
      '@radix-ui/react-tabs': '@radix-ui/react-tabs',
      '@radix-ui/react-switch': '@radix-ui/react-switch',
      '@radix-ui/react-slot': '@radix-ui/react-slot',
      '@radix-ui/react-slider': '@radix-ui/react-slider',
      '@radix-ui/react-separator': '@radix-ui/react-separator',
      '@radix-ui/react-select': '@radix-ui/react-select',
      '@radix-ui/react-scroll-area': '@radix-ui/react-scroll-area',
      '@radix-ui/react-radio-group': '@radix-ui/react-radio-group',
      '@radix-ui/react-progress': '@radix-ui/react-progress',
      '@radix-ui/react-popover': '@radix-ui/react-popover',
      '@radix-ui/react-navigation-menu': '@radix-ui/react-navigation-menu',
      '@radix-ui/react-menubar': '@radix-ui/react-menubar',
      '@radix-ui/react-label': '@radix-ui/react-label',
      '@radix-ui/react-hover-card': '@radix-ui/react-hover-card',
      '@radix-ui/react-dropdown-menu': '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog': '@radix-ui/react-dialog',
      '@radix-ui/react-context-menu': '@radix-ui/react-context-menu',
      '@radix-ui/react-collapsible': '@radix-ui/react-collapsible',
      '@radix-ui/react-checkbox': '@radix-ui/react-checkbox',
      '@radix-ui/react-avatar': '@radix-ui/react-avatar',
      '@radix-ui/react-aspect-ratio': '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-alert-dialog': '@radix-ui/react-alert-dialog',
      '@radix-ui/react-accordion': '@radix-ui/react-accordion',
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
