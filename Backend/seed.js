require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");
const Product = require("./models/Product");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const products = [
  // ===== WOMEN =====
  { name: "Summer Kurta", price: 1750, oldPrice: 3500, category: "women", categoryDetails: "Printed | Cotton", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwf5f3df2b/images/hi-res/26-01-3e2-03tb_multi_1.jpg?sw=400&sh=600" },
  { name: "Printed Embroidered Kurta", price: 2500, oldPrice: 5000, category: "women", categoryDetails: "Embroidered | Lawn", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw7f8d3291/images/hi-res/1-26-201-a-j_multi_2.jpg?sw=400&sh=600" },
  { name: "Floral Printed Kurta", price: 2200, oldPrice: 4400, category: "women", categoryDetails: "Floral | Silk", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw0eb2b57b/images/hi-res/26-02-3s5-10ta_multi_1.jpg?sw=400&sh=600" },
  { name: "Printed Lawn Kurta", price: 1800, oldPrice: 3600, category: "women", categoryDetails: "Printed | Lawn", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw146f7589/images/hi-res/1-26-134-a-b_multi_1.jpg?sw=400&sh=600" },
  { name: "Chiffon Kurta", price: 2800, oldPrice: 5600, category: "women", categoryDetails: "Embroidered | Chiffon", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw9c8d5e4f/images/hi-res/25-10-12e7-04ta_multi_1.jpg?sw=400&sh=600" },
  { name: "Embroidered Lawn Suit", price: 7200, oldPrice: 9500, category: "women", categoryDetails: "Multi Color | Lawn", badge: "New", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw152d1d84/images/hi-res/26-01-2e1-03ba_multi_2.jpg?sw=400&sh=600" },
  { name: "Printed Embroidered Kurta B", price: 6500, oldPrice: 8700, category: "women", categoryDetails: "Printed | Cotton", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwb0c73544/images/hi-res/1-26-113-a-c_multi_1.jpg?sw=400&sh=600" },
  { name: "Lawn Kurta Dress", price: 2100, oldPrice: 4200, category: "women", categoryDetails: "Embroidered | Lawn", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw36983800/images/hi-res/a33-26-103fb2_multi_2.jpg?sw=400&sh=600" },

  // ===== MEN =====
  { name: "Men Classic Kurta", price: 2500, oldPrice: 5000, category: "men", categoryDetails: "Men Cotton | Printed", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw7b635156/images/feb26/18thFeb26/MSTEKR26V212_2.JPG?sw=400&sh=600" },
  { name: "Men Embroidered Kurta", price: 3500, oldPrice: 7000, category: "men", categoryDetails: "Men Silk | Embroidered", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw26beb1f4/images/Jan26/14thJan26/0002441DAD33_2.JPG?sw=400&sh=600" },
  { name: "Men Printed Shalwar Kameez", price: 2200, oldPrice: 4400, category: "men", categoryDetails: "Men Lawn | Printed", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw3511cdea/images/feb26/18thFeb26/MSOMEKR26V24_2.JPG?sw=400&sh=600" },
  { name: "Men Festive Kurta", price: 4200, oldPrice: 8400, category: "men", categoryDetails: "Men Chiffon | Embroidered", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dwf24477b0/images/feb26/18thFeb26/MSTEKR26V211_2.JPG?sw=400&sh=600" },
  { name: "Men Casual Kurta", price: 1800, oldPrice: 3600, category: "men", categoryDetails: "Men Cotton | Printed", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw9e3ac6be/images/Jan26/14thJan26/0002441DAD34_2.JPG?sw=400&sh=600" },
  { name: "Men Premium Kurta Set", price: 4800, oldPrice: 9600, category: "men", categoryDetails: "Men Lawn | Embroidered", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw0b51389a/images/feb26/18thFeb26/MSOMEKR26V23_2.JPG?sw=400&sh=600" },
  { name: "Men Silk Kurta", price: 3800, oldPrice: 7600, category: "men", categoryDetails: "Men Silk | Floral", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw5222bf53/images/Jan26/14thJan26/00MSTKR26V52_2.JPG?sw=400&sh=600" },
  { name: "Men Summer Kurta", price: 2000, oldPrice: 4000, category: "men", categoryDetails: "Men Cotton | Printed", image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dwc8a51e92/images/Jan26/14thJan26/0MSTEKR26V18_2.JPG?sw=400&sh=600" },

  // ===== KIDS =====
  { name: "Kids Kurta Set", price: 1200, oldPrice: 2400, category: "kids", categoryDetails: "Cotton | Printed", image: "https://cdn.shopify.com/s/files/1/2337/7003/files/20260213124657-f5dc712ea9014750-media_image-86ff57f2fce34375a303082029a030d2.jpg?width=400&format=webp" },
  { name: "Girls Kurta", price: 950, oldPrice: 1900, category: "kids", categoryDetails: "Lawn | Floral", image: "https://cdn.shopify.com/s/files/1/2337/7003/files/20260111220900-56efa037544c48f2-media_image-7815ebfc7ecd4074bd1528d4ce50fdf8.jpg?width=400&format=webp" },
  { name: "Boys Kurta", price: 1100, oldPrice: 2200, category: "kids", categoryDetails: "Cotton | Printed", image: "https://cdn.shopify.com/s/files/1/2337/7003/files/media_image-846eaede9c8f48b5921b545332a4abf5_6f14aa53-9759-499a-b7f0-8a9fa1cde610.jpg?v=1756123070&width=400&format=webp" },
  { name: "Kids Ethnic Set", price: 1400, oldPrice: 2800, category: "kids", categoryDetails: "Lawn | Embroidered", image: "https://cdn.shopify.com/s/files/1/2337/7003/files/cropped_image-174076999475340_220afa0d-a952-4063-9efc-c4e53106fa8a.jpg?v=1741841854&width=400&format=webp" },
  { name: "Girls Dress Kurta", price: 1300, oldPrice: 2600, category: "kids", categoryDetails: "Chiffon | Floral", image: "https://cdn.shopify.com/s/files/1/2337/7003/files/20260225105747-d020ae7ee064484f-media_image-676d0e36d6f748d7a85ad0646a2f18f3.png?width=400&format=webp" },
  { name: "Boys Casual Kurta", price: 1000, oldPrice: 2000, category: "kids", categoryDetails: "Cotton | Printed", image: "https://cdn.shopify.com/s/files/1/2337/7003/files/20260306011703-1cf7d1260c214428-media_image-4cc547c012514763b321b1cd8e4b7c53.png?width=400&format=webp" },
  { name: "Kids Festive Kurta", price: 1600, oldPrice: 3200, category: "kids", categoryDetails: "Lawn | Embroidered", image: "https://cdn.shopify.com/s/files/1/2337/7003/files/20260212195435-48d905811d4341d2-media_image-ee4e38faa5f545bfbf2b4708281263f6.jpg?width=400&format=webp" },

  // ===== READY TO WEAR =====
  { name: "Summer Lawn Suit", price: 8500, oldPrice: 10500, category: "readyToWear", categoryDetails: "Lawn | 3 Piece", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw274258a5/images/hi-res/1-26-247-b-j1_multi_2.jpg?sw=400&sh=600" },
  { name: "Embroidered Kurta", price: 7200, oldPrice: 9200, category: "readyToWear", categoryDetails: "Khaddar | 2 Piece", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw92109107/images/hi-res/1-26-247-a-i1_multi_2.jpg?sw=400&sh=600" },
  { name: "Silk Blend Dress", price: 12800, category: "readyToWear", categoryDetails: "Silk | Dress", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw7572104c/images/hi-res/1-26-247-b-g2_multi_2.jpg?sw=400&sh=600" },
  { name: "Printed Kurta Set", price: 6800, oldPrice: 8800, category: "readyToWear", categoryDetails: "Lawn | 2 Piece", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw8aa86c9a/images/hi-res/1-26-247-a-g1_multi_2.jpg?sw=400&sh=600" },
  { name: "Khaddar Embroidered", price: 9500, oldPrice: 11500, category: "readyToWear", categoryDetails: "Khaddar | 3 Piece", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwfe2342d2/images/hi-res/1-26-247-b-g1_multi_2.jpg?sw=400&sh=600" },
  { name: "Chiffon Maxi", price: 8200, oldPrice: 10200, category: "readyToWear", categoryDetails: "Chiffon | Maxi", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw562a2fa2/images/hi-res/1-26-247-b-e1_multi_2.jpg?sw=400&sh=600" },

  // ===== TAILORED =====
  { name: "Custom Sherwani", price: 28500, oldPrice: 35000, category: "tailored", categoryDetails: "Sherwani | Custom", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw4a5fe5d6/images/hi-res/t-a11-26-107fg1_multi_2.jpg?sw=400&sh=600" },
  { name: "Tailored Kurta Pajama", price: 12500, oldPrice: 16500, category: "tailored", categoryDetails: "Kurta Pajama | Silk", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw7118ba25/images/hi-res/t-a11-26-107ff1_multi_2.jpg?sw=400&sh=600" },
  { name: "Bespoke Waistcoat", price: 8500, category: "tailored", categoryDetails: "Waistcoat | Luxury", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw91398346/images/hi-res/t-a11-26-107fd1_multi_2.jpg?sw=400&sh=600" },
  { name: "Custom Pathani Suit", price: 14800, oldPrice: 18500, category: "tailored", categoryDetails: "Pathani | Cotton", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw106959a1/images/hi-res/t-a11-26-107fc1_multi_2.jpg?sw=400&sh=600" },
  { name: "Tailored Nehru Jacket", price: 11200, oldPrice: 14500, category: "tailored", categoryDetails: "Nehru Jacket | Wool", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw984a1cf2/images/hi-res/t-a11-26-101fi2_multi_2.jpg?sw=400&sh=600" },
  { name: "Bespoke Sherwani Set", price: 42500, oldPrice: 52000, category: "tailored", categoryDetails: "Sherwani Set | Premium", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw562a2fa2/images/hi-res/1-26-247-b-e1_multi_2.jpg?sw=400&sh=600" },

  // ===== FABRICS =====
  { name: "Premium Lawn Fabric", price: 2500, oldPrice: 3500, category: "fabrics", categoryDetails: "Lawn | Unstitched", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwffdb114a/images/hi-res/a11-26-107ff1_multi_2.jpg?sw=400&sh=600" },
  { name: "Cotton Khaddar", price: 3200, oldPrice: 4200, category: "fabrics", categoryDetails: "Khaddar | Unstitched", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw4d8c0814/images/hi-res/a11-26-107fe1_multi_2.jpg?sw=400&sh=600" },
  { name: "Silk Blend Fabric", price: 4800, category: "fabrics", categoryDetails: "Silk | Premium", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwe946d1b9/images/hi-res/a11-26-107fd1_multi_2.jpg?sw=400&sh=600" },
  { name: "Digital Printed Lawn", price: 2800, oldPrice: 3800, category: "fabrics", categoryDetails: "Lawn | Digital Print", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw7e958e47/images/hi-res/a11-26-107fa1_multi_2.jpg?sw=400&sh=600" },
  { name: "Embroidered Cotton", price: 4500, oldPrice: 5500, category: "fabrics", categoryDetails: "Cotton | Embroidered", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw3bfcfb39/images/hi-res/a11-26-101fh1_multi_2.jpg?sw=400&sh=600" },
  { name: "Pure Chiffon", price: 3800, oldPrice: 4800, category: "fabrics", categoryDetails: "Chiffon | Unstitched", image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwdf271c70/images/hi-res/a11-26-107fc1_multi_2.jpg?sw=400&sh=600" },
];

const seed = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();
    console.log("Cleared existing products");

    // Insert products
    const inserted = await Product.insertMany(products);
    console.log(`Inserted ${inserted.length} products`);

    // Create admin user
    await User.deleteOne({ email: "admin@clothing.com" });
    await User.create({
      name: "Admin",
      email: "admin@clothing.com",
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    });
    console.log("Admin user created: admin@clothing.com");

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
