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
    <section>
      <h2>Medium Articles</h2>

      {articles.length > 0 ? (
        <div className='article-slider'>
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
                  className="article-card"
                >
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt={article.title}
                      className="article-image"
                    />
                  )}
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-date">{new Date(article.pubDate).toDateString()}</p>
                  <p className="article-text">{textContent.slice(0, 150)}...</p>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="article-link"
                  >
                    Read more
                  </a>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrevious}
            >
              Previous
            </button>
            <span className="article-counter">
              {currentIndex + 1}/{articles.length}
            </span>
            <button
              onClick={handleNext}
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