import React, { useEffect, useState } from "react";
import "./App.css";
import stm32Img from "./images/STM32F1 HAL.png";
const App = () => {
  return (
    <div className="App">
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
            <img src="images/logo.png" alt="" />
            <figcaption>
              <strong className="title">Học Cùng ET</strong> Embedded
            </figcaption>
          </figure>
        </section>
        <section className="flex_content nav_content" id="nav_content">
          <a href="" className="active">
            {" "}
            TRANG CHỦ{" "}
          </a>
          <a href="">LINH KIỆN</a>
        </section>
        <section className="flex_content">
          <a href="" className="ham">
            <i className="fa fa-bars"></i>
          </a>
        </section>
      </nav>

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
          <ul className="card logo-slider blog-slider">
            <li>
              <figure>
                <img src="{stm32Img}" alt="" />
              </figure>
              <article className="padding_1x">
                <strong className="tag">STM32</strong>
                <a href="#" className="title small">
                  STM32 THANH GHI
                </a>
                <div className="price-tag">
                  <span className="old-price">1.200.000₫</span>
                  <span className="new-price">360.000₫</span>
                </div>
                <p>
                  Vi điều khiển STM32 thanh ghi. <br />- Ngoại vi <br />-
                  Sensor,...
                </p>
                <aside className="fixed_flex">
                  <span className="flex-content">
                    <a
                      href="https://docs.google.com/document/d/1-m-1rWXeWirnZqyD3jf6-D07fNg9CIxU7PBn-R0Gau0/edit?tab=t.0"
                      target="_blank"
                      className="btn_donxem"
                    >
                      Đăng Ký
                    </a>
                  </span>
                </aside>
              </article>
            </li>
            <li>
              <figure>
                <img src="{stm32Img}" alt="" />
              </figure>
              <article className="padding_1x">
                <strong className="tag">STM32</strong>
                <a href="#" className="title small">
                  STM32 THANH GHI
                </a>
                <div className="price-tag">
                  <span className="old-price">1.200.000₫</span>
                  <span className="new-price">360.000₫</span>
                </div>
                <p>
                  Vi điều khiển STM32 thanh ghi. <br />- Ngoại vi <br />-
                  Sensor,...
                </p>
                <aside className="fixed_flex">
                  <span className="flex-content">
                    <a
                      href="https://docs.google.com/document/d/1-m-1rWXeWirnZqyD3jf6-D07fNg9CIxU7PBn-R0Gau0/edit?tab=t.0"
                      target="_blank"
                      className="btn_donxem"
                    >
                      Đăng Ký
                    </a>
                  </span>
                </aside>
              </article>
            </li>
            <li>
              <figure>
                <img src="{stm32Img}" alt="" />
              </figure>
              <article className="padding_1x">
                <strong className="tag">STM32</strong>
                <a href="#" className="title small">
                  STM32 THANH GHI
                </a>
                <div className="price-tag">
                  <span className="old-price">1.200.000₫</span>
                  <span className="new-price">360.000₫</span>
                </div>
                <p>
                  Vi điều khiển STM32 thanh ghi. <br />- Ngoại vi <br />-
                  Sensor,...
                </p>
                <aside className="fixed_flex">
                  <span className="flex-content">
                    <a
                      href="https://docs.google.com/document/d/1-m-1rWXeWirnZqyD3jf6-D07fNg9CIxU7PBn-R0Gau0/edit?tab=t.0"
                      target="_blank"
                      className="btn_donxem"
                    >
                      Đăng Ký
                    </a>
                  </span>
                </aside>
              </article>
            </li>
            <li>
              <figure>
                <img src="{stm32Img}" alt="" />
              </figure>
              <article className="padding_1x">
                <strong className="tag">STM32</strong>
                <a href="#" className="title small">
                  STM32 THANH GHI
                </a>
                <div className="price-tag">
                  <span className="old-price">1.200.000₫</span>
                  <span className="new-price">360.000₫</span>
                </div>
                <p>
                  Vi điều khiển STM32 thanh ghi. <br />- Ngoại vi <br />-
                  Sensor,...
                </p>
                <aside className="fixed_flex">
                  <span className="flex-content">
                    <a
                      href="https://docs.google.com/document/d/1-m-1rWXeWirnZqyD3jf6-D07fNg9CIxU7PBn-R0Gau0/edit?tab=t.0"
                      target="_blank"
                      className="btn_donxem"
                    >
                      Đăng Ký
                    </a>
                  </span>
                </aside>
              </article>
            </li>
            <li>
              <figure>
                <img src="{stm32Img}" alt="" />
              </figure>
              <article className="padding_1x">
                <strong className="tag">STM32</strong>
                <a href="#" className="title small">
                  STM32 THANH GHI
                </a>
                <div className="price-tag">
                  <span className="old-price">1.200.000₫</span>
                  <span className="new-price">360.000₫</span>
                </div>
                <p>
                  Vi điều khiển STM32 thanh ghi. <br />- Ngoại vi <br />-
                  Sensor,...
                </p>
                <aside className="fixed_flex">
                  <span className="flex-content">
                    <a
                      href="https://docs.google.com/document/d/1-m-1rWXeWirnZqyD3jf6-D07fNg9CIxU7PBn-R0Gau0/edit?tab=t.0"
                      target="_blank"
                      className="btn_donxem"
                    >
                      Đăng Ký
                    </a>
                  </span>
                </aside>
              </article>
            </li>
            <li>
              <figure>
                <img src="{stm32Img}" alt="" />
              </figure>
              <article className="padding_1x">
                <strong className="tag">STM32</strong>
                <a href="#" className="title small">
                  STM32 THANH GHI
                </a>
                <div className="price-tag">
                  <span className="old-price">1.200.000₫</span>
                  <span className="new-price">360.000₫</span>
                </div>
                <p>
                  Vi điều khiển STM32 thanh ghi. <br />- Ngoại vi <br />-
                  Sensor,...
                </p>
                <aside className="fixed_flex">
                  <span className="flex-content">
                    <a
                      href="https://docs.google.com/document/d/1-m-1rWXeWirnZqyD3jf6-D07fNg9CIxU7PBn-R0Gau0/edit?tab=t.0"
                      target="_blank"
                      className="btn_donxem"
                    >
                      Đăng Ký
                    </a>
                  </span>
                </aside>
              </article>
            </li>
          </ul>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="padding_4x">
        <div className="top_footer flex">
          <section className="flex_content">
            <figure>
              <img src="https://i.postimg.cc/KvwFLrVF/author.png" alt="" />
            </figure>
          </section>
          <section className="flex_content padding_2x">
            <h2 className="title medium">Học Cùng ET</h2>
            <p>
              "Cùng mình chinh phục lập trình Embedded - lập trình vi điều
              khiển”.
            </p>
          </section>
        </div>
      </footer>
    </div>
  );
};
export default App;
