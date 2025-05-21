import React from "react";
import Carousel from "react-bootstrap/Carousel";

// Replace with your image URLs!
const cities = [
  { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", alt: "Paris" },
  { src: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80", alt: "Rome" },
  { src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80", alt: "Barcelona" }
];

export default function CityCarousel() {
  return (
    <Carousel>
      {cities.map((city, i) => (
        <Carousel.Item key={i}>
          <img
            className="d-block w-100"
            src={city.src}
            alt={city.alt}
            style={{ height: "320px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h5>{city.alt}</h5>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}