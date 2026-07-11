"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches render-time errors thrown by the R3F hero scene (e.g. a failed
 * GLTF fetch) and swallows them so the static fallback image beneath it
 * remains visible instead of tearing down the whole hero section.
 */
export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Hero 3D scene failed to render, falling back to static image:", error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
