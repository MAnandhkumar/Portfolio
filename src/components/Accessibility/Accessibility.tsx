import "./Accessibility.scss";
import { useTheming } from "../../hooks/Theme.hook";
import CFG from "../../config/config.json";
import { ThemesType } from "../ThemeManager/ThemeManagerTypes";

const Accessibility = () => {
  const { changeTheme, selectedTheme } = useTheming();

  // For focusing back to accessibility menu item
  const focusBack = (e: React.KeyboardEvent) => {
    if (
      e.key === "Tab" &&
      e.shiftKey &&
      !!document.getElementsByClassName("cls-accessibility")[0]
    ) {
      e.preventDefault();
      const element = document.getElementsByClassName("cls-accessibility")[0] as HTMLElement;
      element && element.focus();
    }
  };

  // For focusing next to accessibility menu item
  const focusNext = (e: React.KeyboardEvent) => {
    if (
      e.key === "Tab" &&
      !(e.key === "Tab" && e.shiftKey) &&
      !!document.getElementsByClassName("cls-accessibility")[0]
    ) {
      e.preventDefault();
      const element = document.getElementsByClassName("cls-accessibility")[0]
        .nextElementSibling as HTMLElement;
      element && element.focus();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    changeTheme(e.currentTarget.value as ThemesType);
  };

  // Get the root styles to read custom properties
  const rootStyles = getComputedStyle(document.documentElement);
  // Default zoom level based on device pixel ratio
  const defaultZoom = window.devicePixelRatio;
  const maxIncrease = parseInt(rootStyles.getPropertyValue("--FONTMAXINCREASE"), 10) || 2;
  const maxDecrease = parseInt(rootStyles.getPropertyValue("--FONTMAXDECREASE"), 10) || 2;

  // Extend the CSSStyleDeclaration interface to include the zoom property
  interface CSSStyleDeclaration {
    zoom?: string | number;
  }

  // Function to increase font size
  const increaseFontSize = () => {
    // Get the current zoom level from a data attribute or a global variable
    let currentZoom =
      parseFloat((document.body.style as CSSStyleDeclaration).zoom as string) || defaultZoom;
    // Check if maximum increase limit is reached
    if (currentZoom < defaultZoom + maxIncrease * 0.1) {
      currentZoom += 0.1;
      (document.body.style as CSSStyleDeclaration).zoom = currentZoom;
    }
  };

  // Function to decrease font size
  const decreaseFontSize = () => {
    // Get the current zoom level from a data attribute or a global variable
    let currentZoom =
      parseFloat((document.body.style as CSSStyleDeclaration).zoom as string) || defaultZoom;
    // Check if maximum decrease limit is reached
    if (currentZoom > defaultZoom - maxDecrease * 0.1) {
      currentZoom -= 0.1;
      (document.body.style as CSSStyleDeclaration).zoom = currentZoom;
    }
  };

  // Function to reset font size to default
  const resetFontSize = () => {
    (document.body.style as CSSStyleDeclaration).zoom = defaultZoom;
  };

  const handleFsizeClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const buttons = document.querySelectorAll(".cls-fsize button");
    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
    (e.currentTarget as HTMLButtonElement).classList.add("active");
  };

  const isVertical = CFG.accessibility_position === "vertical";

  return (
    <div
      className={`Accessibility ${isVertical ? "flex flex-col" : "flex flex-row items-center"} gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md`}
      data-testid="Accessibility"
    >
      <div className="flex items-center gap-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium">Contrast:</span>
        <div className="flex rounded overflow-hidden border border-gray-300 dark:border-gray-600 custom-radio cls-contrast">
          <button
            className={`px-3 py-1 text-sm font-medium transition-colors ${
              selectedTheme === "default"
                ? "bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
            value="default"
            onClick={handleClick}
            onKeyDown={focusBack}
          >
            Default
          </button>
          <button
            className={`px-3 py-1 text-sm font-medium transition-colors ${
              selectedTheme === "BW"
                ? "bg-black text-white"
                : "bg-white dark:bg-gray-700 text-black dark:text-white border-l border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
            value="BW"
            onClick={handleClick}
          >
            A
          </button>
          <button
            className={`px-3 py-1 text-sm font-medium transition-colors ${
              selectedTheme === "BY"
                ? "bg-black text-yellow-400"
                : "bg-white dark:bg-gray-700 text-yellow-500 border-l border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
            value="BY"
            onClick={handleClick}
          >
            A
          </button>
          <button
            className={`px-3 py-1 text-sm font-medium transition-colors ${
              selectedTheme === "YB"
                ? "bg-yellow-400 text-black"
                : "bg-yellow-100 text-black border-l border-gray-300 dark:border-gray-600 hover:bg-yellow-200"
            }`}
            value="YB"
            onClick={handleClick}
          >
            A
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium">Font size:</span>
        <div className="flex rounded overflow-hidden border border-gray-300 dark:border-gray-600 cls-fsize">
          <button
            className="px-3 py-1 text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={(e) => {
              handleFsizeClick(e);
              resetFontSize();
            }}
          >
            Default
          </button>
          <button
            className="px-3 py-1 text-sm font-medium border-l border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={(e) => {
              handleFsizeClick(e);
              decreaseFontSize();
            }}
          >
            A-
          </button>
          <button
            className="px-3 py-1 text-sm font-medium border-l border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={(e) => {
              handleFsizeClick(e);
              increaseFontSize();
            }}
            onKeyDown={focusNext}
          >
            A+
          </button>
        </div>
      </div>
    </div>
  );
};
export default Accessibility;
