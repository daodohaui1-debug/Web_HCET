import React, { useEffect, useState } from "react";
import "./Mycources.css";
import Stm32TG from "../../images/stm32thanhghi.png";
import Espidf from "../../images/espidf.png";
import pi from "../../images/RAS PI 3B.png";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  const [allowedCourses, setAllowedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  const courses = [
    {
      id: 1,
      title: "STM32 Thanh Ghi",
      description: "Thanh ghi, driver, startup, makefile,...",
      img: Stm32TG,
      progress: 20,
    },
    {
      id: 2,
      title: "ESP32 IDF",
      description: "Ngoại vi, wifi, blue,...",
      img: Espidf,
      progress: 20,
    },
    {
      id: 3,
      title: "RASPI 3B",
      description: "Ubuntu, server...",
      img: pi,
      progress: 20,
    },
  ];

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    // Gọi API check email
    fetch(
      `https://script.google.com/macros/s/AKfycbzBtNGSPeQ9YazFxwGipytrffyMpndD-Ju6V6Q7Fl0R9giS4BrzfyJOeUQwtq-aoo8myg/exec?action=checkEmail&email=${email}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Luong Email", data);

        setAllowedCourses(data.courses || []);
        setLoading(false);
      })
      .catch((err) => {
        setNetworkError(true);
        console.error("Lỗi fetch:", err);
      });
  }, [email]);

  const goToCource = (id) => {
    navigate(`/course/${id}`);
  };

  if (networkError) {
    return (
      <div className="mycourses-container">
        <div className="login-warning-box">
          <h2>Mạng không ổn định</h2>
          <p>Vui lòng kiểm tra kết nối Internet và thử lại.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mycourses-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="mycourses-container">
      <h1>Khóa Học Của Tôi</h1>

      {!email ? (
        <div className="login-warning-box">
          <h2>
            Bạn phải <span>ĐĂNG NHẬP</span> để tiếp tục
          </h2>
          <p>Vui lòng đăng nhập bằng Google để xem khóa học.</p>
        </div>
      ) : allowedCourses.length === 0 ? (
        <div className="login-warning-box">
          <h2>Không có khóa học nào được mở cho email này</h2>
        </div>
      ) : (
        <div className="course-list">
          {courses
            .filter((c) => allowedCourses.includes(c.id))
            .map((course) => (
              <div className="course-card" key={course.id}>
                <img
                  src={course.img}
                  alt={course.title}
                  className="course-img"
                />

                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>

                  <div className="progress-box">
                    <div
                      className="progress-bar"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>

                  <button
                    onClick={() => goToCource(course.id)}
                    className="btn-view"
                  >
                    Tiếp tục học
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
