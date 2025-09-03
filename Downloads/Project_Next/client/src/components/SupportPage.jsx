import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Home from "./Home";
import Footers from "./Footers";
import Carousel from "./Carousel";

export default function SupportPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        topic: "Giao hàng",
        message: "",
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setError("");
        console.log(" Gửi yêu cầu:", formData);

        try {
            const res = await fetch("http://localhost:5000/api/support", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            console.log(" Phản hồi từ server:", result);

            if (res.ok) {
                setSuccess(true);
                setFormData({ name: "", email: "", topic: "Giao hàng", message: "" });
            } else {
                setError(result.error || "Gửi thất bại. Vui lòng thử lại.");
            }
        } catch (err) {
            console.error("❌ Lỗi:", err);
            setError("Không thể kết nối đến server.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header từ Home component */}
            <Home />
            <Carousel />

            {/* Support Content */}
            <div className="max-w-2xl mx-auto pt-10 pb-10 px-6">
                <div className="bg-white shadow-md rounded-xl p-6 relative">
                    <h2 className="text-2xl font-bold mb-4">Liên hệ hỗ trợ</h2>
                    <p className="mb-6 text-gray-600">
                        Bạn gặp vấn đề? Hãy gửi thông tin cho chúng tôi để được hỗ trợ nhanh nhất.
                    </p>

                    {success && (
                        <div className="mb-4 text-green-600 font-semibold">
                            Gửi thành công! Chúng tôi sẽ phản hồi sớm nhất.
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 text-red-600 font-semibold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Họ và tên"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                        <select
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        >
                            <option>Giao hàng</option>
                            <option>Thanh toán</option>
                            <option>Sản phẩm</option>
                            <option>Khác</option>
                        </select>
                        <textarea
                            name="message"
                            placeholder="Mô tả vấn đề bạn gặp phải..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-2 rounded-md h-32"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Gửi hỗ trợ
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer có sẵn */}
            <Footers />
        </div>
    );
}



