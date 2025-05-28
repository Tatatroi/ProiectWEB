import React from "react";
import Carousel from "react-bootstrap/Carousel";

// Replace with your image URLs!
const cities = [
  { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", alt: "Mountain" },
  { src: "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Desert" },
  { src: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "City" }
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