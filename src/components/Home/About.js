import React from "react";
import styles from "./About.module.css";
const About = () => {
  return (
    <div className={styles.container} id="about">
      <h1>About Company</h1>
      <div className={styles.banner}>
        <div className={styles.left}>
          <h2>
            “If we have no peace, it is because we have forgotten that we belong
            to each other.”
            <br /> ― Mother Teresa
          </h2>
        </div>
        <div className={styles.right}>
        <p >
            We have always been taught that “sharing is caring.” Sharing is
            spreading joy amongst others. Sharing is when you become selfless
            and help others or share something with others. The habit of sharing
            is developed over the years.
          </p>
          <p className={styles.top}>
            It helps to make a person empathetic, and the person starts to care
            about others unconditionally Sharing makes a person build
            social-skills which are required by a well-adjusted adult. The
            selfless attitude one develops by sharing is always appreciated by
            others. The practice of sharing makes you understand when someone
            else is in need without them telling you the same. Also, Sharing
            gives you a sense of responsibility towards the society. When you
            share, in turn, it shows your care, and people love to be around you
            for your positive aura. You learn to sacrifice for some greater good
            to someone else which makes you humble and caring.
          </p>

        </div>
      </div>
    </div>
  );
};

export default About;
