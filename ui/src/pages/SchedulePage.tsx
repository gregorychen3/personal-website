import { styled } from "@mui/material";
import { useState } from "react";

const Iframe = styled("iframe")(() => ({ border: "unset" }));

export function SchedulePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="section">
      <div className="container">
        <Iframe
          title="Music Schedule"
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23171717&ctz=America%2FNew_York&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1&src=ZTVoNG5vbm8ybzBiNDRhazdrZmZrYjJiYmtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%234285F4"
          onLoad={() => setIsLoading(false)}
          hidden={isLoading}
          width="100%"
          height="600"
          data-frameborder="0"
          data-scrolling="no"
          style={{ borderWidth: "0" }}
        />
      </div>
    </section>
  );
}
