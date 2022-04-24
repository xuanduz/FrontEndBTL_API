import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactMapGL from "react-map-gl";
import { Map, Marker, ScaleControl, Popup } from "react-map-gl";

function Contact() {
  const [viewport, setViewport] = useState({
    longitude: 105.8049,
    latitude: 21.0229,
    zoom: 12,
  });
  const [showPopup, setShowPopup] = React.useState(true);
  const token =
    "pk.eyJ1IjoieHVhbmR1eiIsImEiOiJjbDI2ejY0ZzYyb251M2pscHFyYmlya3hmIn0.O7XSrEECiHaCsN3K9Zmd1A";

  return (
    <div className="contact-container">
      <div className="contact">
        <h4>Hệ thống cửa hàng của YOLO - Shop quần áo thời trang Việt</h4>
        <p>
          Bắt đầu từ thương hiệu thời trang Hi5 ra đời trong năm 2009, trải qua
          chặng đường phát triển đầy khó khăn, Hi5 được đổi tên thành Yody vào
          năm 2014 với ước mơ gây dựng một thương hiệu thời trang hàng đầu thế
          giới. Từ đó trở đi Yody lớn mạnh không ngừng, đến năm 2016 Yody đã có
          38 cửa hàng, chỉ sau 2 năm vào năm 2018 Yody đã có 73 cửa hàng. Đến
          năm 2019 Yody đã có 82 cửa hàng và tính đến thời điểm hiện tại Yody đã
          mở rộng được hơn 100 cửa hàng trên toàn quốc.
        </p>
        <h5>Hệ thống cửa hàng</h5>
        <div className="map">
          <ReactMapGL
            initialViewState={viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={token}
          >
            <ScaleControl />
            <Marker
              longitude={105.8049}
              latitude={21.0229}
              anchor="bottom"
            ></Marker>
            <Marker
              longitude={105.78}
              latitude={20.97}
              anchor="bottom"
            ></Marker>
          </ReactMapGL>
        </div>
      </div>
    </div>
  );
}

export default Contact;
