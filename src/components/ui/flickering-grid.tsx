import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
  useGithubTheme?: boolean;
}

const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color,
  width,
  height,
  className,
  maxOpacity = 0.3,
  useGithubTheme = false,
}) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // GitHub theme-aware colors
  const githubColors = useMemo(() => {
    if (theme === "dark") {
      return [
        "rgb(13, 17, 23)", // Base dark background
        "rgb(27, 31, 35)", // Lighter dark background
        "rgb(40, 167, 69)", // Green contribution color
        "rgb(56, 211, 79)", // Medium-high intensity green
        "rgb(38, 166, 154)", // Teal variation
        "rgb(0, 92, 197)", // Blue accent
        "rgb(61, 217, 132)", // Bright green (high activity)
      ];
    } else {
      return [
        "rgb(235, 237, 240)", // Light background
        "rgb(155, 233, 168)", // Light green
        "rgb(64, 196, 99)", // Medium green
        "rgb(48, 161, 78)", // Dark green (high activity)
        "rgb(33, 110, 57)", // Very dark green (highest activity)
        "rgb(208, 215, 222)", // Light gray borders
        "rgb(13, 176, 152)", // Teal accent
      ];
    }
  }, [theme]);

  const getRandomGithubColor = useCallback(() => {
    return githubColors[Math.floor(Math.random() * githubColors.length)];
  }, [githubColors]);

  const effectiveColor = useMemo(() => {
    if (useGithubTheme) {
      // Use consistent first color from theme for non-random mode
      return githubColors[0];
    }
    return (
      color || (theme === "dark" ? "rgb(33, 38, 45)" : "rgb(208, 215, 222)")
    );
  }, [color, theme, useGithubTheme, githubColors]);

  const memoizedColor = useMemo(() => {
    const toRGBA = (color: string) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`;
      }
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "rgba(255, 0, 0,";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
      return `rgba(${r}, ${g}, ${b},`;
    };
    return toRGBA(effectiveColor);
  }, [effectiveColor]);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const cols = Math.floor(width / (squareSize + gridGap));
      const rows = Math.floor(height / (squareSize + gridGap));

      const squares = new Float32Array(cols * rows);
      const squareColors = useGithubTheme
        ? Array(cols * rows)
            .fill(0)
            .map(() => getRandomGithubColor())
        : null;

      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }

      return { cols, rows, squares, squareColors, dpr };
    },
    [squareSize, gridGap, maxOpacity, useGithubTheme, getRandomGithubColor]
  );

  const updateSquares = useCallback(
    (
      squares: Float32Array,
      squareColors: string[] | null,
      deltaTime: number
    ) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
          if (useGithubTheme && squareColors) {
            squareColors[i] = getRandomGithubColor();
          }
        }
      }
    },
    [flickerChance, maxOpacity, useGithubTheme, getRandomGithubColor]
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      squareColors: string[] | null,
      dpr: number
    ) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j;
          const opacity = squares[index];

          if (useGithubTheme && squareColors) {
            const color = squareColors[index];
            const rgb = color.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
              ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
            }
          } else {
            ctx.fillStyle = `${memoizedColor}${opacity})`;
          }

          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          );
        }
      }
    },
    [memoizedColor, squareSize, gridGap, useGithubTheme]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridParams: ReturnType<typeof setupCanvas>;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      gridParams = setupCanvas(canvas, newWidth, newHeight);
    };

    updateCanvasSize();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(gridParams.squares, gridParams.squareColors, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.squareColors,
        gridParams.dpr
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    intersectionObserver.observe(canvas);

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
};

export { FlickeringGrid };
