import "./Home.css";
import React from "react";
import raspi from "../../images/RAS PI 3B.png";
import Stm32TG from "../../images/stm32thanhghi.png";
import Espidf from "../../images/espidf.png";
import CourseCard from "../../components/cource/cource";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const courses = [
    {
      id: 1,
      image: Stm32TG,
      tag: "STM32",
      title: "STM32 THANH GHI",
      oldPrice: "1.200.000₫",
      newPrice: "250.000₫",
      description: `Vi điều khiển STM32 thanh ghi.<br/>- Ngoại vi<br/>- Memory,...`,
      link: "https://docs.google.com/document/d/1-m-1rWXeWirnZqyD3jf6-D07fNg9CIxU7PBn-R0Gau0/edit?tab=t.0",
    },
    {
      id: 2,
      image: Espidf,
      tag: "ESP32",
      title: "ESP32 IDF",
      oldPrice: "1.200.000₫",
      newPrice: "250.000₫",
      description: `Vi điều khiển ESP32 - IDF.<br/>- Ngoại vi<br/>- Sensor,...`,
      link: "https://docs.google.com/document/d/1-m-1rWXeWirnZqyD3jf6-D07fNg9CIxU7PBn-R0Gau0/edit?tab=t.0",
    },
    {
      id: 3,
      image: raspi,
      tag: "PI 3B",
      title: "ESP32 IDF",
      oldPrice: "1.200.000₫",
      newPrice: "60.000₫",
      description: `Raspi3B.<br/>- Ngoại vi<br/>- Basic,...`,
      link: "https://docs.google.com/document/d/1-m-1rWXeWirnZqyD3jf6-D07fNg9CIxU7PBn-R0Gau0/edit?tab=t.0",
    },
  ];
  const [timeLeft, setTimeLeft] = useState(7200); // 2 tiếng = 7200s
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };
  const handleRegister = (id) => {
    navigate(`/content/${id}`);
    // if(email){
    //   navigate(`/content/${id}`);
    // }else{
    //     openModal();
    // }
  };
  return (
    <>
      <header class="flex">
        <article>
          <h1 class="title big">
            Welcome to <br />
            <em>Học Cùng ET</em> Embedded
          </h1>
          <p>
            Nội dung: Chanel dành cho các bạn đam mê lĩnh vực lập trình nhúng
            hay còn gọi là embedded
            <br />- Tiếp cận với các dòng vi điều khiển phổ biến: STM32, ESP32,
            ARDUINO, ESP8266,...
          </p>
          <a href="#" class="btn btn_3">
            Explore more
          </a>
        </article>
        <section class="flex"></section>
      </header>

      <div className="divisions division_3 padding_2x">
        <section className="title_header">
          <h1 className="title">Seri mất phí</h1>
          <p>Sống là để học embedded hết mình</p>
          <span className="bar"></span>
        </section>
        <section className="slider padding_0x">
          <div class="sale-box">
            <div class="sale-title">🔥 FLASH SALE ĐANG DIỄN RA</div>

            <div class="countdown">
              Chỉ còn <span id="timer">01:50:00</span>
            </div>

            <div class="price">
              🎁 Full combo 3 khóa học chỉ còn
              <span class="highlight">400.000đ</span>
            </div>
            <div
              onClick={() => {
                handleRegister(4);
              }}
              class="sale-btn"
            >
              Đăng Ký Ngay
            </div>
          </div>
          <ul className="card logo-slider blog-slider">
            <>
              {courses.map((item, index) => (
                <CourseCard key={index} {...item} />
              ))}
            </>
          </ul>
        </section>
      </div>
    </>
  );
}

export default Home;
