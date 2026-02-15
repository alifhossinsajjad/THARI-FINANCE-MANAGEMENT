// components/EducationCardsGrid.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

type Article = {
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
};

const articles: Article[] = [
  {
    title: "Understanding Halal Stock Screening Criteria",
    description:
      "A comprehensive guide to the key metrics and ratios used to determine whether a stock is Sharia-compliant.",
    author: "Fatima Al-Rashid",
    date: "Jan 3, 2025",
    readTime: "7 min read",
    imageUrl: "/images/user/dashboard/news/education1.png", // replace with real paths
  },
  {
    title: "Understanding Halal Stock Screening Criteria",
    description:
      "A comprehensive guide to the key metrics and ratios used to determine whether a stock is Sharia-compliant.",
    author: "Fatima Al-Rashid",
    date: "Jan 3, 2025",
    readTime: "7 min read",
    imageUrl: "/images/user/dashboard/news/education2.png",
  },
  {
    title: "Understanding Halal Stock Screening Criteria",
    description:
      "A comprehensive guide to the key metrics and ratios used to determine whether a stock is Sharia-compliant.",
    author: "Fatima Al-Rashid",
    date: "Jan 3, 2025",
    readTime: "7 min read",
    imageUrl: "/images/user/dashboard/news/education3.png",
  },
  {
    title: "Understanding Halal Stock Screening Criteria",
    description:
      "A comprehensive guide to the key metrics and ratios used to determine whether a stock is Sharia-compliant.",
    author: "Fatima Al-Rashid",
    date: "Jan 3, 2025",
    readTime: "7 min read",
    imageUrl: "/images/user/dashboard/news/education4.png",
  },
];

export default function EducationCardsGrid() {
  return (
    <section className="pt-16  md:pt-20 pb-4 bg-gray-50">
      <div className=" px-6 lg:px-8 md:max-w-[60vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 flex flex-col h-full"
            >
              {/* Image / Chart */}
              <div className="relative aspect-[4/3] bg-gray-900">
                <Image
                  width={1600}
                  height={1600}
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-2.5 py-1 bg-blue-600 text-white text-xs font-medium rounded-md">
                    Education
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {article.description}
                </p>

                <div className="text-xs text-gray-500 mb-4">
                  <span className="font-medium text-gray-700">
                    {article.author}
                  </span>
                  <span className="mx-1.5">•</span>
                  <span>{article.date}</span>
                  <span className="mx-1.5">•</span>
                  <span>{article.readTime}</span>
                </div>

                <Link
                  href="/education/halal-stock-screening"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium text-sm group mt-auto"
                >
                  Read More
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
