import { styled } from "@mui/material";

const Iframe = styled("iframe")(() => ({ border: "unset" }));

export function SchedulePage() {
  return (
    <div className="container">
      <Iframe
        title="Music Schedule"
        src="https://calendar.google.com/calendar/embed?src=toactmj2ehimlgf5b4ru2ppvh4%40group.calendar.google.com&ctz=America%2FNew_York"
        width="100%"
        height="600"
        data-frameborder="0"
        data-scrolling="no"
        style={{ borderWidth: "0" }}
      />
    </div>
  );
}
