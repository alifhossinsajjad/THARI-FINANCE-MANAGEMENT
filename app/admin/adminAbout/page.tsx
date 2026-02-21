"use client";
import { useCreateAboutContentMutation } from "@/Redux/features/AdminDashboard/adminAboutApi/adminAboutApi";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

export default function AdminAboutPage() {
  const [createAboutContent, { isLoading }] = useCreateAboutContentMutation();
  const [description, setDescription] = useState("");
  const [ourMission, setOurMission] = useState<string[]>([""]);
  const [ourVision, setOurVision] = useState<string[]>([""]);
  const [video, setVideo] = useState<File | null>(null);

  const handleMissionChange = (index: number, value: string) => {
    const newMissions = [...ourMission];
    newMissions[index] = value;
    setOurMission(newMissions);
  };

  const handleVisionChange = (index: number, value: string) => {
    const newVisions = [...ourVision];
    newVisions[index] = value;
    setOurVision(newVisions);
  };

  const addMission = () => setOurMission([...ourMission, ""]);
  const addVision = () => setOurVision([...ourVision, ""]);
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData();

  //     // description
  //     formData.append("description", description);

  //     // send as REAL array (one field)
  //     formData.append(
  //       "our_mission",
  //       JSON.stringify(ourMission.filter((m) => m.trim() !== "")),
  //     );

  //     formData.append(
  //       "our_vision",
  //       JSON.stringify(ourVision.filter((v) => v.trim() !== "")),
  //     );

  //     // video
  //     if (video) {
  //       formData.append("video", video);
  //     }

  //     const res = await createAboutContent(formData).unwrap();
  //     console.log("Success:", res);
  //   } catch (error) {
  //     console.error("Failed:", error);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("description", description);

      //  REAL ARRAY (backend will receive array)
      ourMission
        .filter((m) => m.trim() !== "")
        .forEach((m) => {
          formData.append("our_mission[]", m);
        });

      ourVision
        .filter((v) => v.trim() !== "")
        .forEach((v) => {
          formData.append("our_vision[]", v);
        });

      if (video) {
        formData.append("video", video);
      }

      const res = await createAboutContent(formData).unwrap();

      // 🔥 Show toast based on backend response
      if (res?.success) {
        toast.success(res.message || "Saved successfully");
        // 🧹 CLEAR ALL FORM INPUTS AFTER SUCCESS
        setDescription("");
        setOurMission([""]); // reset to one empty input
        setOurVision([""]); // reset to one empty input
        setVideo(null);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error: any) {
      // RTK Query error handling (important)
      const errorMessage =
        error?.data?.message || error?.message || "Failed to save about page";

      toast.error(errorMessage);
      console.error("Failed:", error);
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-100 text-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#00008B" }}>
        Admin About Page
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="We are a halal finance company"
            rows={4}
          />
        </div>

        {/* Our Mission */}
        <div>
          <label className="block mb-2 font-medium">Our Mission</label>
          {ourMission.map((mission, idx) => (
            <input
              key={idx}
              type="text"
              className="w-full p-3 rounded mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition"
              value={mission}
              onChange={(e) => handleMissionChange(idx, e.target.value)}
              placeholder="Quality service"
            />
          ))}
          <button
            type="button"
            className="text-[#00008B] hover:underline font-medium"
            onClick={addMission}
          >
            + Add Mission
          </button>
        </div>

        {/* Our Vision */}
        <div>
          <label className="block mb-2 font-medium">Our Vision</label>
          {ourVision.map((vision, idx) => (
            <input
              key={idx}
              type="text"
              className="w-full p-3 rounded mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition"
              value={vision}
              onChange={(e) => handleVisionChange(idx, e.target.value)}
              placeholder="Global leadership"
            />
          ))}
          <button
            type="button"
            className="text-[#00008B] hover:underline font-medium"
            onClick={addVision}
          >
            + Add Vision
          </button>
        </div>

        {/* Video Upload */}
        <div>
          <label className="block mb-2 font-medium">Video Upload</label>

          <div
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#00008B] transition group"
            onClick={() => document.getElementById("videoInput")?.click()}
          >
            {!video ? (
              <>
                <svg
                  className="w-12 h-12 mb-2 text-gray-400 group-hover:text-[#00008B] transition"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M4 12V8a2 2 0 012-2h12a2 2 0 012 2v4M12 3v12"
                  />
                </svg>
                <p className="text-gray-500 mb-1 text-center">
                  Drag and drop your video here or click to select
                </p>
                <p className="text-gray-400 text-sm text-center">
                  Supported format: MP4, AVI, MOV
                </p>
              </>
            ) : (
              <div className="w-full">
                <video
                  src={URL.createObjectURL(video)}
                  controls
                  className="w-full rounded-lg"
                />
                <button
                  type="button"
                  className="mt-2 text-[#00008B] hover:underline font-medium"
                  onClick={() => setVideo(null)}
                >
                  Remove Video
                </button>
              </div>
            )}

            <input
              id="videoInput"
              type="file"
              accept="video/*"
              onChange={(e) =>
                setVideo(e.target.files ? e.target.files[0] : null)
              }
              className="hidden"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 bg-[#00008B] text-white font-bold py-3 px-6 rounded hover:bg-blue-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <BeatLoader size={8} color="#fff" /> Saving...
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
