import Slider from "../Slider/Slider";
import Services from "./Services";
import Footer from '../MainHeader/Footer';
import styles from './HomePage.module.css'
import About from "./About";

const Homepage = () => {
  return (
    <>
      <Slider />
      <div className={styles.container}>
      <Services />
      <About/>
      <div className={styles.footer}>
      <Footer  />
      </div>
      </div>
    </>
  );
};
export default Homepage;
