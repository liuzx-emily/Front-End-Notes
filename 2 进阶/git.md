- git是版本控制工具。github是远程仓库。
- 工作区 =>  暂存区 => 版本库 => 远程仓库

常用命令：
- `git status`
- `git log` (commit多时一次显示不全，按enter显示更多，按q退出)
- 提交
  - `git add` 工作区 => 暂存区
  - `git commit -m <提交信息>` 暂存区 => 版本库
  - `git commit -m <提交信息> -a` 工作区 => 版本库

- 撤销修改
  - `git checkout <文件名>` 工作区（先在暂存区中找，再去版本库中找）
  - `git reset` 暂存区（撤销从工作区提上来的修改）
  - `git commit --ammend` 撤销&合并提交  
	举例：希望同时commit两个文件，但是手滑只commit了一个文件。利用 --amend 在上一次commit上追加
	```
    git add 1.txt
    git commit -m "commit1"
    git add 2.txt
    git commit -m "commit2" --amend
	```

- 对比
	- `git diff` 工作区 暂存区
	- `git diff --staged` 暂存区 版本库
	- `git diff master` 工作区 版本库（master是分支名字）

