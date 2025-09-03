import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './Home';
import { FaWallet, FaCreditCard, FaHistory } from 'react-icons/fa';
import Footers from './Footers';

const WalletPage = () => {
    const [wallet, setWallet] = useState(null);
    const [showDepositForm, setShowDepositForm] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
    const [transferInfo, setTransferInfo] = useState(null);
    const [depositHistory, setDepositHistory] = useState([]);

    const suggestedAmounts = [
        { label: '100K', value: 100000 },
        { label: '200K', value: 200000 },
        { label: '500K', value: 500000 },
        { label: '1M', value: 1000000 },
        { label: '2M', value: 2000000 },
        { label: '5M', value: 5000000 },
    ];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const selectAmount = (amount) => {
        setDepositAmount(amount.toString());
    };

    const handleDeposit = async () => {
        if (!depositAmount || depositAmount <= 0) {
            alert('Vui lòng nhập số tiền hợp lệ');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/wallet/deposit',
                { amount: parseInt(depositAmount) },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setTransferInfo(response.data);
            alert('Yêu cầu nạp tiền đã được tạo! Vui lòng chuyển khoản theo thông tin bên dưới.');
        } catch (error) {
            console.error('Lỗi nạp tiền:', error);
            alert('Có lỗi xảy ra khi tạo yêu cầu nạp tiền');
        }
    };

    const fetchWalletInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/wallet', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWallet(response.data.wallet);
            setDepositHistory(response.data.depositHistory || []);
        } catch (error) {
            console.error('Lỗi lấy thông tin ví:', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'approved': return 'Đã duyệt';
            case 'pending': return 'Chờ duyệt';
            case 'rejected': return 'Từ chối';
            default: return 'Không xác định';
        }
    };

    useEffect(() => {
        fetchWalletInfo();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Home />

            <div className="max-w-7xl mx-auto p-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <FaWallet className="text-2xl text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Ví điện tử
                        </h1>
                    </div>

                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Wallet Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Balance Card */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white rounded-3xl shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                            <div className="relative p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <p className="text-blue-100 text-sm font-medium">Số dư khả dụng</p>
                                        <h2 className="text-3xl font-bold mt-1">
                                            {formatPrice(wallet?.balance || 0)}
                                        </h2>
                                        <p className="text-blue-100 text-lg">VNĐ</p>
                                    </div>
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <FaCreditCard className="text-xl" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-green-300 text-sm">
                                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                                    <span>Tài khoản đang hoạt động</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                        <span className="text-green-600 text-lg">📈</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs">Tổng nạp</p>
                                        <p className="font-bold text-green-600">
                                            {formatPrice(
                                                depositHistory
                                                    .filter(t => t.status === 'approved')
                                                    .reduce((sum, t) => sum + parseInt(t.amount), 0)
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <span className="text-blue-600 text-lg">📊</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs">Giao dịch</p>
                                        <p className="font-bold text-blue-600">{depositHistory.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    setShowDepositForm(true);
                                    setShowHistory(false);
                                }}
                                className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${showDepositForm
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-200'
                                    : 'bg-white hover:bg-green-50 text-green-600 border-2 border-green-200 hover:border-green-300'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <span className="text-xl">💰</span>
                                    <span>Nạp tiền vào ví</span>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    setShowHistory(true);
                                    setShowDepositForm(false);
                                }}
                                className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${showHistory
                                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-200'
                                    : 'bg-white hover:bg-orange-50 text-orange-600 border-2 border-orange-200 hover:border-orange-300'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <FaHistory className="text-lg" />
                                    <span>Lịch sử giao dịch</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:col-span-2">
                        {showDepositForm && (
                            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                                {/* Header */}
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                                            <span className="text-2xl">💳</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">Nạp tiền vào ví</h3>
                                            <p className="text-green-100">Chọn số tiền và phương thức thanh toán</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8">
                                    {/* Amount Input */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                                            Số tiền muốn nạp
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                placeholder="Nhập số tiền..."
                                                value={depositAmount}
                                                onChange={(e) => setDepositAmount(e.target.value)}
                                                className="w-full p-6 text-2xl font-bold border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                                            />
                                            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold text-lg">
                                                VNĐ
                                            </span>
                                        </div>
                                    </div>

                                    {/* Quick Amount Selection */}
                                    <div className="mb-8">
                                        <p className="text-sm font-semibold text-gray-700 mb-4">Chọn nhanh</p>
                                        <div className="grid grid-cols-3 gap-4">
                                            {suggestedAmounts.map((amount, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => selectAmount(amount.value)}
                                                    className={`p-4 rounded-xl text-sm font-semibold transition-all duration-200 ${depositAmount == amount.value
                                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
                                                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                                                        }`}
                                                >
                                                    {amount.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Payment Method */}
                                    <div className="mb-8">
                                        <p className="text-sm font-semibold text-gray-700 mb-4">Phương thức thanh toán</p>
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                                            <div className="flex items-center">
                                                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-6">
                                                    <span className="text-white text-2xl font-bold">₫</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-gray-800 text-lg">Chuyển khoản ngân hàng</p>
                                                    <p className="text-gray-600">Vietcombank • An toàn & Nhanh chóng</p>
                                                </div>
                                                <div className="text-green-500">
                                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 font-semibold text-lg">Tổng thanh toán</span>
                                            <span className="text-3xl font-bold text-green-600">
                                                {formatPrice(depositAmount || 0)} VNĐ
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setShowDepositForm(false)}
                                            className="flex-1 py-4 border-2 border-gray-300 rounded-2xl text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                                        >
                                            Hủy bỏ
                                        </button>
                                        <button
                                            onClick={handleDeposit}
                                            className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl"
                                        >
                                            Xác nhận nạp tiền
                                        </button>
                                    </div>

                                    {/* Transfer Info - Hiển thị sau khi tạo yêu cầu */}
                                    {transferInfo && (
                                        <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white text-lg">🏦</span>
                                                </div>
                                                <h4 className="text-xl font-bold text-gray-800">Thông tin chuyển khoản</h4>
                                            </div>

                                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-1">Ngân hàng</p>
                                                        <p className="text-lg font-bold text-gray-800">{transferInfo.bankInfo.bank}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-1">Số tài khoản</p>
                                                        <p className="text-lg font-bold text-blue-600 font-mono">{transferInfo.bankInfo.accountNumber}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-1">Chủ tài khoản</p>
                                                        <p className="text-lg font-bold text-gray-800">{transferInfo.bankInfo.accountName}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-1">Số tiền</p>
                                                        <p className="text-lg font-bold text-red-600">{formatPrice(depositAmount)} VNĐ</p>
                                                    </div>
                                                </div>

                                                <div className="mt-6 pt-4 border-t border-gray-200">
                                                    <p className="text-sm text-gray-600 mb-1">Nội dung chuyển khoản</p>
                                                    <div className="flex items-center gap-3">
                                                        <p className="text-lg font-bold text-green-600 font-mono bg-green-50 px-4 py-2 rounded-lg flex-1">
                                                            {transferInfo.transferCode}
                                                        </p>
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(transferInfo.transferCode)}
                                                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                                                        >
                                                            Copy
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                                <div className="flex items-start gap-3">
                                                    <span className="text-blue-500 text-lg">ℹ️</span>
                                                    <div className="text-sm text-blue-700">
                                                        <p className="font-semibold mb-1">Lưu ý quan trọng:</p>
                                                        <ul className="list-disc list-inside space-y-1">
                                                            <li>Vui lòng chuyển khoản đúng số tiền và nội dung</li>
                                                            <li>Thời gian xử lý: 5-15 phút sau khi chuyển khoản</li>
                                                            <li>Liên hệ hỗ trợ nếu sau 30 phút chưa được duyệt</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {showHistory && (
                            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                                {/* Header */}
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                                            <FaHistory className="text-2xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">Lịch sử giao dịch</h3>
                                            <p className="text-orange-100">Theo dõi tất cả giao dịch nạp tiền</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8">
                                    {depositHistory.length === 0 ? (
                                        <div className="text-center py-16">
                                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <span className="text-4xl"></span>
                                            </div>
                                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Chưa có giao dịch</h4>
                                            <p className="text-gray-500">Lịch sử nạp tiền sẽ hiển thị tại đây</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 max-h-96 overflow-y-auto">
                                            {depositHistory.map((transaction, index) => (
                                                <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                                                <span className="text-blue-600 text-xl">💰</span>
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-gray-800 text-lg">Nạp tiền vào ví</p>
                                                                <p className="text-gray-500">
                                                                    {new Date(transaction.created_at).toLocaleString('vi-VN')}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold text-green-600">
                                                                +{formatPrice(transaction.amount)} VNĐ
                                                            </p>
                                                            <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(transaction.status)}`}>
                                                                {getStatusText(transaction.status)}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="bg-gray-50 rounded-xl p-4">
                                                        <div className="grid grid-cols-2 gap-4 mb-3">
                                                            <div>
                                                                <span className="text-gray-600 text-sm">Mã giao dịch:</span>
                                                                <p className="font-mono text-blue-600 font-semibold">{transaction.transfer_code}</p>
                                                            </div>
                                                            <div>
                                                                <span className="text-gray-600 text-sm">Ngân hàng:</span>
                                                                <p className="font-semibold">{transaction.bank_account?.split(' - ')[0] || 'Vietcombank'}</p>
                                                            </div>
                                                        </div>

                                                        {transaction.status === 'pending' && (
                                                            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-3">
                                                                <p className="text-yellow-700 text-sm">
                                                                    ⏳ Đang chờ xác nhận từ admin. Thời gian xử lý: 5-15 phút
                                                                </p>
                                                            </div>
                                                        )}

                                                        {transaction.status === 'approved' && (
                                                            <div className="bg-green-50 border-l-4 border-green-400 rounded p-3">
                                                                <p className="text-green-700 text-sm">
                                                                    ✅ Giao dịch thành công! Số dư đã được cập nhật
                                                                </p>
                                                            </div>
                                                        )}

                                                        {transaction.status === 'rejected' && (
                                                            <div className="bg-red-50 border-l-4 border-red-400 rounded p-3">
                                                                <p className="text-red-700 text-sm">
                                                                    ❌ Giao dịch bị từ chối. Vui lòng liên hệ hỗ trợ
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {depositHistory.length > 0 && (
                                        <div className="mt-8 pt-6 border-t border-gray-200">
                                            <div className="grid grid-cols-2 gap-4 text-center">
                                                <div className="bg-blue-50 rounded-xl p-4">
                                                    <p className="text-blue-600 font-semibold">Tổng giao dịch</p>
                                                    <p className="text-2xl font-bold text-blue-700">{depositHistory.length}</p>
                                                </div>
                                                <div className="bg-green-50 rounded-xl p-4">
                                                    <p className="text-green-600 font-semibold">Tổng đã nạp</p>
                                                    <p className="text-2xl font-bold text-green-700">
                                                        {formatPrice(
                                                            depositHistory
                                                                .filter(t => t.status === 'approved')
                                                                .reduce((sum, t) => sum + parseInt(t.amount), 0)
                                                        )} VNĐ
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footers />
        </div>
    );
};

export default WalletPage;












