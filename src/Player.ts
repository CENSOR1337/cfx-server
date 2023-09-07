import * as cfx from "./serverNatives";
import { Event } from "./Event";
import { Vector3 } from "cfx-shared";

export class Player {
	protected type = "player";
	constructor(private readonly _source: number) {}

	public exists(): boolean {
		return this.source !== 0;
	}

	public get source(): number {
		return this._source;
	}

	public get src(): string {
		return String(this.source);
	}

	public get ped(): number {
		return cfx.getPlayerPed(this.src);
	}

	public get tokens(): string[] {
		const tokens: string[] = [];
		const tokenCount = cfx.getNumPlayerTokens(this.src);
		for (let i = 0; i < tokenCount; i++) {
			tokens.push(cfx.getPlayerToken(this.src, i));
		}
		return tokens;
	}

	public get endpoint(): string {
		return cfx.getPlayerEndpoint(this.src);
	}

	public get name(): string {
		return cfx.getPlayerName(this.src);
	}

	public get isMuted(): boolean {
		return cfx.mumbleIsPlayerMuted(this.source);
	}

	public set isMuted(value: boolean) {
		cfx.mumbleSetPlayerMuted(this.source, value);
	}

	public get pos(): Vector3 {
		return cfx.getEntityCoords(this.ped);
	}

	public isAceAllow(object: string): boolean {
		return cfx.isPlayerAceAllowed(this.src, object);
	}

	public drop(reason: string): void {
		reason = reason || "No reason provided";
		cfx.dropPlayer(this.src, reason);
	}

	public emit(event: string, ...args: any[]): void {
		Event.emitClient(event, this.source, ...args);
	}
}
