import "./Header.css";
import mLogo from "../images/logo.png";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Header({ onReload }) {
  const [user, setUser] = useState(null);
  const mEmail = localStorage.getItem("userEmail");
  const [networkError, setNetworkError] = useState(false);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub(); // cleanup
  }, []);

  useEffect(() => {
    const handleOffline = () => alert("Bạn đã mất kết nối Internet.");
    window.addEventListener("offline", handleOffline);
    return () => window.removeEventListener("offline", handleOffline);
  }, []);
  const loginWithGoogle = async () => {
    if (!navigator.onLine) {
      alert("Không có kết nối Internet. Vui lòng kiểm tra lại.");
      return;
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("This is data: ", result.user.email);
      localStorage.setItem("userEmail", result.user.email);
      localStorage.setItem("userAvatar", result.user.photoURL);

      setUser(result.user);
      navigate(`/`);
    } catch (error) {
      console.error("Firebase login error:", error);


      if (error.code === "auth/network-request-failed") {
        alert("Mạng không ổn định. Vui lòng kiểm tra lại kết nối.");
      } else if (error.message.includes("Pending promise")) {
        alert("Không thể đăng nhập vì mất kết nối. Thử lại khi có Internet.");
      } else {
        alert("Đăng nhập thất bại. Vui lòng thử lại.");
      }
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    localStorage.removeItem("userEmail");

    await signOut(auth);
    setUser(null);
    setOpenMenu(false);
    navigate(`/`);
  };


  const goToCourse = (id) => {
    setOpenMenu(!openMenu)
    navigate(`/courses`);
  };
  return (
    <>
      <menu className="top_menu flex">
        <section className="flex_content">
          <a href="https://www.facebook.com/profile.php?id=61566965671067">
            <i className="fa fa-envelope-o"></i> embedded09092002@gmail.com
          </a>
          <a href="https://www.facebook.com/profile.php?id=61566965671067">
            <i className="fa fa-headphones"></i> 0123456789
          </a>
        </section>
        <section className="flex_content">
          <a
            href="https://www.facebook.com/profile.php?id=61566965671067"
            title="Facebook"
          >
            <i className="fa fa-facebook"></i>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61566965671067"
            title="Instagram"
          >
            <i className="fa fa-instagram"></i>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61566965671067"
            title="Twitter"
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#" title="youtube">
            <i className="fa fa-youtube"></i>
          </a>
        </section>
      </menu>

      <nav>
        <section className="flex_content">
          <figure className="logo fixed_flex">
            <img src={mLogo} alt="" />
            <figcaption>
              <strong className="title">Học Cùng ET</strong> Embedded
            </figcaption>
          </figure>
        </section>
        <section className="flex_content nav_content" id="nav_content">
          <Link to="/" className="">
            TRANG CHỦ
          </Link>
          <Link to="/courses">KHÓA HỌC CỦA TÔI</Link>
          {user && user.email === "laptrinhembedded@gmail.com" && (<Link to="/admin">THÊM USER</Link>)}


        </section>
        <section className="flex_content">
          {/* <a href="" className="ham">
          <i className="fa fa-bars"></i>
        </a> */}
          <div className="ham" style={{ padding: 30 }}>
            {!user ? (
              <>
                <button className="google-btn" onClick={loginWithGoogle}>
                  Đăng nhập
                </button>{" "}
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  width="22"

                />
                {/* <FaGoogle size={20} style={{ marginRight: 8, color: "#222" }} /> */}
              </>
            ) : (
              <div className="user-wrapper">
                {/* <h2>Xin chào, {user.displayName}</h2> */}
                <img
                  src={user.photoURL}
                  alt="avatar"
                  onError={(e)=> e.target.src = "https://i.pinimg.com/originals/fb/42/30/fb42303f0554c463ed89ed9dc34c624e.jpg"}
                  width={50}
                  style={{ borderRadius: "50%" }}
                  onClick={() => setOpenMenu(!openMenu)}
                />
                {/* <p>Email: {user.email}</p> */}
                {openMenu && (
                  <div className="user-dropdown">
                    <p className="user-email">{user.email}</p>
                    <div className="cource-btn" onClick={() => goToCourse()}>
                      Khóa học của tôi
                    </div>
                    <button className="logout-btn" onClick={logout}>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </nav>
    </>
  );
}

export default Header;
