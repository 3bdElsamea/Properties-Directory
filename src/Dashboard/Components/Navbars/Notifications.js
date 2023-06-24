import React, { useState, useEffect } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { AxiosDashboard } from "../../../Axios";
import "./Notifications.css"; // Import custom CSS file for styling
import Pusher from "pusher-js";
import { ReactNotifications, Store} from "react-notifications-component";

const NotificationIcon = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState();

  const fetchNotifications = () => {
    //console.log(process.env.PUSHER_APP_KEY);
    // Get the JWT from the client-side storage
    const jwt = localStorage.getItem("jwt");
    AxiosDashboard.get("/notifications", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => {
        setNotifications(response?.data.notifications);
        setUnreadCount(response?.data.unread_notifications);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const markNotificationAsRead = (notificationId) => {
    // Get the JWT from the client-side storage
    //update with id of notification to mark as read
    const response = AxiosDashboard.patch(`/notifications/${notificationId}`, {
      //update with id of notification to mark as read
      is_read: 1,
    })
      .then((response) => {
        console.log(response);
        fetchNotifications();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //pusher
  //pusher
  const pusher = new Pusher("fb1c526a7f07ebcc0179", {
    cluster: "eu",
  });

  const channel = pusher.subscribe("property-request");

  useEffect(() => {
    fetchNotifications();
    channel.bind("new-request", function (data) {
      console.log("data", data);
      Store.addNotification({
        title: data.title,
        message: data.message,
        type: "warning",
        insert: "top",
        container: "bottom-left",
        // animationIn: ["animate__animated", "animate__fadeIn"],
        // animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 100000,
          onScreen: true,
        },
      });
      fetchNotifications();
    });
  }, []);

  return (
    
    <>    
      <UncontrolledDropdown nav className="notification-icon-dropdown">
        <DropdownToggle nav className="nav-link-icon">
          <i
            className={`fas fa-bell text-white ${
              unreadCount !== 0 ? "fa-beat-fade" : ""
            }`}
          >
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <DropdownItem
                key={index}
                onClick={() => markNotificationAsRead(notification.id)}
                className={notification.is_read ? "notification-read" : ""}
              >
                <div className="notification-item">
                  <div className="notification-content">
                    <p className="notification-text">{notification.message}</p>
                    <span className="notification-time">
                      {new Date(notification.created_at).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }
                      )}
                    </span>
                  </div>
                </div>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem>
              <p>No notifications</p>
            </DropdownItem>
          )}
          <DropdownItem divider />
        </DropdownMenu>
        <ReactNotifications/>
      </UncontrolledDropdown>
    </>


  );
};

export default NotificationIcon;
