import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject, getFeedback } from "../../store/slices/studentSlice";
import { AlertTriangle, BadgeCheck, MessageCircle } from "lucide-react";


const FeedbackPage = () => {
  const dispatch = useDispatch();
  const { project, feedback } = useSelector((state) => state.student);


  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);


  useEffect(() => {
    if (project?._id) {
      dispatch(getFeedback(project._id));
    }
  }, [dispatch, project]);


  const getFeedbackIcon = (type) => {
    if (type === "positive") {
      return <BadgeCheck className="w-6 h-6 text-[#00e560]" />;
    }
    if (type === "negative") {
      return <AlertTriangle className="w-6 h-6 text-[#f47373]" />;
    }
    return <MessageCircle className="w-6 h-6 text-[#00e560]" />;
  };


  const feedbackStats = [
    {
      type: "general",
      title: "Total Feedback",
      iconBg: "bg-[rgba(0,229,96,0.12)]",
      border: "border-[rgba(0,229,96,0.25)]",
      getCount: (feedback) => feedback?.length || 0,
    },
    {
      type: "positive",
      title: "Positive",
      iconBg: "bg-[rgba(0,229,96,0.12)]",
      border: "border-[rgba(0,229,96,0.25)]",
      getCount: (feedback) =>
        feedback.filter((f) => f.type === "positive").length,
    },
    {
      type: "negative",
      title: "Needs Revision",
      iconBg: "bg-[rgba(244,115,115,0.12)]",
      border: "border-[rgba(244,115,115,0.2)]",
      getCount: (feedback) =>
        feedback.filter((f) => f.type === "negative").length,
    },
  ];


  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Supervisor Feedback</h1>
          <p className="card-subtitle">
            View feedback and comments from your supervisor
          </p>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {feedbackStats.map((item, i) => (
          <div key={i} className={`card ${item.border}`}>
            <div className="flex items-center">
              <div className={`p-2 ${item.iconBg} rounded-lg`}>
                {getFeedbackIcon(item.type)}
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-[#5a8a72]">
                  {item.title}
                </p>
                <p className="text-xl font-bold text-[#c8f5e0] mt-0.5">
                  {item.getCount(feedback)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="space-y-4">
        {feedback && feedback.length > 0 ? (
          feedback.map((f, i) => (
            <div key={i} className="card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getFeedbackIcon(f.type)}
                    <h3 className="font-medium text-[#c8f5e0] text-sm">
                      {f.title || "Feedback"}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#7ab898]">
                    {new Date(f.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-[#5a8a72] mt-0.5">
                    {f.supervisorName || "Supervisor"}
                  </p>
                </div>
              </div>


              <div className="bg-[#0c1210] rounded-xl p-3 border border-[rgba(0,229,96,0.1)]">
                <p className="text-[#7ab898] text-sm leading-relaxed">
                  {f.message}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="w-16 h-16 text-[#2a5a42] mx-auto mb-4" />
            <p className="text-[#5a8a72] text-sm">No feedback received yet</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default FeedbackPage;





