/**
 * Navigation interaction handler
 * Manages scroll effects, mobile menu, and smooth scrolling
 */
class NavigationManager {
  constructor() {
    this.nav = null;
    this.navContentContainer = null;
    this.navLogo = null;
    this.desktopNavLinks = [];
    this.themeToggleDesktopContainer = null;
    this.mobileMenuButton = null;
    this.menuIcon = null;
    this.xIcon = null;
    this.mobileMenu = null;
    this.isMobileMenuOpen = false;
    
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupElements());
    } else {
      this.setupElements();
    }
  }

  setupElements() {
    this.nav = document.getElementById('main-nav');
    this.navContentContainer = document.getElementById('nav-content-container');
    this.navLogo = document.getElementById('nav-logo');
    this.desktopNavLinks = document.querySelectorAll('.nav-link');
    this.themeToggleDesktopContainer = document.getElementById('theme-toggle-desktop-container');
    this.mobileMenuButton = document.getElementById('mobile-menu-button');
    this.menuIcon = document.getElementById('menu-icon');
    this.xIcon = document.getElementById('x-icon');
    this.mobileMenu = document.getElementById('mobile-menu');

    if (this.allElementsPresent()) {
      this.bindEvents();
      this.handleScroll(); // Initial check
    }
  }

  allElementsPresent() {
    return this.nav && this.navContentContainer && this.navLogo && 
           this.themeToggleDesktopContainer && this.menuIcon && this.xIcon;
  }

  bindEvents() {
    // Throttled scroll handler for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Mobile menu toggle
    if (this.mobileMenuButton) {
      this.mobileMenuButton.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('button[data-scroll-to]').forEach(button => {
      button.addEventListener('click', (event) => {
        const target = event.currentTarget;
        if (target instanceof HTMLElement && target.dataset.scrollTo) {
          this.scrollToSection(target.dataset.scrollTo);
        }
      });
    });
    
    // Close mobile menu on navigation
    document.querySelectorAll('#mobile-menu a.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (this.isMobileMenuOpen) {
          const href = link.getAttribute('href');
          if (href && (href.startsWith('/') || !href.startsWith('#'))) {
            this.toggleMobileMenu();
          }
        }
      });
    });
  }

  handleScroll() {
    const isScrolled = window.scrollY > 50;
    
    if (isScrolled) {
      this.applyScrolledStyles();
    } else {
      this.removeScrolledStyles();
    }
  }

  applyScrolledStyles() {
    this.nav.classList.add('bg-background/90', 'backdrop-blur-md', 'border-b', 'border-foreground/10');
    this.nav.classList.remove('bg-transparent');
    
    this.navContentContainer.classList.remove('h-20', 'lg:h-24');
    this.navContentContainer.classList.add('h-14', 'lg:h-16');
    
    this.navLogo.classList.remove('text-lg');
    this.navLogo.classList.add('text-base');
    
    this.desktopNavLinks.forEach(link => {
      link.classList.remove('text-sm');
      link.classList.add('text-xs');
    });
    
    this.themeToggleDesktopContainer.classList.remove('scale-100');
    this.themeToggleDesktopContainer.classList.add('scale-90');

    this.updateIconSizes('h-4', 'w-4');
  }

  removeScrolledStyles() {
    this.nav.classList.remove('bg-background/90', 'backdrop-blur-md', 'border-b', 'border-foreground/10');
    this.nav.classList.add('bg-transparent');
    
    this.navContentContainer.classList.remove('h-14', 'lg:h-16');
    this.navContentContainer.classList.add('h-20', 'lg:h-24');
    
    this.navLogo.classList.remove('text-base');
    this.navLogo.classList.add('text-lg');
    
    this.desktopNavLinks.forEach(link => {
      link.classList.remove('text-xs');
      link.classList.add('text-sm');
    });
    
    this.themeToggleDesktopContainer.classList.remove('scale-90');
    this.themeToggleDesktopContainer.classList.add('scale-100');

    this.updateIconSizes('h-5', 'w-5');
  }

  updateIconSizes(heightClass, widthClass) {
    const currentHeight = heightClass === 'h-4' ? 'h-5' : 'h-4';
    const currentWidth = widthClass === 'w-4' ? 'w-5' : 'w-4';
    
    this.menuIcon.classList.replace(currentHeight, heightClass);
    this.menuIcon.classList.replace(currentWidth, widthClass);
    this.xIcon.classList.replace(currentHeight, heightClass);
    this.xIcon.classList.replace(currentWidth, widthClass);
  }

  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (this.isMobileMenuOpen) {
        this.toggleMobileMenu();
      }
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.mobileMenu && this.menuIcon && this.xIcon) {
      this.mobileMenu.classList.toggle('hidden');
      this.menuIcon.classList.toggle('hidden');
      this.xIcon.classList.toggle('hidden');
    }
  }
}

// Initialize navigation when script loads
new NavigationManager();