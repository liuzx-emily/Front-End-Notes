## extensions
- Beautify
- Chinese (Simplified) Language Pack for Visual Studio Code
- Element UI Snippets
- GitHub
- JavaScript Snippet Pack
- Markdown All in One
- Material Icon Theme
- One Dark Pro
- Path Intellisense
- Power Mode
- Sublime Text Keymap and Settings Importer
- Vetur

## keybindings
1. ctrl+shift+p，搜索“快捷方式”
2. 点击“打开键盘快捷方式(JSON)”

## settings
1. ctrl+shift+p，搜索“设置”
2. 点击“打开设置(JSON)”

# 修改emmet

文件路径：  
{VSC安装路径}\resources\app\extensions\emmet\node_modules\vscode-emmet-helper\out\expand\expand-full.js

```js
// 5052行，添加
"button" : "button[type=button]",

// 5658行，修改
const defaultVariables = {
	lang: 'zh-cmn-Hans',
	locale: 'zh-CN',
	charset: 'UTF-8'
};
```


## 设置字体 FiraCode
https://github.com/tonsky/FiraCode
下载安装完成之后，在settings中设置。如果没有生效，尝试重启vscode。