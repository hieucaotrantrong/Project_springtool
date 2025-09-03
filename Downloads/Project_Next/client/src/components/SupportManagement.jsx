import React, { useEffect, useState } from 'react';
import axios from 'axios';
/*----------------------------------
-----------------------------------*/
const SupportManagement = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [reply, setReply] = useState('');
    /*----------------------------------
     -----------------------------------*/
    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);

            const response = await axios.get('http://localhost:5000/api/support', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Response data:', response.data);
            setRequests(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error details:', err);
            setError('Không thể tải danh sách yêu cầu hỗ trợ');
            setLoading(false);
        }
    };
    /*----------------------------------
    -----------------------------------*/
    useEffect(() => {
        fetchRequests();
    }, []);

    const handleReply = async (requestId) => {
        try {
            const token = localStorage.getItem('token');


            console.log('Sending reply:', {
                requestId,
                reply,
                token
            });

            await axios.post(
                `http://localhost:5000/api/support/${requestId}/reply`,
                { reply },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setReply('');
            setSelectedRequest(null);
            fetchRequests();
            alert('Phản hồi đã được gửi thành công!');
        } catch (err) {
            console.error('Error sending reply:', err);
            alert('Không thể gửi phản hồi. Vui lòng thử lại.');
        }
    };

    if (loading) return <div className="text-center py-4">Đang tải...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Quản lý yêu cầu hỗ trợ</h2>

            {requests.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                    Chưa có yêu cầu hỗ trợ nào.
                </p>
            ) : (
                <div className="grid gap-6">
                    {requests.map((request) => (
                        <div
                            key={request.id}
                            className={`bg-white p-6 rounded-lg shadow ${request.status === 'pending' ? 'border-l-4 border-yellow-500' : 'border-l-4 border-green-500'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold text-lg">{request.name}</h3>
                                    <p className="text-gray-600">{request.email}</p>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {new Date(request.created_at).toLocaleString('vi-VN')}
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-sm font-semibold text-gray-500 mb-1">
                                    Chủ đề: {request.topic}
                                </div>
                                <p className="text-gray-700">{request.message}</p>
                            </div>

                            {request.reply ? (
                                <div className="bg-green-50 p-4 rounded-md">
                                    <div className="font-semibold text-green-800 mb-2">
                                        Phản hồi:
                                    </div>
                                    <p className="text-green-700">{request.reply}</p>
                                    <div className="text-sm text-green-600 mt-2">
                                        Đã trả lời: {new Date(request.replied_at).toLocaleString('vi-VN')}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {selectedRequest === request.id ? (
                                        <div className="space-y-3">
                                            <textarea
                                                value={reply}
                                                onChange={(e) => setReply(e.target.value)}
                                                className="w-full border rounded-md p-3 h-32"
                                                placeholder="Nhập nội dung phản hồi..."
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleReply(request.id)}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                                >
                                                    Gửi phản hồi
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedRequest(null);
                                                        setReply('');
                                                    }}
                                                    className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setSelectedRequest(request.id)}
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            Trả lời yêu cầu này
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SupportManagement;

