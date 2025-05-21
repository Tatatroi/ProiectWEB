import React from "react";

const QUOTES = [
  "The world is a book and those who do not travel read only one page.",
  "Travel is the only thing you buy that makes you richer.",
  "Not all those who wander are lost.",
];

export default function QuoteBox() {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  return (
    <div className="border rounded shadow p-4 bg-white text-center">
      <blockquote className="blockquote mb-0">
        <p className="lead">"{quote}"</p>
      </blockquote>
    </div>
  );
}