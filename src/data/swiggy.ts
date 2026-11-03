// The demo's restaurants, menus and search, all from the sample menus in menus.ts. Nothing here
// calls a server: the same hooks the full app uses for live Swiggy data answer straight away from
// the samples, so every screen works offline.

import { allDishes, knownRestaurants, useMenus, type Dish, type Restaurant } from './menus';

type Place = { lat: number; lng: number };

export type Load = { status: 'loading' | 'ready' | 'error'; error?: string; retry: () => void };
export type FoundDish = { dish: Dish; restaurant: Restaurant };

const ready: Load = { status: 'ready', retry: () => undefined };
const has = (text: string, q: string) => text.toLowerCase().includes(q);

// Restaurants near the office, or matching `query` by name, cuisine or a dish on the menu.
export function useRestaurants(_place: Place, query = '', skip = false): Load & { restaurants: Restaurant[] } {
  useMenus();
  const q = query.trim().toLowerCase();
  if (skip || q.length === 1) return { ...ready, restaurants: [] };
  const all = knownRestaurants();
  return {
    ...ready,
    restaurants: q ? all.filter((r) => has(r.name, q) || r.cuisines?.some((c) => has(c, q)) || allDishes(r).some((d) => has(d.name, q))) : all,
  };
}

// The sample menus are always loaded.
export function useMenu(_restaurantId: string, _place: Place): Load {
  return ready;
}

// Dishes matching `query` (two letters or more) across every sample menu, each with its restaurant.
export function useDishSearch(_place: Place, query: string): Load & { dishes: FoundDish[]; settled: boolean } {
  const q = query.trim().toLowerCase();
  const dishes =
    q.length < 2
      ? []
      : knownRestaurants().flatMap((restaurant) => allDishes(restaurant).filter((d) => has(d.name, q)).map((dish) => ({ dish, restaurant })));
  return { ...ready, dishes: dishes.slice(0, 20), settled: true };
}
