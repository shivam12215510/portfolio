import { useSyncExternalStore } from 'react'

/** Subscribes to a CSS media query without effects or flicker. */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', notify)
      return () => mq.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}

/** True on desktop-class devices that can hover with a precise pointer. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
/** True from the `md` breakpoint upwards. */
export const useIsDesktop = () => useMediaQuery('(min-width: 768px)')
