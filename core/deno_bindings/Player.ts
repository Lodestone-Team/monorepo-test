// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { GenericPlayer } from "./GenericPlayer.ts";
import type { MinecraftPlayer } from "./MinecraftPlayer.ts";

export type Player = { type: "MinecraftPlayer" } & MinecraftPlayer | { type: "GenericPlayer" } & GenericPlayer;
