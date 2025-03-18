import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";

import CustomModal from "../modal/custom-modal/CustomModal";
import RoomSheduleModal from "../modal/modal-content/roomshedule-modal/RoomSheduleModal";
import "./roomshedule.css";
import Layout from "../modal/modal-layout/Layout";

const RoomShedule = () => {
  const doctorsList = ["Dr John", "Dr Sulaiman", "Dr Smith"];

  const [assignedDoctors, setAssignedDoctors] = useState({
    Sunday: {
      "room1-9am-1pm": "",
      "room1-2pm-3pm": "",
      "room1-5pm-6pm": "",
      "room2-9am-1pm": "",
      "room2-2pm-3pm": "",
      "room2-5pm-6pm": "",
    },
    Monday: {
      "room1-9am-1pm": "",
      "room1-2pm-3pm": "",
      "room1-5pm-6pm": "",
      "room2-9am-1pm": "",
      "room2-2pm-3pm": "",
      "room2-5pm-6pm": "",
    },
    Wednesday: {
      "room1-9am-1pm": "",
      "room1-2pm-3pm": "",
      "room1-5pm-6pm": "",
      "room2-9am-1pm": "",
      "room2-2pm-3pm": "",
      "room2-5pm-6pm": "",
    },
    Thursday: {
      "room1-9am-1pm": "",
      "room1-2pm-3pm": "",
      "room1-5pm-6pm": "",
      "room2-9am-1pm": "",
      "room2-2pm-3pm": "",
      "room2-5pm-6pm": "",
    },
    Friday: {
      "room1-9am-1pm": "",
      "room1-2pm-3pm": "",
      "room1-5pm-6pm": "",
      "room2-9am-1pm": "",
      "room2-2pm-3pm": "",
      "room2-5pm-6pm": "",
    },
  });

  const handleDoctorSave = (selectedDoctor, day, timeSlot) => {
    setAssignedDoctors((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeSlot]: selectedDoctor,
      },
    }));
  };

  const handleRemoveDoctor = (day, timeSlot) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove the assigned doctor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9575DE",
      cancelButtonColor: "#6D7781",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAssignedDoctors((prev) => ({
          ...prev,
          [day]: {
            ...prev[day],
            [timeSlot]: "",
          },
        }));
      }
    });
  };

  const addDoctor = (day, timeSlot) => {
    CustomModal({
      title: <Layout label={"Add Doctor"} />,
      content: (
        <RoomSheduleModal
          onSave={(selectedDoctor) =>
            handleDoctorSave(selectedDoctor, day, timeSlot)
          }
          onClose={() => {}}
          doctorsList={doctorsList}
        />
      ),
      width: "400px",
    });
  };

  return (
    <div>
      <div className="room-shedule">
        <div className="room-shedule-head">
          <div className="head">
            <div className="empty"></div>
            <div className="old-building">Old Building</div>
            <div className="new-building">New Building</div>
          </div>
          <div className="sub-head">
            <div className="empty"></div>
            <div className="rooms-head">Room 1</div>
            <div className="rooms-head">Room 1</div>
            <div className="rooms-head">Room 2</div>
          </div>

          {/* Display time slots for each day */}
          {Object.keys(assignedDoctors).map((day) => (
            <div key={day} className="day-section">
              <div className="day">
                <p>{day}</p>
                <p></p>
                <p></p>
                <p></p>
              </div>
              <div className="table-parent">
                {/* Room 1 */}
                <div className="room1">
                  <p>9am-1pm</p>
                  <p
                    onClick={() => {
                      if (!assignedDoctors[day]["room1-9am-1pm"]) {
                        addDoctor(day, "room1-9am-1pm");
                      }
                    }}
                    className={
                      assignedDoctors[day]["room1-9am-1pm"]
                        ? "greeen"
                        : "yellow"
                    }
                  >
                    {assignedDoctors[day]["room1-9am-1pm"] && (
                      <>
                        {assignedDoctors[day]["room1-9am-1pm"]}
                        <IoMdClose
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            handleRemoveDoctor(day, "room1-9am-1pm");
                          }}
                        />
                      </>
                    )}
                  </p>
                  <p
                    onClick={() => {
                      if (!assignedDoctors[day]["room1-2pm-3pm"]) {
                        addDoctor(day, "room1-2pm-3pm");
                      }
                    }}
                    className={
                      assignedDoctors[day]["room1-2pm-3pm"]
                        ? "greeen"
                        : "yellow"
                    }
                  >
                    {assignedDoctors[day]["room1-2pm-3pm"] && (
                      <>
                        {assignedDoctors[day]["room1-2pm-3pm"]}
                        <IoMdClose
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            handleRemoveDoctor(day, "room1-2pm-3pm");
                          }}
                        />
                      </>
                    )}
                  </p>
                  <p
                    onClick={() => {
                      if (!assignedDoctors[day]["room1-5pm-6pm"]) {
                        addDoctor(day, "room1-5pm-6pm");
                      }
                    }}
                    className={
                      assignedDoctors[day]["room1-5pm-6pm"]
                        ? "greeen"
                        : "yellow"
                    }
                  >
                    {assignedDoctors[day]["room1-5pm-6pm"] && (
                      <>
                        {assignedDoctors[day]["room1-5pm-6pm"]}
                        <IoMdClose
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            handleRemoveDoctor(day, "room1-5pm-6pm");
                          }}
                        />
                      </>
                    )}
                  </p>
                </div>

                {/* Room 2 */}
                <div className="room2">
                  <p>2pm-3pm</p>
                  <p
                    onClick={() => {
                      if (!assignedDoctors[day]["room2-9am-1pm"]) {
                        addDoctor(day, "room2-9am-1pm");
                      }
                    }}
                    className={
                      assignedDoctors[day]["room2-9am-1pm"]
                        ? "greeen"
                        : "yellow"
                    }
                  >
                    {assignedDoctors[day]["room2-9am-1pm"] && (
                      <>
                        {assignedDoctors[day]["room2-9am-1pm"]}
                        <IoMdClose
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            handleRemoveDoctor(day, "room2-9am-1pm");
                          }}
                        />
                      </>
                    )}
                  </p>
                  <p
                    onClick={() => {
                      if (!assignedDoctors[day]["room2-2pm-3pm"]) {
                        addDoctor(day, "room2-2pm-3pm");
                      }
                    }}
                    className={
                      assignedDoctors[day]["room2-2pm-3pm"]
                        ? "greeen"
                        : "yellow"
                    }
                  >
                    {assignedDoctors[day]["room2-2pm-3pm"] && (
                      <>
                        {assignedDoctors[day]["room2-2pm-3pm"]}
                        <IoMdClose
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            handleRemoveDoctor(day, "room2-2pm-3pm");
                          }}
                        />
                      </>
                    )}
                  </p>
                  <p
                    onClick={() => {
                      if (!assignedDoctors[day]["room2-5pm-6pm"]) {
                        addDoctor(day, "room2-5pm-6pm");
                      }
                    }}
                    className={
                      assignedDoctors[day]["room2-5pm-6pm"]
                        ? "greeen"
                        : "yellow"
                    }
                  >
                    {assignedDoctors[day]["room2-5pm-6pm"] && (
                      <>
                        {assignedDoctors[day]["room2-5pm-6pm"]}
                        <IoMdClose
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            handleRemoveDoctor(day, "room2-5pm-6pm");
                          }}
                        />
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomShedule;
