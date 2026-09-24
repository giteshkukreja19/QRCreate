/**
 * QRCreate — Next-Gen QR & Barcode Studio Client Engine
 */

// App State
const state = {
    engine: "qr", // 'qr' | 'barcode'
    contentType: "url", // 'url'|'text'|'wifi'|'vcard'|'email'|'sms'|'upi'|'phone'|'geo'|'event'|'crypto'
    drawer: "dots", // 'dots'|'dashes'|'vertical'|'rounded'|'gapped'|'square'
    fillColor: "#000000",
    gradColor: "#000000",
    backColor: "#ffffff",
    gradientType: "none", // 'none'|'radial'|'horizontal'|'vertical'
    iconPreset: "none",
    logoData: null,
    logoSize: 0.22,
    logoPad: true,
    frameStyle: "none", // 'none'|'banner-bottom'|'banner-top'|'badge'|'polaroid'
    frameText: "SCAN ME",
    frameBg: "#18181b",
    errorCorrection: "H",
    border: 3,
    barcodeStandard: "code128",
    barcodeShowText: true,
    barHeight: 16,
    exportFormat: "png",
    exportSize: 1024,
    currentPayload: "",
    currentObjectUrl: null,
    rawSvgContent: null
};

// Preset SVGs for quick icons
const PRESET_ICONS = {
    link: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
    wifi: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" fill="none" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>`,
    github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" fill="#181717"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
    whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" fill="#25D366"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.77 14.12c-.24.67-1.38 1.28-1.92 1.35-.49.07-1.12.1-3.25-.79-2.73-1.14-4.5-3.89-4.64-4.07-.13-.18-1.1-1.46-1.1-2.79s.7-1.98.95-2.25c.25-.27.55-.34.73-.34.18 0 .37 0 .53.01.17.01.4.06.61.56.24.58.82 2.01.89 2.16.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.32.38-.46.51-.15.15-.31.31-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.08.18-.21.79-.92 1-1.23.21-.31.42-.26.71-.15.29.11 1.84.87 2.16 1.03.32.16.53.24.61.37.08.13.08.76-.16 1.43z"/></svg>`,
    upi: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`
};

// DOM References
const mainCodeImage = document.getElementById("mainCodeImage");
const previewLoader = document.getElementById("previewLoader");
const emptyPreview = document.getElementById("emptyPreview");
const metaLength = document.getElementById("metaLength");
const metaFormat = document.getElementById("metaFormat");
const metaStyle = document.getElementById("metaStyle");
const previewTypeBadge = document.getElementById("previewTypeBadge");
const contrastMeter = document.getElementById("contrastMeter");
const contrastIcon = document.getElementById("contrastIcon");
const contrastTitle = document.getElementById("contrastTitle");
const contrastRatio = document.getElementById("contrastRatio");

let debounceTimer = null;
let cameraStream = null;
let scanAnimationId = null;

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initEngineSwitcher();
    initContentTypeChips();
    initPatternSelector();
    initPaletteChips();
    initColorPickers();
    initLogoUpload();
    initFrames();
    initActionButtons();
    initScannerModal();
    initHistoryDrawer();
    initFormInputs();

    // Initial code generation
    updatePayload();
});

/* ==========================================================
   Theme Management (Dark / Light)
   ========================================================== */
function initTheme() {
    const themeBtn = document.getElementById("themeToggleBtn");
    const sunIcon = document.getElementById("themeIconSun");
    const moonIcon = document.getElementById("themeIconMoon");

    const savedTheme = localStorage.getItem("qrcreate_theme") || "light";

    setTheme(savedTheme);

    themeBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
    });

    function setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("qrcreate_theme", theme);
        if (theme === "dark") {
            sunIcon.hidden = false;
            moonIcon.hidden = true;
        } else {
            sunIcon.hidden = true;
            moonIcon.hidden = false;
        }
    }
}

/* ==========================================================
   Engine Switcher (QR Code vs 1D Barcode)
   ========================================================== */
function initEngineSwitcher() {
    const tabs = document.querySelectorAll(".segment-tab");
    const qrCategoryContainer = document.getElementById("qrCategoryContainer");
    const barcodeCategoryContainer = document.getElementById("barcodeCategoryContainer");
    const qrPatternSelector = document.getElementById("qrPatternSelector");
    const barcodeDensitySelector = document.getElementById("barcodeDensitySelector");
    const logoSection = document.getElementById("logoSectionContainer");
    const gradientGroup = document.getElementById("gradientColorGroup");
    const gradientSelector = document.getElementById("gradientSelectorGroup");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            state.engine = tab.dataset.engine;

            if (state.engine === "barcode") {
                qrCategoryContainer.hidden = true;
                barcodeCategoryContainer.hidden = false;
                qrPatternSelector.hidden = true;
                barcodeDensitySelector.hidden = false;
                logoSection.hidden = true;
                gradientGroup.hidden = true;
                gradientSelector.hidden = true;
                previewTypeBadge.textContent = "1D BARCODE";
            } else {
                qrCategoryContainer.hidden = false;
                barcodeCategoryContainer.hidden = true;
                qrPatternSelector.hidden = false;
                barcodeDensitySelector.hidden = true;
                logoSection.hidden = false;
                gradientGroup.hidden = false;
                gradientSelector.hidden = false;
                previewTypeBadge.textContent = "QR CODE";
            }

            updatePayload();
        });
    });

    // Barcode specific listeners
    document.getElementById("barcodeStandard").addEventListener("change", (e) => {
        state.barcodeStandard = e.target.value;
        scheduleRender();
    });

    document.getElementById("barcodeTextInput").addEventListener("input", () => {
        updatePayload();
    });

    document.getElementById("barcodeShowText").addEventListener("change", (e) => {
        state.barcodeShowText = e.target.checked;
        scheduleRender();
    });

    const barHeightSlider = document.getElementById("barHeightSlider");
    const barHeightVal = document.getElementById("barHeightVal");
    barHeightSlider.addEventListener("input", (e) => {
        state.barHeight = e.target.value;
        barHeightVal.textContent = `${e.target.value} mm`;
        scheduleRender();
    });
}

/* ==========================================================
   Content Types & Payload Generator
   ========================================================== */
function initContentTypeChips() {
    const chips = document.querySelectorAll(".type-chip");
    const panels = document.querySelectorAll(".input-panel");

    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            chips.forEach(c => c.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));

            chip.classList.add("active");
            state.contentType = chip.dataset.type;

            const targetPanel = document.getElementById(`panel-${state.contentType}`);
            if (targetPanel) {
                targetPanel.classList.add("active");
            }
            updatePayload();
        });
    });

    // Test URL button
    document.getElementById("testUrlBtn").addEventListener("click", () => {
        const url = document.getElementById("urlInput").value.trim();
        if (url) {
            window.open(url.startsWith("http") ? url : `https://${url}`, "_blank");
        }
    });

    // Wi-Fi auth toggle
    document.getElementById("wifiAuth").addEventListener("change", (e) => {
        const pwdGroup = document.getElementById("wifiPasswordGroup");
        pwdGroup.hidden = e.target.value === "nopass";
        updatePayload();
    });
}

