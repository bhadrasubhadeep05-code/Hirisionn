export const EMAIL_CATEGORIES = [
  "Tier 1",
  "Tier 2",
  "Other",
];

export const TIER_1_SUBCATEGORIES = [
  "Placement Drive",
  "Campus Recruitment",
  "Job Opportunity",
  "Placement Registration",
];

export const TIER_2_SUBCATEGORIES = [
  "Internship",
  "Company Visit",
  "Interview",
  "Assessment",
];

export const getSubcategoriesForCategory = (category) => {
  if (category === "Tier 1") return TIER_1_SUBCATEGORIES;
  if (category === "Tier 2") return TIER_2_SUBCATEGORIES;
  return [];
};

export const getCategoryBadgeStyle = (category) => {
  switch (category) {
    case "Tier 1":
      return {
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        border: "border-indigo-200",
        dot: "bg-indigo-500",
        gradient: "from-indigo-600 to-indigo-700",
      };
    case "Tier 2":
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
        gradient: "from-emerald-600 to-emerald-700",
      };
    case "Other":
    default:
      return {
        bg: "bg-slate-100",
        text: "text-slate-700",
        border: "border-slate-200",
        dot: "bg-slate-400",
        gradient: "from-slate-600 to-slate-700",
      };
  }
};
