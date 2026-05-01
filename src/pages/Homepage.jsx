import { Box } from "@mui/material";
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import OurStory from "../components/OurStory";
import EventDetails from "../components/Eventdetails";
import DressCode from "../components/DressCode";
import RSVP from "../components/Rsvp";

export default function Homepage() {
  return (
    <Box>
      <Navbar />

      {/* spacing for fixed navbar */}
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
