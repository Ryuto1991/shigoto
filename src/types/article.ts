export interface Article {
  id: number;
  title: string;
  description: string;
  overview: string;
  whyItWorks: {
    background: string;
    technicalDetails: string;
  };
  uniqueComposition: {
    materials: {
      description: string;
      sources: string[];
    };
    designProcess: {
      description: string;
      challenges: string[];
      inspiration: string;
    };
  };
  collaboration: {
    partners: {
      name: string;
      role: string;
      contribution: string;
    }[];
    communityEngagement: {
      events: string[];
      impact: string;
    };
  };
  relevantIndustries: {
    name: string;
    impact: string;
  }[];
  gallery: {
    techniques: {
      image: string;
      caption: string;
    }[];
    factory: {
      image: string;
      caption: string;
    }[];
    products: {
      image: string;
      caption: string;
    }[];
  };
  additionalInfo: {
    patents?: string[];
    techniques: string[];
    processes: string[];
  };
  contact: {
    email: string;
    phone?: string;
    website?: string;
  };
  image: string;
  tags: string[];
  slug: string;
  wordpressId?: number;
  isSecret?: boolean;
}