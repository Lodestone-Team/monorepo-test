// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { CausedBy } from "./CausedBy";
import type { EventInner } from "./EventInner";
import type { EventLevel } from "./EventLevel";
import type { Snowflake } from "./Snowflake";

export interface ClientEvent { event_inner: EventInner, details: string, snowflake: Snowflake, level: EventLevel, caused_by: CausedBy, }