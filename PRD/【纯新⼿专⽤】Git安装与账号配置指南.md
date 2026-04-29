# 【必读】Git 安装与账号配置指南
> 在写任何代码之前，必须完成本文档的所有步骤。  
> **账号必须与你提交给 Austin 的 GitHub 用户名完全一致，否则你的提交记录无法被识别，PR 无法被合并。**

---

## 重要提醒：账号一致性

你在 Git 里配置的邮箱，**必须是你 GitHub 账号注册时用的那个邮箱**。

> 如果你不确定自己 GitHub 账号的邮箱是什么：  
> 打开 [github.com](https://github.com) → 右上角头像 → Settings → Emails → 看 Primary email address

把这个邮箱记下来，后面配置 Git 时要用到。

---

## 第一部分：安装 Git

### Mac 用户

**方法一：通过 Homebrew 安装（推荐）**

1. 打开 Terminal（按 `Command + Space`，输入 `terminal`，回车）

2. 检查是否已安装 Homebrew：
   ```bash
   brew --version
   ```
   - 如果显示版本号（如 `Homebrew 4.x.x`），说明已安装，跳到第 4 步
   - 如果显示 `command not found`，继续第 3 步

3. 安装 Homebrew（复制整行粘贴到 Terminal，回车）：
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
   过程中会提示输入 Mac 登录密码，输入时屏幕不会显示任何字符，这是正常的，输完按回车。

4. 安装 Git：
   ```bash
   brew install git
   ```

5. 验证安装成功：
   ```bash
   git --version
   ```
   看到 `git version 2.x.x` 说明安装成功。

---

**方法二：通过 Xcode Command Line Tools 安装**

1. 打开 Terminal
2. 输入：
   ```bash
   git --version
   ```
3. 如果 Git 未安装，Mac 会自动弹出对话框询问是否安装 Command Line Tools，点击 **Install**，等待完成即可。

---

### Windows 用户

1. 打开浏览器，访问 [git-scm.com/download/win](https://git-scm.com/download/win)

2. 点击 **64-bit Git for Windows Setup** 下载安装包（`.exe` 文件）

3. 双击打开安装包，安装过程中遇到以下选项按说明处理：

   | 安装步骤 | 选择 |
   |---------|------|
   | Select Components | 保持默认，直接 Next |
   | Choosing the default editor | 选 **Visual Studio Code**（如果你用 VS Code）|
   | Adjusting the name of initial branch | 选 **Override**，输入 `main` |
   | Adjusting your PATH environment | 选 **Git from the command line and also from 3rd-party software** |
   | 其余所有步骤 | 全部保持默认，一路 Next → Install |

4. 安装完成后，打开 **Git Bash**（在开始菜单搜索 `git bash`）

5. 验证安装成功：
   ```bash
   git --version
   ```
   看到 `git version 2.x.x` 说明安装成功。

> **Windows 用户注意：** 后续所有需要在终端输入的命令，都在 **Git Bash** 里输入，不要用 Windows 自带的 cmd 或 PowerShell。

---

## 第二部分：配置 Git 账号

这一步告诉 Git「我是谁」，每次提交代码时，Git 会自动把你的名字和邮箱记录进去。

**Mac 用 Terminal，Windows 用 Git Bash。**

### 第一步：配置用户名

```bash
git config --global user.name "你的GitHub用户名"
```

**举例：**
```bash
git config --global user.name "austinchennn"
```

> 这里填的是你的 **GitHub 用户名**（不是昵称，不是邮箱）。  
> GitHub 用户名在哪里看：登录 GitHub → 右上角头像 → Your profile → 页面上 `@` 后面那个就是。

---

### 第二步：配置邮箱

```bash
git config --global user.email "你的GitHub注册邮箱"
```

**举例：**
```bash
git config --global user.email "someone@gmail.com"
```

> ⚠️ **这里的邮箱必须和你 GitHub 账号的 Primary Email 完全一致（大小写也要一样）。**  
> 如果不一致，你的提交记录不会显示在 GitHub 上，负责人看不到你做了什么。

---

### 第三步：验证配置正确

```bash
git config --global --list
```

你会看到类似这样的输出：
```
user.name=austinchennn
user.email=someone@gmail.com
```

对照检查：
- `user.name` 是你的 GitHub 用户名 ✅
- `user.email` 是你 GitHub 注册邮箱 ✅

如果发现写错了，重新执行第一步或第二步，输入正确的值覆盖即可。

---

### 第四步：配置默认分支名称为 main

```bash
git config --global init.defaultBranch main
```

> 这一步确保你新建仓库时默认分支叫 `main`，和我们项目保持一致。

---

## 第三部分：安装并配置 GitHub Desktop

GitHub Desktop 是 GitHub 官方提供的图形化工具，让你不用记命令也能完成 Push、Pull、PR 等操作。

### 安装 GitHub Desktop

**Mac：**
1. 访问 [desktop.github.com](https://desktop.github.com)
2. 点击 **Download for macOS**
3. 下载完成后，把 `GitHub Desktop.app` 拖入 Applications 文件夹
4. 打开 GitHub Desktop

**Windows：**
1. 访问 [desktop.github.com](https://desktop.github.com)
2. 点击 **Download for Windows**
3. 双击下载的 `.exe` 安装包，按提示完成安装
4. 打开 GitHub Desktop

---

### 登录 GitHub 账号

1. 打开 GitHub Desktop，看到欢迎页面
2. 点击 **Sign in to GitHub.com**
3. 浏览器会自动打开，登录你的 GitHub 账号
4. 登录成功后浏览器会显示「Open GitHub Desktop?」，点击 **Open GitHub Desktop**
5. 回到 GitHub Desktop，看到你的头像和用户名说明登录成功

---

### 验证 GitHub Desktop 里的账号信息

登录后需要确认 GitHub Desktop 使用的名字和邮箱与你在终端配置的一致。

**Mac：** 顶部菜单栏 → **GitHub Desktop** → **Settings** → **Git**  
**Windows：** 顶部菜单栏 → **File** → **Options** → **Git**

你会看到：

```
Name:   你的GitHub用户名
Email:  你的GitHub注册邮箱
```

如果这里的信息不对，直接在输入框里改成正确的值，点击 **Save**。

> GitHub Desktop 的 Git 配置和终端里的 `git config` 是同一套，改一个另一个会同步。

---

### 克隆项目仓库到本地

1. 在 GitHub Desktop 里，点击左上角 **File** → **Clone Repository**
2. 选择 **GitHub.com** 标签
3. 在搜索框输入 `CSSA-Web`，找到 `austinchennn/CSSA-Web`（或组织名/CSSA-Web）
4. 点击项目，选择本地保存路径（建议放在桌面或专门的项目文件夹）
5. 点击 **Clone**，等待下载完成

克隆完成后，GitHub Desktop 左上角会显示仓库名 `CSSA-Web`，说明成功了。

---

## 第四部分：检查清单（完成后对照确认）

在群里发送「Git 配置完成」之前，请自己逐项确认：

- [ ] 终端输入 `git --version` 能看到版本号
- [ ] `git config --global --list` 显示的 `user.name` 是我的 GitHub 用户名
- [ ] `git config --global --list` 显示的 `user.email` 是我 GitHub 账号的 Primary Email
- [ ] GitHub Desktop 已安装，已登录我的 GitHub 账号
- [ ] GitHub Desktop → Settings/Options → Git 里的 Name 和 Email 与上面一致
- [ ] CSSA-Web 仓库已克隆到本地，能在 GitHub Desktop 里看到

---

## 常见问题

**Q：安装 Homebrew 的命令运行了很久没反应？**  
A：正常，国内网络较慢，等待即可。如果超过 30 分钟没有进展，联系 Austin。

**Q：Windows 安装 Git 时不知道选哪个编辑器？**  
A：选 Visual Studio Code。如果没有 VS Code，选 Notepad++ 或直接用默认的 Vim（不影响使用）。

**Q：`git config` 里的邮箱和 GitHub 邮箱不一样，已经改了，之前的提交怎么办？**  
A：之前已提交的记录无法更改，但从现在开始的新提交会用正确的邮箱。及早发现及早改，问题不大。

**Q：GitHub Desktop 登录时浏览器没有自动跳转？**  
A：手动回到 GitHub Desktop，点击 **Open in Browser** 重试，或者重启 GitHub Desktop 再试一次。

**Q：克隆仓库时提示 `Repository not found`？**  
A：说明你还没有被加入项目。联系 Austin 把你的 GitHub 用户名提交给他，等他邀请你加入仓库后再克隆。

---

> 文档维护：Austin  
> 最后更新：2026-04-29
