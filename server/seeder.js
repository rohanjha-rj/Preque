const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const products = [
    // ========== MEN'S SHIRTS (5 products) ==========
    {
        name: "Classic Linen Shirt",
        sku: "PQ-M-LS-001",
        category: "Men",
        subCategory: "Shirts",
        description: "A timeless essential crafted from the finest European linen. Hand-dyed using traditional Indigo vat techniques for a rich, deep blue that improves with age. Perfect for both casual and semi-formal occasions.",
        fabric: "100% Pure European Linen",
        dyeMethod: "Indigo Vat Dye",
        fit: "Relaxed Fit",
        price: 3450,
        colors: [
            { name: "Indigo Blue", hex: "#2E4057" },
            { name: "Natural Beige", hex: "#D4C5B0" }
        ],
        sizes: [
            { size: "S", inventory: 10 },
            { size: "M", inventory: 15 },
            { size: "L", inventory: 12 },
            { size: "XL", inventory: 8 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 2000,
            co2Reduced: 5,
            details: "Linen requires 80% less water than cotton. Funds reforestation in the Western Ghats."
        },
        images: [{ url: "https://images.unsplash.com/photo-1594932224010-7567078017c8?auto=format&fit=crop&w=1000&q=80", alt: "Classic Linen Shirt" }],
        isNewArrival: true,
        isPopular: true,
        tags: ["sustainable", "linen", "indigo", "classic"]
    },
    {
        name: "Oxford Weave Organic Cotton Shirt",
        sku: "PQ-M-OS-002",
        category: "Men",
        subCategory: "Shirts",
        description: "Premium oxford weave shirt made from 100% organic cotton. Naturally dyed with pomegranate rinds for a subtle earthy tone. Breathable and perfect for warm weather.",
        fabric: "100% Organic Cotton Oxford",
        dyeMethod: "Pomegranate Rind Dye",
        fit: "Slim Fit",
        price: 2999,
        colors: [
            { name: "Rust Orange", hex: "#C65D3B" },
            { name: "Sage Green", hex: "#8A9A5B" }
        ],
        sizes: [
            { size: "S", inventory: 12 },
            { size: "M", inventory: 18 },
            { size: "L", inventory: 15 },
            { size: "XL", inventory: 10 },
            { size: "XXL", inventory: 5 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 1500,
            co2Reduced: 3,
            details: "Organic cotton grown without harmful pesticides."
        },
        images: [{ url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80", alt: "Oxford Shirt" }],
        isNewArrival: false,
        isPopular: true,
        tags: ["organic", "oxford", "natural-dye"]
    },
    {
        name: "Chambray Work Shirt",
        sku: "PQ-M-CS-003",
        category: "Men",
        subCategory: "Shirts",
        description: "Rugged yet refined chambray shirt dyed with natural walnut shells. Features double stitching and reinforced buttons. Ages beautifully with wear.",
        fabric: "Organic Cotton Chambray",
        dyeMethod: "Walnut Shell Dye",
        fit: "Regular Fit",
        price: 3199,
        colors: [
            { name: "Charcoal Grey", hex: "#4A4A4A" },
            { name: "Chocolate Brown", hex: "#5C4033" }
        ],
        sizes: [
            { size: "M", inventory: 14 },
            { size: "L", inventory: 16 },
            { size: "XL", inventory: 12 },
            { size: "XXL", inventory: 8 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 1800,
            co2Reduced: 4,
            details: "Walnut dye is sourced from sustainably harvested shells."
        },
        images: [{ url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80", alt: "Chambray Shirt" }],
        isNewArrival: true,
        tags: ["chambray", "workwear", "durable"]
    },
    {
        name: "Flannel Herb-Dyed Shirt",
        sku: "PQ-M-FS-004",
        category: "Men",
        subCategory: "Shirts",
        description: "Soft flannel shirt naturally dyed with a blend of herbs including rosemary and sage. Perfect for cooler weather with its brushed finish.",
        fabric: "100% Cotton Flannel",
        dyeMethod: "Herb Blend Dye",
        fit: "Relaxed Fit",
        price: 3699,
        colors: [
            { name: "Forest Green", hex: "#2C5F2D" },
            { name: "Olive", hex: "#808000" }
        ],
        sizes: [
            { size: "S", inventory: 8 },
            { size: "M", inventory: 12 },
            { size: "L", inventory: 10 },
            { size: "XL", inventory: 6 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 1600,
            co2Reduced: 3,
            details: "Herbs sourced from organic farms."
        },
        images: [{ url: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=1000&q=80", alt: "Flannel Shirt" }],
        isPopular: true,
        tags: ["flannel", "winter", "cozy"]
    },
    {
        name: "Silk-Linen Blend Dress Shirt",
        sku: "PQ-M-SL-005",
        category: "Men",
        subCategory: "Shirts",
        description: "Luxurious blend of silk and linen for a sophisticated drape. Dyed with madder root for a rich burgundy hue. Perfect for formal occasions.",
        fabric: "60% Linen, 40% Peace Silk",
        dyeMethod: "Madder Root Dye",
        fit: "Tailored Fit",
        price: 5499,
        colors: [
            { name: "Burgundy", hex: "#800020" },
            { name: "Charcoal", hex: "#36454F" }
        ],
        sizes: [
            { size: "S", inventory: 6 },
            { size: "M", inventory: 10 },
            { size: "L", inventory: 8 },
            { size: "XL", inventory: 5 }
        ],
        sustainabilityInfo: {
            treesPlanted: 2,
            waterSaved: 2500,
            co2Reduced: 6,
            details: "Peace silk ensures no harm to silkworms."
        },
        images: [{ url: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=80", alt: "Silk Linen Shirt" }],
        isNewArrival: true,
        isFeatured: true,
        tags: ["luxury", "silk", "formal"]
    },

    // ========== MEN'S TROUSERS (5 products) ==========
    {
        name: "Earth-Tone Linen Trousers",
        sku: "PQ-M-TR-001",
        category: "Men",
        subCategory: "Trousers",
        description: "Breathable linen trousers dyed with madder root for a deep earthy red tone. Features adjustable waistband and deep pockets.",
        fabric: "100% Pure Linen",
        dyeMethod: "Madder Root Dye",
        fit: "Straight Fit",
        price: 4200,
        colors: [
            { name: "Terracotta", hex: "#CC8B65" },
            { name: "Sand", hex: "#C2B280" }
        ],
        sizes: [
            { size: "30", inventory: 5 },
            { size: "32", inventory: 10 },
            { size: "34", inventory: 10 },
            { size: "36", inventory: 8 },
            { size: "38", inventory: 5 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 2200,
            co2Reduced: 5,
            details: "Madder root is a renewable dye source."
        },
        images: [{ url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80", alt: "Linen Trousers" }],
        isPopular: true,
        tags: ["linen", "comfortable", "summer"]
    },
    {
        name: "Organic Cotton Chinos",
        sku: "PQ-M-CH-002",
        category: "Men",
        subCategory: "Trousers",
        description: "Classic chinos made from organic cotton twill. Naturally dyed with turmeric for vibrant golden tones that fade beautifully.",
        fabric: "100% Organic Cotton Twill",
        dyeMethod: "Turmeric Dye",
        fit: "Slim Fit",
        price: 3799,
        colors: [
            { name: "Golden Yellow", hex: "#FFD700" },
            { name: "Khaki", hex: "#C3B091" }
        ],
        sizes: [
            { size: "30", inventory: 8 },
            { size: "32", inventory: 12 },
            { size: "34", inventory: 14 },
            { size: "36", inventory: 10 },
            { size: "38", inventory: 6 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 1800,
            co2Reduced: 4,
            details: "Turmeric is a natural antimicrobial dye."
        },
        images: [{ url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80", alt: "Chino Trousers" }],
        isNewArrival: true,
        tags: ["chinos", "organic", "versatile"]
    },
    {
        name: "Wide-Leg Hemp Trousers",
        sku: "PQ-M-WL-003",
        category: "Men",
        subCategory: "Trousers",
        description: "Contemporary wide-leg silhouette in sustainable hemp. Dyed with onion skins for warm amber tones. Ultra-comfortable and eco-friendly.",
        fabric: "100% Hemp Canvas",
        dyeMethod: "Onion Skin Dye",
        fit: "Wide Leg",
        price: 4599,
        colors: [
            { name: "Amber", hex: "#FFBF00" },
            { name: "Charcoal", hex: "#464646" }
        ],
        sizes: [
            { size: "30", inventory: 6 },
            { size: "32", inventory: 9 },
            { size: "34", inventory: 12 },
            { size: "36", inventory: 8 }
        ],
        sustainabilityInfo: {
            treesPlanted: 2,
            waterSaved: 3000,
            co2Reduced: 7,
            details: "Hemp requires minimal water and no pesticides."
        },
        images: [{ url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80", alt: "Wide Leg Trousers" }],
        isFeatured: true,
        tags: ["hemp", "sustainable", "modern"]
    },
    {
        name: "Cropped Linen Pants",
        sku: "PQ-M-CP-004",
        category: "Men",
        subCategory: "Trousers",
        description: "Modern cropped length perfect for summer. Made from Belgian linen and dyed with natural indigo for a faded denim effect.",
        fabric: "100% Belgian Linen",
        dyeMethod: "Natural Indigo",
        fit: "Tapered Fit",
        price: 3999,
        colors: [
            { name: "Faded Indigo", hex: "#4F69C6" },
            { name: "Stone Grey", hex: "#928E85" }
        ],
        sizes: [
            { size: "30", inventory: 7 },
            { size: "32", inventory: 11 },
            { size: "34", inventory: 13 },
            { size: "36", inventory: 9 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 2100,
            co2Reduced: 5,
            details: "Belgian linen is known for premium quality."
        },
        images: [{ url: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80", alt: "Cropped Pants" }],
        isNewArrival: true,
        tags: ["cropped", "summer", "trendy"]
    },
    {
        name: "Joggers in Organic Cotton",
        sku: "PQ-M-JG-005",
        category: "Men",
        subCategory: "Trousers",
        description: "Comfortable joggers with elastic waistband and cuffs. Dyed with avocado pits for soft pink undertones. Perfect for loungewear.",
        fabric: "100% Organic Cotton Jersey",
        dyeMethod: "Avocado Pit Dye",
        fit: "Relaxed Fit",
        price: 2999,
        colors: [
            { name: "Dusty Rose", hex: "#DCAE96" },
            { name: "Slate Grey", hex: "#708090" }
        ],
        sizes: [
            { size: "S", inventory: 10 },
            { size: "M", inventory: 16 },
            { size: "L", inventory: 14 },
            { size: "XL", inventory: 10 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 1500,
            co2Reduced: 3,
            details: "Avocado pits are upcycled waste material."
        },
        images: [{ url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80", alt: "Cotton Joggers" }],
        isPopular: true,
        tags: ["loungewear", "comfort", "casual"]
    },

    // ========== MEN'S OUTERWEAR (5 products) ==========
    {
        name: "Indigo Hand-Loomed Jacket",
        sku: "PQ-M-JK-001",
        category: "Men",
        subCategory: "Outerwear",
        description: "A lightweight structural jacket made from hand-loomed linen and dyed in deep fermented indigo. Features handcrafted wooden buttons.",
        fabric: "100% Hand-Loomed Linen",
        dyeMethod: "Fermented Natural Indigo",
        fit: "Structured Fit",
        price: 8500,
        colors: [
            { name: "Deep Indigo", hex: "#1A2849" }
        ],
        sizes: [
            { size: "M", inventory: 5 },
            { size: "L", inventory: 7 },
            { size: "XL", inventory: 4 }
        ],
        sustainabilityInfo: {
            treesPlanted: 2,
            waterSaved: 3000,
            co2Reduced: 8,
            details: "Hand-loomed fabric supports traditional artisans. Double tree plantation contribution."
        },
        images: [{ url: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=1000&q=80", alt: "Indigo Jacket" }],
        isNewArrival: true,
        isFeatured: true,
        tags: ["handcrafted", "artisan", "luxury"]
    },
    {
        name: "Quilted Hemp Vest",
        sku: "PQ-M-QV-002",
        category: "Men",
        subCategory: "Outerwear",
        description: "Insulated vest made with hemp shell and organic cotton lining. Dyed with eucalyptus leaves for earthy green tones.",
        fabric: "Hemp Shell, Organic Cotton Lining",
        dyeMethod: "Eucalyptus Leaf Dye",
        fit: "Regular Fit",
        price: 5999,
        colors: [
            { name: "Eucalyptus Green", hex: "#76917A" },
            { name: "Charcoal", hex: "#454545" }
        ],
        sizes: [
            { size: "S", inventory: 6 },
            { size: "M", inventory: 10 },
            { size: "L", inventory: 8 },
            { size: "XL", inventory: 5 }
        ],
        sustainabilityInfo: {
            treesPlanted: 2,
            waterSaved: 2800,
            co2Reduced: 6,
            details: "Eucalyptus dye has antimicrobial properties."
        },
        images: [{ url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80", alt: "Quilted Vest" }],
        tags: ["layering", "warm", "sustainable"]
    },
    {
        name: "Wool Blend Blazer",
        sku: "PQ-M-BL-003",
        category: "Men",
        subCategory: "Outerwear",
        description: "Sophisticated blazer in wool-linen blend. Naturally dyed with logwood for rich purple-brown tones. Fully lined with organic cotton.",
        fabric: "70% Wool, 30% Linen",
        dyeMethod: "Logwood Dye",
        fit: "Tailored Fit",
        price: 12500,
        colors: [
            { name: "Plum Brown", hex: "#5E2E32" },
            { name: "Navy", hex: "#001F3F" }
        ],
        sizes: [
            { size: "S", inventory: 4 },
            { size: "M", inventory: 6 },
            { size: "L", inventory: 5 },
            { size: "XL", inventory: 3 }
        ],
        sustainabilityInfo: {
            treesPlanted: 3,
            waterSaved: 3500,
            co2Reduced: 10,
            details: "Wool from ethically raised sheep."
        },
        images: [{ url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80", alt: "Wool Blazer" }],
        isFeatured: true,
        tags: ["formal", "premium", "blazer"]
    },
    {
        name: "Canvas Field Coat",
        sku: "PQ-M-FC-004",
        category: "Men",
        subCategory: "Outerwear",
        description: "Durable field coat in heavyweight canvas. Dyed with black walnut for deep brown tones. Multiple pockets and weather-resistant.",
        fabric: "100% Organic Cotton Canvas",
        dyeMethod: "Black Walnut Dye",
        fit: "Relaxed Fit",
        price: 7999,
        colors: [
            { name: "Walnut Brown", hex: "#654321" }
        ],
        sizes: [
            { size: "M", inventory: 8 },
            { size: "L", inventory: 10 },
            { size: "XL", inventory: 7 },
            { size: "XXL", inventory: 4 }
        ],
        sustainabilityInfo: {
            treesPlanted: 2,
            waterSaved: 2600,
            co2Reduced: 7,
            details: "Built to last for years, reducing waste."
        },
        images: [{ url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80", alt: "Field Coat" }],
        isPopular: true,
        tags: ["workwear", "durable", "utility"]
    },
    {
        name: "Lightweight Linen Overshirt",
        sku: "PQ-M-OS-005",
        category: "Men",
        subCategory: "Outerwear",
        description: "Versatile overshirt perfect for layering. Made from Italian linen and dyed with tea leaves for warm beige tones.",
        fabric: "100% Italian Linen",
        dyeMethod: "Black Tea Dye",
        fit: "Oversized Fit",
        price: 4799,
        colors: [
            { name: "Tea Beige", hex: "#D2B48C" },
            { name: "Sage", hex: "#87AE73" }
        ],
        sizes: [
            { size: "S", inventory: 7 },
            { size: "M", inventory: 12 },
            { size: "L", inventory: 10 },
            { size: "XL", inventory: 6 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 2000,
            co2Reduced: 5,
            details: "Tea leaves sourced from organic plantations."
        },
        images: [{ url: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=1000&q=80", alt: "Linen Overshirt" }],
        isNewArrival: true,
        tags: ["layering", "versatile", "lightweight"]
    },

    // ========== MEN'S ACCESSORIES (3 products) ==========
    {
        name: "Leather Belt",
        sku: "PQ-M-LB-001",
        category: "Men",
        subCategory: "Accessories",
        description: "Handcrafted leather belt with brass buckle. Vegetable-tanned leather dyed with natural extracts. Ages beautifully with use.",
        fabric: "Vegetable-Tanned Leather",
        dyeMethod: "Natural Extract Dye",
        fit: "Adjustable",
        price: 2499,
        colors: [
            { name: "Cognac", hex: "#A0522D" },
            { name: "Black", hex: "#000000" }
        ],
        sizes: [
            { size: "S (28-32)", inventory: 10 },
            { size: "M (32-36)", inventory: 15 },
            { size: "L (36-40)", inventory: 12 },
            { size: "XL (40-44)", inventory: 8 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 500,
            co2Reduced: 2,
            details: "Vegetable tanning avoids harmful chemicals."
        },
        images: [{ url: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80", alt: "Leather Belt" }],
        isPopular: true,
        tags: ["leather", "handcrafted", "accessory"]
    },
    {
        name: "Linen Scarf",
        sku: "PQ-M-SC-002",
        category: "Men",
        subCategory: "Accessories",
        description: "Lightweight linen scarf with hand-rolled edges. Dyed with madder root for rich red-orange tones. Perfect year-round accessory.",
        fabric: "100% Pure Linen",
        dyeMethod: "Madder Root Dye",
        fit: "One Size",
        price: 1899,
        colors: [
            { name: "Burnt Orange", hex: "#CC5500" },
            { name: "Olive", hex: "#556B2F" }
        ],
        sizes: [
            { size: "One Size", inventory: 20 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 800,
            co2Reduced: 2,
            details: "Hand-rolled edges by skilled artisans."
        },
        images: [{ url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80", alt: "Linen Scarf" }],
        tags: ["scarf", "lightweight", "versatile"]
    },
    {
        name: "Wool Felt Hat",
        sku: "PQ-M-HT-003",
        category: "Men",
        subCategory: "Accessories",
        description: "Classic fedora-style hat in wool felt. Naturally dyed with cutch for warm brown tones. Features grosgrain ribbon band.",
        fabric: "100% Wool Felt",
        dyeMethod: "Cutch Dye",
        fit: "Medium Brim",
        price: 3299,
        colors: [
            { name: "Camel", hex: "#C19A6B" },
            { name: "Charcoal", hex: "#36454F" }
        ],
        sizes: [
            { size: "S (56cm)", inventory: 5 },
            { size: "M (58cm)", inventory: 10 },
            { size: "L (60cm)", inventory: 8 },
            { size: "XL (62cm)", inventory: 4 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 600,
            co2Reduced: 2,
            details: "Wool from ethically raised sheep."
        },
        images: [{ url: "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?auto=format&fit=crop&w=1000&q=80", alt: "Wool Hat" }],
        tags: ["hat", "classic", "wool"]
    },

    // ========== WOMEN'S DRESSES (5 products) ==========
    {
        name: "Linen Wrap Dress",
        sku: "PQ-W-DR-001",
        category: "Women",
        subCategory: "Dresses",
        description: "Elegant wrap dress hand-dyed with Turmeric for a vibrant, safe, and natural yellow. Adjustable waist tie and flowing skirt.",
        fabric: "100% Pure Linen",
        dyeMethod: "Turmeric Dye",
        fit: "Adjustable Wrap",
        price: 5800,
        colors: [
            { name: "Golden Yellow", hex: "#FFD700" },
            { name: "Terracotta", hex: "#E2725B" }
        ],
        sizes: [
            { size: "XS", inventory: 5 },
            { size: "S", inventory: 10 },
            { size: "M", inventory: 14 },
            { size: "L", inventory: 12 },
            { size: "XL", inventory: 8 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 2200,
            co2Reduced: 5,
            details: "Turmeric has antimicrobial and skin-friendly properties."
        },
        images: [{ url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80", alt: "Wrap Dress" }],
        isNewArrival: true,
        isPopular: true,
        isFeatured: true,
        tags: ["dress", "elegant", "versatile"]
    },
    {
        name: "Earthy Hemp Kaftan",
        sku: "PQ-W-KF-002",
        category: "Women",
        subCategory: "Dresses",
        description: "Flowing kaftan made from a breathable hemp-linen blend, dyed with pomegranate skins for a soft gold hue. Perfect for resort wear.",
        fabric: "50% Hemp, 50% Linen",
        dyeMethod: "Pomegranate Skin Dye",
        fit: "Oversized",
        price: 6200,
        colors: [
            { name: "Sunset Gold", hex: "#FFAA33" }
        ],
        sizes: [
            { size: "Free Size", inventory: 20 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 3000,
            co2Reduced: 7,
            details: "Hemp requires even less water than linen. Pomegranate skins are upcycled waste."
        },
        images: [{ url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80", alt: "Hemp Kaftan" }],
        isPopular: true,
        tags: ["kaftan", "resort", "comfortable"]
    },
    {
        name: "Indigo Maxi Dress",
        sku: "PQ-W-MD-003",
        category: "Women",
        subCategory: "Dresses",
        description: "Floor-length maxi dress in soft organic cotton. Hand-dyed with fermented indigo for rich blue tones. Features tiered silhouette.",
        fabric: "100% Organic Cotton Voile",
        dyeMethod: "Fermented Indigo",
        fit: "Relaxed Fit",
        price: 6999,
        colors: [
            { name: "Indigo Blue", hex: "#4B0082" },
            { name: "Navy", hex: "#000080" }
        ],
        sizes: [
            { size: "XS", inventory: 4 },
            { size: "S", inventory: 8 },
            { size: "M", inventory: 12 },
            { size: "L", inventory: 10 },
            { size: "XL", inventory: 6 }
        ],
        sustainabilityInfo: {
            treesPlanted: 2,
            waterSaved: 2500,
            co2Reduced: 6,
            details: "Indigo fermentation is a centuries-old sustainable technique."
        },
        images: [{ url: "https://images.unsplash.com/photo-1572804013427-4e3e37c92d8c?auto=format&fit=crop&w=1000&q=80", alt: "Maxi Dress" }],
        isNewArrival: true,
        isFeatured: true,
        tags: ["maxi", "bohemian", "flowing"]
    },
    {
        name: "Linen Midi Shirt Dress",
        sku: "PQ-W-SD-004",
        category: "Women",
        subCategory: "Dresses",
        description: "Classic shirt dress in Belgian linen. Dyed with avocado pits for subtle blush pink. Features button-down front and belt.",
        fabric: "100% Belgian Linen",
        dyeMethod: "Avocado Pit Dye",
        fit: "Relaxed Fit",
        price: 5499,
        colors: [
            { name: "Blush Pink", hex: "#FFB6C1" },
            { name: "Sage Green", hex: "#9DC183" }
        ],
        sizes: [
            { size: "XS", inventory: 6 },
            { size: "S", inventory: 10 },
            { size: "M", inventory: 12 },
            { size: "L", inventory: 9 },
            { size: "XL", inventory: 5 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 2100,
            co2Reduced: 5,
            details: "Avocado pits are food waste turned into beautiful dye."
        },
        images: [{ url: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1000&q=80", alt: "Shirt Dress" }],
        isPopular: true,
        tags: ["shirtdress", "classic", "versatile"]
    },
    {
        name: "Silk Summer Dress",
        sku: "PQ-W-SS-005",
        category: "Women",
        subCategory: "Dresses",
        description: "Lightweight summer dress in peace silk. Dyed with hibiscus flowers for soft pink-purple tones. Features smocked bodice.",
        fabric: "100% Peace Silk",
        dyeMethod: "Hibiscus Flower Dye",
        fit: "Fitted Bodice, Flowy Skirt",
        price: 8999,
        colors: [
            { name: "Hibiscus Pink", hex: "#F88379" },
            { name: "Lavender", hex: "#E6E6FA" }
        ],
        sizes: [
            { size: "XS", inventory: 5 },
            { size: "S", inventory: 8 },
            { size: "M", inventory: 10 },
            { size: "L", inventory: 7 }
        ],
        sustainabilityInfo: {
            treesPlanted: 2,
            waterSaved: 1800,
            co2Reduced: 4,
            details: "Peace silk production doesn't harm silkworms."
        },
        images: [{ url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80", alt: "Summer Dress" }],
        isFeatured: true,
        tags: ["silk", "luxury", "summer"]
    },

    // ========== WOMEN'S OUTERWEAR (4 products) ==========
    {
        name: "Linen Midi Skirt",
        sku: "PQ-W-SK-001",
        category: "Women",
        subCategory: "Outerwear",
        description: "Timeless midi skirt featuring a gentle flare and dyed with natural lac for a soft pink tone. High-waisted with side pockets.",
        fabric: "100% Pure Linen",
        dyeMethod: "Lac Dye",
        fit: "A-Line",
        price: 4500,
        colors: [
            { name: "Dusty Rose", hex: "#DCAE96" },
            { name: "Cream", hex: "#FFFDD0" }
        ],
        sizes: [
            { size: "XS", inventory: 6 },
            { size: "S", inventory: 10 },
            { size: "M", inventory: 12 },
            { size: "L", inventory: 8 },
            { size: "XL", inventory: 4 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 1900,
            co2Reduced: 4,
            details: "Supports woman-led artisan clusters."
        },
        images: [{ url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=80", alt: "Midi Skirt" }],
        isPopular: true,
        tags: ["skirt", "feminine", "classic"]
    },
    {
        name: "Wool Knit Cardigan",
        sku: "PQ-W-CD-002",
        category: "Women",
        subCategory: "Outerwear",
        description: "Cozy oversized cardigan in merino wool blend. Dyed with onion skins for warm golden tones. Features wooden buttons.",
        fabric: "80% Merino Wool, 20% Organic Cotton",
        dyeMethod: "Onion Skin Dye",
        fit: "Oversized",
        price: 7999,
        colors: [
            { name: "Mustard", hex: "#FFDB58" },
            { name: "Charcoal", hex: "#464646" }
        ],
        sizes: [
            { size: "XS", inventory: 5 },
            { size: "S", inventory: 9 },
            { size: "M", inventory: 12 },
            { size: "L", inventory: 10 },
            { size: "XL", inventory: 6 }
        ],
        sustainabilityInfo: {
            treesPlanted: 2,
            waterSaved: 2200,
            co2Reduced: 5,
            details: "Merino wool from ethically raised sheep."
        },
        images: [{ url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80", alt: "Wool Cardigan" }],
        isNewArrival: true,
        tags: ["cardigan", "cozy", "layering"]
    },
    {
        name: "Linen Blazer",
        sku: "PQ-W-BZ-003",
        category: "Women",
        subCategory: "Outerwear",
        description: "Structured blazer in premium linen. Dyed with logwood for sophisticated plum tones. Fully lined with organic cotton.",
        fabric: "100% Premium Linen",
        dyeMethod: "Logwood Dye",
        fit: "Tailored",
        price: 9999,
        colors: [
            { name: "Plum", hex: "#8E4585" },
            { name: "Navy", hex: "#000080" }
        ],
        sizes: [
            { size: "XS", inventory: 4 },
            { size: "S", inventory: 7 },
            { size: "M", inventory: 9 },
            { size: "L", inventory: 6 },
            { size: "XL", inventory: 3 }
        ],
        sustainabilityInfo: {
            treesPlanted: 2,
            waterSaved: 2400,
            co2Reduced: 6,
            details: "Professional attire doesn't have to harm the planet."
        },
        images: [{ url: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&w=1000&q=80", alt: "Linen Blazer" }],
        isFeatured: true,
        tags: ["blazer", "professional", "structured"]
    },
    {
        name: "Silk Kimono Robe",
        sku: "PQ-W-KM-004",
        category: "Women",
        subCategory: "Outerwear",
        description: "Luxurious kimono-style robe in peace silk. Hand-painted with natural dyes in botanical patterns. Perfect layering piece.",
        fabric: "100% Peace Silk",
        dyeMethod: "Hand-Painted Natural Dyes",
        fit: "One Size Fits Most",
        price: 11999,
        colors: [
            { name: "Botanical Mix", hex: "#8FBC8F" }
        ],
        sizes: [
            { size: "One Size", inventory: 12 }
        ],
        sustainabilityInfo: {
            treesPlanted: 3,
            waterSaved: 2000,
            co2Reduced: 5,
            details: "Each piece is hand-painted, making it unique."
        },
        images: [{ url: "https://images.unsplash.com/photo-1617627143750-d86bc393c569?auto=format&fit=crop&w=1000&q=80", alt: "Silk Kimono" }],
        isFeatured: true,
        tags: ["kimono", "silk", "artistic"]
    },

    // ========== WOMEN'S ACCESSORIES (3 products) ==========
    {
        name: "Hemp Tote Bag",
        sku: "PQ-W-TB-001",
        category: "Women",
        subCategory: "Accessories",
        description: "Spacious tote bag in natural hemp canvas. Features leather handles and internal pockets. Dyed with coffee grounds for rich brown.",
        fabric: "100% Hemp Canvas, Leather Handles",
        dyeMethod: "Coffee Ground Dye",
        fit: "One Size",
        price: 3299,
        colors: [
            { name: "Coffee Brown", hex: "#6F4E37" },
            { name: "Natural", hex: "#E8DCC4" }
        ],
        sizes: [
            { size: "One Size", inventory: 25 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 1200,
            co2Reduced: 3,
            details: "Replace single-use bags with this durable tote."
        },
        images: [{ url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80", alt: "Hemp Tote" }],
        isPopular: true,
        tags: ["bag", "sustainable", "practical"]
    },
    {
        name: "Linen Scarf with Fringes",
        sku: "PQ-W-SC-002",
        category: "Women",
        subCategory: "Accessories",
        description: "Lightweight linen scarf with hand-knotted fringes. Dyed with madder root for coral-pink tones. Versatile styling options.",
        fabric: "100% Pure Linen",
        dyeMethod: "Madder Root Dye",
        fit: "One Size",
        price: 2199,
        colors: [
            { name: "Coral Pink", hex: "#F88379" },
            { name: "Teal", hex: "#008080" }
        ],
        sizes: [
            { size: "One Size", inventory: 30 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 900,
            co2Reduced: 2,
            details: "Hand-knotted fringes by skilled artisans."
        },
        images: [{ url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80", alt: "Linen Scarf" }],
        tags: ["scarf", "accessory", "handcrafted"]
    },
    {
        name: "Wooden Bead Necklace",
        sku: "PQ-W-NL-003",
        category: "Women",
        subCategory: "Accessories",
        description: "Statement necklace made from sustainably sourced wooden beads. Naturally dyed with turmeric and indigo for color accents.",
        fabric: "Sustainably Sourced Wood",
        dyeMethod: "Turmeric & Indigo Dye",
        fit: "Adjustable Length",
        price: 1599,
        colors: [
            { name: "Natural Wood", hex: "#8B4513" }
        ],
        sizes: [
            { size: "One Size", inventory: 40 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 200,
            co2Reduced: 1,
            details: "Wood from FSC-certified forests."
        },
        images: [{ url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=80", alt: "Wooden Necklace" }],
        tags: ["jewelry", "handmade", "statement"]
    },

    // ========== WOMEN'S TOPS (3 products) ==========
    {
        name: "Linen Peasant Blouse",
        sku: "PQ-W-BL-001",
        category: "Women",
        subCategory: "Tops",
        description: "Romantic peasant blouse with embroidered details. Made from soft linen and dyed with beetroot for pink-purple hues.",
        fabric: "100% Soft Linen",
        dyeMethod: "Beetroot Dye",
        fit: "Relaxed Fit",
        price: 3999,
        colors: [
            { name: "Berry Pink", hex: "#DC143C" },
            { name: "Cream", hex: "#FFFDD0" }
        ],
        sizes: [
            { size: "XS", inventory: 7 },
            { size: "S", inventory: 12 },
            { size: "M", inventory: 15 },
            { size: "L", inventory: 10 },
            { size: "XL", inventory: 6 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 1700,
            co2Reduced: 4,
            details: "Beetroot dye is completely biodegradable."
        },
        images: [{ url: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=1000&q=80", alt: "Peasant Blouse" }],
        isPopular: true,
        tags: ["blouse", "romantic", "embroidered"]
    },
    {
        name: "Hemp Crop Tunic",
        sku: "PQ-W-CT-002",
        category: "Women",
        subCategory: "Tops",
        description: "Modern crop tunic in hemp-cotton blend. Dyed with eucalyptus for soft grey-green. Features side slits.",
        fabric: "70% Hemp, 30% Organic Cotton",
        dyeMethod: "Eucalyptus Dye",
        fit: "Cropped Length",
        price: 3499,
        colors: [
            { name: "Eucalyptus", hex: "#76917A" },
            { name: "Sand", hex: "#C2B280" }
        ],
        sizes: [
            { size: "XS", inventory: 8 },
            { size: "S", inventory: 13 },
            { size: "M", inventory: 16 },
            { size: "L", inventory: 12 },
            { size: "XL", inventory: 7 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 2500,
            co2Reduced: 6,
            details: "Hemp-cotton blend offers durability and comfort."
        },
        images: [{ url: "https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&w=1000&q=80", alt: "Crop Tunic" }],
        isNewArrival: true,
        tags: ["tunic", "modern", "sustainable"]
    },
    {
        name: "Organic Cotton T-Shirt",
        sku: "PQ-W-TS-003",
        category: "Women",
        subCategory: "Tops",
        description: "Essential organic cotton tee with relaxed fit. Dyed with avocado pits for soft peach tones. Perfect everyday basic.",
        fabric: "100% Organic Cotton Jersey",
        dyeMethod: "Avocado Pit Dye",
        fit: "Relaxed Fit",
        price: 1999,
        colors: [
            { name: "Peach", hex: "#FFDAB9" },
            { name: "Olive", hex: "#808000" },
            { name: "White", hex: "#FFFFFF" }
        ],
        sizes: [
            { size: "XS", inventory: 15 },
            { size: "S", inventory: 20 },
            { size: "M", inventory: 25 },
            { size: "L", inventory: 18 },
            { size: "XL", inventory: 12 }
        ],
        sustainabilityInfo: {
            treesPlanted: 1,
            waterSaved: 1300,
            co2Reduced: 3,
            details: "Organic cotton uses 91% less water than conventional."
        },
        images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80", alt: "Organic Tee" }],
        isPopular: true,
        tags: ["tshirt", "basic", "comfortable"]
    }
];

const importData = async (exitOnComplete = true) => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        await Product.insertMany(products);

        // Create Admin User
        await User.create({
            name: 'Admin User',
            email: 'admin@preque.in',
            password: 'password123',
            isAdmin: true,
            phone: '+91-9876543210',
            address: {
                street: '123 Green Street',
                city: 'Mumbai',
                state: 'Maharashtra',
                postalCode: '400001',
                country: 'India'
            }
        });

        // Create Test Customer User
        await User.create({
            name: 'Test Customer',
            email: 'customer@test.com',
            password: 'password123',
            isAdmin: false,
            phone: '+91-9123456789',
            address: {
                street: '456 Eco Lane',
                city: 'Bangalore',
                state: 'Karnataka',
                postalCode: '560001',
                country: 'India'
            }
        });

        console.log('✅ Data Imported Successfully!');
        console.log(`📦 ${products.length} products added`);
        console.log('👤 2 users created (1 admin, 1 customer)');
        console.log('');
        console.log('🔑 Admin Login:');
        console.log('   Email: admin@preque.in');
        console.log('   Password: password123');
        console.log('');
        console.log('🔑 Customer Login:');
        console.log('   Email: customer@test.com');
        console.log('   Password: password123');

        if (exitOnComplete) process.exit();
    } catch (error) {
        console.error('❌ Error importing data:', error);
        if (exitOnComplete) process.exit(1);
    }
};

const destroyData = async (exitOnComplete = true) => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        console.log('✅ Data Destroyed!');
        if (exitOnComplete) process.exit();
    } catch (error) {
        console.error('❌ Error destroying data:', error);
        if (exitOnComplete) process.exit(1);
    }
};

module.exports = { importData, destroyData, products };

if (require.main === module) {
    dotenv.config();
    connectDB().then(() => {
        if (process.argv[2] === '-d') {
            destroyData();
        } else {
            importData();
        }
    });
}
