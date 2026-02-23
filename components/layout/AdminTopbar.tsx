// "use client";

// import React from "react";
// import { Bell } from "lucide-react";

// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "@/Redux/features/auth/authSlice";
// import { useGetAdminProfileInfoQuery } from "@/Redux/features/AdminDashboard/adminProfile/adminProfileApi";

// const AdminTopbar: React.FC = () => {
//   const user = useSelector(selectCurrentUser);
//   // console.log(user);
//   const { data } = useGetAdminProfileInfoQuery({});
//   console.log(data);
//   const userr = data?.data;
//   const handleNotificationClick = (): void => {
//     console.log("Notification clicked");
//   };

//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
//       <div className="flex items-center justify-between px-4 lg:px-8 py-4">
//         <div className="flex-1 lg:flex-none"></div>

//         <div className="flex items-center gap-4">
//           <button
//             className="relative p-2 text-gray-600 hover:text-gray-900"
//             onClick={handleNotificationClick}
//             aria-label="Notifications"
//             type="button"
//           >
//             <Bell size={20} />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>

//           <div className="flex items-center gap-3">
//             <div className="text-right hidden sm:block">
//               <div className="text-sm font-semibold text-gray-900">
//                 {" "}
//                 <span>{user?.role}</span>
//               </div>
//               <div className="text-xs text-gray-500">
//                 {user?.plan_name || "---"}
//               </div>
//             </div>
//             <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
//               <span>{userr?.name?.charAt(0)}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AdminTopbar;
"use client";

import React, { useState, useRef, useEffect } from "react";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { useGetAdminProfileInfoQuery } from "@/Redux/features/AdminDashboard/adminProfile/adminProfileApi";
import {
  useGetAllMessageNotificationQuery,
  useMarkNotificationReadMutation,
} from "@/Redux/features/AdminDashboard/Communications/adminCommunicationsApi";

const AdminTopbar: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const { data } = useGetAdminProfileInfoQuery({});
  const userr = data?.data;

  // notifications
  const { data: notifications, refetch } = useGetAllMessageNotificationQuery(
    {},
  );
  console.log("iam the notification ", notifications);
  const [markNotificationRead] = useMarkNotificationReadMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [localReadIds, setLocalReadIds] = useState<number[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // const handleNotificationClick = () => setIsOpen((prev) => !prev);

  const handleNotifItemClick = async (notifId: number) => {
    if (!localReadIds.includes(notifId)) {
      setLocalReadIds((prev) => [...prev, notifId]); // mark locally as read
      try {
        await markNotificationRead(notifId); // call API
        refetch(); // refresh notifications count
      } catch (err) {
        console.error("Failed to mark notification as read", err);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <div className="flex-1 lg:flex-none"></div>

        <div className="flex items-center gap-4 relative">
          {/* Notification Bell */}
          {/* <button
            className="relative p-2 text-gray-600 hover:text-gray-900"
            onClick={handleNotificationClick}
            aria-label="Notifications"
            type="button"
          >
            <Bell size={20} />
            {notifications?.count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-5 px-1.5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                {notifications.count}
              </span>
            )}
          </button> */}

          {/* Dropdown */}
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-11 right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-50"
            >
              <div className="p-2 text-sm font-semibold border-b border-gray-100">
                Notifications ({notifications?.count || 0})
              </div>

              <div
                className={`overflow-y-auto transition-all duration-300 ${
                  isExpanded ? "max-h-[500px]" : "max-h-60"
                }`}
              >
                {notifications?.data?.length ? (
                  notifications.data.map((notif: any) => {
                    const isUnread =
                      notif.is_read === 0 && !localReadIds.includes(notif.id);

                    return (
                      <div
                        key={notif.id}
                        className={`p-2 cursor-pointer hover:bg-gray-50 flex items-start gap-2 ${
                          isUnread
                            ? "bg-gray-50 font-semibold"
                            : "bg-white font-normal"
                        }`}
                        onClick={() => handleNotifItemClick(notif.id)}
                      >
                        {/* Optional unread dot */}
                        {isUnread && (
                          <span className="w-2 h-2 mt-2 bg-red-500 rounded-full"></span>
                        )}

                        <div>
                          <div className="text-sm">{notif.message.text}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {notif.message.sender.name} •{" "}
                            {new Date(notif.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-2 text-sm text-gray-500">
                    No notifications
                  </div>
                )}
              </div>

              {/* View all / Collapse */}
              {notifications?.data?.length > 0 && (
                <div
                  className="p-2 text-center text-xs text-gray-500 border-t border-gray-100 cursor-pointer hover:bg-gray-50"
                  onClick={() => setIsExpanded((prev) => !prev)}
                >
                  {isExpanded ? "Collapse" : "View all"}
                </div>
              )}
            </div>
          )}

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-gray-900">
                <span>{user?.role}</span>
              </div>
              <div className="text-xs text-gray-500">
                {user?.plan_name || "---"}
              </div>
            </div>
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
              <span>{userr?.name?.charAt(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
