import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "build/",
      "dist/",
      "*.config.js",
      "*.config.mjs",
      "prisma/generated/**",
      "pages/api/qr/index.ts",
      "src/app/api/qr/**",
      "src/app/api/admin/admin-users/**",
      "src/app/lib/qrCodeUtils.ts",
      "src/app/components/layout/qr/QRCodeSettings.ts"
    ]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "@next/next/no-img-element": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": "off",
      "no-undef": "off",
      "import/no-commonjs": "off",
      "prefer-const": "off",
      "no-var": "off",
      "no-console": "off",
      "no-debugger": "off"
    }
  }
];

export default eslintConfig;
