"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import TherapistCard from "@/components/appointments/TherapistCard";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import Invoice from "@/components/appointments/Invoice";

import { GoArrowLeft } from "react-icons/go";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getAppointments } from "../../redux/features/appointments/appointmentSlice";
import { getAllTherapists } from "../../redux/features/therapist/therapistSlice";
import ChatIcon from "@/components/chats/ChatIcon";

export default function Page() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);
  const { therapists } = useSelector((state: any) => state.therapists);
  const { appointments, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.appointments
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (user?.isLoggedIn) {
      dispatch(getAppointments(user?._id));
      dispatch(getAllTherapists());
    } else router.push("/auth/login");
  }, [user, isError, isSuccess, message, router, dispatch]);

  return (
    <div>
      <div className="p-3">
        <Navbar />
      </div>
      <div className="w-[92%] mx-auto flex gap-5 mt-[3rem] relative">
        {false ? (
          <>
            <div className="flex gap-3 absolute top-0 left-0">
              <GoArrowLeft size={30} />
              <p className="text-xl font-medium">Back</p>
            </div>

            <div className="w-full flex justify-between mt-10">
              <div className="w-1/2 flex items-center">
                <Invoice
                  doctor="Anees"
                  specialty="Neuro"
                  location="Islamabad"
                  patientName="Muneeb"
                  phoneNumber="0301-5316416"
                  appointmentDate="Monday, OCT 20"
                  appointmentTime="08:00 - 10:00"
                  fee={70}
                />
              </div>

              <div className="w-1/2 px-24 flex flex-col gap-5">
                <h1 className="font-semibold text-3xl">Notes</h1>
                <div className="p-6 border-[1px] border-gray-300 rounded-3xl flex flex-col gap-2">
                  <h1 className="font-semibold text-xl">Precautions</h1>
                  <p className="text-lg text-faded">
                    First published 11th June 2015. Revised and updated 23rd
                    June 2022. First published 11th June 2015. Revised and
                    updated 23rd June 2022. Everyone should have a space First
                    published 11th June 2015. Revised and updated 23rd June
                    2022. Everyone should have a space Everyone should have a
                    space{" "}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-[70%] flex flex-col gap-4">
              <h1 className="text-3xl font-semibold">Appointments</h1>
              <div
                className={`${
                  false ? "flex justify-center items-center p-8" : "p-5"
                } min-h-[20rem] border-[1px] border-gray-300 rounded-3xl`}
              >
                {appointments?.upcoming?.length === 0 &&
                appointments?.history?.length === 0 ? (
                  <p className="text-center">You don’t have any appointment.</p>
                ) : (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-center">
                      <div className="rounded-full p-2 border-gray-300 border-[1px] text-lg">
                        <button
                          className={`${
                            activeTab === "upcoming"
                              ? "bg-deepAqua text-white"
                              : ""
                          } px-5 py-3 rounded-full`}
                          onClick={() => setActiveTab("upcoming")}
                        >
                          Upcoming
                        </button>
                        <button
                          className={`${
                            activeTab === "history"
                              ? "bg-deepAqua text-white"
                              : ""
                          } px-5 py-3 rounded-full`}
                          onClick={() => setActiveTab("history")}
                        >
                          History
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      {activeTab === "upcoming"
                        ? appointments?.upcoming?.map(
                            (appointment: any, index: any) => (
                              <AppointmentCard
                                key={index}
                                therapistID={appointment?.therapistId._id}
                                name={appointment?.therapistId.name}
                                specialty={appointment?.therapistId.specialty}
                                location={appointment?.therapistId.location}
                                rating={4.5}
                                appointmentDate={"Monday, OCT 20"}
                                appointmentTime={"08:00 - 10:00"}
                              />
                            )
                          )
                        : appointments?.history?.map(
                            (appointment: any, index: any) => (
                              <AppointmentCard
                                key={index}
                                therapistID={appointment?.therapistId._id}
                                name={appointment?.therapistId.name}
                                specialty={appointment?.therapistId.specialty}
                                location={appointment?.therapistId.location}
                                rating={4.5}
                                appointmentDate={"Monday, OCT 20"}
                                appointmentTime={"08:00 - 10:00"}
                              />
                            )
                          )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-[30%] flex flex-col gap-4">
              <h1 className="text-3xl font-semibold">Top Therapists</h1>
              {therapists?.map((therapist: any, index: any) => (
                <TherapistCard
                  key={index}
                  therapistId={therapist?._id}
                  name={therapist?.name}
                  specialty={therapist?.specialty}
                  location={therapist?.location}
                  rating={4.5}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <ChatIcon />
    </div>
  );
}
