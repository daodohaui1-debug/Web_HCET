import React from "react";
import "./Content.css";
import pi3B from "../../images/RAS PI 3B.png";
import Stm32TG from "../../images/stm32thanhghi.png";
import Espidf from "../../images/espidf.png";
import COMBO from "../../images/FULL COMBO.png";

import QR from "../../images/QR.jpg";
import { useParams } from "react-router-dom";

const Content = () => {
  const qrImage = QR;

  const courseInfo = [
    {
      title: "Khóa Học STM32 Thanh Ghi",
      price: "360.000 VND",
      thumbnail: Stm32TG,
      description:
        "Khóa học giúp bạn hiểu bản chất của vi điều khiển thông qua thanh ghi ngoại vi, startup, memory,.. và build bằng makefile,...",
      totalLessons: 40,
      duration: "30 giờ học",
      level: "Nên học STM32 HAL trước",
    },
    {
      title: "Khóa Học ESP32 IDF",
      thumbnail: Espidf,
      price: "270.000 VND",
      description: "Khóa học về ESP32 IDF",
      totalLessons: 30,
      duration: "30 giờ học",
      level: "Basic",
    },
    {
      title: "Khóa Học Raspi 3B",
      thumbnail: pi3B,
      price: "60.000 VND",
      description: "Khóa học về Raspi 3B basic",
      totalLessons: 20,
      duration: "10 giờ học",
      level: "Basic",
    },
    {
      title: "COMBO - STM32 - ESP32 - RASPI",
      thumbnail: COMBO,
      price: "500.000 VND",
      description: "Full combo 3 khóa",
      totalLessons: 90,
      duration: "...",
      level: "Full combo",
    },
  ];
  const { id } = useParams();

  const course = courseInfo[id - 1];

  if (!course) return <h2 className="not-found">❌ Khóa học không tồn tại!</h2>;

  return (
    <div className="content-page">
      <h1>{course.title}</h1>

      {/* Thông tin khóa học */}
      <div className="course-box">
        <img src={course.thumbnail} alt="Thumbnail" className="course-thumb" />

        <div className="course-info">
          <h2>Thông tin khóa học</h2>
          <h2 style={{ color: "#e63946", fontWeight: "bold" }}>
            {course.price}
          </h2>
          <p>{course.description}</p>

          <ul className="course-stats">
            <li>
              📚 Số bài học: <strong>{course.totalLessons}</strong>
            </li>
            <li>
              ⏱ Thời lượng: <strong>{course.duration}</strong>
            </li>
            <li>
              ⭐ Mức độ: <strong>{course.level}</strong>
            </li>
          </ul>
        </div>
      </div>

      {/* QR đăng ký */}
      <div className="dangky">
        <div className="qr-section">
          <h2>Đăng ký khóa học</h2>

          <img src={qrImage} alt="QR Code đăng ký" className="qr-image" />
        </div>

        {/* Steps */}
        <div className="steps-section">
          <h2>Các bước để tham gia</h2>

          <div className="step">
            <span className="step-number">Bước 1</span>
            <p>
              Đọc kỹ <strong>Thông tin khóa học</strong>.
            </p>
          </div>

          <div className="step">
            <span className="step-number">Bước 2</span>
            <p>
              Quét mã QR với Nội Dung: <strong>Tên khóa + tên học viên</strong>
            </p>
          </div>

          <div className="step">
            <span className="step-number">Bước 3</span>
            <p>Chụp lại màn hình và gửi tới fanpage</p>
          </div>

          <div className="step">
            <span className="step-number">Bước 4</span>
            <p>Chờ khóa học được active (Ngay sau khi admin rep tin nhắn)</p>
          </div>

          <div className="step">
            <span className="step-number">Bước 5</span>
            <p>Chinh phục khóa học thui nèo 😋😋😎😎😎</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
