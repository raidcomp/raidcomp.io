import React, { useCallback, useRef, useState } from "react";
import {
  ExpansionID,
  getExpansion,
  getExpansionID,
  ItemType,
  MAX_RAID_SIZE,
  Player,
  PlayerItem,
  SpecializationRole,
} from "../../models";
import { SpecSelection } from "./components/spec-selection";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Snackbar,
} from "@mui/material";
import { RaidList } from "./components/raid-list";
import { DataList } from "./components/data-list";
import { v4 as uuidv4 } from "uuid";
import { useDrop } from "react-dnd";
import { FormattedMessage } from "react-intl";
import { Close } from "@mui/icons-material";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { decodePlayers, encodePlayers } from "../../utils/encode-decode";

export const RaidCompPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  let { expansionIDString = ExpansionID.Classic } = useParams();
  const expansionID = getExpansionID(expansionIDString);
  const expansion = getExpansion(expansionID);

  const [showClearSnackbar, setShowClearSnackbar] = useState(false);
  const [showCopySnackbar, setShowCopySnackbar] = useState(false);
  const [selectedRole, setSelectedRole] = useState<
    SpecializationRole | undefined
  >();

  const [players, setPlayers] = useState<(Player | undefined)[]>(() => {
    let playersFromQuery: (Player | undefined)[] = [];
    try {
      playersFromQuery = decodePlayers(expansionID, searchParams.get("r"));
    } catch (e) {}

    return [
      ...playersFromQuery,
      ...new Array(MAX_RAID_SIZE - playersFromQuery.length).fill(undefined),
    ];
  });

  // Used for undo functionality
  const savedPlayers = useRef<(Player | undefined)[]>([]);

  const [, dropRef] = useDrop(
    () => ({
      accept: ItemType.Player,
      drop: (item: PlayerItem) => {
        setPlayers([
          ...players.slice(0, item.fromIndex),
          undefined,
          ...players.slice(item.fromIndex + 1),
        ]);
      },
      canDrop: (item, monitor) => {
        return monitor.isOver({ shallow: true });
      },
    }),
    [players, setPlayers]
  );

  const setNewPlayers = useCallback(
    (newPlayers: (Player | undefined)[]) => {
      setPlayers(newPlayers);
      setSearchParams({
        r: encodePlayers(newPlayers),
      });
    },
    [setPlayers, setSearchParams]
  );

  if (expansionID !== ExpansionID.WrathOfTheLichKing) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container p={2} spacing={2} ref={dropRef}>
      <Grid xs={12} md={8} item>
        <SpecSelection
          expansion={expansion}
          onSpecClick={(newSpec) => {
            // Find the first empty spot
            let indexToInsert = players.findIndex((player) => !player);

            if (indexToInsert >= 0) {
              const newPlayer: Player = {
                id: uuidv4(),
                specialization: newSpec,
              };

              // Replace spot
              setNewPlayers([
                ...players.slice(0, indexToInsert),
                newPlayer,
                ...players.slice(indexToInsert + 1),
              ]);
            }
          }}
        />
        <Box pt={1}>
          <RaidList
            players={players}
            role={selectedRole}
            onPlayerRemove={(playerToRemove) => {
              const indexToRemove = players.findIndex(
                (player) => player?.id === playerToRemove.id
              );

              setNewPlayers([
                ...players.slice(0, indexToRemove),
                undefined,
                ...players.slice(indexToRemove + 1),
              ]);
            }}
            onPlayerAdd={(newPlayer, toIndex, fromIndex) => {
              let newPlayers: (Player | undefined)[];
              const playerToSwap = players[toIndex];

              if (fromIndex === undefined) {
                // Just place the new player in the toIndex
                newPlayers = [
                  ...players.slice(0, toIndex),
                  newPlayer,
                  ...players.slice(toIndex + 1),
                ];
              } else if (fromIndex < toIndex) {
                newPlayers = [
                  ...players.slice(0, fromIndex),
                  playerToSwap,
                  ...players.slice(fromIndex + 1, toIndex),
                  newPlayer,
                  ...players.slice(toIndex + 1),
                ];
              } else {
                newPlayers = [
                  ...players.slice(0, toIndex),
                  newPlayer,
                  ...players.slice(toIndex + 1, fromIndex),
                  playerToSwap,
                  ...players.slice(fromIndex + 1),
                ];
              }

              setNewPlayers(newPlayers);
            }}
            onPlayerEdit={(newPlayer) => {
              let indexToReplace = players.findIndex(
                (p) => p?.id === newPlayer.id
              );

              setNewPlayers([
                ...players.slice(0, indexToReplace),
                newPlayer,
                ...players.slice(indexToReplace + 1),
              ]);
            }}
          />
        </Box>
      </Grid>
      <Grid xs={12} md={4} item container direction={"column"} spacing={2}>
        <Grid item>
          <ButtonGroup>
            <Button
              onClick={() => {
                // TODO: copy url to clipboard
                setShowCopySnackbar(true);
              }}
            >
              <FormattedMessage
                id={"copy-button-text"}
                defaultMessage={"Copy (unimplemented)"}
              />
            </Button>
            <Button
              onClick={() => {
                // For undo functionality
                savedPlayers.current = players;

                setShowClearSnackbar(true);
                setNewPlayers(new Array(MAX_RAID_SIZE).fill(undefined));
              }}
            >
              <FormattedMessage
                id={"clear-button-text"}
                defaultMessage={"Clear"}
              />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs>
          <DataList
            players={players}
            onRoleSelect={(role) => {
              setSelectedRole(role);
            }}
            onRoleClear={() => {
              setSelectedRole(undefined);
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={showClearSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowClearSnackbar(false)}
        message={
          <FormattedMessage
            id={"snackbar-clear-body-text"}
            defaultMessage={"Raid list cleared"}
          />
        }
        action={
          <>
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                setNewPlayers(savedPlayers.current);
              }}
            >
              <FormattedMessage
                id={"snackbar-clear-undo-button-text"}
                defaultMessage={"Undo"}
              />
            </Button>
            <IconButton
              size="small"
              color="inherit"
              onClick={() => setShowClearSnackbar(false)}
            >
              <Close fontSize="small" />
            </IconButton>
          </>
        }
      />
      <Snackbar
        open={showCopySnackbar}
        autoHideDuration={6000}
        onClose={() => setShowCopySnackbar(false)}
        message={
          <FormattedMessage
            id={"snackbar-copy-body-text"}
            defaultMessage={"Link copied to clipboard"}
          />
        }
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setShowCopySnackbar(false)}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Grid>
  );
};
