import React, { useState } from "react";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationCell, type NotificationAction } from "./NotificationCell";

interface Notification {
  id: string;
  content: string | React.ReactNode;
  avatar?: string;
  timestamp: string;
  isUnread: boolean;
  actions?: NotificationAction[];
}

export const NotificationFeed: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      content: "Congrats!! your withdrawal request is approved by Connection",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/91042937f4fa8770316b1a735e099c9f542cb8c8?placeholderIfAbsent=true",
      timestamp: "Today at 9:42 AM",
      isUnread: true,
      actions: [
        {
          label: "Know more",
          onClick: () => console.log("Know more clicked"),
          variant: "primary",
        },
        {
          label: "Mark as read",
          onClick: () => handleMarkAsRead("1"),
          variant: "secondary",
        },
      ],
    },
    {
      id: "2",
      content: "Ray Arnold Joined from your referral code",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/81be0d0b806cdee3fc1284615994d6052493693f?placeholderIfAbsent=true",
      timestamp: "Last Wednesday at 9:42 AM",
      isUnread: true,
    },
    {
      id: "3",
      content: "John Hammond Joined from your referral code",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/ab827a1fdaa914938e38fee79860c7a9cf81310b?placeholderIfAbsent=true",
      timestamp: "Last Wednesday at 9:42 AM",
      isUnread: false,
    },
    {
      id: "4",
      content:
        "Your products have been approved and listed on Connection successfully",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/fa18addfe4e347b226b45c5d441b7a55451f887a?placeholderIfAbsent=true",
      timestamp: "Last Wednesday at 9:42 AM",
      isUnread: false,
      actions: [
        {
          label: "Add more products",
          onClick: () => console.log("Add more products clicked"),
          variant: "secondary",
          icon: "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/ab1a3a151a4bc3be0995f3de56a9743e026a3ab6?placeholderIfAbsent=true",
        },
      ],
    },
    {
      id: "5",
      content: (
        <>
          <span className="font-semibold">Password updated </span>
          <span className="font-normal">successfully</span>
        </>
      ),
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/1181759ccea1a63b25ba32d98c2bf7f549784f80?placeholderIfAbsent=true",
      timestamp: "Last Wednesday at 9:42 AM",
      isUnread: false,
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications(
      notifications.map((notif) => ({
        ...notif,
        isUnread: false,
      })),
    );
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isUnread: false } : notif,
      ),
    );
  };

  return (
    <div className="shadow-[0px_5px_15px_0px_rgba(0,0,0,0.20)] bg-white w-[440px] max-w-full overflow-hidden rounded-xl absolute top-26 right-5 z-10 max-h-[500px] overflow-y-scroll ">
      <NotificationHeader onMarkAllRead={handleMarkAllRead} />
      <div className="w-full">
        <NotificationCell
        key={1}
        avatar="/logo.svg"
        content="No new notification"
        timestamp=""
        isUnread={false}
        />
        {/* {notifications.map((notification) => (
          <NotificationCell
            key={notification.id}
            avatar={notification.avatar}
            content={notification.content}
            timestamp={notification.timestamp}
            isUnread={notification.isUnread}
            actions={notification.actions}
          />
        ))} */}
      </div>
    </div>
  );
};
