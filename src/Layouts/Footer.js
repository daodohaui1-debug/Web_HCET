// src/components/Footer.js
import React from "react";
import "./Footer.css";
const Footer = () => {
  return <> <footer className="padding_4x">
    <div className="top_footer flex">
      <section className="flex_content">
        <figure>
          <img src="https://i.postimg.cc/KvwFLrVF/author.png" alt="" />
        </figure>
      </section>
      <section className="flex_content padding_2x">
        <h2 className="title medium">Học Cùng ET</h2>
        <p>"Cùng mình chinh phục lập trình Embedded - lập trình vi điều khiển”.</p>
      </section>
    </div>
  </footer></>;
};

export default Footer;
