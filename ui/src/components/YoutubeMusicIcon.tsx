import { useTheme } from "@mui/material";

export function YoutubeMusicIcon() {
  const disabledColor = useTheme().palette.text.disabled;

  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_5547_43)">
        <path
          d="M12 24C18.63 24 24 18.63 24 12C24 5.37 18.63 0 12 0C5.37 0 0 5.37 0 12C0 18.63 5.37 24 12 24Z"
          fill={disabledColor}
        />
        <path
          d="M12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6ZM12 5C8.14 5 5 8.14 5 12C5 15.86 8.14 19 12 19C15.86 19 19 15.86 19 12C19 8.14 15.86 5 12 5Z"
          fill="black"
        />
        <path d="M9.75 15.5L16.25 12L9.75 8.5V15.5Z" fill="black" />
      </g>
      <defs>
        <clipPath id="clip0_5547_43">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
