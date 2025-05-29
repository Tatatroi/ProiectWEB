import Carousel from "react-bootstrap/Carousel";
import mountain from "../assets/mountain.avif";
import desert from "../assets/desert.avif";
import city from "../assets/city.avif";

const photos = [
  { src: mountain, alt: "Mountain" },
  { src: desert, alt: "Desert" },
  { src: city, alt: "City" }
];

export default function CityCarousel() {
  return (
    <Carousel>
      {photos.map((city, i) => (
        <Carousel.Item key={i}>
          <img
            className="d-block w-100"
            src={city.src}
            alt={city.alt}
            style={{ height: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h5>{city.alt}</h5>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}