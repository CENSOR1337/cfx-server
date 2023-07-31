import { Events as SharedEvents } from "@cfx/shared";
import { Event as SharedEvent } from "@cfx/shared";
import { listenerType } from "@cfx/shared";
import { Citizen } from "@cfx/shared";
import cfx from "@cfx/shared";

export class Events extends SharedEvents {
	public static onClient(eventName: string, handler: listenerType): SharedEvent {
		return new SharedEvent(eventName, handler, false, false);
	}

	public static onceClient(eventName: string, handler: listenerType): SharedEvent {
		return new SharedEvent(eventName, handler, false, true);
	}

	public static emitClient = Citizen.triggerClientEvent;

	public static emitClientLatent = Citizen.triggerLatentClientEvent;

	public static emitAllClient(eventName: string, ...args: any[]) {
		Citizen.triggerClientEvent(eventName, -1, ...args);
	}
	public static emitAllClientLatent(eventName: string, bps: number, ...args: any[]) {
		Citizen.triggerLatentClientEvent(eventName, -1, bps, ...args);
	}
}