function initFormInputs() {
    const inputs = document.querySelectorAll(
        "#panel-url input, #panel-text textarea, #panel-wifi input, #panel-wifi select, " +
        "#panel-vcard input, #panel-email input, #panel-email textarea, " +
        "#panel-sms input, #panel-sms textarea, #panel-upi input, " +
        "#panel-phone input, #panel-geo input, #panel-event input, " +
        "#panel-crypto input, #panel-crypto select"
    );

    inputs.forEach(input => {
        input.addEventListener("input", () => updatePayload());
        input.addEventListener("change", () => updatePayload());
    });
}

function updatePayload() {
    if (state.engine === "barcode") {
        state.currentPayload = document.getElementById("barcodeTextInput").value.trim();
        metaStyle.textContent = `Barcode (${state.barcodeStandard.toUpperCase()})`;
    } else {
        state.currentPayload = buildQrPayload(state.contentType);
        const drawerLabels = {
            dots: "● Dots (...)",
            dashes: "━ Dashes (--)",
            vertical: "┃ Vertical (||)",
            rounded: "▢ Rounded",
            gapped: "⊞ Gapped",
            square: "■ Classic"
        };
        metaStyle.textContent = drawerLabels[state.drawer] || state.drawer;
    }

    metaLength.textContent = `${state.currentPayload.length} chars`;
    scheduleRender();
}

