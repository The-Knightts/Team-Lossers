"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${API_KEY}`;

interface Article {
    title: string;
    url: string;
    urlToImage?: string;
    description?: string;
    source?: { name: string };
}

function GlobalNews() {
    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("general");
    const [page, setPage] = useState(1);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const categories: { [key: string]: string } = {
        "Top Stories": "general",
        "Technology": "technology",
        "Finance": "business",
        "Sports": "sports",
        "Arts & Culture": "entertainment",
        "Science": "science",
        "Health": "health",
    };

    const fetchNews = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}&category=${selectedCategory}&page=${page}&pageSize=10`);
            const data = await response.json();
            if (data.articles) {
                setNews((prevNews) => [...prevNews, ...data.articles]);
            }
        } catch (err) {
            setError("Failed to load news. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, page]);

    useEffect(() => {
        setNews([]);
        setPage(1);
    }, [selectedCategory]);

    useEffect(() => {
        fetchNews();
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [news]);

    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="bg-gray-950 text-white min-h-screen p-6">
            {/* Categories */}
            <div className="flex space-x-4 border-b border-gray-800 pb-4 mb-6 overflow-x-auto">
                {Object.keys(categories).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectedCategory(categories[tab])}
                        className={`text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ${
                            selectedCategory === categories[tab]
                                ? "bg-gradient-to-r from-teal-400 to-blue-500 text-black scale-110 shadow-lg"
                                : "text-gray-400 hover:text-white hover:scale-105"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((article, index) => (
                    <a
                        key={index}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block bg-gray-900/75 backdrop-blur-md p-5 rounded-2xl shadow-xl transition-all duration-300 hover:bg-gray-800 hover:scale-[1.02]"
                    >
                        {article.urlToImage && (
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-full h-48 object-cover rounded-lg shadow-md"
                            />
                        )}
                        <h3 className="text-lg font-semibold mt-3">{article.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{article.source?.name}</p>
                        <p className="text-gray-300 text-xs mt-2 line-clamp-2">{article.description}</p>

                        {/* Floating Badge */}
                        <span className="absolute top-3 right-3 bg-gradient-to-r from-teal-400 to-blue-500 text-black text-xs px-3 py-1 rounded-full shadow-md">
                            {article.source?.name}
                        </span>
                    </a>
                ))}
            </div>

            {/* Loading Indicator */}
            <div ref={observerRef} className="text-center mt-6">
                {loading && <p className="text-lg animate-pulse text-teal-400">Loading more news...</p>}
            </div>
        </div>
    );
}

export default GlobalNews;