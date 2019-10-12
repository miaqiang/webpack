const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: {
		// vendors: ['react', 'react-dom', "react-router", "react-codemirror"],
		jquery: ['jquery'],
		react: ['react', 'react-dom', "react-router", "react-redux"],
		echarts: ["./components/common/echarts"],
		bootstrap: ["bootstrap", "bootstrap-datepicker"],
		redux: ["redux"],
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, '../dll'),
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]',
			path: path.resolve(__dirname, '../dll/[name].manifest.json'),
		})
	]
}