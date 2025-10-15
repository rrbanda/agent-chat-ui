# Interactive World Map - Implementation Guide

## ✅ What's Been Added

An interactive, clickable world map for Question 2 (Location selection) with:
- **Real geographic boundaries** using world atlas data
- **Clickable regions**: NA, South America, Europe, Asia Pacific, China, Middle East & Africa
- **Visual feedback**: Hover effects, selection states, and markers
- **Citi branding**: Blue (#0066CC) for available, Red (#DC143C) for selected
- **Smooth animations**: Pulse effects on hover/selection
- **Legend**: Shows available vs selected regions

---

## 🗺️ Features

### **User Interactions:**
1. **Click countries** - Click any country within a region to select it
2. **Click markers** - Click the labeled markers (bubbles) on the map
3. **Hover effects** - Countries/regions light up on hover
4. **Visual feedback** - Selected regions turn red with pulse animation

### **Regional Coverage:**
- **North America**: USA, Canada, Mexico (marker at center US)
- **South America**: Brazil, Argentina, Chile, etc. (marker at center SA)
- **Europe**: UK, Germany, France, Poland, etc. (marker at central Europe)
- **Asia Pacific**: India, Singapore, Hong Kong, Japan, Australia (marker at India)
- **China**: Separate region with its own marker
- **Middle East & Africa**: UAE, Saudi Arabia, South Africa, etc.

### **Visual Design:**
- Countries colored by region availability
- White borders between countries
- Pulse animation on selection
- Labels with text shadows for readability
- Legend in bottom-right corner
- Selected region displayed below map

---

## 🎨 Styling

### **Color Scheme:**
- **Available regions**: Citi Blue (`#0066CC`)
- **Hovered regions**: Light Blue (`#4D94E3`)
- **Selected regions**: Citi Red (`#DC143C`)
- **Unavailable**: Gray (`#E5E7EB`)

### **Dark Mode:**
- Fully supported
- Map container adapts to dark theme
- Legend has dark background
- All colors optimized for both themes

---

## 🔧 Configuration

### **Add/Remove Regions:**

Edit `config/tech-explorer.yaml`:

```yaml
regions:
  - id: "new_region"
    label: "New Region"
    countries: ["Country1", "Country2"]
```

### **Update Region Mapping:**

Edit `src/components/tech-explorer/InteractiveWorldMap.tsx`:

```typescript
const regionConfig = {
  new_region: {
    countries: ['ISO', 'CODE', 'LIST'], // 3-letter ISO codes
    marker: { 
      coordinates: [longitude, latitude], 
      label: 'Display Name' 
    }
  }
};
```

### **Country ISO Codes:**
Use 3-letter ISO codes (e.g., USA, GBR, DEU, IND, CHN)
Full list: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3

---

## 📊 Technical Details

### **Library Used:**
- `react-simple-maps` v3.0.0
- Uses world-atlas data from CDN
- D3-based projections (Mercator)

### **Component Structure:**
```
InteractiveWorldMap
├── ComposableMap (container)
│   ├── Geographies (countries)
│   │   └── Geography (individual countries)
│   └── Markers (regional labels)
│       └── Marker (clickable bubbles)
└── Legend (bottom-right)
```

### **Props:**
```typescript
interface InteractiveWorldMapProps {
  regions: Region[];  // From YAML config
  onRegionSelect: (regionId: string, regionLabel: string) => void;
}
```

---

## 🎯 User Experience Flow

1. User sees "Where are you based?" question
2. Interactive world map loads with all regions
3. User hovers over countries → they light up in light blue
4. User clicks a country or marker → region turns red
5. Pulse animation shows selection
6. Selected region name displays below map
7. User automatically advances to next question

---

## 🐛 Troubleshooting

### **Map not showing:**
- Check browser console for errors
- Verify CDN is accessible: https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json
- Check React version compatibility (v19 works despite peer dependency warning)

### **Region not clickable:**
- Verify region ID in YAML matches `regionConfig` keys
- Check country ISO codes are correct
- Ensure `isRegionAvailable()` returns true

### **Wrong countries highlighted:**
- Update ISO codes in `regionConfig.countries` array
- Use 3-letter codes (not 2-letter)

### **Marker position wrong:**
- Adjust `coordinates: [longitude, latitude]` in `regionConfig`
- Longitude: -180 to 180 (negative = West)
- Latitude: -90 to 90 (negative = South)

---

## 🚀 Enhancements

### **Possible Improvements:**

1. **Zoom functionality:**
   - Add zoom controls
   - Allow users to zoom into regions

2. **Country-level selection:**
   - Select specific countries instead of regions
   - Show country names on hover

3. **Search/Filter:**
   - Add search box to find countries
   - Filter by region type

4. **Animations:**
   - Smooth transitions between selections
   - Animated path highlighting

5. **Tooltips:**
   - Show country names on hover
   - Display region info

6. **Mobile optimization:**
   - Touch gestures for zoom/pan
   - Larger clickable areas

---

## 📝 Notes

- **Performance**: Map renders ~200+ countries efficiently
- **Accessibility**: Keyboard navigation not yet implemented (enhancement opportunity)
- **Responsive**: Works on all screen sizes, scales automatically
- **CDN dependency**: Requires internet for world atlas data
- **Fallback**: Could add static fallback if CDN fails

---

## ✨ Example Config

```yaml
# In tech-explorer.yaml
regions:
  - id: "north_america"  # Must match regionConfig key
    label: "North America"  # Display name
    countries: ["USA", "Canada", "Mexico"]  # For reference only
```

```typescript
// In InteractiveWorldMap.tsx
north_america: {
  countries: ['USA', 'CAN', 'MEX'],  // ISO codes for highlighting
  marker: { 
    coordinates: [-100, 45],  // Longitude, Latitude
    label: 'North America'  // Marker label
  }
}
```

---

## 🎉 Result

A beautiful, interactive world map that:
- ✅ Matches Citi brand guidelines
- ✅ Provides intuitive UX
- ✅ Works in light & dark mode
- ✅ Scales to any screen size
- ✅ Gives clear visual feedback
- ✅ Integrates seamlessly with questionnaire flow

**Test it now!** Navigate to Question 2 and try clicking different countries/regions.

