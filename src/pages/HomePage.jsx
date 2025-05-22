import CityCarousel from "../components/CityCarousel";
import QuoteBox from "../components/QuoteBox";

export default function HomePage() {
  return (
    <div className="container py-5">
      <h1 className="display-3 fw-bold text-primary my-4 text-center">TripPlanner</h1>
      <div className="row g-4 justify-content-center align-items-center">
        <div className="col-12 col-md-7">
          <CityCarousel />
        </div>
        <div className="col-12 col-md-5">
          <QuoteBox />
        </div>
      </div>
    </div>
  );
}