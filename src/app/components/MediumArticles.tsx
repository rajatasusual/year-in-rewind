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
    const imgElement = doc.querySelector('img');
    const imgSrc = imgElement ? imgElement.getAttribute('src') : '';
    const textContent = doc.body.textContent || '';
    const cleanedText = textContent.replace(/Continue reading.*/, '');
    return { imgSrc, textContent: cleanedText };
  };

  return (
    <section>
      <h2>Medium Articles</h2>

      {articles.length > 0 ? (
        <div className="overflow-x-auto snap-x snap-mandatory article-slider">
          {articles.map((article, index) => {
            const { imgSrc, textContent } = parseDescription(article.description);

            return (
              <div
                key={index}
                className="snap-center article-card"
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
      ) : (
        <p>Loading articles...</p>
      )}
    </section>
  );
}