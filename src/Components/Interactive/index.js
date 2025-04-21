// Interactive Component Index
import './Interactive.css';
export * from './InteractiveUtils';
export * from './TailwindInteractive';

// Initialize function for easy import
import { initializeInteractiveEffects } from './InteractiveUtils';
export const initInteractive = initializeInteractiveEffects;

// Export the InteractiveProvider
import InteractiveProvider from './InteractiveProvider';
export default InteractiveProvider;
