/**
 * Type definitions for anime.js (q) animation library
 * This is a shim for the global 'q' object used in the codebase
 */

interface TimelineOptions {
    easing?: string;
    duration?: number;
    complete?: () => void;
    autoplay?: boolean;
}

interface AnimationTarget {
    targets: HTMLElement | HTMLElement[] | NodeList | string;
    opacity?: string[];
    scaleX?: number[];
    scaleY?: number[];
    borderRadius?: string;
    duration?: number;
    complete?: () => void;
}

interface Timeline {
    add(options: AnimationTarget): Timeline;
    finished: Promise<void>;
    seek(time: number): void;
    reset(): void;
    play(): void;
}

interface AnimeAPI {
    timeline(options?: TimelineOptions): Timeline;
    version: string;
    speed: number;
    suspendWhenDocumentHidden: boolean;
}

declare const q: AnimeAPI;

