import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "../contexts/ThemeContext";

const ParticleBackground = () => {
  const { darkMode } = useTheme();
  
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    console.log("Particles loaded");
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: darkMode ? "#0a0a0a" : "#f5f5f5",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: darkMode ? "#6b52ae" : "#3b82f6",
          },
          links: {
            color: darkMode ? "#8a70d6" : "#4b92f7",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none", // <--- Add this line
      }}
    />
  );
};

export default ParticleBackground;
