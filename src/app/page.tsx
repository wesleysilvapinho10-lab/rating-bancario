"use client";

import { useState } from "react";
import LeadForm from "@/components/LeadForm";
import RatingLandingPage from "@/components/RatingLandingPage";
import type { Lead } from "@/types/lead";

type Screen = "form" | "landing";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("form");
  const [lead, setLead] = useState<Lead | null>(null);

  function handleSuccess(savedLead: Lead) {
    setLead(savedLead);
    setScreen("landing");
  }

  if (screen === "landing" && lead) {
    return <RatingLandingPage lead={lead} />;
  }

  return <LeadForm onSuccess={handleSuccess} />;
}
