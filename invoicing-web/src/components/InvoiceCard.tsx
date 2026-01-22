import { useNavigate } from 'react-router-dom';
import { formatInTimeZone } from 'date-fns-tz';
import type { Invoice } from '../types/invoice';

interface InvoiceCardProps {
  invoice: Invoice;
}

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case 'PAID':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'FAILED':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    // Convert to IST (Asia/Kolkata timezone)
    return formatInTimeZone(date, 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');
  } catch {
    return dateString;
  }
};

export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/invoice/${invoice.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 overflow-hidden transform hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Invoice #{invoice.id}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {formatDate(invoice.dateTime)}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
              invoice.paymentStatus
            )}`}
          >
            {invoice.paymentStatus}
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(invoice.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="text-xs text-gray-500 flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          Click to view details
        </div>
      </div>
    </div>
  );
};
