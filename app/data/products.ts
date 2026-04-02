export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  imageAlt: string;
};

// Hard-coded sample products for the prototype.
// Later, these could come from a database or API.
export const products: Product[] = [
  {
    id: 1,
    name: "SQA Advanced Higher Computing Study Guide",
    category: "Books",
    price: 24.99,
    stock: 15,
    image: "/products/product-placeholder.svg",
    imageAlt: "SQA Advanced Higher Computing Study Guide",
  },
  {
    id: 2,
    name: "Database Systems Revision Workbook",
    category: "Books",
    price: 19.5,
    stock: 10,
    image: "/products/product-placeholder.svg",
    imageAlt: "Database Systems Revision Workbook",
  },
  {
    id: 3,
    name: "Object-Oriented Programming Handbook",
    category: "Books",
    price: 22.0,
    stock: 8,
    image: "/products/product-placeholder.svg",
    imageAlt: "Object-Oriented Programming Handbook",
  },
  {
    id: 4,
    name: "Web Development Fundamentals DVD",
    category: "CD/DVD",
    price: 14.99,
    stock: 12,
    image: "/products/product-placeholder.svg",
    imageAlt: "Web Development Fundamentals DVD",
  },
  {
    id: 5,
    name: "Computer Networking Tutorial DVD",
    category: "CD/DVD",
    price: 16.5,
    stock: 9,
    image: "/products/product-placeholder.svg",
    imageAlt: "Computer Networking Tutorial DVD",
  },
  {
    id: 6,
    name: "Python Practice Suite",
    category: "Software",
    price: 29.99,
    stock: 20,
    image: "/products/product-placeholder.svg",
    imageAlt: "Python Practice Suite",
  },
  {
    id: 7,
    name: "SQL Trainer Student Edition",
    category: "Software",
    price: 34.99,
    stock: 14,
    image: "/products/product-placeholder.svg",
    imageAlt: "SQL Trainer Student Edition",
  },
  {
    id: 8,
    name: "Network Simulator Learning Pack",
    category: "Software",
    price: 39.99,
    stock: 11,
    image: "/products/product-placeholder.svg",
    imageAlt: "Network Simulator Learning Pack",
  },
  {
    id: 9,
    name: '14" Student Laptop',
    category: "Hardware",
    price: 499.0,
    stock: 5,
    image: "/products/product-placeholder.svg",
    imageAlt: '14" Student Laptop',
  },
  {
    id: 10,
    name: "RJ45 Connector Pack",
    category: "Hardware",
    price: 8.99,
    stock: 30,
    image: "/products/product-placeholder.svg",
    imageAlt: "RJ45 Connector Pack",
  },
  {
    id: 11,
    name: "USB Ethernet Adapter",
    category: "Hardware",
    price: 17.99,
    stock: 16,
    image: "/products/product-placeholder.svg",
    imageAlt: "USB Ethernet Adapter",
  },
  {
    id: 12,
    name: "Raspberry Pi Starter Kit",
    category: "Hardware",
    price: 89.99,
    stock: 7,
    image: "/products/product-placeholder.svg",
    imageAlt: "Raspberry Pi Starter Kit",
  },
];
