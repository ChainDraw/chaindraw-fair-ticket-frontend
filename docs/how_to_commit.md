# How to commit

## 格式

```bash
<类型>(<范围>): <主题>
<空行>
<具体的修改内容>
<空行>
<BREAKING CHANGE 或修复的 issue 链接>
```

```bash
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

🌰：

- feat(login): login
- fix(admin): 票务标题修改
- docs: update readme

## 类型说明

- feat：新功能（feature）。
- fix：修复 bug，可以是 QA 发现的 BUG，也可以是研发自己发现的 BUG。
- docs：文档（documentation）。
- style：格式（不影响代码运行的变动）。
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）。
- perf：优化相关，比如提升性能、体验。
- test：增加测试。
- chore：构建过程或辅助工具的变动。
- revert：回滚到上一个版本。
- merge：代码合并。
- sync：同步主线或分支的 Bug。
- WIP：Work In Progress，表示正在进行中的工作，这种提交类型通常用于暂存工作进度，而不是最终提交到代码库中。
