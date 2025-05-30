import Features from "../sections/features";
import Footer from "../sections/footer";
import { GlobeDemo } from "../sections/globe-demo";
import Landing from "../sections/landing";
import Services from "../sections/services";
import Testimonial from "../sections/testimonial";

export default function Home() {
  return (
    <div className="overflow-x-hidden font-novaLight">
      <Landing />
      <Services />
      <Features />
    </div>
  );
}
