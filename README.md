# Dynamic Color Generator

## Overview

This package provides utility functions for generating color palettes based on a base RGB color. It offers tools to convert between RGB and HSL color spaces, generate random colors, and create color variations while maintaining the original color's saturation and lightness.

## Installation

```bash
npm install dynamic-color-generator
```

## Functions

### `generateColors(n, rgb?)`

Generates a series of colors based on a base RGB color.

- `n`: Number of colors to generate
- `rgb` (optional): Base RGB color as an array `[r, g, b]`. If not provided, a random color will be used.

#### Example:

```javascript
const { generateColors } = require("dynamic-color-generator");

// Generate 5 colors from a random base color
const colors = generateColors(5);

// Generate 5 colors from a specific base color
const specificColors = generateColors(5, [255, 0, 0]); // Red base
```

### `generateVariables(n, rgb?)`

Generates CSS custom properties (variables) with the generated colors.

- `n`: Number of colors to generate
- `rgb` (optional): Base RGB color as an array `[r, g, b]`

#### Example:

```javascript
const { generateVariables } = require("dynamic-color-generator");

// Create 3 CSS variables with colors from a random base
generateVariables(3);

// Create 3 CSS variables with colors from a blue base
generateVariables(3, [0, 0, 255]);
```

The generated variables will be named `--color-1`, `--color-2`, etc., and can be used in CSS like:

```css
.element {
  background-color: var(--color-1);
  color: var(--color-2);
}
```

## Color Conversion Utilities

The package includes internal utility functions for color space conversion:

- `rgbToHsl(r, g, b)`: Converts RGB to HSL
- `hslToRgb(h, s, l)`: Converts HSL to RGB
- `generateRandomColor()`: Generates a random RGB color

## How It Works

The color generation algorithm works by:

1. Converting the base RGB color to HSL
2. Generating new colors by varying the hue while keeping saturation and lightness constant
3. Converting back to RGB

This ensures that generated colors are harmonious and maintain a similar visual "feel" to the base color.

## License

MIT License

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on the GitHub repository.
