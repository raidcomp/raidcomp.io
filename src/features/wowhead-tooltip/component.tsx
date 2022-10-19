import { ExpansionID } from "../../models";

export interface PublicProps {
  expansion: ExpansionID;
  spellID?: string;
  questID?: string;
  itemID?: string;
  achievementID?: string;
  href?: string;
  children?: React.ReactElement | string;

  // Renames to tooltip name if set to true
  rename?: boolean;
}

const buildWowheadURL = (
  expansion: ExpansionID,
  spellID?: string,
  questID?: string,
  itemID?: string,
  achievementID?: string
): string => {
  let urlSubdomain: string | undefined;
  switch (expansion) {
    case ExpansionID.Classic:
      urlSubdomain = "classic.";
      break;
    case ExpansionID.BurningCrusade:
      urlSubdomain = "tbc.";
      break;
    case ExpansionID.WrathOfTheLichKing:
      urlSubdomain = "wotlk.";
      break;
    case ExpansionID.Shadowlands:
      urlSubdomain = "www.";
      break;
    default:
      throw new Error(`Expansion ${expansion} not supported`);
  }

  let urlSuffix = "";
  if (spellID) {
    urlSuffix = `/spell=${spellID}`;
  } else if (questID) {
    urlSuffix = `/quest=${questID}`;
  } else if (itemID) {
    urlSuffix = `/item=${itemID}`;
  } else if (achievementID) {
    urlSuffix = `/achievement=${achievementID}`;
  } else {
    throw new Error(`No valid item provided`);
  }

  return `https://${urlSubdomain}wowhead.com${urlSuffix}`;
};

export const WowheadTooltip: React.FC<PublicProps> = ({
  children,
  expansion,
  spellID,
  questID,
  itemID,
  achievementID,
  href,
  rename = false,
}) => {
  const wowheadURL = buildWowheadURL(
    expansion,
    spellID,
    questID,
    itemID,
    achievementID
  );

  if (!href) {
    return (
      <a href={wowheadURL} data-wh-rename-link={rename}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} data-wowhead={wowheadURL} data-wh-rename-link={rename}>
      {children}
    </a>
  );
};
