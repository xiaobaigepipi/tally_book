import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss-webpack-plugin/vite'
import rem2px from 'postcss-rem-to-responsive-pixel'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { resolve } from "path"

const h5 = process.env.UNI_PLATFORM === 'h5';
const app = process.env.UNI_PLATFORM === 'app';
const weixinAppTailWindCSSDisabled = h5 || app;
console.log(process.env.UNI_PLATFORM)
const postcssPlugins = [
  tailwindcss(),
  autoprefixer(), 
]

if (!weixinAppTailWindCSSDisabled) {
	postcssPlugins.push(
		rem2px({
			rootValue: 32,
			propList: ['*'],
			transformUnit: 'rpx'
		})
	)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		uni(),
		uvwt({
			disabled: weixinAppTailWindCSSDisabled
		})
	],
	resolve: {
		alias: [
			{
				find: "@",
				replacement: resolve(__dirname, 'src')
			}
		]
	},
	server:{
		https: false,
		port: 7979,
		proxy: {
			"/api": {
				target: 'http://localhost:8787'
			}
		}
	},
	css: {
    postcss: {
      plugins: postcssPlugins
    }
  },
	// esbuild: {
	// 	drop: ['console', 'debugger']
	// },
	build: {
		// minify: 'terser',
		// terserOptions: {
		// 	compress: {
		// 		drop_console: true,
		// 	},
		// },
	}
});
