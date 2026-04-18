"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, MapPin, User, Phone, Trash2, Edit } from "lucide-react";
import { useRestaurantStore } from "@/modules/store/useRestaurantStore";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function RestaurantDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { restaurants, deleteRestaurant } = useRestaurantStore();

    const slug = params.slug as string;
    const restaurant = restaurants.find((r) => r.slug === slug);

    if (!restaurant) {
        return (
            <div className="min-h-screen bg-zinc-950 text-slate-50 flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-bold">Restaurant not found</h1>
                <Button variant="outline" onClick={() => router.push("/restaurants")} className="border-zinc-800 bg-zinc-900 text-slate-50 hover:bg-zinc-800">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
                </Button>
            </div>
        );
    }

    const handleDelete = () => {
        deleteRestaurant(restaurant.slug);
        toast.success(`${restaurant.name} deleted successfully`, {
            style: { background: '#18181b', color: '#f8fafc', border: '1px solid #27272a' }
        });
        router.push("/restaurants");
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-slate-50 pb-12">

            {/* Hero Banner Section */}
            <div className="relative h-64 md:h-96 w-full">
                <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />

                <div className="absolute top-6 left-6 md:top-12 md:left-12">
                    <Link href="/restaurants">
                        <Button variant="outline" size="icon" className="bg-zinc-950/50 border-zinc-700 text-white hover:bg-zinc-900 backdrop-blur-md">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10 space-y-8">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <Badge className="bg-red-600 hover:bg-red-700 text-white mb-3 border-none text-sm px-3 py-1">
                            {restaurant.type}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                            {restaurant.name}
                        </h1>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="border-zinc-800 bg-zinc-900 text-slate-50 hover:bg-zinc-800" onClick={() => toast("Edit functionality coming soon!", { icon: "🚧", style: { background: '#18181b', color: '#f8fafc' } })}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                        </Button>

                        {/* Delete with Modal Confirmation */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="bg-red-900/50 text-red-500 hover:bg-red-900 hover:text-red-100 border border-red-900/50">
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-zinc-950 border-zinc-800 text-slate-50">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-zinc-400">
                                        This action cannot be undone. This will permanently delete <strong>{restaurant.name}</strong> from the database.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 hover:text-white">Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
                                        Yes, delete it
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>

                {/* Details Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">

                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4">
                        <h3 className="text-xl font-semibold border-b border-zinc-800 pb-2">Location</h3>
                        <div className="flex items-start text-zinc-300">
                            <MapPin className="h-5 w-5 mr-3 text-red-500 mt-0.5" />
                            <div className="space-y-1">
                                <p>{restaurant.address.line1}</p>
                                <p>{restaurant.address.locality}</p>
                                <p>{restaurant.address.city}, {restaurant.address.state} {restaurant.address.pincode}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4">
                        <h3 className="text-xl font-semibold border-b border-zinc-800 pb-2">Contact Info</h3>
                        <div className="flex items-center text-zinc-300">
                            <User className="h-5 w-5 mr-3 text-red-500" />
                            <p>{restaurant.ownerName} <span className="text-zinc-500 text-sm ml-2">(Owner)</span></p>
                        </div>
                        <div className="flex items-center text-zinc-300 pt-2">
                            <Phone className="h-5 w-5 mr-3 text-red-500" />
                            <p>{restaurant.mobile}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}