function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let h = 0, s = 0, l = (max + min) / 2;
    if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        switch (max) {
            case r: h = (g - b) / delta + (g < b ? 6 : 0); break;
            case g: h = (b - r) / delta + 2; break;
            case b: h = (r - g) / delta + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}

function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) r = g = b = l;
    else {
        const hueToRgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return [r, g, b];
}


function generateColors(n, rgb = null) {
    if (!rgb) {
        rgb = generateRandomColor()
    }

    if (!Array.isArray(rgb) || rgb.length !== 3) {
        throw new Error("Invalid rgb value: Expected an array with 3 elements.");
    }
    const [r, g, b] = rgb;
    const [h, s, l] = rgbToHsl(r, g, b);
    const colors = [];
    for (let i = 0; i < n; i++) {
        const newHue = (h + i / n) % 1;
        const [newR, newG, newB] = hslToRgb(newHue, s, l);
        colors.push(`rgb(${newR}, ${newG}, ${newB})`);
    }
    return colors;
}

function generateVariables(n, rgb = null) {
    const colors = generateColors(n, rgb);
    const root = document.documentElement;
    colors.forEach((color, index) => {
        root.style.setProperty(`--color-${index + 1}`, color);
    });
}

module.exports = {
    generateColors,
    generateVariables,
};