function buildQrPayload(type) {
    switch (type) {
        case "url": {
            let url = document.getElementById("urlInput").value.trim();
            if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
                url = `https://${url}`;
            }
            return url || "https://github.com/giteshkukreja19/QRCreate";
        }
        case "text":
            return document.getElementById("textInput").value || "Welcome to QRCreate Studio!";
        case "wifi": {
            const ssid = document.getElementById("wifiSsid").value || "Home_WiFi";
            const auth = document.getElementById("wifiAuth").value;
            const pwd = document.getElementById("wifiPassword").value;
            const hidden = document.getElementById("wifiHidden").checked;
            return `WIFI:T:${auth};S:${ssid};P:${auth === "nopass" ? "" : pwd};H:${hidden};;`;
        }
        case "vcard": {
            const first = document.getElementById("vcardFirst").value || "Gitesh";
            const last = document.getElementById("vcardLast").value || "Kukreja";
            const phone = document.getElementById("vcardPhone").value || "+1234567890";
            const email = document.getElementById("vcardEmail").value || "hello@example.com";
            const org = document.getElementById("vcardOrg").value;
            const title = document.getElementById("vcardTitle").value;
            const url = document.getElementById("vcardUrl").value;

            return [
                "BEGIN:VCARD",
                "VERSION:3.0",
                `N:${last};${first};;;`,
                `FN:${first} ${last}`,
                phone ? `TEL;TYPE=CELL:${phone}` : "",
                email ? `EMAIL:${email}` : "",
                org ? `ORG:${org}` : "",
                title ? `TITLE:${title}` : "",
                url ? `URL:${url}` : "",
                "END:VCARD"
            ].filter(Boolean).join("\n");
        }
        case "email": {
            const to = document.getElementById("emailTo").value;
            const sub = encodeURIComponent(document.getElementById("emailSubject").value);
            const body = encodeURIComponent(document.getElementById("emailBody").value);
            return `mailto:${to}?subject=${sub}&body=${body}`;
        }
        case "sms": {
            const phone = document.getElementById("smsPhone").value;
            const msg = document.getElementById("smsMessage").value;
            return `SMSTO:${phone}:${msg}`;
        }
        case "upi": {
            const vpa = document.getElementById("upiVpa").value || "merchant@upi";
            const name = encodeURIComponent(document.getElementById("upiName").value || "Merchant");
            const amt = document.getElementById("upiAmount").value;
            const note = encodeURIComponent(document.getElementById("upiNote").value || "");
            let upiUrl = `upi://pay?pa=${vpa}&pn=${name}`;
            if (amt) upiUrl += `&am=${amt}&cu=INR`;
            if (note) upiUrl += `&tn=${note}`;
            return upiUrl;
        }
        case "phone": {
            const ph = document.getElementById("phoneInput").value;
            return `tel:${ph}`;
        }
        case "geo": {
            const lat = document.getElementById("geoLat").value || "37.7749";
            const lng = document.getElementById("geoLng").value || "-122.4194";
            return `geo:${lat},${lng}`;
        }
        case "event": {
            const title = document.getElementById("eventTitle").value || "Special Event";
            const start = document.getElementById("eventStart").value.replace(/[-:]/g, "");
            const end = document.getElementById("eventEnd").value.replace(/[-:]/g, "");
            const loc = document.getElementById("eventLocation").value;
            return [
                "BEGIN:VCALENDAR",
                "VERSION:2.0",
                "BEGIN:VEVENT",
                `SUMMARY:${title}`,
                start ? `DTSTART:${start}00Z` : "",
                end ? `DTEND:${end}00Z` : "",
                loc ? `LOCATION:${loc}` : "",
                "END:VEVENT",
                "END:VCALENDAR"
            ].filter(Boolean).join("\n");
        }
        case "crypto": {
            const curr = document.getElementById("cryptoCurrency").value;
            const addr = document.getElementById("cryptoAddress").value;
            const amt = document.getElementById("cryptoAmount").value;
            return `${curr}:${addr}${amt ? `?amount=${amt}` : ""}`;
        }
        default:
            return "QRCreate";
    }
}

/* ==========================================================
   Pattern & Module Drawer Controls (Dots, Dashes, Stripes)
   ========================================================== */
function initPatternSelector() {
    const cards = document.querySelectorAll(".pattern-card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            state.drawer = card.dataset.drawer;
            updatePayload();
        });
    });
}

/* ==========================================================
   Colors, Gradients & Palettes
   ========================================================== */
function initPaletteChips() {
    const chips = document.querySelectorAll(".palette-chip");
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            chips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");

            state.fillColor = chip.dataset.fill;
            state.gradColor = chip.dataset.grad;
            state.backColor = chip.dataset.back;
            state.gradientType = chip.dataset.gradient;

            syncColorPickers();
            scheduleRender();
        });
    });
}

