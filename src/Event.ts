import { Event as SharedEvent } from "@cfx/shared";
import { Citizen } from "@cfx/shared";
import cfx from "@cfx/shared";
type clientListenerType = (source: number, ...args: any[]) => void;

export interface EventContext {
	onEntityCreated: {
		handle: number;
	};
	onEntityCreating: {
		handle: number;
	};
	onEntityRemoved: {
		handle: number;
	};
	onResourceListRefresh: {};
	onResourceStarting: {
		resourceName: string;
	};
	onPlayerDropped: {
		source: number;
		reason: string;
	};
}

export class Event extends SharedEvent {
	public static onClient(eventName: string, listener: clientListenerType, once = false): SharedEvent {
		const handler = (source: number, ...args: any[]) => {
			listener(source, ...this.getClassFromArguments(...args));
		};
		return new SharedEvent(eventName, handler, true, once);
	}

	public static onceClient(eventName: string, listener: clientListenerType): SharedEvent {
		return Event.onClient(eventName, listener, true);
	}

	public static emitClient = Citizen.triggerClientEvent;

	public static emitClientLatent = Citizen.triggerLatentClientEvent;

	public static emitAllClients(eventName: string, ...args: any[]) {
		Citizen.triggerClientEvent(eventName, -1, ...args);
	}
	public static emitAllClientsLatent(eventName: string, bps: number, ...args: any[]) {
		Citizen.triggerLatentClientEvent(eventName, -1, bps, ...args);
	}
}

export class ServerEvent extends Event {}
