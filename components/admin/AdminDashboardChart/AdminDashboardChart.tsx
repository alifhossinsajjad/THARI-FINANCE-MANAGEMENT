// "use client";

// // import { BarChart3 } from "lucide-react";
// import { Chart } from "react-google-charts";
// import img from "@/public/images/Vector.png";

// type Props = {
//   totalRevenue?: number;
//   monthlyRevenue?: number;
// };

// function AdminDashboardChart({ totalRevenue = 0, monthlyRevenue = 0 }: Props) {
//   const data = [
//     ["Revenue Type", "Amount"],
//     ["Monthly Revenue", monthlyRevenue],
//     ["Remaining Revenue", totalRevenue - monthlyRevenue],
//   ];

//   const options = {
//     pieHole: 0, // full pie (change to 0.5 if you want donut)
//     colors: ["#2563eb", "#00008b"],
//     legend: "none",
//     pieSliceText: "none",
//     tooltip: { text: "value" },
//     chartArea: {
//       width: "100%",
//       height: "100%",
//     },
//   };

//   return (
//     <div className="bg-gray-50 flex items-center justify-center ">
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-8xl">
//         {/* Header */}
//         <div className="flex items-center gap-2 mb-6">
//           {/* <BarChart3 className="w-5 h-5 text-blue-600" /> */}
//           <img src={img.src} alt="" />
//           <h2 className="text-lg font-semibold text-gray-700">Revenue Chart</h2>
//         </div>

//         {/* Revenue Text */}
//         <div className="text-center mb-4">
//           <p className="text-blue-700 font-medium   text mr-100">
//             Total Revenue{" "}
//             <span className="font-bold">${totalRevenue.toLocaleString()}</span>
//           </p>
//         </div>

//         {/* Chart */}
//         <div className="flex flex-col items-center">
//           <Chart
//             chartType="PieChart"
//             width="400px"
//             height="300px"
//             data={data}
//             options={options}
//           />
//           <p className="text-blue-600 font-medium mt-2 text ml-20 md:ml-100">
//             Monthly Revenue{" "}
//             <span className="font-bold">
//               ${monthlyRevenue.toLocaleString()}
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboardChart;

"use client";

import { Chart } from "react-google-charts";
import img from "@/public/images/Vector.png";

type Props = {
  totalRevenue?: number;
  monthlyRevenue?: number;
};

function AdminDashboardChart({
  totalRevenue = 0,
  monthlyRevenue = 120,
}: Props) {
  // const monthlyRevenue = 120;
  // If totalRevenue is 0, show a placeholder slice of 100%
  const data =
    totalRevenue > 0
      ? [
          ["Revenue Type", "Amount"],
          ["Monthly Revenue", monthlyRevenue],
          ["Remaining Revenue", totalRevenue - monthlyRevenue],
        ]
      : [
          ["Revenue Type", "Amount"],
          ["No Revenue", 1],
        ]; // placeholder slice

  const options = {
    pieHole: 0,
    colors: totalRevenue > 0 ? ["#2563eb", "#00008b"] : ["#2563eb"], // single color for placeholder
    legend: "none",
    pieSliceText: "none",
    tooltip: { text: "value" },
    chartArea: {
      width: "100%",
      height: "100%",
    },
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center ">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-8xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <img src={img.src} alt="" />
          <h2 className="text-lg font-semibold text-gray-700">Revenue Chart</h2>
        </div>

        {/* Revenue Text */}
        <div className="text-center mb-4 ">
          <p className="text-blue-700 font-medium">
            <span className="h-4 w-4 bg-[#00008b] rounded-sm inline-block mr-2"></span>
            Total Revenue{" "}
            <span className="font-bold">${totalRevenue.toLocaleString()}</span>
          </p>
        </div>

        {/* Chart */}
        <div className="flex flex-col items-center">
          <Chart
            chartType="PieChart"
            width="400px"
            height="300px"
            data={data}
            options={options}
          />
          <p className="flex items-center text-[#346de9] font-medium mt-2 gap-2">
            <span className="h-4 w-4 bg-[#346de9] rounded-sm inline-block"></span>
            Monthly Revenue{" "}
            <span className="font-bold ml-1">
              ${monthlyRevenue.toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardChart;
