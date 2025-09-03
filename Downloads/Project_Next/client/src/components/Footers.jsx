import React from 'react';
/*----------------------------------
-----------------------------------*/
export default function Footers() {
    return (
        <footer className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-start lg:gap-8">
                    <div className="text-teal-600">

                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-4 lg:gap-y-16">
                        <div className="col-span-2 sm:col-span-1">
                            <p className="font-medium text-gray-900">Tổng đài hỗ trợ</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Gọi mua: 1900 232 460 (8:00 - 21:30) </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Khiếu nại: 1800.1062 (8:00 - 21:30) </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Bảo hành: 1900 232 464 (8:00 - 21:00)</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <p className="font-medium text-gray-900">Về công ty</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="https://mwg.vn/" className="text-gray-700 transition hover:opacity-75"> Giới thiệu công ty (MWG.vn) </a>
                                </li>

                                <li>
                                    <a href="https://vieclam.thegioididong.com/" className="text-gray-700 transition hover:opacity-75"> Tuyển dụng </a>
                                </li>

                                <li>
                                    <a href="https://www.thegioididong.com/lien-he" className="text-gray-700 transition hover:opacity-75"> Gửi góp ý, khiếu nại </a>
                                </li>
                                <li>
                                    <a href="https://www.thegioididong.com/he-thong-sieu-thi-the-gioi-di-dong" className="text-gray-700 transition hover:opacity-75"> Tìm siêu thị (2.965 shop) </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <p className="font-medium text-gray-900">Thông tin khác</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75">Tích điểm Quà tặng VIP </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Lịch sử mua hàng </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Đăng ký bán hàng CTV chiết khấu cao </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Tìm hiểu về mua trả chậm </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Chính sách bảo hành </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Xem thêm </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <p className="font-medium text-gray-900">Website cùng tập đoàn</p>
                            <img src="./assets/logotgdd.jpg" alt="" style={{ width: '460px', height: 'auto' }} />
                        </div>


                    </div>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-8">
                    <div className="sm:flex sm:justify-between">
                        <p className="text-xs text-gray-500">© 2018. Công ty cổ phần Thế Giới Di Động. GPDKKD: 0303217354 do sở KH & ĐT TP.HCM cấp ngày 02/01/2007. GPMXH: 238/GP-BTTTT do Bộ Thông Tin và Truyền Thông cấp ngày 04/06/2020.
                            Địa chỉ: 128 Trần Quang Khải, P.Tân Định, Q.1, TP.Hồ Chí Minh. Địa chỉ liên hệ và gửi chứng từ: Lô T2-1.2, Đường D1, Đ. D1, P.Tân Phú, TP.Thủ Đức, TP.Hồ Chí Minh. Điện thoại: 028 38125960. Email: cskh@thegioididong.com. Chịu trách nhiệm nội dung: Huỳnh Văn Tốt. Email: hotrotmdt@thegioididong.com. Xem chính sách sử dụng</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

