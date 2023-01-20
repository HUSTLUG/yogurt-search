import {resolve} from 'path'
import {WebpackConfiguration} from "webpack-cli";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {ESBuildMinifyPlugin} from "esbuild-loader";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config:WebpackConfiguration = {
    mode:"production",
    entry:resolve(__dirname,"../src/index.tsx"),
    output:{
        filename: 'bundle.[chunkhash:8].js',
        path:resolve(__dirname,'../dist'),
        clean: true
    },
    resolve:{
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module:{
        rules:[
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test:/\.tsx?$/,
                loader:"esbuild-loader",
                options:{
                    loader:"tsx",
                    target:'es2015'
                },
                exclude:"/node_modules/"
            },
            {
                test:/\.ts?$/,
                loader:"esbuild-loader",
                options:{
                    loader:"ts",
                    target:'es2015'
                },
                exclude:"/node_modules/"
            }
        ]
    },
    optimization:{
        minimizer:[
            new ESBuildMinifyPlugin({
                target:"es2015",
                css:true
            })
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:resolve(__dirname,"../public/index.html"),
            filename:"index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:"bundle.[chunkhash:8].css"
        })
    ]
}
export default config