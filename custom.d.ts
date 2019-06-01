// 导入非代码部分资源
// 要使用TypeScript的非代码资源，我们需要告诉TypeScript如何推迟这些导入的类型。
// 为此，我们需要创建一个custom.d.ts文件。 此文件表示我们项目中TypeScript的自定义定义。

declare module '*.ico' {
	const content: any;
	export default content;
}

// declare const $: any;

declare const common: any;
declare const React: any;
declare const ReactDom: any;
