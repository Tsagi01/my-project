export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  imageAlt: string;
  description: string;
  supplier: string;
  commentCount: number;
  optionLabel: string;
  options: string[];
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
    description:
      "A structured revision guide covering key concepts, exam-style questions, and practical computing notes for Advanced Higher students.",
    supplier: "357 Learning Press",
    commentCount: 0,
    optionLabel: "Format",
    options: ["Paperback", "Digital"],
  },
  {
    id: 2,
    name: "Database Systems Revision Workbook",
    category: "Books",
    price: 19.5,
    stock: 10,
    image: "/products/product-placeholder.svg",
    imageAlt: "Database Systems Revision Workbook",
    description:
      "Practice workbook for relational databases, normalisation, SQL queries, and coursework preparation.",
    supplier: "357 Learning Press",
    commentCount: 0,
    optionLabel: "Format",
    options: ["Paperback", "Digital"],
  },
  {
    id: 3,
    name: "Object-Oriented Programming Handbook",
    category: "Books",
    price: 22.0,
    stock: 8,
    image: "/products/product-placeholder.svg",
    imageAlt: "Object-Oriented Programming Handbook",
    description:
      "A concise handbook for classes, objects, inheritance, testing, and common programming patterns used in coursework.",
    supplier: "357 Learning Press",
    commentCount: 0,
    optionLabel: "Format",
    options: ["Paperback", "Digital"],
  },
  {
    id: 4,
    name: "Web Development Fundamentals DVD",
    category: "CD/DVD",
    price: 14.99,
    stock: 12,
    image: "/products/product-placeholder.svg",
    imageAlt: "Web Development Fundamentals DVD",
    description:
      "Video lessons covering HTML, CSS, JavaScript basics, accessibility, and responsive web page structure.",
    supplier: "North Learning Media",
    commentCount: 0,
    optionLabel: "Media",
    options: ["DVD", "Digital access"],
  },
  {
    id: 5,
    name: "Computer Networking Tutorial DVD",
    category: "CD/DVD",
    price: 16.5,
    stock: 9,
    image: "/products/product-placeholder.svg",
    imageAlt: "Computer Networking Tutorial DVD",
    description:
      "Guided networking tutorials for addressing, routing basics, common hardware, and troubleshooting exercises.",
    supplier: "North Learning Media",
    commentCount: 0,
    optionLabel: "Media",
    options: ["DVD", "Digital access"],
  },
  {
    id: 6,
    name: "Python Practice Suite",
    category: "Software",
    price: 29.99,
    stock: 20,
    image: "/products/product-placeholder.svg",
    imageAlt: "Python Practice Suite",
    description:
      "A student edition practice package with programming tasks, worked examples, and self-check exercises.",
    supplier: "CodeLab Education",
    commentCount: 0,
    optionLabel: "Licence",
    options: ["1 year", "2 years"],
  },
  {
    id: 7,
    name: "SQL Trainer Student Edition",
    category: "Software",
    price: 34.99,
    stock: 14,
    image: "/products/product-placeholder.svg",
    imageAlt: "SQL Trainer Student Edition",
    description:
      "Interactive SQL trainer with query practice, schema exercises, and feedback designed for database revision.",
    supplier: "CodeLab Education",
    commentCount: 0,
    optionLabel: "Licence",
    options: ["1 year", "2 years"],
  },
  {
    id: 8,
    name: "Network Simulator Learning Pack",
    category: "Software",
    price: 39.99,
    stock: 11,
    image: "/products/product-placeholder.svg",
    imageAlt: "Network Simulator Learning Pack",
    description:
      "A lightweight simulation pack for network layouts, packet flow demonstrations, and classroom practice.",
    supplier: "CodeLab Education",
    commentCount: 0,
    optionLabel: "Licence",
    options: ["Student", "Classroom"],
  },
  {
    id: 9,
    name: '14" Student Laptop',
    category: "Hardware",
    price: 499.0,
    stock: 5,
    image: "/products/product-placeholder.svg",
    imageAlt: '14" Student Laptop',
    description:
      "A compact student laptop suitable for coursework, browsing resources, programming exercises, and presentations.",
    supplier: "357 Hardware Supply",
    commentCount: 0,
    optionLabel: "Bundle",
    options: ["Laptop only", "Starter bundle"],
  },
  {
    id: 10,
    name: "RJ45 Connector Pack",
    category: "Hardware",
    price: 8.99,
    stock: 30,
    image: "/products/product-placeholder.svg",
    imageAlt: "RJ45 Connector Pack",
    description:
      "A practical connector pack for networking labs, cable demonstrations, and hardware troubleshooting lessons.",
    supplier: "357 Hardware Supply",
    commentCount: 0,
    optionLabel: "Pack size",
    options: ["10 pack", "25 pack"],
  },
  {
    id: 11,
    name: "USB Ethernet Adapter",
    category: "Hardware",
    price: 17.99,
    stock: 16,
    image: "/products/product-placeholder.svg",
    imageAlt: "USB Ethernet Adapter",
    description:
      "Portable USB Ethernet adapter for laptops without built-in network ports and practical networking sessions.",
    supplier: "357 Hardware Supply",
    commentCount: 0,
    optionLabel: "Connector",
    options: ["USB-A", "USB-C"],
  },
  {
    id: 12,
    name: "Raspberry Pi Starter Kit",
    category: "Hardware",
    price: 89.99,
    stock: 7,
    image: "/products/product-placeholder.svg",
    imageAlt: "Raspberry Pi Starter Kit",
    description:
      "Starter kit for practical computing projects, including classroom-friendly hardware for experiments and prototypes.",
    supplier: "357 Hardware Supply",
    commentCount: 0,
    optionLabel: "Kit",
    options: ["Starter", "Starter + sensors"],
  },
];
