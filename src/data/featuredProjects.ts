import type { Project } from '../types/project';

export const featuredProjects: Project[] = [
  {
    id: 1,
    title: 'Sustainable Silk Collection',
    description: 'Innovative eco-friendly silk textile collection using traditional Japanese dyeing techniques',
    fullDescription: '伝統的な染色技法と現代的な持続可能性の概念を組み合わせた、革新的なシルクテキスタイルコレクション。天然染料を使用し、環境負荷を最小限に抑えながら、美しい色彩と柄を実現しています。',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Sustainable', 'Silk', 'Natural Dyes'],
    slug: 'sustainable-silk-collection',
    category: 'fashion',
    client: 'Eco Fashion Brand',
    year: '2024',
    collaborators: ['Traditional Craftsmen Association', 'Sustainable Textile Research Lab'],
    materials: ['Organic Silk', 'Natural dyes', 'Organic mordants'],
    techniques: ['手描き友禅', '藍染め', '絞り染め', '蒸し'],
    wordpressId: 1001
  },
  {
    id: 2,
    title: 'Smart Textile Interface',
    description: 'Interactive textile surfaces for architectural applications',
    fullDescription: 'センサーと導電性糸を組み合わせた革新的なスマートテキスタイル。環境に応じて色や形状が変化する、次世代の建築用ファブリックです。',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Technical', 'Smart Textiles', 'Architecture'],
    slug: 'smart-textile-interface',
    category: 'technical',
    client: 'Modern Architecture Studio',
    year: '2023',
    materials: ['導電性糸', 'センサー素子', '特殊ポリマー'],
    techniques: ['電子回路織り込み', 'センサー実装', '特殊コーティング'],
    wordpressId: 1002
  },
  {
    id: 3,
    title: 'Biodegradable Furnishing Fabrics',
    description: 'Eco-conscious interior textiles with zero waste',
    fullDescription: '100%生分解可能な素材を使用したインテリアファブリックコレクション。使用後は土に還り、環境への負荷を最小限に抑えます。',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Interior', 'Sustainable', 'Biodegradable'],
    slug: 'biodegradable-furnishing-fabrics',
    category: 'interior',
    client: 'Eco Interior Design Studio',
    year: '2024',
    materials: ['生分解性ポリマー', 'オーガニックコットン', '天然染料'],
    techniques: ['特殊織り', '生分解性加工', 'エコ染色'],
    wordpressId: 1003
  }
];