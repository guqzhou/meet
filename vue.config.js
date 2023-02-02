// const path = require('path');
module.exports = {
    devServer: {
        port: 9999,
        open: true
    },
    publicPath: './',
    css: {
        requireModuleExtension: true,
        sourceMap: false,
        loaderOptions: {
            postcss: {
                plugins: [
                    // require("autoprefixer")({
                    //     // 配置使用 autoprefixer
                    //     overrideBrowserslist: ["last 15 versions"]
                    // }),
                    require("postcss-px-to-viewport")({
                        // 配置使用 autoprefixer
                        // overrideBrowserslist: ["last 15 versions"]
                        unitToConvert: "px", // 要转化的单位
                        viewportWidth: 350, // UI设计稿的宽度  750/640
                        unitPrecision: 3, // 转换后的精度，即小数点位数
                        propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
                        viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
                        fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
                        selectorBlackList: [], // 指定不转换为视窗单位的类名，
                        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
                        mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
                        replace: true, // 是否转换后直接更换属性值
                        exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
                        landscape: false // 是否处理横屏情况
                    }),
                ]
            },
            less: {
                // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
                lessOptions: {
                    modifyVars: {
                        // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                        hack: `true; @import "~@/style/dialog.less"`,
                    },
                },
            },
        },
    },
    // configureWebpack: {
    //     plugins: {
    //         autoprefixer: {},
    //         "postcss-px-to-viewport": {
    //             unitToConvert: "px", // 要转化的单位
    //             viewportWidth: 350, // UI设计稿的宽度  750/640
    //             unitPrecision: 6, // 转换后的精度，即小数点位数
    //             propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
    //             viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
    //             fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
    //             selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，
    //             minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
    //             mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
    //             replace: true, // 是否转换后直接更换属性值
    //             exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
    //             landscape: false // 是否处理横屏情况
    //         }
    //     }
    // }
}
