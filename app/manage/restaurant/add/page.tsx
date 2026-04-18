"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRestaurantStore, RestaurantType } from "@/modules/store/useRestaurantStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


interface RestaurantFormValues {
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

export default function AddRestaurantPage() {
    const router = useRouter();
    const { addRestaurant } = useRestaurantStore();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<RestaurantFormValues>({
        defaultValues: {
            type: "Cafe",
        }
    });

    const onSubmit = (data: RestaurantFormValues) => {
        if (!data.imageUrl) {
            data.imageUrl = "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop";
        }

        addRestaurant(data);
        toast.success(`${data.name} added successfully!`, {
            style: { background: '#18181b', color: '#f8fafc', border: '1px solid #27272a' }
        });

        router.push("/restaurants");
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-slate-50 p-6 md:p-12">
            <div className="max-w-3xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Add New Restaurant</h1>
                    <p className="text-zinc-400 mt-1">Enter the details to list a new dining spot.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-xl shadow-lg">

                    {/* Core Info */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">Basic Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Restaurant Name *</Label>
                                <Input id="name" {...register("name", { required: true })} className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" />
                                {errors.name && <span className="text-xs text-red-500">This field is required</span>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Restaurant Type *</Label>
                                <Select onValueChange={(value) => setValue("type", value as RestaurantType)} defaultValue="Cafe">
                                    <SelectTrigger className="bg-zinc-950 border-zinc-800 focus:ring-red-600">
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-slate-50">
                                        <SelectItem value="Cafe">Cafe</SelectItem>
                                        <SelectItem value="Fine Dining">Fine Dining</SelectItem>
                                        <SelectItem value="Fast Food">Fast Food</SelectItem>
                                        <SelectItem value="Cloud Kitchen">Cloud Kitchen</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ownerName">Owner Name *</Label>
                                <Input id="ownerName" {...register("ownerName", { required: true })} className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mobile">Mobile Number *</Label>
                                <Input id="mobile" type="tel" {...register("mobile", { required: true, minLength: 10 })} className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" />
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">Location</h2>

                        <div className="space-y-2">
                            <Label htmlFor="line1">Address Line 1 *</Label>
                            <Input id="line1" {...register("address.line1", { required: true })} className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="locality">Area / Locality *</Label>
                                <Input id="locality" {...register("address.locality", { required: true })} className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city">City *</Label>
                                <Input id="city" {...register("address.city", { required: true })} className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state">State *</Label>
                                <Input id="state" {...register("address.state", { required: true })} className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pincode">Pincode *</Label>
                                <Input id="pincode" {...register("address.pincode", { required: true })} className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" />
                            </div>
                        </div>
                    </div>

                    {/* Media Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">Media</h2>
                        <div className="space-y-2">
                            <Label htmlFor="imageUrl">Banner Image URL (Optional)</Label>
                            <Input id="imageUrl" placeholder="https://..." {...register("imageUrl")} className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" />
                            <p className="text-xs text-zinc-500">Leave blank to use a default placeholder image.</p>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()} className="border-zinc-700 text-red-900 hover:bg-zinc-800 hover:text-white">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-8">
                            Save Restaurant
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}