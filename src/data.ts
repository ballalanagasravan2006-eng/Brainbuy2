export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  verified: boolean;
  major: string;
  gradYear: number;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  category: string;
  seller: Seller;
  distance: string;
  location: string;
  image: string;
  createdAt: string;
}

export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Apple MacBook Pro M2 (16GB RAM, 512GB SSD)',
    description: 'Perfect for CS or Design students. Battery health is at 96%. Comes with original charger and a protective case.',
    price: 950,
    originalPrice: 1299,
    condition: 'Like New',
    category: 'Electronics',
    distance: '0.2 mi',
    location: 'Main Library',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
    createdAt: '2h ago',
    seller: {
      id: 's1',
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      rating: 4.9,
      verified: true,
      major: 'Computer Science',
      gradYear: 2025
    }
  },
  {
    id: '2',
    title: 'Introduction to Algorithms, 3rd Edition',
    description: 'Required textbook for CS 311. Minimal highlighting in the first two chapters, otherwise perfect.',
    price: 45,
    originalPrice: 110,
    condition: 'Good',
    category: 'Textbooks',
    distance: '0.5 mi',
    location: 'Engineering Building',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
    createdAt: '5h ago',
    seller: {
      id: 's2',
      name: 'Michael Chang',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      rating: 4.7,
      verified: true,
      major: 'Software Engineering',
      gradYear: 2026
    }
  },
  {
    id: '3',
    title: 'Sony WH-1000XM4 Noise Cancelling Headphones',
    description: 'Lifesaver for noisy dorms. Upgraded to XM5s so I no longer need these. Case included.',
    price: 150,
    originalPrice: 348,
    condition: 'Good',
    category: 'Electronics',
    distance: '1.2 mi',
    location: 'North Campus Dorms',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop',
    createdAt: '1d ago',
    seller: {
      id: 's3',
      name: 'Emily Ross',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
      rating: 5.0,
      verified: true,
      major: 'Architecture',
      gradYear: 2024
    }
  },
  {
    id: '4',
    title: 'Frigidaire Compact Mini Fridge',
    description: 'Used for one semester. Cleaned thoroughly. Must pick up yourself.',
    price: 65,
    originalPrice: 150,
    condition: 'Fair',
    category: 'Dorm Essentials',
    distance: '0.1 mi',
    location: 'West Hall',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=800&auto=format&fit=crop',
    createdAt: '2d ago',
    seller: {
      id: 's4',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      rating: 4.2,
      verified: false,
      major: 'Business',
      gradYear: 2027
    }
  },
  {
    id: '5',
    title: 'Principles of Economics - Mankiw',
    description: 'Econ 101 textbook. No writing or highlighting.',
    price: 30,
    originalPrice: 85,
    condition: 'Like New',
    category: 'Textbooks',
    distance: '0.8 mi',
    location: 'Business School',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop',
    createdAt: '2d ago',
    seller: {
      id: 's5',
      name: 'Amanda Brooks',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      rating: 4.9,
      verified: true,
      major: 'Economics',
      gradYear: 2025
    }
  },
  {
    id: '6',
    title: 'IKEA Desk Lamp with Wireless Charging',
    description: 'Has a built-in wireless phone charger in the base. Super convenient.',
    price: 25,
    originalPrice: 45,
    condition: 'Like New',
    category: 'Dorm Essentials',
    distance: '0.4 mi',
    location: 'Student Union',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop',
    createdAt: '3d ago',
    seller: {
      id: 's1',
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      rating: 4.9,
      verified: true,
      major: 'Computer Science',
      gradYear: 2025
    }
  }
];

export const CATEGORIES = [
  "All", 
  "Textbooks", 
  "Electronics", 
  "Dorm Essentials", 
  "Furniture", 
  "Clothing", 
  "Tickets"
];
