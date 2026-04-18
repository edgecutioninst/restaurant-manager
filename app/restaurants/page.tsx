"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useRestaurantStore, RestaurantType } from "@/modules/store/useRestaurantStore";
import RestaurantCard from "@/modules/components/RestaurantCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ITEMS_PER_PAGE = 6;

export default function RestaurantsPage() {
    const { restaurants } = useRestaurantStore();

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const filteredRestaurants = restaurants.filter((r) => {
        const matchesSearch = r.name.toLowerCase().includes(debouncedQuery.toLowerCase());
        const matchesType = selectedType === "all" || r.type === selectedType;
        return matchesSearch && matchesType;
    });

    // Pagination
    const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedRestaurants = filteredRestaurants.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Reset 
    const handleSearchChange = (val: string) => {
        setSearchQuery(val);
        setCurrentPage(1);
    };

    const handleTypeChange = (val: string) => {
        setSelectedType(val);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-slate-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col gap-4">
                    <Link href="/" className="inline-flex items-center text-sm text-zinc-400 hover:text-slate-50 transition-colors w-fit">
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">All Restaurants</h1>
                        <p className="text-zinc-400 mt-1">Browse, filter, and discover.</p>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                        <Input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-10 bg-zinc-900 border-zinc-800 text-slate-50 placeholder:text-zinc-500 focus-visible:ring-red-600"
                        />
                    </div>

                    <Select value={selectedType} onValueChange={handleTypeChange}>
                        <SelectTrigger className="w-full sm:w-[180px] bg-zinc-900 border-zinc-800 text-slate-50 focus:ring-red-600">
                            <SelectValue placeholder="Filter by Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-slate-50">
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="Cafe">Cafe</SelectItem>
                            <SelectItem value="Fine Dining">Fine Dining</SelectItem>
                            <SelectItem value="Fast Food">Fast Food</SelectItem>
                            <SelectItem value="Cloud Kitchen">Cloud Kitchen</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedRestaurants.length > 0 ? (
                        paginatedRestaurants.map((restaurant) => (
                            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-zinc-500">
                            No restaurants match your criteria.
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 pt-8">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="border-zinc-800 bg-zinc-900 text-slate-50 hover:bg-zinc-800 hover:text-white"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-zinc-400 text-sm">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="border-zinc-800 bg-zinc-900 text-slate-50 hover:bg-zinc-800 hover:text-white"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
}