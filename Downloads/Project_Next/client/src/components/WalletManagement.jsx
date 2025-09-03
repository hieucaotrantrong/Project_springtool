import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WalletManagement() {
    const [depositRequests, setDepositRequests] = useState([]);

    const fetchDepositRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/admin/deposits', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDepositRequests(response.data);
        } catch (error) {
            console.error('Lỗi lấy danh sách nạp tiền:', error);
        }
    };

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/admin/deposits/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchDepositRequests();
            alert('Đã duyệt yêu cầu nạp tiền');
        } catch (error) {
            alert('Lỗi duyệt yêu cầu');
        }
    };

    const handleReject = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/admin/deposits/${id}/reject`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchDepositRequests();
            alert('Đã từ chối yêu cầu nạp tiền');
        } catch (error) {
            alert('Lỗi từ chối yêu cầu');
        }
    };

    useEffect(() => {
        fetchDepositRequests();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Quản lý ví</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Người dùng</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số tiền</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã nạp</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thời gian</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {depositRequests.map((request) => (
                            <tr key={request.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {request.user_email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {parseInt(request.amount).toLocaleString()} VNĐ
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                                    {request.transfer_code}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs rounded-full ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            request.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {request.status === 'pending' ? 'Chờ duyệt' :
                                            request.status === 'approved' ? 'Đã duyệt' : 'Từ chối'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(request.created_at).toLocaleString('vi-VN')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {request.status === 'pending' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleApprove(request.id)}
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Duyệt
                                            </button>
                                            <button
                                                onClick={() => handleReject(request.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Từ chối
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}