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

const initialData: Restaurant[] = [
    {
        id: '1',
        slug: 'the-midnight-cafe',
        name: 'The Midnight Cafe',
        ownerName: 'Rahul Sharma',
        mobile: '9876543210',
        address: { line1: '12/A, Tech Park Road', locality: 'Cyber Hub', city: 'Gurugram', state: 'Haryana', pincode: '122002' },
        type: 'Cafe',
        imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        id: '2',
        slug: 'spice-symphony',
        name: 'Spice Symphony',
        ownerName: 'Priya Patel',
        mobile: '9123456780',
        address: { line1: 'Plot 45, Food Street', locality: 'Connaught Place', city: 'New Delhi', state: 'Delhi', pincode: '110001' },
        type: 'Fine Dining',
        imageUrl: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        id: '3',
        slug: 'tokyo-drift-sushi',
        name: 'Tokyo Drift Sushi',
        ownerName: 'Kenji Sato',
        mobile: '9988776655',
        address: { line1: 'Level 2, Kanto Mall', locality: 'Vasant Kunj', city: 'New Delhi', state: 'Delhi', pincode: '110070' },
        type: 'Fine Dining',
        imageUrl: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        id: '4',
        slug: 'burger-forge',
        name: 'Burger Forge',
        ownerName: 'Amit Singh',
        mobile: '9876500001',
        address: { line1: 'Shop 12, Student Square', locality: 'North Campus', city: 'New Delhi', state: 'Delhi', pincode: '110007' },
        type: 'Fast Food',
        imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        id: '5',
        slug: 'wok-in-the-clouds',
        name: 'Wok In The Clouds',
        ownerName: 'Meera Reddy',
        mobile: '9111222333',
        address: { line1: 'Industrial Area Phase 1', locality: 'Okhla', city: 'New Delhi', state: 'Delhi', pincode: '110020' },
        type: 'Cloud Kitchen',
        imageUrl: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        id: '6',
        slug: 'brew-and-bytes',
        name: 'Brew & Bytes',
        ownerName: 'Ananya Gupta',
        mobile: '9000111222',
        address: { line1: 'Ground Floor, IT Park', locality: 'Sector 62', city: 'Noida', state: 'UP', pincode: '201309' },
        type: 'Cafe',
        imageUrl: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        id: '7',
        slug: 'pizza-protocol',
        name: 'Pizza Protocol',
        ownerName: 'Vikram Das',
        mobile: '9998887776',
        address: { line1: 'Main Market', locality: 'Hauz Khas Village', city: 'New Delhi', state: 'Delhi', pincode: '110016' },
        type: 'Fast Food',
        imageUrl: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        id: '8',
        slug: 'phantom-flavors',
        name: 'Phantom Flavors',
        ownerName: 'Rohan Mehta',
        mobile: '9777666555',
        address: { line1: 'Basement 4, Warehouse Zone', locality: 'Udyog Vihar', city: 'Gurugram', state: 'Haryana', pincode: '122016' },
        type: 'Cloud Kitchen',
        imageUrl: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
];

export const useRestaurantStore = create<RestaurantStore>()(
    persist(
        (set) => ({
            restaurants: initialData,

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
