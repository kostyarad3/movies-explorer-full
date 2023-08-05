import React from "react";

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    function onResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', onResize)
  }, [])

  return windowWidth;
}