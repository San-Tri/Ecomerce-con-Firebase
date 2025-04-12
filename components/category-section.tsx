import Link from "next/link"
import { Laptop, Smartphone, Headphones, Camera, Watch, Gift } from "lucide-react"

const categories = [
  {
    name: "Electronics",
    icon: Laptop,
    slug: "electronics",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Smartphones",
    icon: Smartphone,
    slug: "smartphones",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Audio",
    icon: Headphones,
    slug: "audio",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Cameras",
    icon: Camera,
    slug: "cameras",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Wearables",
    icon: Watch,
    slug: "wearables",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Accessories",
    icon: Gift,
    slug: "accessories",
    color: "bg-pink-100 text-pink-600",
  },
]

export default function CategorySection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/products?category=${category.slug}`}
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className={`${category.color} p-4 rounded-full mb-4`}>
            <category.icon className="h-6 w-6" />
          </div>
          <span className="font-medium text-center">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}
