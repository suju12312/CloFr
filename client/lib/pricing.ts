export type ItemRate = {
  item: string;
  washFold?: number | string;
  dryClean?: number | string;
  iron?: number | string;
  steamIron?: number | string;
};


export const MEN_RATES: ItemRate[] = [
  { item: "Shirt", washFold: "90", dryClean: 110, iron: 9, steamIron: 30 },
  { item: "Trousers", washFold: 90, dryClean: 110, iron: 9, steamIron: 30 },
  { item: "T-shirt", washFold: 75, dryClean: 95, iron: 9, steamIron: 25  },
  { item: "Jeans", washFold: 100, dryClean: 120, iron: 9, steamIron: 30 },
  { item: "Kurta", washFold: "100+", dryClean: "120+", iron: "10+", steamIron: "30+" },
];

export const WOMEN_RATES: ItemRate[] = [
  { item: "Top/Blouse", washFold: "100+"+ "/"+"70+", dryClean: "120+"+ "/"+"90+", iron: "10+", steamIron: "30+"+"/"+"25+"},
  { item: "Salwar/Plazo", washFold: "70"+"/"+"70+", dryClean: "90"+"/"+"90+", iron: "10+", steamIron:"25"+"/"+"25+" },
  { item: "Dress", washFold: "330+", dryClean: "350+", iron: 10, steamIron: "100+" },
  { item: "Kurti", washFold: "100+", dryClean: "120+", iron: "10+", steamIron: "30+" },
  { item: "Saree", washFold: "230+", dryClean: "250+", iron: 30, steamIron: "70+"},
  { item: "Lehanga", washFold: "485+", dryClean: "505+", iron: 80, steamIron: "140+"},
  { item: "Dupatta", washFold: "50+", dryClean: "70+", iron: 8, steamIron: "15+"},
];

export const HOUSEHOLD_RATES: ItemRate[] = [
  { item: "Bedsheet Single"+"/"+"Double", washFold: 120, dryClean: 140},
  { item: "Blanket Single 1/2 Ply", washFold: "330/420", dryClean: "350/440"},
  { item: "Blanket Double 1/2 Ply", washFold: "450/550", dryClean: "470/570"},
  { item: "Carpet", washFold: "35/Sq Ft", dryClean: "45/Sq Ft" },
  
];

export const FOOTWEAR_RATES: ItemRate[] = [
  { item: "Sneakers", washFold: 380, dryClean: 400, iron: "-" }, // Clean, Deep Clean, Polish
  { item: "Leather Shoes", washFold: 490, dryClean: 510, iron: 200 },
  { item: "Heels", washFold: 500, dryClean: 520, iron: 180 },
  { item: "Sports Shoes", washFold: 380, dryClean: 400, iron: "-" },
  { item: "Boots", washFold: "700+", dryClean: "730+", iron: 200 },
];

export type PackagePlan = {
  name: string;
  garments: number;
  turnaround: string;
  price: number; // monthly in INR
  features: string[];
};

export const PACKAGES: PackagePlan[] = [
  {
    name: "Basic",
    garments: 5,
    turnaround: "24h",
    price: 45,
    features: ["Ironing", "Free Pickup/Delivery"],
  },
  {
    name: "Medium",
    garments: 5,
    turnaround: "48h",
    price: 200,
    features: ["Wash & Fold", "Free Pickup/Delivery", "Priority Support"],
  },
  {
    name: "Premium",
    garments: 5,
    turnaround: "48h",
    price: 145,
    features: ["Wash & Stram Iron", "Express Pickup"],
  },
];
