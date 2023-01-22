import React, { useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function SchedulePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="section">
      <div className="container">
        {isLoading && <LoadingSpinner />}
        <iframe
          title="Music Schedule"
          src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=dG9hY3RtajJlaGltbGdmNWI0cnUycHB2aDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23871111&amp;showTitle=0&amp;showNav=1&amp;showDate=1&amp;showPrint=0&amp;showTabs=1&amp;showCalendars=0&amp;showTz=1"
          onLoad={() => setIsLoading(false)}
          hidden={isLoading}
          width="100%"
          height="600"
          data-frameborder="0"
          data-scrolling="no"
          style={{ borderWidth: "0" }}
        ></iframe>
      </div>
    </section>
  );
}
