import { WritableSignal } from '@angular/core';

export function updateSignal<T, K extends keyof T>(
  s: WritableSignal<T>,
  prop: K,
  value: T[K],
) {
  s.update((obj) => ({
    ...obj,
    [prop]: value,
  }));
}
