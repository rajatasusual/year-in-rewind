// src/app/components/MediumArticles.tsx
"use client";

import { useEffect, useState } from 'react';

interface Article {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  image: string;
}

export default function MediumArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchMediumFeed() {
      try {
        const response = await fetch('articles.json');
        const data = await response.json();
        const articles: Article[] = data.items;

        setArticles(articles);
      } catch (error) {
        console.error('Failed to fetch Medium feed:', error);
      }
    }

    fetchMediumFeed();
  }, []);


  const parseDescription = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Extract the first image src
    const imgElement = doc.querySelector('img');
    const imgSrc = imgElement ? imgElement.getAttribute('src') : '';

    // Extract text content
    const textContent = doc.body.textContent || '';
    const cleanedText = textContent.replace(/Continue reading.*/, ''); // Remove trailing "Continue reading..."

    return { imgSrc, textContent: cleanedText };
  };

  // Handler for moving to the previous article
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : articles.length - 1));
  };

  // Handler for moving to the next article
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < articles.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <section className="p-8 component bg-gradient">
      <h2 className="text-3xl mb-4">Medium Articles</h2>

      {articles.length > 0 ? (
        <div className="relative w-full max-w-lg mx-auto overflow-hidden blur-effect p-6 bg-white shadow-md rounded-lg">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {articles.map((article, index) => {
              const { imgSrc, textContent } = parseDescription(article.description);

              return (
                <div
                  key={index}
                  className="article-card w-full flex-shrink-0 p-6 shadow-md rounded-lg bg-white transition duration-500"
                  style={{
                    minHeight: '300px',
                    maxWidth: '100%',
                  }}
                >
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <h3 className="text-2xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{new Date(article.pubDate).toDateString()}</p>
                  <p className="text-gray-700 mb-4">{textContent.slice(0, 150)}...</p>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </a>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>Loading articles...</p>
      )}
    </section>
  );
}