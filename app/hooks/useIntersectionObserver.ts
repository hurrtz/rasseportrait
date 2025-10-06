import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | Document | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

/**
 * Hook to detect when an element is visible in the viewport using IntersectionObserver.
 * Triggers loading before element is fully visible to optimize perceived performance.
 * 
 * @param options Configuration options for IntersectionObserver
 * @returns Tuple of [ref to attach to element, boolean indicating if visible]
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0,
  root = null,
  rootMargin = '100px', // Load 100px before element enters viewport
  freezeOnceVisible = true, // Once visible, keep it visible to prevent re-renders
}: UseIntersectionObserverOptions = {}): [RefObject<T | null>, boolean] {
  const elementRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const frozenRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    
    // Check if IntersectionObserver is supported
    if (!element || typeof IntersectionObserver === 'undefined') {
      // If not supported, show element immediately
      if (typeof IntersectionObserver === 'undefined') {
        setIsIntersecting(true);
      }
      return;
    }

    // If already frozen (visible once), don't observe again
    if (freezeOnceVisible && frozenRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);

        // Freeze the value once element becomes visible
        if (freezeOnceVisible && isElementIntersecting) {
          frozenRef.current = true;
          observer.disconnect();
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return [elementRef, isIntersecting];
}

/**
 * Alternative hook that accepts an external ref if component already has one
 */
export function useIntersectionObserverWithRef<T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T>,
  {
    threshold = 0,
    root = null,
    rootMargin = '100px',
    freezeOnceVisible = true,
  }: UseIntersectionObserverOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const frozenRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    
    if (!element || typeof IntersectionObserver === 'undefined') {
      if (typeof IntersectionObserver === 'undefined') {
        setIsIntersecting(true);
      }
      return;
    }

    if (freezeOnceVisible && frozenRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);

        if (freezeOnceVisible && isElementIntersecting) {
          frozenRef.current = true;
          observer.disconnect();
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin, freezeOnceVisible]);

  return isIntersecting;
}