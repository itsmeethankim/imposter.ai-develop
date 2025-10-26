import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 React Error Boundary caught an error:', error);
    console.error('🚨 Error details:', errorInfo);
    console.error('🚨 Component stack:', errorInfo.componentStack);
    
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#2D2D2D] rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-white text-2xl mb-2">Oops! Something went wrong</h1>
              <p className="text-white/60 text-sm">
                The app encountered an unexpected error
              </p>
            </div>
            
            {this.state.error && (
              <div className="bg-[#1A1A1A] rounded-xl p-4 mb-6 border border-white/5">
                <p className="text-red-400 text-xs font-mono break-words">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
            
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null });
                window.location.reload();
              }}
              className="w-full py-4 rounded-xl bg-white text-[#1A1A1A] font-medium hover:bg-white/90 transition-all"
            >
              Reload App
            </button>
            
            <p className="text-white/40 text-xs text-center mt-4">
              If this persists, please contact support
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