function initColorPickers() {
    const fillInput = document.getElementById("colorFill");
    const fillHex = document.getElementById("colorFillHex");
    const gradInput = document.getElementById("colorGrad");
    const gradHex = document.getElementById("colorGradHex");
    const backInput = document.getElementById("colorBack");
    const backHex = document.getElementById("colorBackHex");

    function bindColor(input, hexText, key) {
        input.addEventListener("input", (e) => {
            state[key] = e.target.value;
            hexText.value = e.target.value;
            evaluateContrast();
            scheduleRender();
        });
        hexText.addEventListener("change", (e) => {
            let val = e.target.value.trim();
            if (!val.startsWith("#")) val = "#" + val;
            if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                state[key] = val;
                input.value = val;
                evaluateContrast();
                scheduleRender();
            }
        });
    }

    bindColor(fillInput, fillHex, "fillColor");
    bindColor(gradInput, gradHex, "gradColor");
    bindColor(backInput, backHex, "backColor");

    // Gradient pill options
    const gradientOptions = document.querySelectorAll(".pill-option");
    gradientOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            gradientOptions.forEach(o => o.classList.remove("active"));
            opt.classList.add("active");
            state.gradientType = opt.dataset.gradient;
            scheduleRender();
        });
    });
}

function syncColorPickers() {
    document.getElementById("colorFill").value = state.fillColor;
    document.getElementById("colorFillHex").value = state.fillColor;
    document.getElementById("colorGrad").value = state.gradColor;
    document.getElementById("colorGradHex").value = state.gradColor;
    document.getElementById("colorBack").value = state.backColor;
    document.getElementById("colorBackHex").value = state.backColor;

    document.querySelectorAll(".pill-option").forEach(opt => {
        opt.classList.toggle("active", opt.dataset.gradient === state.gradientType);
    });

    evaluateContrast();
}

/* ==========================================================
   Real-Time WCAG Contrast & Scannability Calculator
   ========================================================== */
function evaluateContrast() {
    function hexToLuminance(hex) {
        let c = hex.replace("#", "");
        if (c.length === 3) c = c.split("").map(x => x + x).join("");
        const rgb = [0, 2, 4].map(i => parseInt(c.substr(i, 2), 16) / 255);
        const srgb = rgb.map(val => val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4));
        return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    }

    try {
        const l1 = hexToLuminance(state.fillColor);
        const l2 = hexToLuminance(state.backColor);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        const rounded = ratio.toFixed(1);

        contrastRatio.textContent = `Contrast Ratio: ${rounded}:1`;
        contrastMeter.className = "scannability-banner";

        if (ratio >= 7.0) {
            contrastMeter.classList.add("scannability-excellent");
            contrastIcon.textContent = "🟢";
            contrastTitle.textContent = "Great Contrast";
            contrastRatio.textContent = `Contrast ${rounded}:1 · Ready for all cameras`;
        } else if (ratio >= 3.0) {
            contrastMeter.classList.add("scannability-warning");
            contrastIcon.textContent = "🟡";
            contrastTitle.textContent = "Moderate Contrast";
            contrastRatio.textContent = `Contrast ${rounded}:1 · Best in good lighting`;
        } else {
            contrastMeter.classList.add("scannability-poor");
            contrastIcon.textContent = "🔴";
            contrastTitle.textContent = "Low Contrast";
            contrastRatio.textContent = `Contrast ${rounded}:1 · Might fail camera scan`;
        }
    } catch {
        // Fallback
    }
}

/* ==========================================================
   Logo & Center Icon Overlay
   ========================================================== */
