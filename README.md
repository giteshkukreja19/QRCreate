# QRCreate — Next-Gen QR & Barcode Studio 🚀

A fast, customizable, 100% local and private QR Code and Barcode design studio built with Python (`qrcode`, `pillow`, `python-barcode`) and modern Vanilla JS/CSS.

![QRCreate Interface](https://img.shields.io/badge/Engine-Python%20qrcode%20%2B%20Pillow-blue)
![Privacy](https://img.shields.io/badge/Privacy-100%25%20Local-success)
![Styles](https://img.shields.io/badge/Styles-Dots%20%7C%20Dashes%20%7C%20Gradients%20%7C%20Barcodes-purple)

---

## ✨ Features

### 1. 🎨 Multi-Style QR Module Patterns
- **● Dots (`...`)**: Circular dot matrix pattern.
- **━ Dashes (`--`)**: Horizontal bar aesthetic.
- **┃ Vertical (`||`)**: Vertical barcode-style stripe pattern.
- **▢ Rounded**: Smooth curved square pebbles.
- **⊞ Gapped**: Modern tech grid with distinct square spacing.
- **■ Classic**: Traditional crisp standard QR code.

### 2. 📊 1D Barcode Studio
- **Code 128** (Universal alphanumeric)
- **Code 39** (Logistics & Inventory)
- **EAN-13 & EAN-8** (Retail products)
- **UPC-A** (North American retail standard)
- **ISBN-13** (Books & publications)
- **ITF-14** (Shipping & packaging)
- **Codabar** (Libraries & logistics)
- Customizable bar height & human-readable text toggling.

### 3. 🌈 Color Themes & Dynamic Gradients
- Radial Glow, Horizontal (→), and Vertical (↓) color gradients.
- Curated presets: *Midnight Navy*, *Cyberpunk Neon*, *Royal Emerald*, *Sunset Glow*, *Ruby Crimson*, and *Monochrome*.
- **Real-Time WCAG Contrast & Scannability Gauge** with instant contrast ratio calculations.

### 4. 🖼️ Logos, Center Icons & Scannability Cushion
- Preset brand icons (Wi-Fi, Link, Mail, Star, Shield, GitHub, WhatsApp, UPI).
- Drag-and-drop custom logo upload (PNG, SVG, JPG, WebP).
- Automatic protective scannability pad/cushion.

### 5. 🏷️ Frames & Call to Action (CTA)
- Bottom Banner (*"SCAN ME"*, *"CONNECT TO WI-FI"*, *"SCAN TO PAY"*, custom text).
- Top Header Banner.
- Polaroid Photo Card.
- Modern Pill Badge.

### 6. 📱 11 Rich Content Formats
- 🔗 **URL / Website Links**
- 📝 **Plain Text / Code / Notes**
- 📶 **Wi-Fi Auto-Connect** (WPA/WPA2/WPA3, WEP, Open, Hidden)
- 👤 **vCard Contact Cards**
- ✉️ **Pre-filled Email**
- 💬 **SMS Messages**
- 💳 **UPI Instant Payments**
- 📞 **Phone Calls**
- 📍 **Map Coordinates (Geo)**
- 📅 **Calendar Events (iCal)**
- ₿ **Crypto Addresses** (Bitcoin, Ethereum, Solana, USDT)

### 7. 🔍 Built-in QR & Barcode Scanner
- Drag-and-drop image file decoder.
- Live camera/webcam scanner.
- 1-click load decoded text back into generator.

### 8. 💾 Export & Sharing
- **PNG** (512px, 1024px HD, 2048px 2K, 4096px Ultra 4K).
- **SVG** (Infinite Lossless Vector).
- **WebP & JPEG**.
- **1-Click Copy Image directly to Clipboard** (paste directly into Figma, Word, Slack!).
- **Print Template** & History Drawer (`localStorage`).

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
python3 -m pip install "qrcode[pil]" python-barcode
```

### 2. Run Locally
```bash
python3 app.py
```

### 3. Open in Browser
Open `http://127.0.0.1:8000`

---

## 🔒 100% Privacy Guarantee
- All QR codes and Barcodes are rendered directly on your local machine.
- Zero telemetry, no external tracking, no cloud dependencies.
