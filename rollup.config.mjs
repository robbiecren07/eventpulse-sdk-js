import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/eventpulse-sdk-js.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/eventpulse-sdk-js.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.PACKAGE_VERSION': JSON.stringify(pkg.version),
      }),
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            module: "ES2015",
            lib: ["ES2015", "DOM"],
            declaration: true,
            declarationDir: "./dist/types"
          }
        }
      }),
      terser(),
    ],
    external: ['tslib']
  },
  {
    input: 'src/browser.ts',
    output: [
      {
        file: 'dist/eventpulse-browser.js',
        format: 'iife',
        name: 'EventPulse',
        sourcemap: false,
      },
    ],
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.PACKAGE_VERSION': JSON.stringify(pkg.version),
      }),
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            module: "ES2015",
            lib: ["ES2015", "DOM"],
            declaration: true,
            declarationDir: "./dist/types"
          }
        }
      }),
      terser(),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
    ],
    external: []
  }
];