function initLogoUpload() {
    const iconButtons = document.querySelectorAll(".icon-preset-btn");
    const dropzone = document.getElementById("logoDropzone");
    const fileInput = document.getElementById("logoFileInput");
    const previewContainer = document.getElementById("logoUploadedPreview");
    const logoThumb = document.getElementById("logoThumb");
    const logoFileName = document.getElementById("logoFileName");
    const removeBtn = document.getElementById("removeLogoBtn");
    const dropContent = dropzone.querySelector(".dropzone-content");

    // Preset Quick Icons
    iconButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            iconButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            state.iconPreset = btn.dataset.icon;

            if (state.iconPreset === "none") {
                state.logoData = null;
                previewContainer.hidden = true;
                dropContent.hidden = false;
            } else if (PRESET_ICONS[state.iconPreset]) {
                const svgString = PRESET_ICONS[state.iconPreset];
                // Rasterize SVG to PNG so Python PIL can open it without error
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = 160;
                    canvas.height = 160;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, 160, 160);
                    state.logoData = canvas.toDataURL("image/png");
                    logoThumb.src = state.logoData;
                    logoFileName.textContent = `${state.iconPreset.toUpperCase()} icon`;
                    previewContainer.hidden = false;
                    dropContent.hidden = true;
                    scheduleRender();
                };
                img.src = "data:image/svg+xml;base64," + btoa(svgString);
                return;
            }
            scheduleRender();
        });
    });

    // Custom File Upload
    dropzone.addEventListener("click", (e) => {
        if (e.target !== removeBtn) fileInput.click();
    });

    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.style.borderColor = "var(--accent-primary)";
    });

    dropzone.addEventListener("dragleave", () => {
        dropzone.style.borderColor = "";
    });

    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.style.borderColor = "";
        if (e.dataTransfer.files.length) {
            handleLogoFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length) {
            handleLogoFile(e.target.files[0]);
        }
    });

    function handleLogoFile(file) {
        if (!file.type.startsWith("image/")) {
            showToast("Please upload a valid image file", "error");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            state.logoData = e.target.result;
            state.iconPreset = "custom";
            iconButtons.forEach(b => b.classList.remove("active"));
            logoThumb.src = state.logoData;
            logoFileName.textContent = file.name;
            previewContainer.hidden = false;
            dropContent.hidden = true;
            scheduleRender();
            showToast("Logo loaded successfully!", "success");
        };
        reader.readAsDataURL(file);
    }

    removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        state.logoData = null;
        state.iconPreset = "none";
        iconButtons.forEach(b => b.classList.toggle("active", b.dataset.icon === "none"));
        previewContainer.hidden = true;
        dropContent.hidden = false;
        fileInput.value = "";
        scheduleRender();
    });

    // Sliders
    const sizeSlider = document.getElementById("logoSizeSlider");
    const sizeVal = document.getElementById("logoSizeVal");
    sizeSlider.addEventListener("input", (e) => {
        state.logoSize = e.target.value / 100;
        sizeVal.textContent = `${e.target.value}%`;
        scheduleRender();
    });

    document.getElementById("logoPadCheckbox").addEventListener("change", (e) => {
        state.logoPad = e.target.checked;
        scheduleRender();
    });
}

/* ==========================================================
   Frames & Call To Action (CTA)
   ========================================================== */
function initFrames() {
    const frameCards = document.querySelectorAll(".frame-style-card");
    const frameOptions = document.getElementById("frameOptionsContainer");
    const frameTextInput = document.getElementById("frameTextInput");
    const frameBgColor = document.getElementById("frameBgColor");
    const frameBgHex = document.getElementById("frameBgColorHex");

    frameCards.forEach(card => {
        card.addEventListener("click", () => {
            frameCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            state.frameStyle = card.dataset.frame;
            frameOptions.hidden = state.frameStyle === "none";
            scheduleRender();
        });
    });

    frameTextInput.addEventListener("input", (e) => {
        state.frameText = e.target.value;
        scheduleRender();
    });

    frameBgColor.addEventListener("input", (e) => {
        state.frameBg = e.target.value;
        frameBgHex.value = e.target.value;
        scheduleRender();
    });

    frameBgHex.addEventListener("change", (e) => {
        let val = e.target.value.trim();
        if (!val.startsWith("#")) val = "#" + val;
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
            state.frameBg = val;
            frameBgColor.value = val;
            scheduleRender();
        }
    });

    // Advanced Quality Settings
    document.getElementById("errorCorrectionSelect").addEventListener("change", (e) => {
        state.errorCorrection = e.target.value;
        scheduleRender();
    });

    const borderSlider = document.getElementById("borderSlider");
    const borderVal = document.getElementById("borderVal");
    borderSlider.addEventListener("input", (e) => {
        state.border = parseInt(e.target.value, 10);
        borderVal.textContent = `${state.border} Blocks`;
        scheduleRender();
    });
}

/* ==========================================================
   Rendering & Server Generation API
   ========================================================== */
function scheduleRender() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        renderCode();
    }, 100);
}

