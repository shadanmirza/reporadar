import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './ui/Button';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // This method runs when a child component throws an error
  static getDerivedStateFromError(error) {
    return { hasError: true, error }; 
  }

  // Log error to console 
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="p-6 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-center">
          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-red-600 dark:text-red-300 mb-4 max-w-md mx-auto">
            {this.props.fallbackMessage || "This component failed to load. You can try refreshing or go back."}
          </p>
          <div className="flex gap-2 justify-center">
            <Button 
              variant="danger" 
              size="sm" 
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4 mr-1" /> Reload Page
            </Button>
            {this.props.onReset && (
              <Button variant="secondary" size="sm" onClick={this.props.onReset}>
                Try Again
              </Button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;        