import { Cursor, useTypewriter } from "react-simple-typewriter";

const TypeWriter = ({
  elementWhereToShow,
  wordToShow,
  elementStyles,
  ...cursorProps
}) => {
  const Element = elementWhereToShow;
  const [text] = useTypewriter({
    delaySpeed: 1000,
    deleteSpeed: 25,
    loop: 0,
    typeSpeed: 100,
    words: wordToShow,
  });
  return (
    <Element className={elementStyles}>
      {text}
      <Cursor cursorBlinking={true} {...cursorProps} />
    </Element>
  );
};

export default TypeWriter;
