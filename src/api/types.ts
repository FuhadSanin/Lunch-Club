// Response shapes of the Django API, as its serializers write them (snake_case, paise).

// What a person may do (GET /api/permissions describes each one).
export type ApiPermission =
  | 'session_create' | 'session_read' | 'session_update' | 'session_delete'
  | 'pick_create' | 'pick_update' | 'pick_delete'
  | 'review_create' | 'order_update' | 'restaurant_read'
  | 'member_read' | 'member_update';

// Making someone a host gives them every permission; a member gets what people get on joining.
export const ALL_PERMISSIONS: ApiPermission[] = [
  'session_create', 'session_read', 'session_update', 'session_delete',
  'pick_create', 'pick_update', 'pick_delete',
  'review_create', 'order_update', 'restaurant_read',
  'member_read', 'member_update',
];
export const MEMBER_PERMISSIONS: ApiPermission[] = ['session_read', 'pick_create', 'pick_update', 'pick_delete', 'restaurant_read', 'member_read'];
export const isHost = (p: { permissions: ApiPermission[] }) => p.permissions.includes('session_create');

export type ApiOrg = { id: string; name: string; email_domain: string };

export type ApiUser = { id: string; name: string; email: string; permissions: ApiPermission[] };

export type ApiMe = ApiUser & { org: ApiOrg | null };

export type ApiPerson = { id: string; name: string };

export type ApiLunchStatus = 'open' | 'locked' | 'confirmed' | 'placed' | 'delivered' | 'cancelled';

export type ApiLunch = {
  id: string;
  host: ApiPerson;
  cutoff_at: string; // ISO
  status: ApiLunchStatus;
  created_at: string;
};

export type ApiItem = {
  id: string;
  user: ApiPerson;
  restaurant_name: string;
  dish_name: string;
  quantity: number;
  price_paise: number;
  note: string;
};

export type ApiItemInput = Omit<ApiItem, 'id' | 'user'>;

export type ApiOrderStatus = 'pending' | 'placing' | 'needs_host' | 'placed' | 'delivered';

export type ApiOrder = {
  id: string;
  status: ApiOrderStatus;
  swiggy_order_id: string;
  restaurants: string[];
  restaurant_count: number;
  total_paise: number;
  placed_at: string | null;
  last_error: string;
};

// GET /api/lunches/<id>: the full board.
export type ApiBoard = ApiLunch & {
  delivery_address: string;
  items: ApiItem[];
  skipped: ApiPerson[];
  completed: ApiPerson[]; // completed their order or skipped: final until the host reopens them
  orders: ApiOrder[];
  total_paise: number;
};

export type ApiRestaurant = {
  id: string;
  name: string;
  area: string | null;
  cuisines: string[];
  rating: number | string | null;
  delivery_time: string | null;
  distance_km: number | null;
  open: boolean | null;
  image_url: string | null;
};

export type ApiMenuItem = {
  id: string;
  name: string;
  price_paise: number | null;
  veg: boolean;
  description: string | null;
  in_stock: boolean;
  image_url: string | null;
};

export type ApiMenu = { restaurant: ApiRestaurant; categories: { name: string; items: ApiMenuItem[] }[] };

// GET /api/dishes: a dish from a search, with the restaurant that serves it.
export type ApiDish = {
  id: string;
  name: string;
  price_paise: number | null;
  veg: boolean;
  image_url: string | null;
  restaurant: ApiRestaurant;
};
