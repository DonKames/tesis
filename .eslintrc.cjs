module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['plugin:react/recommended', 'standard'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks'], // Añade 'react-hooks' aquí
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        semi: 'off',
        'comma-dangle': ['error', 'always-multiline'],
        'space-before-function-paren': 'off',
        'react-hooks/rules-of-hooks': 'error', // Añade esta línea
        'react-hooks/exhaustive-deps': 'warn', // Añade esta línea
    },
};
