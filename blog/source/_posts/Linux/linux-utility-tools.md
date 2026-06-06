title: "Linux 实用工具与调试命令"
date: 2020-11-09 23:00:00
updated: 2026-06-05 23:00:00
categories:
- Linux Tree
- Misc
tags: [Linux, Tools]
---

日常开发和调试中，用好 Linux 下的各种工具能事半功倍。本文记录了除基础命令外，一些非常实用但又容易被忽略的工具和技巧。

## 系统调试

### 查看内核/设备信息

```bash
# 查看内核 Oops 信息
objdump -dS vmlinux > /tmp/kernel.s
objdump -t vmlinux

# 查看内核模块符号
nm -n char.ko
ld char.ko --print-map

# 查看内存布局
cat /proc/iomem
cat /sys/kernel/debug/memblock/reserved

# 查看 MTD 分区
cat /proc/mtd

# 查看内核配置中的 debugfs
zgrep -i debugfs /proc/config.gz

# 实时查看内核日志
dmesg -w
```

<!--more-->

### 设备与驱动

```bash
# 查看 udev 设备信息
udevadm info /dev/video33

# 查看谁注册了 v4l2 设备
find /sys/ -name video4linux
ls -l /sys/class/video4linux

# 查看 USB 设备树
lsusb -t

# 查看系统文件描述符
lsof

# 配置网络（终端界面版）
nmtui

# 查看路由表
route -n
```

## 网络工具

### 网络延时模拟

使用 `tc` 命令模拟网络延迟，便于测试网络应用的健壮性：

```bash
# 添加 100ms 延迟
sudo tc qdisc add dev eth0 root netem delay 100ms

# 验证
ping 8.8.8.8   # time 会显示 110ms 左右

# 删除规则
sudo tc qdisc del dev eth0 root
```

### 其他网络命令

```bash
# hosts 文件测试（nslookup 不读 hosts，ping 才读）
echo "1.1.1.1 lee1.com lee2.com" >> /etc/hosts
ping lee1.com   # 正确测试方式

# 检查远程端口是否可达
echo > /dev/tcp/<server_ip>/<port>

nslookup        # DNS 查询
telnet          # 远程连接/端口测试
ethtool         # 网卡信息查看
netstat         # 网络连接状态
```

## 文件操作进阶

```bash
# 批量查找并替换文件内容
find Git/ -type f -exec sed -i 's/oldstring/newstring/g' {} \;

# 查找并移动所有 .md 文件
find <source> -iname '*.md' -exec mv '{}' <dest> \;

# 查找图片文件并移动
find <source> -name '*' -exec file {} \; \
  | grep -o -P '^.+: \w+ image' \
  | cut -d':' -f1 \
  | xargs -I{} cp -v {} <dest>

# 显示文件路径的真实路径
grep pattern files | xargs realpath

# 给 find 结果取目录名
find . -type f | xargs dirname | sort -u
```

## 实用系统工具

### 脚本对话框 - whiptail

```bash
#!/bin/bash
whiptail --yesno "would you like to continue?" 10 40
RESULT=$?
if [ $RESULT = 0 ]; then
  echo "you clicked yes"
else
  echo "you clicked no"
fi
```

### 文件安全删除 - shred

```bash
shred -u <file>   # 覆写文件内容后再删除，难以恢复
```

### 文件分割 - split

```bash
split --lines 2 prefix_   # 每 2 行分割成一个文件
# 输出: prefix_aa, prefix_ab, ...
```

### 行号显示 - nl

```bash
cat <file> | nl            # 显示行号
ls | nl -s ":" -w 1        # 自定义分隔符和宽度
echo -e "one\ntwo\nthree" | nl
less -N <file>             # less 也支持行号显示
```

### 文件锁 - flock

防止脚本重复执行：

```bash
LOCKFILE=/tmp/lockfile
already_locked() {
  echo "lock is already held, exiting"
  exit 1
}
exec 200>$LOCKFILE
flock -n 200 || already_locked
echo "lock obtained, proceeding"
sleep 10
echo "releasing lock, done"
# 脚本退出时自动释放锁
```

### 按名称杀进程 - killall

```bash
killall -I <Application>   # -I 忽略大小写
```

### 历史命令编辑 - fc

```bash
fc          # 用编辑器编辑上一条命令
Ctrl + x + e   # 在当前终端打开编辑器编辑命令
```

### 修改文件时间戳 - touch

```bash
touch -t 2104250101 <file>   # 将时间戳改为 2021-04-25 01:01
touch -r <file1> <file2>     # 用 file1 的时间戳设置 file2
```

## 进程与日志

### Android 调试

```bash
# 清空 log 缓存并抓取 kernel 日志
adb logcat -c
adb logcat -G 256M
adb logcat -v threadtime -b main -b crash -b kernel 1 \
  | tee log-$(date "+%Y%m%d-%H%M%S").log
```

### 进程管理

```bash
# 后台运行并避免终端关闭影响
nohup foo | cat &

# 使用 subshell 防止目录切换影响当前 shell
(
  cd "${foo}"
  # 在子 shell 中操作，不影响父 shell
)

# 使用 pushd/popd 替代 cd .. / cd -
pushd "${foo}"
# 操作...
popd
```

## Tmux 终端复用

```bash
# 设置 256 色
echo 'set -g default-terminal "screen-256color"' >> ~/.tmux.conf

# 附加到已存在的 session（保留历史）
tmux a -dt <session>

# Tmux 常用快捷键
# C-b .      # 移动窗口
# C-b :      # 进入命令行模式
# C-b ,      # 重命名窗口
# 绑定快捷键切换窗口
bind -n C-S-Left swap-window -t -1
bind -n C-S-Right swap-window -t +1
```

## 小乐趣

```bash
sl -F   # 终端小火车，apt install sl 后试试
```

## 实用 Shell 函数

日常工作中积累的一些自定义函数，写入 `~/.bashrc` 或 `~/.zshrc` 即可使用。

### 带时间戳的日志输出

```bash
# 用法: msg "要记录的信息"
# 输出: MSG:2025-06-05 23:30:00: 要记录的信息
function msg() {
    if [ "$1" = "-h" ]; then
        cat << EOF
Usages of msg:
    $ msg "log info..."
    $ msg "hello" "world"
EOF
    else
        echo "MSG:$(date): $*"
    fi
}
```

在脚本中追踪执行进度时非常实用，尤其是需要和日志文件一起分析时。

### 批量修改文件扩展名

```bash
# 用法: batch_extensions <目录路径> <新扩展名>
# 示例: batch_extensions ~/test sh
function batch_extensions() {
    if [ "$1" = "-h" ]; then
        cat << 'EOF'
Usages of batch_extensions:
    $1: The path where you want to change the extensions.
    $2: The extension what you want to change to.
    Example: batch_extensions ~/test sh
EOF
    else
        for file in "$1"/*; do
            mv "$file" "$file.$2"
        done
    fi
}
```

> **注意**：原版使用 `` `ls $1/*` ``，这里改成了 `"$1"/*` 避免文件名含空格或特殊字符时出错。

## 参考

- [Bash Cheat Sheet](https://bertvv.github.io/cheat-sheets/Bash.html)
- [GNU Stow 管理 dotfiles](https://linuxconfig.org/how-to-use-gnu-stow-to-manage-programs-installed-from-source-and-dotfiles)
- `man make` / `man tc`
