// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js', // তোমার এন্ট্রি ফাইল
  output: {
    file: 'dist/bundle.js', // আউটপুট ফাইল
    format: 'iife', // ব্রাউজার-সাপোর্টেড ফরম্যাট
    sourcemap: true,
  },
  plugins: [
    resolve(),  // node_modules থেকে প্যাকেজ পড়ার জন্য
    commonjs(), // CommonJS প্যাকেজ ESM এ রূপান্তর করার জন্য
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }), // ES6+ কোড ট্রান্সপাইলের জন্য
  ],
};
