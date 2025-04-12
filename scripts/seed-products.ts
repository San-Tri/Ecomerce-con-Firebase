import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

const products = [
  {
    name: "iPhone 13 Pro",
    description: "The latest iPhone with advanced camera system and A15 Bionic chip",
    price: 999.99,
    category: "smartphones",
    stock: 50,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-family-hero?wid=940&hei=1112&fmt=png-alpha&.v=1644969385433"
  },
  {
    name: "MacBook Pro M2",
    description: "Powerful laptop with M2 chip and Retina display",
    price: 1299.99,
    category: "electronics",
    stock: 30,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-space-m2-pro_GEO_EMEA?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664411206445"
  },
  {
    name: "AirPods Pro",
    description: "Wireless earbuds with active noise cancellation",
    price: 249.99,
    category: "audio",
    stock: 100,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361"
  },
  {
    name: "Apple Watch Series 8",
    description: "Advanced smartwatch with health monitoring features",
    price: 399.99,
    category: "wearables",
    stock: 75,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQDY3ref_VW_34FR+watch-45-alum-midnight-nc-8s_VW_34FR_WF_CO?wid=750&hei=712&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1683224241054"
  },
  {
    name: "iPad Pro",
    description: "Powerful tablet with M2 chip and Liquid Retina display",
    price: 799.99,
    category: "electronics",
    stock: 40,
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-11-select-202210?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1664411206445"
  },
  {
    name: "Sony WH-1000XM5",
    description: "Premium noise-cancelling headphones",
    price: 399.99,
    category: "audio",
    stock: 60,
    imageUrl: "https://m.media-amazon.com/images/I/51Qh-0Y5QvL._AC_SL1500_.jpg"
  }
]

async function seedProducts() {
  try {
    for (const product of products) {
      await addDoc(collection(db, "products"), {
        ...product,
        createdAt: serverTimestamp()
      })
      console.log(`Added product: ${product.name}`)
    }
    console.log("All products added successfully!")
  } catch (error) {
    console.error("Error adding products:", error)
  }
}

seedProducts() 