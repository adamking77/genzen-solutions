# Mobile Responsiveness

The Astro Swiss Theme is built with mobile-first responsive design principles. All components are designed to work seamlessly across all device sizes.

## Responsive Design Principles

The theme uses Tailwind CSS's responsive utility classes to create adaptive layouts:

- **Mobile-first approach**: Base styles target mobile devices, with enhancements for larger screens
- **Breakpoints**: Uses Tailwind's default breakpoints (sm, md, lg, xl, 2xl)
- **Flexible grids**: Components use CSS Grid and Flexbox for adaptive layouts

## Responsive Components

All UI components in the theme are designed to be responsive:

- **Buttons**: Maintain proper sizing and spacing on all devices
- **Cards**: Adapt layout and padding based on screen size
- **Navigation**: Transforms to mobile-friendly menu on smaller screens
- **Forms**: Inputs and controls adjust for touch targets on mobile

## Customizing Responsive Behavior

You can customize responsive behavior by:

1. **Using responsive props**: Many components accept responsive props
   ```astro
   <Button class="w-full sm:w-auto">Responsive Button</Button>
   ```

2. **Extending Tailwind config**: Add custom breakpoints in your `tailwind.config.cjs`
   ```js
   theme: {
     extend: {
       screens: {
         'xs': '480px',
         '3xl': '1920px'
       }
     }
   }
   ```

3. **Creating responsive variants**: Use Tailwind's responsive modifiers
   ```css
   @layer utilities {
     .responsive-padding {
       @apply px-4 sm:px-6 lg:px-8;
     }
   }
   ```

## Best Practices

- **Test on real devices**: Always test your implementation on actual mobile devices
- **Touch targets**: Ensure interactive elements are at least 44px in size
- **Viewport meta**: The theme includes proper viewport meta tags
- **Performance**: Responsive images and lazy loading for better mobile performance