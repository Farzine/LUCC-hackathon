import { useContext, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { DataContext } from "../../../../ContextAPI/DataContext";
import SlotList from "../slots/SlotList";
export interface Slot {
  slot_id: string;
  slot_name: string;
  user_id: string;
  start_time: string; // ISO string
  end_time: string; // ISO string
}

export default function MeetingsPerDay() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    ProfileComponet,
    setProfileComponet,
    MeetingsPerDay,
    setMeetingsPerDay,
  } = useContext(DataContext);

  //   console.log("meeting per day" + JSON.stringify(MeetingsPerDay));

  return (
    <div className="p-10 min-h-screen">
      <div
        onClick={() => setProfileComponet("mymeetings")}
        className="rounded-full flex items-center hover:cursor-pointer"
      >
        <RiArrowLeftSLine className="h-8 w-8" />
        Back
      </div>
      <h1 className="text-3xl font-semibold my-4 ">Meetings</h1>
      <h1 className="my-4">
        Here is the latest update for the{" "}
        <span className="text-customRed">
          {new Date(MeetingsPerDay[0].start_time).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
        . Check now
      </h1>

      <div>
        {loading && <p className="text-gray-600">Loading your slots...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && <SlotList slots={MeetingsPerDay} />}
      </div>
    </div>
  );
}
