import React from "react";
import "../css/AboutPage.css";
import travel from "../assets/travel.avif";
import easyIntuitive from "../assets/easy-list.jpg"
import feature from "../assets/feature.jpg"

export default function AboutPage() {
  return (
    <div className="about-page">
      <h2>About TripPlanner</h2>
      <section className="about-hero">
        <div>
          <h3>Your Smart Travel Companion</h3>
          <p>
            <b>TripPlanner</b> is a modern and intuitive web application designed to help you organize all your excursions and journeys with ease. Whether you travel alone, with friends, or with family, TripPlanner makes trip management stress-free and enjoyable.
          </p>
        </div>
      </section>
      <section className="about-features">
        <div className="feature-box">
          <img src={travel} alt="Easy list management" />
          <div>
            <h4>Create and Explore Trips Effortlessly</h4>
            <p>
              Easily create a personalized list of all your planned trips. <br />
              Navigate between them, add destinations, set budgets, and manage all the details in one place.
            </p>
          </div>
        </div>
        <div className="feature-box reverse">
          <img src={easyIntuitive} alt="Planning an excursion" />
          <div>
            <h4>Simple & Intuitive UX</h4>
            <p>
              The user interface is clean, friendly, and designed for fast navigation, so you can focus on the excitement of traveling, not on complicated tools.
            </p>
          </div>
        </div>
      </section>
      <section className="about-future">
        <img src={feature} alt="Coming soon" />
        <div>
          <h4>What’s Next?</h4>
          <p>
            Soon, TripPlanner will offer collaborative trip planning: invite friends, share itineraries, and plan your adventures together, in real-time!
          </p>
        </div>
      </section>
      <div className="about-cta">
        <p>
          Whatever the destination, <b>TripPlanner</b> is here to guide you!<br />
          Start your adventure today.
        </p>
      </div>
    </div>
  );
}