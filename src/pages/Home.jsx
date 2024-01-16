import HomeSlider from "../features/Home/HomeSlider";
import ListingOffers from "../features/Home/ListingOffers";
import ListingRents from "../features/Home/ListingRents";
import ListingSells from "../features/Home/ListingSells";

export default function Home() {
  return (
    <section className="section-home">
      <HomeSlider />
      <ListingOffers />
      <ListingRents />
      <ListingSells />
    </section>
  );
}
