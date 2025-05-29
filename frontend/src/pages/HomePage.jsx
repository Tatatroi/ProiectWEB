import CityCarousel from "../components/CityCarousel";
import QuoteBox from "../components/QuoteBox";
import { useNavigate } from "react-router-dom";

export default function HomePage({ loggedIn }) {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h1 className="display-3 fw-bold my-4 text-center" style={{ color: "#6A4CFF" }}>TripPlanner</h1>
      <div className="row g-4 justify-content-center align-items-center">
        <div className="col-12 col-md-7">
          <CityCarousel />
        </div>
        <div className="col-12 col-md-5">
          <QuoteBox />
        </div>
      </div>
      {loggedIn && (
        <div className="text-center mt-5">
          <button
            className="btn btn-lg btn-success px-4 py-3 fw-bold shadow"
            onClick={() => navigate("/mytrips")}
          >
            🌍 Go to My Trips
          </button>
        </div>
      )}
    </div>
  );
}