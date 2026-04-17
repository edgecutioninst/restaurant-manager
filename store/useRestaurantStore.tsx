import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RestaurantType = 'Cafe' | 'Fine Dining' | 'Fast Food' | 'Cloud Kitchen';

export interface Restaurant {
    id: string;
    slug: string;
    name: string;
    ownerName: string;
    mobile: string;
    address: {
        line1: string;
        locality: string;
        city: string;
        state: string;
        pincode: string;
    };
    type: RestaurantType;
    imageUrl: string;
}

interface RestaurantStore {
    restaurants: Restaurant[];
    addRestaurant: (restaurant: Omit<Restaurant, 'id' | 'slug'>) => void;
    deleteRestaurant: (slug: string) => void;
}


export const useRestaurantStore = create<RestaurantStore>()(
    persist(
        (set) => ({
            restaurants: [],
            addRestaurant: (data) => set((state) => {
                const slug = data.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');

                const newRestaurant: Restaurant = {
                    ...data,
                    id: crypto.randomUUID(), // unique ID
                    slug
                };

                return { restaurants: [newRestaurant, ...state.restaurants] };
            }),

            deleteRestaurant: (slug) => set((state) => ({
                restaurants: state.restaurants.filter((r) => r.slug !== slug)
            }))
        }),
        {
            name: 'restaurant-storage', // key in localStorage
        }
    )
);