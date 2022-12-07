import React from "react";
import styles from "./Services.module.css";
import { BsBookHalf } from "react-icons/bs";
import { BiUserCircle ,BiBookBookmark} from "react-icons/bi";
import { FiAnchor } from "react-icons/fi";
export default function Services() {
  return (
    <div className={styles.container} id="services">
      <FiAnchor className={styles.backdrop}/>
      <h1>How it works ?</h1>
      <p>
        “A book lying idle on a shelf is wasted ammunition. Like money, books
        must be kept in constant circulation... A book is not only a friend, it
        makes friends for you. When you have possessed a book with mind and
        spirit, you are enriched. But when you pass it on you are enriched
        threefold.” <br />― Henry Miller, The Books in My Life
      </p>
      <div className={styles.box}>
        <div className={styles.box1}>
        <h2>Create account</h2>
          <BiUserCircle className={styles.icon} />
          <p>Create an account and spread love.</p>
        </div>
        <div className={styles.box1}>
          <h2>Post Book</h2>
          <BsBookHalf className={styles.icon} />
          <p>Post a book that you may not need anymore</p>
        </div>
        <div className={styles.box1}>
          <h2>Borrow Book</h2>
          <BiBookBookmark className={styles.icon} />
          <p>Get the book you need from someone</p>
        </div>
      </div>
    </div>
  );
}
