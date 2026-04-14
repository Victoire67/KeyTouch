import { useEffect } from "react";
export type KeyType = {
  value: string;
  typedText: string;
  userTypedText: string;
  isClicked: { yes: boolean; isWright: boolean };
  handleResetIsClicked(value: string): void;
};

export default function Key({
  value,
  isClicked,
  handleResetIsClicked,
  typedText,
  userTypedText,
}: KeyType) {

  if (isClicked.yes)
    useEffect(() => {
      setTimeout(() => {
        
        handleResetIsClicked(value); // Resets if the key was clicked (meaning , key is not dark gray)
      }, 2000);
    }, [isClicked.yes]);

  return (
    <div
      className={`h-12 aspect-square flex items-center place-content-center border m-2 ${isClicked.yes ? (isClicked.isWright ? "bg-green-500" : "bg-red-500") : "bg-gray-900"} text-2xl font-bold text-white rounded-sm ${value === " " ? "w-64" : ""}`}
    >
      {value}
    </div>
  );
}
