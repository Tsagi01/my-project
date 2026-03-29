export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

// Hard-coded sample products for the prototype.
// Later, these could come from a database or API.
export const products: Product[] = [
  { id: 1, name: "Classic Burger", category: "Meals", price: 8.5, stock: 12 },
  { id: 2, name: "Chicken Wrap", category: "Meals", price: 7.2, stock: 9 },
  { id: 3, name: "Caesar Salad", category: "Salads", price: 6.8, stock: 7 },
  { id: 4, name: "Tomato Soup", category: "Soups", price: 4.9, stock: 10 },
  { id: 5, name: "Margherita Pizza", category: "Meals", price: 11.5, stock: 6 },
  { id: 6, name: "Iced Coffee", category: "Drinks", price: 3.5, stock: 18 },
  { id: 7, name: "Orange Juice", category: "Drinks", price: 3.0, stock: 14 },
  { id: 8, name: "Chocolate Muffin", category: "Desserts", price: 2.8, stock: 11 },
];
