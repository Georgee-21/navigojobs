import React, { useEffect, useState } from "react";
import "./ConsoleBar.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function ConsoleBar() {
  const [time, setTime] = useState(new Date());
  const { t } = useLanguage();

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const gmt = time.toLocaleTimeString("en-GB", {
    hour12: false,
    timeZone: "UTC",
  });

  return (
    <div className="nj-console nj-mono">
      <div className="nj-console-item">
        <span className="nj-dot" />
        <span>GMT {gmt}</span>
      </div>
      <div className="nj-console-item">
        <span>{t.consoleBar.location}</span>
      </div>
      <div className="nj-console-item">
        <span>{t.consoleBar.stats}</span>
      </div>
    </div>
  );
}
