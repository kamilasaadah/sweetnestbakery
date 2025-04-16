document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  })

  // Sticky Header
  const navbar = document.getElementById("navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Back to Top Button
  const backToTopButton = document.getElementById("back-to-top")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible")
    } else {
      backToTopButton.classList.remove("visible")
    }
  })

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Menu Tabs
  const menuTabs = document.querySelectorAll(".menu-tab")
  const menuContents = document.querySelectorAll(".menu-tab-content")

  menuTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      menuTabs.forEach((t) => t.classList.remove("active"))
      // Add active class to clicked tab
      tab.classList.add("active")

      // Hide all content
      menuContents.forEach((content) => {
        content.classList.remove("active")
      })

      // Show corresponding content
      const tabId = tab.getAttribute("data-tab")
      document.getElementById(`${tabId}-content`).classList.add("active")
    })
  })

  // Fungsi untuk mengecek apakah dua elemen tumpang tindih
  function isOverlapping(element1, element2) {
    const rect1 = element1.getBoundingClientRect()
    const rect2 = element2.getBoundingClientRect()
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    )
  }

  // Fungsi untuk memastikan bentuk geometri tidak tumpang tindih dengan konten penting
  function adjustShapePositions() {
    const shapes = document.querySelectorAll(".shape, .footer-geometric-elements > div")
    const contentElements = document.querySelectorAll(
      ".hero-content, .btn-primary, .btn-secondary, h1, p, .browser-mockup, .footer-logo, .footer-links, .social-links, .footer-copyright",
    )

    shapes.forEach((shape) => {
      let isOverlap = false

      contentElements.forEach((content) => {
        if (isOverlapping(shape, content)) {
          isOverlap = true
        }
      })

      if (isOverlap) {
        const currentLeft = Number.parseInt(getComputedStyle(shape).left)
        const currentTop = Number.parseInt(getComputedStyle(shape).top)
        shape.style.left = currentLeft + 50 + "px"
        shape.style.top = currentTop - 30 + "px"

        setTimeout(() => {
          contentElements.forEach((content) => {
            if (isOverlapping(shape, content)) {
              shape.style.display = "none"
            }
          })
        }, 10)
      }
    })
  }

  // Throttle function untuk membatasi eksekusi saat resize
  function throttle(func, limit) {
    let inThrottle
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // Panggil fungsi saat halaman dimuat dan saat ukuran window berubah
  window.addEventListener("load", adjustShapePositions)
  window.addEventListener("resize", throttle(adjustShapePositions, 100))

  // Animasi subtle untuk bentuk geometri
  const shapes = document.querySelectorAll(".shape")
  shapes.forEach((shape) => {
    shape.addEventListener("mouseover", function () {
      this.style.transform = "scale(1.1)"
      this.style.transition = "transform 0.3s ease"
    })

    shape.addEventListener("mouseout", function () {
      this.style.transform = "scale(1)"
    })
  })

  // Smooth scroll untuk navigasi
  const navLinks = document.querySelectorAll("nav a, .footer-links a")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Form submission
  const ctaForm = document.querySelector(".cta-form")
  if (ctaForm) {
    ctaForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector('input[type="email"]')
      const email = emailInput.value
      if (email) {
        console.log("Email submitted:", email)
        this.reset()
        alert("Terima kasih! Anda telah berhasil mendaftar.")
      }
    })
  }

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuToggle && mobileMenu) {
    const closeButton = document.createElement("button")
    closeButton.classList.add("mobile-menu-close")
    closeButton.innerHTML = '<i class="fas fa-times"></i>'
    mobileMenu.prepend(closeButton)

    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.style.display = "flex"
      setTimeout(() => {
        mobileMenu.classList.add("active")
      }, 10)
    })

    closeButton.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      setTimeout(() => {
        mobileMenu.style.display = "none"
      }, 300)
    })

    const mobileMenuLinks = mobileMenu.querySelectorAll("a")
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        setTimeout(() => {
          mobileMenu.style.display = "none"
        }, 300)
      })
    })
  }
})
