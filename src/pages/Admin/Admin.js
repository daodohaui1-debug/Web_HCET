import React, { useState } from "react";
import "./Admin.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState("1");
  const [status, setStatus] = useState("");
  const mEmail = localStorage.getItem("userEmail");
  const handleAddEmail = async () => {
    if (!email) {
      setStatus("Vui lòng nhập email!");
      return;
    }

    setStatus("Đang xử lý...");

    try {
      fetch(
        `https://script.google.com/macros/s/AKfycbzBtNGSPeQ9YazFxwGipytrffyMpndD-Ju6V6Q7Fl0R9giS4BrzfyJOeUQwtq-aoo8myg/exec?action=addEmail&email=${email}&course_id=${courseId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Thêm email thành công!");
          } else {
            alert("Lỗi: " + data.message);
          }
        });
    } catch (error) {
      console.error(error);
      setStatus("Lỗi mạng! Không thể kết nối server.");
    }
  };

  // if (!mEmail) {
  //     return (<><div className="login-warning-box">
  //         <h2>
  //             Bạn phải <span>ĐĂNG NHẬP</span> để tiếp tục
  //         </h2>
  //         <p>Vui lòng đăng nhập bằng Google để xem khóa học.</p>
  //     </div></>);
  // }
  useEffect(() => {
    // const mEmail = localStorage.getItem("userEmail");

    if (mEmail !== "laptrinhembedded@gmail.com") {
      //alert("Bạn không có quyền truy cập trang Admin");
      navigate("/");
    }
  }, []);

  return (
    <div className="admin-container">
      <h1>Admin – Thêm Email Vào Khóa Học</h1>

      <div className="admin-box">
        <label>Email học viên:</label>
        <input
          type="email"
          placeholder="Nhập email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Chọn khóa học:</label>
        <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
          <option value="1">STM32 Thanh Ghi</option>
          <option value="2">ESP32 IDF</option>
          <option value="3">RASPI 3B</option>
          {/* Thêm khóa mới thì thêm option ở đây */}
        </select>

        <button onClick={handleAddEmail} className="admin-btn">
          Thêm Email
        </button>

        {status && <p className="admin-status">{status}</p>}
      </div>
    </div>
  );
};

export default Admin;
