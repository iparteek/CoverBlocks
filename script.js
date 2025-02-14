document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
      disable: "mobile"
  });

  const nav = document.querySelector("nav"),
        hero = document.querySelector(".hero"),
        productCards = document.querySelectorAll(".product-card"),
        statNumbers = document.querySelectorAll(".stat-number");
  
  let ticking = false;

  window.addEventListener("scroll", () => {
      if (!ticking) {
          window.requestAnimationFrame(() => {
              const offsetY = window.pageYOffset;
              nav.classList.toggle("scrolled", offsetY > 50);
              if (hero) hero.style.transform = `translateY(${0.3 * offsetY}px)`;
              ticking = false;
          });
          ticking = true;
      }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", event => {
          event.preventDefault();
          const target = document.querySelector(anchor.getAttribute("href"));
          if (target) {
              const navHeight = nav.offsetHeight;
              const targetOffsetTop = target.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                  top: targetOffsetTop - navHeight,
                  behavior: "smooth"
              });
          }
      });
  });

  productCards.forEach(card => {
      card.addEventListener("mouseenter", function() {
          this.style.transform = "translateY(-15px) scale(1.02)";
          this.style.transition = "all 0.3s ease";
      });
      card.addEventListener("mouseleave", function() {
          this.style.transform = "translateY(0) scale(1)";
      });

      const img = card.querySelector("img");
      if (img) {
          img.loading = "lazy";
          img.addEventListener("load", function() {
              this.style.animation = "fadeIn 0.5s ease-in";
          });
      }
  });

  window.openModal = function(src) {
      const modal = document.getElementById("imageModal"),
            fullImage = document.getElementById("fullImage");

      fullImage.src = src;
      modal.style.display = "flex";
      fullImage.classList.remove("zoom-in");
      fullImage.classList.add("zoom-out");

      fullImage.onclick = function() {
          if (fullImage.classList.contains("zoom-out")) {
              fullImage.classList.remove("zoom-out");
              fullImage.classList.add("zoom-in");
          } else {
              fullImage.classList.remove("zoom-in");
              fullImage.classList.add("zoom-out");
          }
      };
  };

  window.closeModal = function() {
      document.getElementById("imageModal").style.display = "none";
  };

  const animateNumbers = (element, start, end, duration) => {
      if (element.dataset.animated === "true") return;
      element.dataset.animated = "true";

      let startTime = null;

      const animate = currentTime => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const value = Math.floor(progress * (end - start) + start);
          element.textContent = `${value}+`;
          if (progress < 1) window.requestAnimationFrame(animate);
      };

      window.requestAnimationFrame(animate);
  };

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const target = entry.target;
              const targetNumber = parseInt(target.textContent);
              animateNumbers(target, 0, targetNumber, 2000);
              observer.unobserve(target);
          }
      });
  }, { threshold: 0.5, rootMargin: "0px" });

  statNumbers.forEach(number => observer.observe(number));

  document.querySelectorAll(".social-icon").forEach(icon => {
      icon.addEventListener("mouseenter", function() {
          this.style.transform = "scale(1.1)";
          this.style.transition = "transform 0.2s ease";
      });
      icon.addEventListener("mouseleave", function() {
          this.style.transform = "scale(1)";
      });
  });

  const scrollTopButton = document.createElement("button");
  scrollTopButton.innerHTML = "↑";
  scrollTopButton.className = "scroll-top-button";
  scrollTopButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 15px;
      background: #333;
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 1000;
  `;

  document.body.appendChild(scrollTopButton);

  window.addEventListener("scroll", () => {
      scrollTopButton.style.opacity = window.pageYOffset > 500 ? "1" : "0";
  });

  scrollTopButton.addEventListener("click", () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      });
  });

  leftArrow.addEventListener("click", prevSlide);
  rightArrow.addEventListener("click", nextSlide);

  const style = document.createElement("style");
  style.textContent = `
      @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
      }
      .scroll-top-button:hover {
          background: #555;
      }
  `;
  document.head.appendChild(style);
});


