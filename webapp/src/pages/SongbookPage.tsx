import React from "react";

export default () => {
  const folderId = "1XDfbY6K4GzA3Etm-dlwN0-HGhrIICkgw";

  return (
    <section className="section">
      <div className="container">
        <iframe
          id="idIframe"
          src={`https://drive.google.com/embeddedfolderview?id=${folderId}#list`}
          style={{ width: "100%", minHeight: "650px" }}
        />
      </div>
    </section>
  );
};
