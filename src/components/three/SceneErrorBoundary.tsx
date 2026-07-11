"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Notifies the parent that the scene has been torn down, so it can
   * restore the static fallback image — which may already have been
   * crossfaded out if the scene errored AFTER its first frame (e.g. an
   * asset that failed to fetch once the canvas was live). */
  onError?: () => void;
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
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
