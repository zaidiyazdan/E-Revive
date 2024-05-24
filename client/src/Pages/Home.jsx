import truck from "../Assets/recycling-truck.png";
import gsap from "gsap";
import React from "react";
import { useEffect } from "react";
import PopUp from "../Components/PopUp";
import { Hero } from "../Components/Hero";
import { Service } from "../Components/Service";
import { Contact } from "../Components/Cantact";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

function Home() {
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 6000);
  }, []);

  gsap.to(".garbagetruck", {
    opacity: 100,
    x: 1500,
    duration: 100,
    ease: "power3.out",
    repeat: -1,
    repeatDelay: 1,
  });

  return (
    <div className="overflow-hidden">
      <Navbar />
      <PopUp showModal={showModal} setShowModal={setShowModal} />
      <Hero />
      <div className="hidden md:flex w-full fixed bottom-[-4vh] z-40  garbagetruck">
        <img
          src={truck}
          alt=""
          className="h-[20vh] bg-cover bg-center rounded-xl"
        />
      </div>
      <Service />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
