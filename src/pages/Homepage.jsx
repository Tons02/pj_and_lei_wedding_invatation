import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import OurStory from "../components/OurStory";
import EventDetails from "../components/Eventdetails";
import DressCode from "../components/DressCode";
import RSVP from "../components/Rsvp";
import bgMusic from "../assets/i-lay-my-love.mp3"; // 👈 import it

export default function Homepage() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    audio.play().catch(() => {});

    const handleUserInteraction = () => {
      audio.play().catch(() => {});
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  return (
    <Box>
      <audio ref={audioRef} src={bgMusic} loop preload="auto" />
      <Navbar />
      <Box sx={{ mt: "64px" }}>
        <Hero />
        <OurStory />
        <EventDetails />
        <DressCode />
        <RSVP />
      </Box>
    </Box>
  );
}
