require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Product = require('../src/models/Product');

const products = [
  // Ethnic Wear (3)
  {
    name: 'Pure Banarasi Silk Zari Saree',
    description:
      'Handcrafted Banarasi silk saree featuring intricate gold zari floral motifs, royal pallu, and matching blouse piece. Perfect for weddings and festive celebrations.',
    price: 4999,
    category: 'Ethnic Wear',
    stock: 15,
    imageUrl: 'https://m.media-amazon.com/images/I/91rBerY1vNL._SY741_.jpg?w=700&h=700&fit=crop',
    images: [
      'https://m.media-amazon.com/images/I/9173R3oValL._SY741_.jpg?w=700&h=700&fit=crop',
      'https://m.media-amazon.com/images/I/A1FEynoa5QL._SY741_.jpg?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'Varanasi Weavers Guild',
      rating: 4.9,
      location: 'Varanasi, Uttar Pradesh',
    },
    specifications: {
      Material: '100% Katan Pure Silk',
      Weave: 'Handloom Kadwa Zari',
      Occasion: 'Bridal / Festival',
      Care: 'Dry Clean Only',
    },
  },
  {
    name: "Handloom Cotton Men's Kurta Pyjama Set",
    description:
      'Breathable 100% handloom cotton kurta with traditional mandarin collar and paired white churidar pyjama. Soft, elegant, and comfortable for all seasons.',
    price: 1499,
    category: 'Ethnic Wear',
    stock: 30,
    imageUrl: 'https://m.media-amazon.com/images/I/51oLnhCiVaL._SY741_.jpg?w=700&h=700&fit=crop',
    images: [
      'https://m.media-amazon.com/images/I/61+iiXoE0WL._SY741_.jpg?w=700&h=700&fit=crop',
      'https://m.media-amazon.com/images/I/51RatizTqcL._SY741_.jpg?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'Fabrics of India Co.',
      rating: 4.8,
      location: 'Jaipur, Rajasthan',
    },
    specifications: {
      Fabric: 'Organic Handloom Cotton',
      Fit: 'Regular Fit',
      Pattern: 'Solid Mandarin Collar',
      Care: 'Machine Wash Soft',
    },
  },
  {
    name: 'Ajrakh Block Printed Chanderi Dupatta',
    description:
      'Authentic Gujarati Ajrakh hand-block printed dupatta crafted on shimmering Chanderi silk fabric with natural vegetable dyes.',
    price: 799,
    category: 'Ethnic Wear',
    stock: 25,
    imageUrl: 'https://m.media-amazon.com/images/I/61+RmLm+4TL._SY741_.jpg?w=700&h=700&fit=crop',
    images: [
      'https://m.media-amazon.com/images/I/71xqrb6WZZL._SY741_.jpg?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'Kutch Craft Artisan Collective',
      rating: 4.7,
      location: 'Bhuj, Gujarat',
    },
    specifications: {
      Fabric: 'Chanderi Silk Blend',
      Print: 'Natural Vegetable Ajrakh',
      Length: '2.5 Meters',
      Care: 'Hand Wash Separate',
    },
  },

  // Handicrafts (3)
  {
    name: 'Handcrafted Antique Brass Diya Stand',
    description:
      'Traditional 5-tier solid brass oil lamp diya stand crafted by master metalsmiths of Moradabad. Brings warmth and auspicious vibes to your home mandir.',
    price: 899,
    category: 'Handicrafts',
    stock: 40,
    imageUrl: 'https://m.media-amazon.com/images/I/61Y4tiVnk5L._SX679_.jpg?w=700&h=700&fit=crop',
    images: [
      'https://m.media-amazon.com/images/I/61Z1Av7rlAL._SX679_.jpg?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'Brassware House Moradabad',
      rating: 4.9,
      location: 'Moradabad, Uttar Pradesh',
    },
    specifications: {
      Material: '100% Solid Brass',
      Weight: '1.2 kg',
      Dimensions: '12 x 4 x 4 inches',
      Finish: 'Antique Gold Polish',
    },
  },
  {
    name: 'Natural Handwoven Jute Area Rug (4x6 ft)',
    description:
      'Eco-friendly braided jute rug woven by rural artisans. Durable, rustic aesthetic that adds warmth to living rooms and dining areas.',
    price: 1999,
    category: 'Handicrafts',
    stock: 20,
    imageUrl: 'https://m.media-amazon.com/images/I/81rUgirD8qL._SX679_.jpg?w=700&h=700&fit=crop',
    images: [
      'https://m.media-amazon.com/images/I/61JjFFYAhbL._SX679_.jpg?w=700&h=700&fit=crop',
      'https://m.media-amazon.com/images/I/81qBV3Hse7L._SX679_.jpg?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'Bhadohi Carpet Crafters',
      rating: 4.8,
      location: 'Bhadohi, Uttar Pradesh',
    },
    specifications: {
      Material: '100% Natural Golden Jute',
      Size: '4 ft x 6 ft',
      Thickness: '10 mm',
      Style: 'Boho Rustic Braided',
    },
  },
  {
    name: 'Khurja Hand-painted Terracotta Flower Vase',
    description:
      'Artisanal ceramic terracotta vase from Khurja featuring hand-painted traditional Indian floral motifs and a smooth glaze finish.',
    price: 599,
    category: 'Handicrafts',
    stock: 35,
    imageUrl: 'https://m.media-amazon.com/images/I/912PzJPdKtS._SX679_.jpg?w=700&h=700&fit=crop',
    images: [
      'https://m.media-amazon.com/images/I/51srSk8klUL._SX679_.jpg?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'Khurja Clay Pottery',
      rating: 4.7,
      location: 'Khurja, Uttar Pradesh',
    },
    specifications: {
      Material: 'Glazed Terracotta Clay',
      Height: '10 inches',
      Craft: 'Hand-painted Folk Motif',
      Finish: 'Matte Glaze',
    },
  },

  // Wellness (3)
  {
    name: 'Ayurvedic Kumkumadi Radiance Facial Oil (15ml)',
    description:
      'Pure Ayurvedic formulation infused with Kashmiri Saffron, Sandalwood, and 26 herbal extracts for glowing, youthful, and radiant skin.',
    price: 399,
    category: 'Wellness',
    stock: 50,
    imageUrl: 'https://m.media-amazon.com/images/I/61Wf5NHdbVL._SX522_.jpg?w=700&h=700&fit=crop',
    images: [
      'https://m.media-amazon.com/images/I/417zLw5BNOL.jpg?w=700&h=700&fit=crop',
      'https://m.media-amazon.com/images/I/61ZvjQubosL._SX522_.jpg?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'Veda Organics Kerala',
      rating: 4.9,
      location: 'Kottakkal, Kerala',
    },
    specifications: {
      Volume: '15 ml',
      Key_Ingredients: 'Kashmiri Saffron, Lotus, Chandan',
      Skin_Type: 'All Skin Types',
      Certification: 'AYUSH Certified Organic',
    },
  },
  {
    name: 'Cold-Pressed Sandalwood & Turmeric Soap (Set of 3)',
    description:
      'Organic cold-processed bath bars infused with raw wild turmeric, sandalwood extract, and virgin coconut oil. Antibacterial and deeply soothing.',
    price: 349,
    category: 'Wellness',
    stock: 80,
    imageUrl: 'https://m.media-amazon.com/images/I/71L8sA06lyL._SX522_.jpg?w=700&h=700&fit=crop',
    images: [
      'https://m.media-amazon.com/images/I/71yoLfWWocL._SX522_.jpg?w=700&h=700&fit=crop',
      'https://m.media-amazon.com/images/I/81p33ITtbEL._SX522_.jpg?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'Western Ghats Botanicals',
      rating: 4.8,
      location: 'Coimbatore, Tamil Nadu',
    },
    specifications: {
      Pack_Size: '3 Bars (100g each)',
      Formula: 'Sulphate & Paraben Free',
      Fragrance: 'Natural Herbal Neem & Turmeric',
      Base: 'Virgin Cold-pressed Coconut Oil',
    },
  },
  {
    name: 'Authentic Original Kashmiri Saffron (1g)',
    description:
      'Grade-A Mongra Kashmiri Saffron strands harvested directly from the fields of Pampore. Known for rich aroma, deep red color, and health benefits.',
    price: 749,
    category: 'Wellness',
    stock: 45,
    imageUrl: 'https://m.media-amazon.com/images/I/61DaiOQKiaL._SX679_.jpg?w=700&h=700&fit=crop',
    images: [
      'https://m.media-amazon.com/images/I/71xgg0aMyfL._SX679_.jpg?w=700&h=700&fit=crop',
      'https://m.media-amazon.com/images/I/71FyeiPMTZL._SX679_.jpg?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'Pampore Saffron Farmers Co-op',
      rating: 5.0,
      location: 'Pampore, Jammu & Kashmir',
    },
    specifications: {
      Weight: '1 Gram Air-tight Glass Jar',
      Grade: 'Mongra A+ Highest Purity',
      Origin: 'Pampore Valley, Kashmir',
      GI_Tag: 'GI Certified Kashmiri Saffron',
    },
  },

  // Gourmet (3)
  {
    name: 'Pure Desi Ghee Kaju Katli (500g Box)',
    description:
      'Melt-in-mouth traditional Indian sweet made with premium Goa cashews, pure A2 desi ghee, and silver leaf (Varq). No artificial preservatives.',
    price: 650,
    category: 'Gourmet',
    stock: 60,
    imageUrl: 'https://m.media-amazon.com/images/I/71MpKKT2uSL._SX679_.jpg?w=700&h=700&fit=crop',
    images: [
      'https://m.media-amazon.com/images/I/714h4qp2RNL._SX679_.jpg?w=700&h=700&fit=crop',
      'https://m.media-amazon.com/images/I/61P2UK-7T3L._SX679_.jpg?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'Old Delhi Sweet Artisans',
      rating: 4.9,
      location: 'Chandni Chowk, Delhi',
    },
    specifications: {
      Weight: '500 Grams',
      Ingredients: 'Goa Cashews, Sugar, A2 Desi Ghee',
      Shelf_Life: '30 Days',
      Packaging: 'Festive Sealed Gift Box',
    },
  },
  {
    name: 'Royal Spiced Masala Chai Loose Tea (150g)',
    description:
      'Premium Assam CTC tea blended with green cardamom, Ceylon cinnamon, cloves, ginger, and black pepper for an authentic kadak chai experience.',
    price: 399,
    category: 'Gourmet',
    stock: 100,
    imageUrl: 'https://m.media-amazon.com/images/I/61ThQ2YEb1L._SX679_.jpg?w=700&h=700&fit=crop',
    images: [
      'https://m.media-amazon.com/images/I/71EErueglxL._SX679_.jpg?w=700&h=700&fit=crop',
      'https://m.media-amazon.com/images/I/61ZY1agDVRL._SX679_.jpg?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'Assam Heritage Tea Estate',
      rating: 4.8,
      location: 'Jorhat, Assam',
    },
    specifications: {
      Weight: '150 Grams Pack',
      Blend: 'Second Flush Assam CTC + Whole Spices',
      Form: 'Loose Leaf Tea',
      Origin: 'Jorhat Valley, Assam',
    },
  },
  {
    name: 'South Indian Filter Coffee Roast (500g)',
    description:
      'Freshly roasted Arabica & Robusta beans blended with 20% chicory for the authentic aromatic South Indian filter kaapi flavor.',
    price: 449,
    category: 'Gourmet',
    stock: 75,
    imageUrl: 'https://m.media-amazon.com/images/I/61jZY6rP5lL._SX679_.jpg?w=700&h=700&fit=crop',
    images: [
      'https://m.media-amazon.com/images/I/71uSwVOjDiL._SX679_.jpg?w=700&h=700&fit=crop',
      'https://m.media-amazon.com/images/I/712+XoPoIsL._SX679_.jpg?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'Chikmagalur Roasters',
      rating: 4.9,
      location: 'Chikmagalur, Karnataka',
    },
    specifications: {
      Weight: '500 Grams',
      Ratio: '80% Plantation Coffee, 20% Chicory',
      Roast_Level: 'Dark Continental Roast',
      Grind: 'Fine Filter Grind',
    },
  },

  // Art & Books (3)
  {
    name: 'Madhubani Hand-painted Canvas Frame',
    description:
      'Traditional Bihar Madhubani folk art hand-painted on natural canvas with vibrant natural pigments. Comes in an elegant dark teakwood frame.',
    price: 2199,
    category: 'Art & Books',
    stock: 18,
    imageUrl: 'https://m.media-amazon.com/images/I/81m7WbqSlkL._SX522_.jpg?w=700&h=700&fit=crop',
    images: [
      'https://m.media-amazon.com/images/I/81x+OVjV5kL._SX522_.jpg?w=700&h=700&fit=crop',
      'https://m.media-amazon.com/images/I/81FpzfsDh9L._SX522_.jpg?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'Mithila Folk Artists Guild',
      rating: 4.9,
      location: 'Madhubani, Bihar',
    },
    specifications: {
      Art_Style: 'Mithila / Madhubani',
      Medium: 'Natural Pigments on Organic Canvas',
      Frame: 'Solid Teakwood with Glass',
      Dimensions: '16 x 20 inches',
    },
  },
  {
    name: 'The Palace of Illusions — Novel',
    description:
      'A reimagining of the world-famous Indian epic, the Mahabharata, told from the perspective of Panchaali (Draupadi). National Bestseller by Chitra Banerjee Divakaruni.',
    price: 399,
    category: 'Art & Books',
    stock: 40,
    imageUrl: 'https://m.media-amazon.com/images/I/A1dtQ-soQEL._SY466_.jpg?w=700&h=700&fit=crop',
    images: [
      'https://miro.medium.com/1*er1MuiRqfWUzeQsADNbiWg.jpeg?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'BookWorm India Press',
      rating: 4.8,
      location: 'Kolkata, West Bengal',
    },
    specifications: {
      Author: 'Chitra Banerjee Divakaruni',
      Format: 'Paperback (360 Pages)',
      Language: 'English',
      Publisher: 'Picador India',
    },
  },
  {
    name: 'Handcrafted Sheesham Wooden Chess Set',
    description:
      'Carved Indian Rosewood (Sheesham) magnetic folding chess board with intricately hand-sculpted wooden chess pieces.',
    price: 1599,
    category: 'Art & Books',
    stock: 18,
    imageUrl: 'https://www.indianchesscompany.com/cdn/shop/files/19_68308336-84dc-4b29-a9cf-77cb4439d849_1200x.jpg?v=1758094593?w=700&h=700&fit=crop',
    images: [
      'https://www.indianchesscompany.com/cdn/shop/files/5_0d6a8443-dfae-4844-9860-f109182ac042_1200x.jpg?v=1758094593?w=700&h=700&fit=crop',
      'https://www.indianchesscompany.com/cdn/shop/files/4_71b49749-e9cf-4a12-bc2f-6ddea42f4d9b_1200x.jpg?v=1758094593?w=700&h=700&fit=crop',
    ],
    seller: {
      name: 'Saharanpur Wood Carvers',
      rating: 4.9,
      location: 'Saharanpur, Uttar Pradesh',
    },
    specifications: {
      Wood: 'Sheesham & Boxwood',
      Board_Size: '12 x 12 inches (Folding)',
      Feature: 'Magnetic Pieces with Felt Bottom',
      Craft: 'Hand Carved',
    },
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert seed data
    const inserted = await Product.insertMany(products);
    console.log(`🌱 Seeded ${inserted.length} Indian products with gallery & specs!`);

    inserted.forEach((p) => {
      console.log(`   → ${p.name} (₹${p.price}) [${p.category}]`);
    });

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedProducts();
