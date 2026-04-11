particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 40, // Number of dots
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff" // Dot color
    },
    "shape": {
      "type": "circle" // Shape of the dots
    },
    "opacity": {
      "value": 0.5
    },
    "size": {
      "value": 3
    },
    /* THIS SECTION CREATES THE POLYGON LINES */
    "line_linked": {
      "enable": true,
      "distance": 150, // Max distance between dots to draw a line
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.5, // How fast they float
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out"
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": false,
        "mode": "grab" // Lines will 'grab' onto your mouse
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      }
    }
  },
  "retina_detect": true
});