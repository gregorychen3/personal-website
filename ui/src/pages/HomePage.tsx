import React from "react";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="section">
      <div className="container">
        <figure className="image">
          <img src="riverside_church_fullhd.jpg" alt="At Riverside church" />
          <Link to="/credits">
            <div className="is-size-7 has-text-right has-text-black">Site Credits</div>
          </Link>
        </figure>
      </div>
    </section>
  );
}
