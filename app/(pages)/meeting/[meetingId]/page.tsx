"use client";

import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    meetingId: string;
  };
}

export default function Page({ params }: PageProps) {
  const { meetingId } = params;
  const { user } = useSelector((state: any) => state.auth);
  const elementRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const myMeeting = async () => {
      const appID = 1812045985;
      const serverSecret = "1b4292e3cdaff717f4d0a0f3e19bf09a";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        meetingId,
        user?._id,
        user?.name
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      if (elementRef.current) {
        zc.joinRoom({
          container: elementRef.current,
          sharedLinks: [{
            name: "Copy Link",
            url: `http://localhost:3000/meeting/${meetingId}`
          }],
          onLeaveRoom: () => router.push("/appointment"),
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
        });
      }
    };

    myMeeting();
  }, [meetingId, user]);

  return <div ref={elementRef} style={{ width: '100vw', height: '100vh' }}></div>;
}
