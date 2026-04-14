import { useEffect, useMemo, useRef, useState } from "react";
import Key, { type KeyType } from "./Key";

export default function Keyboard() {
  console.log("KEY BOARD RENDERS !");
  const [isCheckMode, setIsCheckMode] = useState(false); // focus on the input the mode should switch to insertMode so that the user can type in some text
  const textRef = useRef<HTMLInputElement | null>(null);
  const [text, setText] = useState<string>("");
  const [userTypedText, setUserTypedText] = useState<string>("");

  // We need a state that manages the existence of every pice of

  let [keys, setKeys] = useState<KeyType[]>(() => {
    return [
      ...[..."0123456789abcdefghijklmnopqrstuvwxyz "].map((char) => {
        return {
          isClicked: { yes: false, isWright: false },
          value: char,
          handleResetIsClicked,
        };
      }),
    ];
  });

  const letterElements = keys.map((key) => (
    <Key
      userTypedText={text}
      typedText={userTypedText}
      value={key.value}
      key={key.value}
      isClicked={key.isClicked}
      handleResetIsClicked={() => {
        handleResetIsClicked(key.value);
      }}
    />
  ));
  const numberElements = letterElements.slice(0, 10);
  const letterElLev1 = letterElements.slice(10, 19);
  const letterElLev2 = letterElements.slice(19, 28);
  const letterElLev3 = letterElements.slice(28, letterElements.length - 2);

  const spaceElement = letterElements[letterElements.length - 1];

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleOnFocus(val: string) {
    if (textRef.current && val === "focus") textRef.current.focus();
  }
  function handleResetIsClicked(value: string) {
    setKeys((prev) =>
      prev.map((key, index) =>
        key.value === value
          ? {
              ...key,
              isClicked: {
                yes: false,
                isWright: false,
              },
            }
          : key,
      ),
    );
  }
  function handleChange(e) {
    setText(e.target.value);
  }

  function handleCheckMode() {
    if (text.length === 0) {
      textRef.current.focus();
    } else {
      alert("Type " + text.length + " letters to type , Go ahead !");
      setIsCheckMode(true);
    }
  }

  // ansima
  // a
  //

  useEffect(() => {
    if (isCheckMode) {
      function handleGlobalKeyDown(event: any) {
        setUserTypedText((prev) => prev + event.key);
        //we get the div attributed to it and make it blink in either red or green
        // set a timer that makes that button to blink in a red o yellow colour
        setKeys((prev) =>
          prev.map((key) =>
            key.value === event.key
              ? {
                  ...key,
                  isClicked: {
                    yes: true,
                    isWright: true,
                  },
                }
              : key,
          ),
        );
      }
      window.addEventListener("keydown", handleGlobalKeyDown);
      return () => {
        window.removeEventListener("keydown", handleGlobalKeyDown);
      };
    } else {
      return;
    }
  }, [isCheckMode]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-fit h-sm rounded-md m-auto grid p-auto my-8 bg-gray-600 p-4"
    >
      <input
        ref={textRef}
        type="text"
        name="text"
        placeholder="Type text here ..."
        onChange={handleChange}
        onFocus={() => {
          setIsCheckMode(false);
        }}
        className="bg-gray-800 text-white w-full text-center outline-0"
      />
      <div className="flex gap-2  place-content-center">
        {...numberElements}
      </div>
      <div className="flex gap-2  place-content-center">{...letterElLev1}</div>
      <div className="flex gap-2  place-content-center">{...letterElLev2}</div>
      <div className="flex gap-2  place-content-center">{...letterElLev3}</div>
      <div className="mx-auto">{spaceElement}</div>
      <div className="flex place-content-center">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md mx-4 cursor-pointer"
          onClick={() => {
            handleOnFocus("focus");
          }}
        >
          Insert
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md mx-4 cursor-pointer"
          onClick={handleCheckMode}
        >
          Check
        </button>
      </div>
    </form>
  );
}
