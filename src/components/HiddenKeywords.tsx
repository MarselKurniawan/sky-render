import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const HiddenKeywords = () => {
  const [keywords, setKeywords] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "hidden_keywords")
        .maybeSingle();
      if (data?.value) setKeywords(data.value);
    };
    fetch();
  }, []);

  if (!keywords) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        fontSize: "1px",
        lineHeight: "1px",
        color: "transparent",
        overflow: "hidden",
        height: "1px",
        width: "1px",
        position: "absolute",
        top: 0,
        left: 0,
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {keywords}
    </div>
  );
};

export default HiddenKeywords;