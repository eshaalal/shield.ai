const mockIncidents = [
  {
    id: 1,
    title: "Unauthorized Data Access in AI Model",
    description:
      "AI system accessed and processed sensitive user data without proper authorization. The system was able to retrieve information from restricted databases.",
    severity: "High",
    reported_at: "2023-11-15T08:30:00Z",
  },
  {
    id: 2,
    title: "Biased Output in Recommendation System",
    description:
      "The recommendation algorithm showed significant bias against certain demographic groups, leading to unfair treatment in content delivery.",
    severity: "Medium",
    reported_at: "2023-11-10T14:45:00Z",
  },
  {
    id: 3,
    title: "Unexpected System Shutdown",
    description:
      "AI system unexpectedly shut down during critical operations, causing minor disruption to services. No data loss occurred.",
    severity: "Low",
    reported_at: "2023-11-05T11:20:00Z",
  },
  {
    id: 4,
    title: "Hallucination in Medical Diagnosis",
    description:
      "AI medical assistant provided completely fabricated medical information that could have led to harmful treatment decisions if not caught by human review.",
    severity: "High",
    reported_at: "2023-11-02T09:15:00Z",
  },
  {
    id: 5,
    title: "Privacy Leak in Conversation Model",
    description:
      "Conversational AI inadvertently revealed private information from previous user interactions in responses to new users.",
    severity: "High",
    reported_at: "2023-10-28T16:40:00Z",
  },
  {
    id: 6,
    title: "Misleading Content Generation",
    description:
      "Content generation system produced misleading information about historical events that appeared factual but contained subtle inaccuracies.",
    severity: "Medium",
    reported_at: "2023-10-25T13:10:00Z",
  },
  {
    id: 7,
    title: "Minor Performance Degradation",
    description:
      "AI system showed slight performance degradation after latest update, affecting response time but not accuracy.",
    severity: "Low",
    reported_at: "2023-10-20T10:30:00Z",
  },
]

export default mockIncidents
