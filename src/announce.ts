import { writable } from 'svelte/store';

export const hasAnnouncement = writable(true);

export const closeAnnounce = () => {
  hasAnnouncement.set(false);
}