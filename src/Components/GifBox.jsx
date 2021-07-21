import React from "react";
import "./GifBox.scss";
import ReactGiphySearchbox from "react-giphy-searchbox";

const GifBox = ({setMessage, sendMessage, receiver, message}) => (
    <div className="searchboxWrapper">
      <ReactGiphySearchbox
        apiKey="9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7"
        onSelect={(item) => {
          setMessage('x')
          console.log("gifMessage: ", message)
          sendMessage(receiver)
          console.log('gifObj:', item)}}
        masonryConfig={[
          { columns: 2, imageWidth: 110, gutter: 5 },
          { mq: "700px", columns: 3, imageWidth: 120, gutter: 5 }
        ]}
      />
    </div>
);

export default GifBox