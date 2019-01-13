import React, { Component } from 'react';

class MusicSchedule extends Component {
  render() {
    return (
      <div id="music-calendar">
        <iframe
          title="music-calendar"
          style={{ 'border-width': 0 }}
          width="800"
          height="600"
          frameborder="0"
          scrolling="no"
          src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showCalendars=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=toactmj2ehimlgf5b4ru2ppvh4%40group.calendar.google.com&amp;color=%23711616&amp;ctz=America%2FNew_York"
        />
      </div>
    )
  }
}

export default MusicSchedule;
