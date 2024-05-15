import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { Calendar } from "@/components/ui/calendar";
import InputField from "../common/InputField";
import Button from "../common/Button";

import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { addAppointment } from "../../app/redux/features/appointments/appointmentSlice";

interface AppointmentDrawerProps {
  therapistId: string,
  onClose: () => void;
}

const AppointmentDrawer: React.FC<AppointmentDrawerProps> = ({ therapistId, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state: any) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const hoursArray = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleHourClick = (hour: string) => {
    setSelectedHour(hour);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    var dateTime;
    if (date && selectedHour) {
      const [hour, minute, period] = selectedHour.split(/:| /);
      let hour24 = parseInt(hour);
      if (period === "PM" && hour24 !== 12) {
        hour24 += 12;
      } else if (period === "AM" && hour24 === 12) {
        hour24 = 0; // Midnight is 0 in 24-hour format
      }
      dateTime = new Date(date);
      dateTime.setHours(hour24);
      dateTime.setMinutes(parseInt(minute || "0"));
    }

    const payload = {
      userId: user?._id,
      therapistId: therapistId,
      dateTime: dateTime
    }

    router.push(`/payment/?therapistId=${therapistId}`)

    dispatch(addAppointment(payload));
    // Reset form fields
    setName("");
    setEmail("");
    setPhoneNumber("");
    onClose();
  };

  return (
    <div className="relative">
      <div className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-black opacity-50"></div>
      <div className="fixed top-0 right-0 bottom-0 z-50 w-[40%] p-8 shadow-sm bg-white">
        <div className="rounded-full drop-shadow-md p-1 bg-white absolute">
          <RxCross2 onClick={onClose} size={25} className="cursor-pointer" />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Book Appointment
        </h2>

        <div className="flex flex-col gap-5 mt-10">
          <h1 className="text-main font-semibold text-2xl">Schedule</h1>
          <div className="flex gap-10 items-center justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />

            <div className="flex gap-4 flex-wrap">
              {hoursArray.map((hour, index) => (
                <div
                  key={index}
                  onClick={() => handleHourClick(hour)}
                  className={`border-gray-300 border-[1px] w-[7rem] p-2 text-center rounded-lg cursor-pointer hover:bg-gray-100 ${
                    selectedHour === hour ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {hour}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-main font-semibold text-2xl">
              Personal Details
            </h1>
            <p className="text-faded">
              We share this information with the therapist only.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-5"
          >
            <InputField
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <div className="self-center">
              <Button type="submit" variant="primary">
                Proceed to Payment
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDrawer;
