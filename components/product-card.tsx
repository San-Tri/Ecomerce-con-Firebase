"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { ShoppingCart, Heart } from "lucide-react"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLiked, setIsLiked] = useState(false)
  const [isLikeLoading, setIsLikeLoading] = useState(false)

  // Check if product is liked when component mounts
  useEffect(() => {
    const checkIfLiked = async () => {
      if (!user) return

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          setIsLiked(userData.likedProducts?.includes(product.id) || false)
        }
      } catch (error) {
        console.error("Error checking liked status:", error)
      }
    }

    checkIfLiked()
  }, [user, product.id])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to save products",
        variant: "destructive",
      })
      return
    }

    setIsLikeLoading(true)

    try {
      const userRef = doc(db, "users", user.uid)

      if (isLiked) {
        // Remove from liked products
        await updateDoc(userRef, {
          likedProducts: arrayRemove(product.id),
        })
        setIsLiked(false)
        toast({
          title: "Removed from wishlist",
          description: `${product.name} has been removed from your wishlist.`,
        })
      } else {
        // Add to liked products
        await updateDoc(userRef, {
          likedProducts: arrayUnion(product.id),
        })
        setIsLiked(true)
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist.`,
        })
      }
    } catch (error) {
      console.error("Error updating liked products:", error)
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      })
    } finally {
      setIsLikeLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden group">
      <Link href={`/products/${product.id}`} className="block relative h-48 overflow-hidden">
        <Image
          src={product.imageUrl || "/placeholder.svg?height=200&width=200"}
          alt={product.name}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
        />
        <button
          className={`absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md transition-colors ${
            isLiked ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-gray-600"
          } ${isLikeLoading ? "opacity-50 cursor-not-allowed" : "opacity-80 hover:opacity-100"}`}
          onClick={handleLikeToggle}
          disabled={isLikeLoading}
        >
          <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
        </button>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
          <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full bg-blue-600 hover:bg-blue-700">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