async function renderCode() {
    if (!state.currentPayload.trim()) {
        emptyPreview.hidden = false;
        mainCodeImage.hidden = true;
        return;
    }

    previewLoader.hidden = false;
    emptyPreview.hidden = true;

    const exportFormat = document.getElementById("exportFormatSelect").value;
    const exportSize = parseInt(document.getElementById("exportSizeSelect").value, 10);

    const config = {
        code_type: state.engine,
        text: state.currentPayload,
        format: exportFormat,
        box_size: Math.max(6, Math.round(exportSize / 40)),
        border: state.border,
        fill_color: state.fillColor,
        back_color: state.backColor,
        gradient_type: state.gradientType,
        gradient_color: state.gradColor,
        drawer: state.drawer,
        error_correction: state.errorCorrection,
        logo_data: state.logoData,
        logo_size: state.logoSize,
        logo_pad: state.logoPad,
        frame_style: state.frameStyle,
        frame_text: state.frameText,
        frame_bg: state.frameBg,
        frame_color: "#ffffff",
        barcode_format: state.barcodeStandard,
        show_text: state.barcodeShowText,
        bar_height: parseFloat(state.barHeight)
    };

    try {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(config)
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const mime = response.headers.get("Content-Type") || "image/png";

        if (mime.includes("svg")) {
            const svgText = await response.text();
            state.rawSvgContent = svgText;
            const blob = new Blob([svgText], { type: "image/svg+xml" });
            updatePreviewImage(blob);
            metaFormat.textContent = "SVG (Vector)";
        } else {
            const blob = await response.blob();
            state.rawSvgContent = null;
            updatePreviewImage(blob);
            metaFormat.textContent = `${exportFormat.toUpperCase()} (${exportSize}px)`;
        }

        saveToHistory({
            type: state.engine,
            payload: state.currentPayload,
            style: state.drawer,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

    } catch (err) {
        console.error("Render failed:", err);
        showToast("Rendering error: " + err.message, "error");
    } finally {
        previewLoader.hidden = true;
    }
}

function updatePreviewImage(blob) {
    if (state.currentObjectUrl) {
        URL.revokeObjectURL(state.currentObjectUrl);
    }
    state.currentObjectUrl = URL.createObjectURL(blob);
    mainCodeImage.src = state.currentObjectUrl;
    mainCodeImage.hidden = false;
}

/* ==========================================================
   Action & Export Buttons
   ========================================================== */
function initActionButtons() {
    document.getElementById("exportFormatSelect").addEventListener("change", () => renderCode());
    document.getElementById("exportSizeSelect").addEventListener("change", () => renderCode());

    // Download Button
    document.getElementById("downloadMainBtn").addEventListener("click", () => {
        if (!state.currentObjectUrl) return;
        const fmt = document.getElementById("exportFormatSelect").value;
        const filename = `qrcreate-${state.engine}-${Date.now()}.${fmt}`;

        const a = document.createElement("a");
        a.href = state.currentObjectUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        showToast(`Downloaded ${filename}`, "success");
    });

    // Copy Image to Clipboard
    document.getElementById("copyImageBtn").addEventListener("click", async () => {
        if (!mainCodeImage.src) return;
        try {
            // Create canvas to render PNG blob for clipboard
            const canvas = document.createElement("canvas");
            canvas.width = mainCodeImage.naturalWidth || 800;
            canvas.height = mainCodeImage.naturalHeight || 800;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(mainCodeImage, 0, 0);

            canvas.toBlob(async (blob) => {
                if (!blob) throw new Error("Could not create image blob");
                await navigator.clipboard.write([
                    new ClipboardItem({ "image/png": blob })
                ]);
                showToast("Copied PNG Image to clipboard! 📋", "success");
            }, "image/png");
        } catch (err) {
            console.error(err);
            showToast("Clipboard copy failed. Try download instead.", "error");
        }
    });

    // Copy SVG Code
    document.getElementById("copySvgBtn").addEventListener("click", async () => {
        if (state.rawSvgContent) {
            await navigator.clipboard.writeText(state.rawSvgContent);
            showToast("Copied SVG Vector code! 📋", "success");
        } else {
            // Render SVG on the fly
            try {
                const res = await fetch("/api/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        code_type: state.engine,
                        text: state.currentPayload,
                        format: "svg",
                        fill_color: state.fillColor,
                        back_color: state.backColor
                    })
                });
                const svgText = await res.text();
                await navigator.clipboard.writeText(svgText);
                showToast("Copied SVG Vector code! 📋", "success");
            } catch (err) {
                showToast("Failed to copy SVG: " + err.message, "error");
            }
        }
    });

    // Copy Text Payload
    document.getElementById("copyPayloadBtn").addEventListener("click", async () => {
        if (!state.currentPayload) return;
        await navigator.clipboard.writeText(state.currentPayload);
        showToast("Copied content payload! 📋", "success");
    });

    // Print Layout
    document.getElementById("printBtn").addEventListener("click", () => {
        window.print();
    });

    // Reset Defaults
    document.getElementById("resetDefaultsBtn").addEventListener("click", () => {
        state.fillColor = "#000000";
        state.gradColor = "#000000";
        state.backColor = "#ffffff";
        state.gradientType = "none";
        state.drawer = "dots";
        state.frameStyle = "none";
        state.logoData = null;
        state.iconPreset = "none";
        syncColorPickers();
        initPatternSelector();
        initLogoUpload();
        updatePayload();
        showToast("Settings reset to default", "info");
    });
}

