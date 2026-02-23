# Installing OpenClaw on Linux Mint (Ubuntu-based)

This guide covers installing OpenClaw on Linux Mint 21+ (Ubuntu 22.04 LTS base).

## Requirements

| Requirement | Version |
|-------------|---------|
| Node.js     | >= 22.12.0 |
| pnpm        | >= 10.23.0 |
| OS          | Linux Mint 21+ (Ubuntu 22.04+) |

## System Dependencies

Install build tools and native dependencies:

```bash
sudo apt update
sudo apt install -y \
  build-essential \
  pkg-config \
  curl \
  wget \
  git \
  ca-certificates \
  libasound2-dev \
  libssl-dev \
  libffi-dev \
  libpam0g-dev \
  python3 \
  python3-pip
```

### Optional: Rust (for node-llama-cpp)

Required only if using local AI models via `node-llama-cpp`:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
```

### Optional: libvips (for sharp image processing)

```bash
sudo apt install -y libvips-dev
```

## Node.js Installation

### Option 1: Using OpenClaw installer (recommended)

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

This automatically handles Node.js 22+ installation.

### Option 2: Manual Node.js installation (no snap/flatpak)

Using NodeSource repository:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify installation:

```bash
node --version  # Should be >= 22.12.0
```

### Option 3: Using nvm (Node Version Manager)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
```

## Install OpenClaw

### From npm (recommended)

```bash
sudo npm install -g openclaw
```

### From GitHub checkout

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
pnpm install
pnpm build
```

Add to PATH if needed:

```bash
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## Verify Installation

```bash
openclaw --version
openclaw doctor
```

## Memory Optimization Tips

### For systems with limited RAM (< 4GB)

1. **Disable unused channels**: Edit `~/.openclaw/openclaw.json`:

```json
{
  "channels": {
    "disabled": ["discord", "slack", "telegram"]
  }
}
```

2. **Reduce concurrent connections**: Set in config:

```json
{
  "gateway": {
    "maxConnections": 5
  }
}
```

3. **Use swap if needed**:

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### For headless servers

Set environment variable before running:

```bash
export SHARP_IGNORE_GLOBAL_LIBVIPS=1
export OPENCLAW_HEADLESS=1
```

## Troubleshooting

### sharp / libvips errors

```bash
SHARP_IGNORE_GLOBAL_LIBVIPS=1 openclaw ...
```

Or install libvips:

```bash
sudo apt install libvips-dev
```

### node-pty build failures

Ensure build-essential and python3 are installed, then:

```bash
npm rebuild node-pty
```

### PAM authentication issues

```bash
sudo apt install libpam0g-dev
npm rebuild authenticate-pam
```

### PATH not updated

Add to `~/.bashrc`:

```bash
export PATH="$HOME/.npm-global/bin:$PATH"
```

Then reload:

```bash
source ~/.bashrc
```

## Running as a Service

### Systemd user service

Create `~/.config/systemd/user/openclaw.service`:

```ini
[Unit]
Description=OpenClaw Gateway

[Service]
Type=simple
Environment=SHARP_IGNORE_GLOBAL_LIBVIPS=1
ExecStart=/home/%u/.npm-global/bin/openclaw gateway --bind 127.0.0.1 --port 18789
Restart=on-failure

[Install]
WantedBy=default.target
```

Enable and start:

```bash
systemctl --user daemon-reload
systemctl --user enable openclaw.service
systemctl --user start openclaw.service
```
