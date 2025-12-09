import Modal from "react-modal";
import { useState } from "react";
import "./cource.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "500px",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    background: "#fff",
    border: "none",
    textAlign: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

function CourseCard({
  id,
  image,
  tag,
  title,
  oldPrice,
  newPrice,
  description,
  link,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  

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
     
      <li>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ margin: 0, color: "#333" }}>Bạn chưa đăng nhập</h2>
            <p style={{ color: "#666", marginTop: "10px" }}>
              Vui lòng đăng nhập để tiếp tục đăng ký khóa học
            </p>
          </div>

          <button
            onClick={closeModal}
            style={{
              padding: "10px 20px",
              background: "#FF3B30",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#ff1f0f")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#FF3B30")}
          >
            Đóng
          </button>
        </Modal>
        <figure>
          <img src={image} alt="" />
        </figure>

        <article className="padding_1x">
          <strong className="tag">{tag}</strong>

          <a href="#" className="title small">
            {title}
          </a>

          <div className="price-tag">
            <span className="old-price">{oldPrice}</span>
            <span className="new-price">{newPrice}</span>
          </div>

          <p dangerouslySetInnerHTML={{ __html: description }}></p>

          <aside className="fixed_flex">
            <span className="flex-content">
              <div
                target="_blank"
                className="btn_donxem"
                onClick={() => handleRegister(id)}
              >
                Đăng Ký
              </div>
            </span>
          </aside>
        </article>
      </li>
    </>
  );
}

export default CourseCard;
