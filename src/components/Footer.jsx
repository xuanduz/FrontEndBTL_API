import React, { Component } from 'react'

import logo from '../assets/images/Logo-2.png'

export default class Footer extends Component {
  render() {
    return (
      <div className='footer-container row container-fluid'>

        <div className="col-md-3 col-12">
          <span>TỔNG ĐÀI HỖ TRỢ</span>
          <ul>
            <li>Liên hệ đặt hàng <b>012334563</b></li>
            <li>Liên hệ đặt hàng <b>123123144</b></li>
            <li>Liên hệ đặt hàng <b>1241455141</b></li>
          </ul>
        </div>
        <div className="col-md-3 col-12">
          <span>VỀ YOLO</span>
          <ul>
            <li>Giới thiệu</li>
            <li>Liên hệ</li>
            <li>Tuyển dụng</li>
            <li>Tin tức</li>
            <li>Hệ thống cửa hàng</li>
          </ul>
        </div>
        <div className="col-md-3 col-12">
          <span>CHĂM SÓC KHÁCH HÀNG</span>
          <ul>
            <li>Chính sách đổi trả</li>
            <li>Chính sách bảo hàng</li>
            <li>Chính sách hoàn tiền</li>
          </ul>
        </div>
        <div className="col-md-3 col-12">
          <div className="row">
            <img src={logo} alt="" />
          </div>
          <div className="row">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus fugit eius tempora neque deleniti hic saepe odit iusto modi itaque!</p>
          </div>
        </div>
      </div>
    )
  }
}
