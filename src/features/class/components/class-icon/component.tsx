import { ClassID } from "../../../../models";
import React from "react";

export enum IconSize {
  Small = "12px",
  Medium = "24px",
  Large = "60px",
  Full = "120px",
}

export interface PublicProps {
  classID: ClassID;
  size: IconSize;
}

type Props = PublicProps;

export const ClassIcon: React.FC<Props> = ({ classID, size }) => {
  const classIconURL = `/classes/${classID}/icon.png`;

  return <img src={classIconURL} alt={classID} height={size} width={size} />;
};
