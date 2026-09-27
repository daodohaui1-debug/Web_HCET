import "./Components.css";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import componentCourses from "../../data/components.json";

const getImageUrl = (image) => {
  if (/^https?:\/\//i.test(image) || image.startsWith("data:")) return image;
  const localPath = image.startsWith("/") ? image : `/${image}`;
  return `${process.env.PUBLIC_URL}${localPath}`;
};

function Components() {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = Number(id || 1);
  const course = componentCourses.find((item) => item.id === courseId);

  if (!course) {
    return (
      <main className="parts-page">
        <div className="parts-container">
          <h1>Không tìm thấy danh sách linh kiện của khóa học này.</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="parts-page">
      <div className="parts-container">
        <div className="parts-header">
          <div>
            <h1>{course.courseName}</h1>
            <span>Danh sách linh kiện cần mua</span>
            
            <br></br>
            <span>{course.description}</span>
          </div>
          <a href={course.shopLink} target="_blank" rel="noopener noreferrer">
            Đến gian hàng Học Cùng ET Shopee <FaExternalLinkAlt />
          </a>
        </div>

        <div className="course-selector">
          <label htmlFor="component-course">Chọn khóa học:</label>
          <select
            id="component-course"
            value={course.id}
            onChange={(event) => navigate(`/components/${event.target.value}`)}
          >
            {componentCourses.map((item) => (
              <option key={item.id} value={item.id}>
                {item.courseName}
              </option>
            ))}
          </select>
        </div>


        <div className="parts-table-wrap">
          <table className="parts-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Hình ảnh</th>
                <th>Tên linh kiện</th>
                <th>Phân loại</th>
                <th>Mô tả</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {course.data.map((item, index) => (
                <tr key={`${course.id}-${item.component}`}>
                  <td data-label="STT">{String(index + 1).padStart(2, "0")}</td>
                  <td data-label="Hình ảnh">
                    <div className="part-thumb">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.component}
                        style={{
                          objectPosition: item.imagePosition || "center",
                        }}
                      />
                    </div>
                  </td>
                  <td data-label="Tên linh kiện">
                    <strong>{item.component}</strong>
                  </td>
                  <td data-label="Phân loại">
                    <span
                      className={
                        item.category === "Bắt buộc"
                          ? "part-badge required"
                          : "part-badge"
                      }
                    >
                      {item.category}
                    </span>
                  </td>
                  <td data-label="Mô tả">{item.description}</td>
                  <td>
                    <a
                      className="part-buy"
                      href={item.shopeeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mua trên Shopee <FaExternalLinkAlt />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Components;