/* ==========================================================
   QR & Barcode Scanner / Decoder Modal
   ========================================================== */
function initScannerModal() {
    const modal = document.getElementById("scannerModal");
    const openBtn = document.getElementById("scannerBtn");
    const closeBtn = document.getElementById("closeScannerModalBtn");
    const tabs = document.querySelectorAll(".scanner-tab");
    const filePanel = document.getElementById("scannerFilePanel");
    const cameraPanel = document.getElementById("scannerCameraPanel");
    const fileInput = document.getElementById("scanFileInput");
    const dropzone = document.getElementById("scanImageDropzone");
    const resultBox = document.getElementById("scanResultBox");
    const resultText = document.getElementById("scanResultText");
    const resultFormat = document.getElementById("scanResultFormat");
    const toggleCamBtn = document.getElementById("toggleCameraBtn");
    const cameraVideo = document.getElementById("cameraVideo");
    const cameraCanvas = document.getElementById("cameraCanvas");
    const cameraSelect = document.getElementById("cameraSourceSelect");

    function closeModal() {
        modal.hidden = true;
        modal.style.display = "none";
        stopCamera();
    }

    function openModal() {
        modal.hidden = false;
        modal.style.display = "flex";
    }

    // Ensure initial state is hidden
    closeModal();

    openBtn.addEventListener("click", () => {
        openModal();
    });

    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Global escape listener
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (!modal.hidden) closeModal();
            const drawer = document.getElementById("historyDrawer");
            if (drawer && !drawer.hidden) {
                drawer.hidden = true;
                drawer.style.display = "none";
            }
        }
    });

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            const mode = tab.dataset.scanMode;
            if (mode === "camera") {
                filePanel.hidden = true;
                cameraPanel.hidden = false;
                startCamera();
            } else {
                filePanel.hidden = false;
                cameraPanel.hidden = true;
                stopCamera();
            }
        });
    });

    // File Dropzone
    dropzone.addEventListener("click", () => fileInput.click());
    dropzone.addEventListener("dragover", (e) => e.preventDefault());
    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) decodeImageFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length) decodeImageFile(e.target.files[0]);
    });

    function decodeImageFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                if (window.jsQR) {
                    const code = jsQR(imageData.data, imageData.width, imageData.height);
                    if (code) {
                        displayScanResult(code.data, "QR_CODE");
                        return;
                    }
                }

                // Check BarcodeDetector API if supported
                if ("BarcodeDetector" in window) {
                    const detector = new BarcodeDetector();
                    detector.detect(img)
                        .then(barcodes => {
                            if (barcodes.length) {
                                displayScanResult(barcodes[0].rawValue, barcodes[0].format);
                            } else {
                                showToast("No QR code or barcode detected in image", "warning");
                            }
                        })
                        .catch(() => showToast("Could not detect barcode", "warning"));
                } else {
                    showToast("No readable code found in image", "warning");
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Camera handling
    async function startCamera() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(d => d.kind === "videoinput");
            cameraSelect.innerHTML = videoDevices.map(d => `<option value="${d.deviceId}">${d.label || "Camera"}</option>`).join("");

            const constraints = {
                video: { facingMode: "environment" }
            };

            cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
            cameraVideo.srcObject = cameraStream;
            toggleCamBtn.textContent = "Stop Camera";
            requestAnimationFrame(scanCameraFrame);
        } catch (err) {
            console.error("Camera access error:", err);
            showToast("Camera access denied or unavailable", "error");
        }
    }

    function stopCamera() {
        if (cameraStream) {
            cameraStream.getTracks().forEach(t => t.stop());
            cameraStream = null;
        }
        cancelAnimationFrame(scanAnimationId);
        toggleCamBtn.textContent = "Start Camera";
    }

    toggleCamBtn.addEventListener("click", () => {
        if (cameraStream) stopCamera();
        else startCamera();
    });

    function scanCameraFrame() {
        if (cameraVideo.readyState === cameraVideo.HAVE_ENOUGH_DATA) {
            cameraCanvas.width = cameraVideo.videoWidth;
            cameraCanvas.height = cameraVideo.videoHeight;
            const ctx = cameraCanvas.getContext("2d");
            ctx.drawImage(cameraVideo, 0, 0, cameraCanvas.width, cameraCanvas.height);
            const imageData = ctx.getImageData(0, 0, cameraCanvas.width, cameraCanvas.height);

            if (window.jsQR) {
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                    displayScanResult(code.data, "QR_CODE");
                    stopCamera();
                    return;
                }
            }
        }
        scanAnimationId = requestAnimationFrame(scanCameraFrame);
    }

    function displayScanResult(data, format) {
        resultBox.hidden = false;
        resultText.value = data;
        resultFormat.textContent = format.toUpperCase();
        showToast("Code decoded successfully! 🎉", "success");
    }

    document.getElementById("copyDecodedBtn").addEventListener("click", () => {
        navigator.clipboard.writeText(resultText.value);
        showToast("Decoded text copied!", "success");
    });

    document.getElementById("loadIntoEditorBtn").addEventListener("click", () => {
        const val = resultText.value;
        closeModal();

        if (state.engine === "barcode") {
            document.getElementById("barcodeTextInput").value = val;
        } else {
            // Check if URL
            if (val.startsWith("http://") || val.startsWith("https://")) {
                document.querySelector('.type-chip[data-type="url"]').click();
                document.getElementById("urlInput").value = val;
            } else {
                document.querySelector('.type-chip[data-type="text"]').click();
                document.getElementById("textInput").value = val;
            }
        }
        updatePayload();
        showToast("Loaded decoded text into QRCreate!", "success");
    });
}

