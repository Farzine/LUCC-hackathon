"use server";

import { pusherServer } from "@/lib/pusher";

export const realTimeTournamentDetails = async (tournamentId: string) => {
  try {

    // 1
    pusherServer.trigger("player_auction", "updated-tournamentDetails", {
        tournamentId,
    });
    return { success: true };
  } catch (error: any) {
    throw new Error(error.message);
  }
};