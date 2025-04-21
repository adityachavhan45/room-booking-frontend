// TailwindInteractive.js
// This file contains reusable Tailwind CSS class combinations for interactive elements

// Button hover effects
export const buttonHover = "transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 active:shadow-md";

// Card hover effects
export const cardHover = "transition-all duration-300 hover:shadow-xl hover:-translate-y-2 active:translate-y-0";

// Image hover effects
export const imageHover = "transition-all duration-500 hover:scale-105 hover:shadow-lg";

// Link hover effects
export const linkHover = "transition-all duration-200 hover:text-blue-300 hover:underline";

// Section animation classes
export const sectionFadeIn = "animate-fade-in";
export const sectionSlideUp = "animate-slide-up";
export const sectionSlideLeft = "animate-slide-in-left";
export const sectionSlideRight = "animate-slide-in-right";

// Interactive element states
export const interactiveStates = "transition-all duration-200 hover:brightness-110 active:brightness-90";

// Floating animation
export const floatingElement = "animate-float";

// Soft pulse animation
export const pulseElement = "animate-pulse-soft";

// Soft bounce animation
export const bounceElement = "animate-bounce-soft";

// Hover scale effect
export const scaleOnHover = "transition-transform duration-300 hover:scale-105";

// Focus ring effect
export const focusRingEffect = "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";

// Group hover effects
export const groupHoverReveal = "opacity-0 group-hover:opacity-100 transition-opacity duration-300";

// Staggered animation helper
export const staggeredDelay = (index) => `transition-all duration-500 delay-[${index * 100}ms]`;

// Interactive grid item
export const gridItemInteractive = "transition-all duration-300 hover:shadow-lg hover:z-10 hover:-translate-y-1 hover:scale-105";

// Interactive navigation item
export const navItemInteractive = "transition-all duration-200 hover:text-blue-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full";

// Scroll reveal classes (to be used with Intersection Observer)
export const scrollReveal = "opacity-0 translate-y-10 transition-all duration-700";
export const scrollRevealed = "opacity-100 translate-y-0";

// Interactive form elements
export const formInputInteractive = "transition-all duration-200 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50";

// Tooltip base
export const tooltipBase = "invisible group-hover:visible absolute opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 text-white text-sm rounded py-1 px-2 bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap";

// Ripple effect base (to be used with JavaScript)
export const rippleBase = "overflow-hidden relative";

// 3D hover effect
export const hover3D = "transition-transform duration-300 hover:rotate-1 hover:scale-105 hover:shadow-xl";

// Animated border
export const animatedBorder = "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-blue-300 after:to-blue-500 after:transition-all after:duration-500 hover:after:w-full";

// Parallax effect base (to be used with JavaScript)
export const parallaxBase = "relative overflow-hidden";

// Magnetic effect base (to be used with JavaScript)
export const magneticBase = "transition-transform duration-200";
