title: "Linux 终端效率提升技巧"
date: 2020-06-01 22:00:00
updated: 2020-06-01 22:00:00
categories:
- Linux Tree
- Shell
tags: [Linux, Tips]
---

日常使用 Linux 终端时，掌握一些高效的快捷键和技巧可以大幅提升工作效率。本文整理了 Bash 终端中常用的效率技巧。

## 历史命令操作

```bash
# 重复上一条命令
!!

# 获取上一条命令的所有参数
!*

# 获取上一条命令的最后一个参数
!$

# 反向搜索历史命令（持续按 Ctrl + R 继续向上搜索）
Ctrl + r

# 允许多个终端同时写历史文件
shopt -s histappend

# 查看最常使用的历史命令
history | awk 'BEGIN {FS="[ \t]+|\\|"} {print $3}' | sort | uniq -c | sort -nr | head
```

<!--more-->

## 文件与导航

```bash
# 自动纠正目录拼写错误
shopt -s cdspell
$ cd /tpm   # 自动跳转到 /tmp

# 设置 CDPATH，可在任意路径下快速跳转
export CDPATH='~:/var/log:/etc'
$ cd fonts   # 跳转到 /etc/fonts

# 回到上一个目录
cd -

# 使用大括号扩展复制/重命名
cp test.sh{,.old}     # test.sh -> test.sh.old
mv test.sh.bk{,}      # test.sh.bk -> test.sh

# 批量重命名文件
rename 's/text_to_find/been_renamed/' *.txt

# 查看最近更新的文件
ls -lrRt | grep ^- | awk 'END{print $NF}'
```

## Bash 快捷键速查表

### 编辑类

| 快捷键 | 作用 |
|--------|------|
| `Ctrl + _` | 撤销 |
| `Ctrl + t` | 交换两个字符 |
| `Alt + t` | 交换两个单词 |
| `Alt + .` | 粘贴上一条命令的最后一个参数 |
| `Ctrl + x + *` | 展开通配符 |
| `Ctrl + x + Ctrl + e` | 在编辑器中打开当前命令 |
| `Ctrl + u` | 剪切光标前的所有内容 |
| `Ctrl + k` | 剪切光标后的所有内容 |
| `Ctrl + y` | 粘贴剪切的内容 |

### 光标移动

| 快捷键 | 作用 |
|--------|------|
| `Ctrl + a` | 光标移动到行首 |
| `Ctrl + e` | 光标移动到行尾 |
| `Ctrl + xx` | 光标在当前位置和行首之间切换 |
| `Alt + f` | 向前移动一个单词 |
| `Alt + b` | 向后移动一个单词 |
| `Ctrl + 方向键` | 按单词移动 |

### 屏幕控制

| 快捷键 | 作用 |
|--------|------|
| `Ctrl + l` | 清屏 |
| `Ctrl + s` | 暂停前台正在运行的命令 |
| `Ctrl + q` | 恢复暂停的命令 |
| `Ctrl + shift + c/v` | 复制/粘贴（终端内） |

## 颜色配置

配置 `.bash_profile` 让终端更有可读性：

```bash
# 启用颜色
eval "`dircolors -b`"

# ls 始终带颜色和类型标识
alias ls='ls -hF --color=auto'
alias dir='ls --color=auto --format=long'

# grep 高亮结果
export GREP_OPTIONS='--color=auto'

# LESS/MAN 页面颜色
export LESS_TERMCAP_mb=$'\E[01;31m'
export LESS_TERMCAP_md=$'\E[01;33m'
export LESS_TERMCAP_me=$'\E[0m'
export LESS_TERMCAP_se=$'\E[0m'
export LESS_TERMCAP_so=$'\E[01;42;30m'
export LESS_TERMCAP_ue=$'\E[0m'
export LESS_TERMCAP_us=$'\E[01;36m'
```

## 命令执行与控制

```bash
# 顺序执行命令
&&     # 第一个命令成功后才执行第二个
;      # 无论第一个命令是否成功都执行第二个

# 重定向
2>&1   # 将标准错误和标准输出都重定向到同一个文件

# 检查命令类型
command -V ls       # 查看 ls 是别名、内置命令还是可执行文件
command -V shopt    # shopt is a shell builtin
```

## 高级技巧

### 目录栈管理

```bash
# pushd/popd 用于目录收藏，像栈一样管理目录
pushd /var/log      # 切换到 /var/log 并加入栈
pushd -n /etc       # 将 /etc 加入栈但不切换
dirs -l -v          # 查看目录栈
popd                # 弹出栈顶目录并切换

# 相比 cd .. / cd - 更方便管理和回溯
```

### 使用 `less +F` 替代 `tail -f`

```bash
less +F /var/log/syslog
# Ctrl + c 停止跟随，shift + f 继续跟随，q 退出
```

### Shell 调试选项

```bash
bash -n script.sh   # 只检查语法，不执行
bash -x script.sh   # 执行并打印每个命令（调试模式）
bash -u script.sh   # 使用未定义变量时报错
bash -v script.sh   # 打印读取的输入
```

### 其他实用命令

```bash
dmesg -w            # 实时查看内核日志
reset               # 重置终端（当终端显示乱码时）
find -iname "xxx*" -type f -mtime +1   # 查找一天前修改过的文件
```

## 参考

- [BERTVV's Bash Cheat Sheet](https://bertvv.github.io/cheat-sheets/Bash.html)
- `man bash`
- `bind -p` 查看所有绑定的快捷键
