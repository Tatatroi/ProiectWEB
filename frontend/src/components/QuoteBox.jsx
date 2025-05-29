import "../css/QuoteBox.css"; // Import the CSS file

const QUOTES = [
  "The world is a book and those who do not travel read only one page.",
  "Travel is the only thing you buy that makes you richer.",
  "Not all those who wander are lost.",
];

export default function QuoteBox() {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  return (
    <div className="quote-box border rounded shadow p-4 bg-white text-center">
      <blockquote className="blockquote mb-0">
        <p className="lead quote-text text-dark">{quote}</p>
      </blockquote>
    </div>
  );
}