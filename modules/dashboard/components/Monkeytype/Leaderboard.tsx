import { useTranslations } from "next-intl";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { convertToOrdinal } from "@/common/helpers";
import { MonkeytypeData } from "@/common/types/monkeytype";

interface LeaderboardProps {
  data: MonkeytypeData;
}

interface ItemProps {
  label: string;
  value: string;
  percent?: string;
}

const Leaderboard = ({ data }: LeaderboardProps) => {
  const t = useTranslations("DashboardPage.monkeytype");

  const timeData = data?.allTimeLbs?.time || {};

  const leaderboardItems = [
    { seconds: 15, data: timeData["15"] },
    { seconds: 60, data: timeData["60"] }
  ];

  const Item = ({ label, value, percent }: ItemProps) => {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end gap-y-0.5">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {label} {t("unit_seconds")}
          </span>
          {percent ? (
            <span className="text-xs text-neutral-600 dark:text-neutral-400">
              {t("top")} {percent}%
            </span>
          ) : null}
        </div>
        <span className="text-2xl text-green-600">{value}</span>
      </div>
    );
  };

  return (
    <SpotlightCard className="flex flex-col items-center justify-between gap-y-3 p-4 sm:flex-row sm:gap-y-1">
      <span className="text-sm text-neutral-600 dark:text-neutral-400">
        {t("title_leaderboard")}
      </span>
      {leaderboardItems.map((item, index) => {
        const lbData = item.data;
        const hasData = lbData && Object.keys(lbData).length > 0;

        if (!hasData) {
          return (
            <Item
              key={index}
              label={item.seconds.toString()}
              value="-"
            />
          );
        }

        const englishData = lbData.english;
        const rank = englishData?.rank;
        const count = englishData?.count;

        const isValidData = rank && count && typeof rank === 'number' && typeof count === 'number';

        const percent = isValidData ? ((rank / count) * 100).toFixed(2) : undefined;
        const ordinalValue = isValidData ? convertToOrdinal(rank) : "-";

        return (
          <Item
            key={index}
            label={item.seconds.toString()}
            value={ordinalValue}
            percent={percent}
          />
        );
      })}
    </SpotlightCard>
  );
};

export default Leaderboard;