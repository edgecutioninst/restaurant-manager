"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, ArrowRight, MapPin } from "lucide-react";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import RestaurantCard from "@/modules/components/RestaurantCard";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const { restaurants } = useRestaurantStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRestaurants = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredRestaurants = filteredRestaurants.slice(0, 3);

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Restaurants</h1>
            <p className="text-zinc-400 mt-1">Your curated list of premium dining spots.</p>
          </div>

          <Link href="/manage/restaurant/add">
            <Button className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20">
              <Plus className="mr-2 h-4 w-4" /> Add Restaurant
            </Button>
          </Link>
        </header>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <Input
            type="text"
            placeholder="Search by name or type (e.g., Cafe)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-slate-50 placeholder:text-zinc-500 focus-visible:ring-red-600"
          />
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.length > 0 ? (
            featuredRestaurants.map((restaurant) => (
              <RestaurantCard restaurant={restaurant} key={restaurant.id} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-zinc-500">
              No featured restaurants found.
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center pt-6">
          <Link href="/restaurants">
            <Button variant="outline" className="border-zinc-700 text-zinc-950 hover:bg-zinc-800 hover:text-slate-50 transition-colors">
              View All Restaurants <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}