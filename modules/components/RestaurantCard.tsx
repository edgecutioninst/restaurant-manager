import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Restaurant } from "@/modules/store/useRestaurantStore";

interface RestaurantCardProps {
    restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
    return (
        <Link href={`/restaurant/${restaurant.slug}`}>
            <Card className="bg-zinc-900 border-zinc-800 overflow-hidden group cursor-pointer hover:border-zinc-700 transition-colors h-full">
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={restaurant.imageUrl}
                        alt={restaurant.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                        <Badge className="bg-zinc-950/80 text-slate-50 hover:bg-zinc-950 backdrop-blur-sm border-none">
                            {restaurant.type}
                        </Badge>
                    </div>
                </div>

                {/* Content Section */}
                <CardContent className="p-5">
                    <h3 className="text-xl font-semibold text-slate-50 mb-2 truncate">
                        {restaurant.name}
                    </h3>
                    <div className="flex items-center text-sm text-zinc-400">
                        <MapPin className="h-4 w-4 mr-1 text-red-500 flex-shrink-0" />
                        <span className="truncate">
                            {restaurant.address.locality}, {restaurant.address.city}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}