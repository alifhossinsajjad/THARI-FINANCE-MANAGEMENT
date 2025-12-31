import { TrendingUp, TrendingDown, Trash2 } from "lucide-react"

interface StockData {
  symbol: string
  name: string
  price: string
  change: string
  isPositive: boolean
  halalStatus: string
  rating: "Strong Buy" | "Buy"
}

const stocks: StockData[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: "$178.32",
    change: "+2.5%",
    isPositive: true,
    halalStatus: "Halal",
    rating: "Strong Buy",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: "$398.75",
    change: "+1.8%",
    isPositive: true,
    halalStatus: "Halal",
    rating: "Strong Buy",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: "$242.15",
    change: "-0.5%",
    isPositive: false,
    halalStatus: "Halal",
    rating: "Buy",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: "$612.50",
    change: "+3.2%",
    isPositive: true,
    halalStatus: "Halal",
    rating: "Strong Buy",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: "$142.85",
    change: "+0.8%",
    isPositive: true,
    halalStatus: "Halal",
    rating: "Buy",
  },
]

export default function Watchlist() {
  return (
    <div className=" mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Watchlist</h1>
        <p className="text-gray-500 font-medium">Track your favorite halal stocks</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-5 text-sm font-bold text-gray-600">Stock</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-600">Price</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-600">Change</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-600">Halal Status</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-600">Rating</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-600 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr
                  key={stock.symbol}
                  className={`group hover:bg-gray-50/50 transition-colors ${
                    index !== stocks.length - 1 ? "border-b border-gray-50" : ""
                  }`}
                >
                  <td className="px-6 py-5">
                    <div className="space-y-0.5">
                      <p className="text-gray-900 font-bold text-sm leading-none">{stock.symbol}</p>
                      <p className="text-gray-400 text-xs font-medium">{stock.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-gray-900 font-bold text-sm">{stock.price}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div
                      className={`flex items-center gap-1.5 text-sm font-bold ${
                        stock.isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stock.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{stock.change}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#eefcf5] text-[#10b981] border border-green-50">
                      {stock.halalStatus}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold border ${
                        stock.rating === "Strong Buy"
                          ? "bg-[#eefcf5] text-[#10b981] border-green-50"
                          : "bg-[#eff6ff] text-[#3b82f6] border-blue-50"
                      }`}
                    >
                      {stock.rating}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all inline-flex items-center justify-center">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
