class BrokenInterface {
  constructor() {
    this.glitchEnabled = true
    this.glitchIntensity = 1
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.initCanvases()
    this.startGlitchCycle()
    this.setupAccessibility()
  }

  setupEventListeners() {
    // Random glitch triggers
    document.addEventListener("click", (e) => {
      if (Math.random() < 0.3) {
        this.triggerRandomGlitch()
      }
    })

    // Hover effects
    document.querySelectorAll("[data-glitch-target]").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        if (this.glitchEnabled && Math.random() < 0.4) {
          this.glitchElement(element)
        }
      })
    })

    // Gallery item interactions
    document.querySelectorAll(".gallery-item").forEach((item) => {
      item.addEventListener("mouseenter", () => {
        if (this.glitchEnabled) {
          this.glitchCanvas(item.querySelector(".glitch-canvas"))
        }
      })
    })

    // CTA button special effect
    document.querySelector(".cta-button").addEventListener("click", () => {
      this.triggerMajorGlitch()
    })
  }

  setupAccessibility() {
    const toggle = document.getElementById("glitch-toggle")
    const toggleText = toggle.querySelector(".toggle-text")

    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.glitchEnabled = false
      toggleText.textContent = "CHAOS REDUCED"
    }

    toggle.addEventListener("click", () => {
      this.glitchEnabled = !this.glitchEnabled
      toggleText.textContent = this.glitchEnabled ? "REDUCE CHAOS" : "ENABLE CHAOS"

      if (!this.glitchEnabled) {
        this.clearAllGlitches()
      }
    })
  }

  initCanvases() {
    const canvases = document.querySelectorAll(".glitch-canvas")
    canvases.forEach((canvas, index) => {
      this.drawInitialImage(canvas, index)
    })
  }

  drawInitialImage(canvas, index) {
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Create a gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    const colors = ["#ff0080", "#00ff41", "#0080ff"]
    gradient.addColorStop(0, colors[index % colors.length])
    gradient.addColorStop(1, "#000000")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Add some geometric shapes
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const size = Math.random() * 50 + 10
      ctx.fillRect(x, y, size, size)
    }

    // Add scan lines
    ctx.fillStyle = "rgba(0, 255, 65, 0.1)"
    for (let y = 0; y < height; y += 4) {
      ctx.fillRect(0, y, width, 1)
    }
  }

  glitchCanvas(canvas) {
    if (!this.glitchEnabled) return

    const ctx = canvas.getContext("2d")
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // Channel shift effect
    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < 0.1) {
        // Shift red channel
        const shift = Math.floor(Math.random() * 20) - 10
        const newIndex = i + shift * 4
        if (newIndex >= 0 && newIndex < data.length) {
          data[i] = data[newIndex] // Red
        }
      }
    }

    // Add random noise
    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < 0.05) {
        data[i] = Math.random() * 255 // Red
        data[i + 1] = Math.random() * 255 // Green
        data[i + 2] = Math.random() * 255 // Blue
      }
    }

    ctx.putImageData(imageData, 0, 0)

    // Reset after a short time
    setTimeout(() => {
      this.drawInitialImage(canvas, 0)
    }, 200)
  }

  glitchElement(element) {
    if (!this.glitchEnabled) return

    element.classList.add("glitch-active")

    // Text scrambling for text elements
    if (element.textContent && Math.random() < 0.5) {
      this.scrambleText(element)
    }

    setTimeout(() => {
      element.classList.remove("glitch-active")
    }, 300)
  }

  scrambleText(element) {
    const originalText = element.textContent
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?~`"
    let scrambled = ""

    element.classList.add("text-scramble")

    // Scramble phase
    const scrambleInterval = setInterval(() => {
      scrambled = ""
      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === " ") {
          scrambled += " "
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      element.textContent = scrambled
    }, 50)

    // Restore phase
    setTimeout(() => {
      clearInterval(scrambleInterval)
      let restored = ""
      let index = 0

      const restoreInterval = setInterval(() => {
        restored = originalText.substring(0, index) + scrambled.substring(index)
        element.textContent = restored
        index++

        if (index > originalText.length) {
          clearInterval(restoreInterval)
          element.textContent = originalText
          element.classList.remove("text-scramble")
        }
      }, 30)
    }, 300)
  }

  triggerRandomGlitch() {
    if (!this.glitchEnabled) return

    const targets = document.querySelectorAll("[data-glitch-target]")
    const randomTarget = targets[Math.floor(Math.random() * targets.length)]

    if (randomTarget) {
      this.glitchElement(randomTarget)
    }

    // Create falling fragments
    this.createFragments()
  }

  triggerMajorGlitch() {
    if (!this.glitchEnabled) return

    // Glitch multiple elements
    const targets = document.querySelectorAll("[data-glitch-target]")
    targets.forEach((target, index) => {
      setTimeout(() => {
        this.glitchElement(target)
      }, index * 100)
    })

    // Create more fragments
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        this.createFragments()
      }, i * 200)
    }

    // Glitch all canvases
    document.querySelectorAll(".glitch-canvas").forEach((canvas, index) => {
      setTimeout(() => {
        this.glitchCanvas(canvas)
      }, index * 150)
    })
  }

  createFragments() {
    if (!this.glitchEnabled) return

    const fragmentsContainer = document.querySelector(".glitch-fragments")

    for (let i = 0; i < 5; i++) {
      const fragment = document.createElement("div")
      fragment.className = "fragment"
      fragment.style.left = Math.random() * 100 + "%"
      fragment.style.width = Math.random() * 20 + 5 + "px"
      fragment.style.height = Math.random() * 100 + 20 + "px"
      fragment.style.background = Math.random() < 0.5 ? "#00ff41" : "#ff0080"

      fragmentsContainer.appendChild(fragment)

      // Remove fragment after animation
      setTimeout(() => {
        fragment.remove()
      }, 2000)
    }
  }

  startGlitchCycle() {
    // Random glitches every 3-8 seconds
    const scheduleNextGlitch = () => {
      const delay = Math.random() * 5000 + 3000
      setTimeout(() => {
        if (this.glitchEnabled && Math.random() < 0.7) {
          this.triggerRandomGlitch()
        }
        scheduleNextGlitch()
      }, delay)
    }

    scheduleNextGlitch()
  }

  clearAllGlitches() {
    // Remove all active glitch classes
    document.querySelectorAll(".glitch-active, .text-scramble").forEach((el) => {
      el.classList.remove("glitch-active", "text-scramble")
    })

    // Clear fragments
    document.querySelector(".glitch-fragments").innerHTML = ""

    // Reset canvases
    document.querySelectorAll(".glitch-canvas").forEach((canvas, index) => {
      this.drawInitialImage(canvas, index)
    })
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new BrokenInterface()
})

// Add some easter eggs
document.addEventListener("keydown", (e) => {
  // Konami code easter egg
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
  if (!window.konamiSequence) window.konamiSequence = []

  window.konamiSequence.push(e.keyCode)
  if (window.konamiSequence.length > konamiCode.length) {
    window.konamiSequence.shift()
  }

  if (window.konamiSequence.join(",") === konamiCode.join(",")) {
    // Ultimate glitch mode
    document.body.style.filter = "hue-rotate(180deg) saturate(2) contrast(1.5)"
    setTimeout(() => {
      document.body.style.filter = ""
    }, 3000)
  }
})
