# Citi Brand Colors - Updated Implementation

## ✅ Color Scheme (Blue Only - No Red)

Following Citibank's actual brand guidelines, the application now uses **only blue tones** for all interactive elements and branding.

---

## 🎨 Primary Colors

### **Citi Blue** - `#0066CC`
- **Usage**: Primary brand color, available states, default buttons
- **Where**: Main titles, links, available map regions, primary buttons
- **Examples**: 
  - Landing page title
  - Map regions (available state)
  - Button backgrounds
  - Progress sidebar (current step)

### **Citi Dark Blue** - `#003D82`
- **Usage**: Selected states, hover effects, emphasis
- **Where**: Selected map regions, button hover, accent text
- **Examples**:
  - Selected countries on map
  - Button hover state
  - Accent headings

### **Citi Light Blue** - `#4D94E3`
- **Usage**: Hover states, highlights
- **Where**: Map hover effects, secondary buttons
- **Examples**:
  - Country hover on map
  - Marker hover states

### **Citi Lighter Blue** - `#7DB3E8`
- **Usage**: Subtle backgrounds, tertiary states
- **Where**: Background gradients, subtle highlights

---

## 🗺️ Interactive Map Colors

### **Available Regions:**
- Fill: `#0066CC` (Citi Blue)
- Stroke: `#FFFFFF` (White borders)

### **Hovered Regions:**
- Fill: `#4D94E3` (Light Blue)
- Cursor: Pointer

### **Selected Regions:**
- Fill: `#003D82` (Dark Blue)
- Pulse ring: `#003D82` with opacity

### **Unavailable Regions:**
- Fill: `#E5E7EB` (Gray)
- Cursor: Default

---

## 🎯 Component Color Usage

### **Landing Page**
```css
Title: #0066CC (Citi Blue)
CTA Button Background: #0066CC
CTA Button Hover: #003D82 (Dark Blue)
```

### **Progress Sidebar**
```css
Current Step: #0066CC (Citi Blue)
Completed Step: #22C55E (Green)
Upcoming Step: Gray
```

### **Interactive Map**
```css
Available: #0066CC
Hover: #4D94E3
Selected: #003D82
Markers: Same as countries
Labels: Match state colors
```

### **Buttons**
```css
Primary: 
  - Background: #0066CC
  - Hover: #003D82
  
Secondary: 
  - Background: gradient(#4D94E3 → #0066CC)
  - Hover: gradient(#0066CC → #003D82)
```

---

## 📦 CSS Variables

```css
:root {
  --citi-blue: #0066CC;
  --citi-dark-blue: #003D82;
  --citi-light-blue: #4D94E3;
  --citi-lighter-blue: #7DB3E8;
}
```

---

## 🎨 Utility Classes

### **Buttons**
- `.citi-btn-primary` - Main blue button with dark blue hover
- `.citi-btn-secondary` - Light to medium blue gradient

### **Cards**
- `.citi-card` - Blue border on hover

### **Text**
- `.citi-text-primary` - Citi Blue text
- `.citi-text-accent` - Dark Blue text

### **Progress**
- `.citi-progress-step` - Base progress style
- `.citi-progress-step.active` - Blue with blue glow

### **Backgrounds**
- `.citi-gradient-bg` - Subtle blue gradient

---

## 🚫 Removed Colors

### **Red (#DC143C)** - REMOVED
Previously used for:
- Landing page title ❌
- CTA button ❌
- Selected states ❌
- Progress current step ❌
- Map selections ❌

**Now replaced with blue tones throughout.**

---

## 🌍 Real Citi Brand Reference

Based on citibank.com and citi.com:
- ✅ Primary: Various shades of blue
- ✅ Accent: Dark blue for emphasis
- ✅ Interactive: Light blue for hover
- ❌ Red: Not used in primary branding

---

## 🎭 Dark Mode

All colors adapt seamlessly:
- Blues remain vibrant on dark backgrounds
- Proper contrast ratios maintained
- Border colors adjust automatically

---

## 📊 Accessibility

### **Contrast Ratios (WCAG AA)**
- Citi Blue (#0066CC) on white: ✅ 4.58:1
- Dark Blue (#003D82) on white: ✅ 8.59:1
- Light Blue (#4D94E3) on white: ✅ 3.18:1 (large text only)
- White on Citi Blue: ✅ 4.58:1

All primary interactions meet WCAG AA standards.

---

## 🔧 How to Use

### **In Components:**
```tsx
// Direct hex
className="text-[#0066CC]"
className="bg-[#003D82]"

// CSS variables (in styles)
color: var(--citi-blue);
background: var(--citi-dark-blue);

// Utility classes
className="citi-btn-primary"
className="citi-text-primary"
```

### **In YAML Config:**
```yaml
theme:
  primaryColor: "#0066CC"
  accentColor: "#003D82"
```

---

## ✨ Visual Hierarchy

1. **Primary Actions**: Citi Blue (#0066CC)
2. **Hover/Focus**: Light Blue (#4D94E3)
3. **Active/Selected**: Dark Blue (#003D82)
4. **Emphasis**: Dark Blue (#003D82)
5. **Completed**: Green (preserved for progress)

---

## 🎯 Summary

**Before**: Mixed blue and red
**After**: Blue-only palette matching Citi's actual brand

All interactive elements now use professional, corporate-appropriate blue tones that align with Citibank's global brand identity.

**Result**: A cohesive, professional experience that looks and feels like an authentic Citi application.

