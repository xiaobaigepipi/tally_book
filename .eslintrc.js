module.exports = {
  env: {
    "browser": true,
    "es2021": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential"
  ],
  overrides: [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  parserOptions: {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  plugins: [
    "@typescript-eslint",
    "vue"
  ],
  rules: {
    "vue/multi-word-component-names": 0,
		"@typescript-eslint/no-var-requires": 0,
		"no-undef": "off",
		"vue/valid-template-root": "off",
		"@typescript-eslint/no-explicit-any": 0,
		"no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": 1,
		"vue/comment-directive": 0
  }
}
