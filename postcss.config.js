const tailwindcss = require('tailwind');

module.exports ={
    plugins: [tailwindcss('./tailwind.config') , require('autoprefixer')],
}