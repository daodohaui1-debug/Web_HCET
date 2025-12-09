import React, { useState, useEffect } from "react";
// import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import "./CoursePage.css";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzBtNGSPeQ9YazFxwGipytrffyMpndD-Ju6V6Q7Fl0R9giS4BrzfyJOeUQwtq-aoo8myg/exec";

const CoursePage = () => {
  // const email = localStorage.getItem("userEmail");
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      console.error("Không có email => không thể load bài học");
      return;
    }

    const url = `${API_URL}?action=getLessons&course_id=${id}&email=${email}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          console.error("Access denied hoặc lỗi:", data.message);
          alert("Truy cập trái phép");
          setNetworkError(true);
          return;
        }

        const lessons = data.lessons;

        if (!lessons || lessons.length === 0) {
          alert("Bạn chưa có khóa học nào");
          setNetworkError(true);
          return;
        }

        // Tạo object course
        const course = {
          title: lessons[0].course_title,
          lessons: lessons.map((l) => ({
            id: Number(l.lesson_id),
            title: l.lesson_title,
            video: l.video_url,
          })),
        };

        setCourse(course);
        setSelectedLesson(course.lessons[0]);
      })
      .catch((err) => {
        setNetworkError(true);
        console.error("Lỗi fetch:", err);
      });
  }, [id]);
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
  if (!course) return <div className="loading-spinner"></div>;

  return (
    <div className="course-container">
      <aside className="course-sidebar">
        <h2>{course.title}</h2>
        <ul>
          {course.lessons.map((lesson) => (
            <li
              key={lesson.id}
              className={selectedLesson?.id === lesson.id ? "active" : ""}
              onClick={() => setSelectedLesson(lesson)}
            >
              {lesson.title}
            </li>
          ))}
        </ul>
      </aside>

      <main className="course-content">
        <h1>{selectedLesson?.title}</h1>
        <iframe
          width="100%"
          height="450"
          src={`${selectedLesson?.video}?controls=1&modestbranding=1&rel=0&iv_load_policy=3&fs=1&disablekb=0`}
          onContextMenu={(e) => e.preventDefault()}
          title="Course Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </main>
    </div>
  );
};

export default CoursePage;