/* ==========================================================
   History & Saved Presets
   ========================================================= */
function initHistoryDrawer() {
    const historyBtn = document.getElementById("historyBtn");
    const drawer = document.getElementById("historyDrawer");
    const closeBtn = document.getElementById("closeHistoryBtn");
    const clearBtn = document.getElementById("clearHistoryBtn");
    const countBadge = document.getElementById("historyCountBadge");

    function closeDrawer() {
        drawer.hidden = true;
        drawer.style.display = "none";
    }

    function openDrawer() {
        renderHistoryList();
        drawer.hidden = false;
        drawer.style.display = "flex";
    }

    // Ensure initial state is hidden
    closeDrawer();

    updateHistoryBadge();

    historyBtn.addEventListener("click", () => {
        openDrawer();
    });

    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeDrawer();
    });

    clearBtn.addEventListener("click", () => {
        localStorage.removeItem("qrcreate_history");
        renderHistoryList();
        updateHistoryBadge();
        showToast("History cleared", "info");
    });

    function updateHistoryBadge() {
        const history = JSON.parse(localStorage.getItem("qrcreate_history") || "[]");
        if (history.length > 0) {
            countBadge.textContent = history.length;
            countBadge.hidden = false;
        } else {
            countBadge.hidden = true;
        }
    }
}

function saveToHistory(item) {
    let history = JSON.parse(localStorage.getItem("qrcreate_history") || "[]");
    // Avoid duplicate top item
    if (history.length > 0 && history[0].payload === item.payload) return;
    history.unshift(item);
    if (history.length > 20) history.pop();
    localStorage.setItem("qrcreate_history", JSON.stringify(history));

    const badge = document.getElementById("historyCountBadge");
    badge.textContent = history.length;
    badge.hidden = false;
}

function renderHistoryList() {
    const historyList = document.getElementById("historyList");
    const history = JSON.parse(localStorage.getItem("qrcreate_history") || "[]");

    if (history.length === 0) {
        historyList.innerHTML = `<p style="text-align:center; color:var(--text-tertiary); padding:30px 0;">No items in history yet.</p>`;
        return;
    }

    historyList.innerHTML = history.map((item, idx) => `
        <div class="history-card" data-index="${idx}">
            <div class="history-info">
                <div class="history-text">${escapeHtml(item.payload)}</div>
                <div class="history-time">${item.type.toUpperCase()} • ${item.style} • ${item.timestamp}</div>
            </div>
            <button class="btn-inline" onclick="restoreHistoryItem(${idx})">Load</button>
        </div>
    `).join("");
}

window.restoreHistoryItem = function(index) {
    const history = JSON.parse(localStorage.getItem("qrcreate_history") || "[]");
    const item = history[index];
    if (!item) return;

    if (item.type === "barcode") {
        document.querySelector('.segment-tab[data-engine="barcode"]').click();
        document.getElementById("barcodeTextInput").value = item.payload;
    } else {
        document.querySelector('.segment-tab[data-engine="qr"]').click();
        document.querySelector('.type-chip[data-type="text"]').click();
        document.getElementById("textInput").value = item.payload;
    }

    document.getElementById("historyDrawer").hidden = true;
    updatePayload();
    showToast("Restored from history!", "success");
};

/* ==========================================================
   Toast Notification System
   ========================================================== */
function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(8px) scale(0.95)";
        toast.style.transition = "all 0.2s ease";
        setTimeout(() => toast.remove(), 200);
    }, 2800);
}

function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}
