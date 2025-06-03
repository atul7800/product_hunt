"use client";
import {useState, useEffect} from "react";
import Link from "next/link";
import {Card} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function ExplorePage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let result = [...products];
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }
    if (sortBy === "Trending") {
      result.sort((a, b) => b.upvotes - a.upvotes);
    } else {
      result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }
    setFiltered(result);
  }, [category, sortBy, products]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Explore Products</h1>

      {/* Shadcn Select Filters */}
      <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col">
            <Label className="mb-1" htmlFor="category">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <Label className="mb-1" htmlFor="sort">
              Sort By
            </Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Latest">Latest</SelectItem>
                <SelectItem value="Trending">Trending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Link href="/submit">
          <Button
            className="bg-black text-white cursor-pointer"
            variant="outline"
          >
            Submit Product
          </Button>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`}>
            <Card className="p-4 hover:shadow cursor-pointer">
              <h2 className="font-semibold">{p.name}</h2>
              <p>{p.tagline}</p>
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-32 rounded-md object-cover mt-2"
              />
              <p className="text-sm mt-1 text-gray-600">
                Category: {p.category}
              </p>
              <p className="text-sm">Upvotes: {p.upvotes}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
