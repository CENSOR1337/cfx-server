
import { Vector3 } from "cfx-shared";
//@ts-ignore
const Citizen = global.Citizen;
//@ts-ignore
const msgpack_pack = global.msgpack_pack;
const _i = Citizen.pointerValueInt();
const _f = Citizen.pointerValueFloat();
const _v = Citizen.pointerValueVector();
const _r = Citizen.returnResultAnyway();
const _ri = Citizen.resultAsInteger();
const _rf = Citizen.resultAsFloat();
const _rl = Citizen.resultAsLong();
const _s = Citizen.resultAsString();
const _rv = Citizen.resultAsVector();
//@ts-ignore
const _ro = Citizen.resultAsObject2();
//@ts-ignore
const _in = Citizen.invokeNativeByHash;
const _ii_base = Citizen.pointerValueInt();
const _fi_base = Citizen.pointerValueFloat();

function _ii(...args: any[]) {
	// @ts-ignore
	return _ii_base(...args);
}

function _fi(...args: any[]) {
	// @ts-ignore
	return _fi_base(...args);
}

function joaat(s: string) {
	const k = s.toLowerCase();
	let h, i;

	for (h = i = 0; i < k.length; i++) {
		h += k.charCodeAt(i);
		h += h << 10;
		h ^= h >>> 6;
	}

	h += h << 3;
	h ^= h >>> 11;
	h += h << 15;

	return h >>> 0;
}

function _ch(hash: any) {
	if (typeof hash === "string") {
		return joaat(hash);
	}

	return hash;
}

function _ts(num: any) {
	if (num === 0 || num === null || num === undefined || num === false) {
		// workaround for users calling string parameters with '0', also nil being translated
		return null;
	}
	if (ArrayBuffer.isView(num) || num instanceof ArrayBuffer) {
		// these are handled as strings internally
		return num;
	}
	return num.toString();
}

function _fv(flt: number) {
	return flt === 0.0 ? flt : flt + 0.0000001;
}

function _mfr(fn: any) {
	return Citizen.makeRefFunction(fn);
}

function _mv(vector: any): Vector3 {
	return Vector3.fromArray(vector);
}
/**
 * Adds a rectangular blip for the specified coordinates/area.
 * It is recommended to use [SET_BLIP_ROTATION](#\_0xF87683CDF73C3F6E) and [SET_BLIP_COLOUR](#\_0x03D7FB09E75D6B7E) to make the blip not rotate along with the camera.
 * By default, the blip will show as a *regular* blip with the specified color/sprite if it is outside of the minimap view.
 * Example image:
 * ![minimap](https://w.wew.wtf/pdcjig.png)
 * ![big map](https://w.wew.wtf/zgcjcm.png)
 * (Native name is *likely* to actually be ADD_BLIP_FOR_AREA, but due to the usual reasons this can't be confirmed)
 * 
 * **This is the server-side RPC native equivalent of the client native [\_ADD_BLIP_FOR_AREA](?\_0xCE5D0E5E315DB238).**
 * @param x
 * @param y
 * @param z
 * @param width
 * @param height
 */
export function addBlipForArea(x: number, y: number, z: number, width: number, height: number): number { 
	return _in(0x00000000, 0x6228f159, _fv(x), _fv(y), _fv(z), _fv(width), _fv(height), _r, _ri); 
}

/**
 * Creates a blip for the specified coordinates. You can use `SET_BLIP_` natives to change the blip.
 * 
 * **This is the server-side RPC native equivalent of the client native [ADD_BLIP_FOR_COORD](?\_0x5A039BB0BCA604B6).**
 * @param x
 * @param y
 * @param z
 */
export function addBlipForCoord(x: number, y: number, z: number): number { 
	return _in(0x00000000, 0xc6f43d0e, _fv(x), _fv(y), _fv(z), _r, _ri); 
}

/**
 * Create a blip that by default is red (enemy), you can use [SET_BLIP_AS_FRIENDLY](#\_0xC6F43D0E) to make it blue (friend).\
 * Can be used for objects, vehicles and peds.
 * Example of enemy:
 * ![enemy](https://i.imgur.com/fl78svv.png)
 * Example of friend:
 * ![friend](https://i.imgur.com/Q16ho5d.png)
 * 
 * **This is the server-side RPC native equivalent of the client native [ADD_BLIP_FOR_ENTITY](?\_0x5CDE92C702A8FCE7).**
 * @param entity
 */
export function addBlipForEntity(entity: number): number { 
	return _in(0x00000000, 0x30822554, entity, _r, _ri); 
}

/**
 * Create a blip with a radius for the specified coordinates (it doesnt create the blip sprite, so you need to use [AddBlipCoords](#\_0xC6F43D0E))
 * Example image:
 * ![example](https://i.imgur.com/9hQl3DB.png)
 * 
 * **This is the server-side RPC native equivalent of the client native [ADD_BLIP_FOR_RADIUS](?\_0x46818D79B1F7499A).**
 * @param posX
 * @param posY
 * @param posZ
 * @param radius
 */
export function addBlipForRadius(posX: number, posY: number, posZ: number, radius: number): number { 
	return _in(0x00000000, 0x4626756c, _fv(posX), _fv(posY), _fv(posZ), _fv(radius), _r, _ri); 
}

/**
 * Applies an Item from a PedDecorationCollection to a ped. These include tattoos and shirt decals.
 * collection - PedDecorationCollection filename hash
 * overlay - Item name hash
 * Example:
 * Entry inside "mpbeach_overlays.xml" -
 * <Item>
 * <uvPos x="0.500000" y="0.500000" />
 * <scale x="0.600000" y="0.500000" />
 * <rotation value="0.000000" />
 * <nameHash>FM_Hair_Fuzz</nameHash>
 * <txdHash>mp_hair_fuzz</txdHash>
 * <txtHash>mp_hair_fuzz</txtHash>
 * <zone>ZONE_HEAD</zone>
 * <type>TYPE_TATTOO</type>
 * <faction>FM</faction>
 * <garment>All</garment>
 * <gender>GENDER_DONTCARE</gender>
 * <award />
 * <awardLevel />
 * </Item>
 * Code:
 * PED::\_0x5F5D1665E352A839(PLAYER::PLAYER_PED_ID(), MISC::GET_HASH_KEY("mpbeach_overlays"), MISC::GET_HASH_KEY("fm_hair_fuzz"))
 * 
 * **This is the server-side RPC native equivalent of the client native [ADD_PED_DECORATION_FROM_HASHES](?\_0x5F5D1665E352A839).**
 * @param ped
 * @param collection
 * @param overlay
 */
export function addPedDecorationFromHashes(ped: number, collection: number, overlay: number): void { 
	return _in(0x00000000, 0x70559ac7, ped, collection, overlay); 
}

/**
 * Applies a force to the specified entity.
 * **List of force types (p1)**:
 * 
 * ```
 * public enum ForceType
 * {
 * MinForce = 0,
 * MaxForceRot = 1,
 * MinForce2 = 2,
 * MaxForceRot2 = 3,
 * ForceNoRot = 4,
 * ForceRotPlusForce = 5
 * }
 * ```
 * 
 * Research/documentation on the gtaforums can be found [here](https://gtaforums.com/topic/885669-precisely-define-object-physics/) and [here](https://gtaforums.com/topic/887362-apply-forces-and-momentums-to-entityobject/).
 * 
 * **This is the server-side RPC native equivalent of the client native [APPLY_FORCE_TO_ENTITY](?\_0xC5F68BE9613E2D18).**
 * @param entity
 * @param forceType
 * @param x
 * @param y
 * @param z
 * @param offX
 * @param offY
 * @param offZ
 * @param boneIndex
 * @param isDirectionRel
 * @param ignoreUpVec
 * @param isForceRel
 * @param p12
 * @param p13
 */
export function applyForceToEntity(entity: number, forceType: number, x: number, y: number, z: number, offX: number, offY: number, offZ: number, boneIndex: number, isDirectionRel: boolean, ignoreUpVec: boolean, isForceRel: boolean, p12: boolean, p13: boolean): void { 
	return _in(0x00000000, 0xc1c0855a, entity, forceType, _fv(x), _fv(y), _fv(z), _fv(offX), _fv(offY), _fv(offZ), boneIndex, isDirectionRel, ignoreUpVec, isForceRel, p12, p13); 
}

/**
 * Returns whether or not the specified player has enough information to start a commerce session for.
 * @param playerSrc
 */
export function canPlayerStartCommerceSession(playerSrc: string): boolean { 
	return _in(0x00000000, 0x429461c3, _ts(playerSrc), _r); 
}

/**
 * List of component/props ID
 * gtaxscripting.blogspot.com/2016/04/gta-v-peds-component-and-props.html
 * 
 * **This is the server-side RPC native equivalent of the client native [CLEAR_PED_PROP](?\_0x0943E5B8E078E76E).**
 * @param ped
 * @param propId
 */
export function clearPedProp(ped: number, propId: number): void { 
	return _in(0x00000000, 0x2d23d743, ped, propId); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [CLEAR_PED_SECONDARY_TASK](?\_0x176CECF6F920D707).**
 * @param ped
 */
export function clearPedSecondaryTask(ped: number): void { 
	return _in(0x00000000, 0xa635f451, ped); 
}

/**
 * Clear a ped's tasks. Stop animations and other tasks created by scripts.
 * 
 * **This is the server-side RPC native equivalent of the client native [CLEAR_PED_TASKS](?\_0xE1EF3C1216AFF2CD).**
 * @param ped
 */
export function clearPedTasks(ped: number): void { 
	return _in(0x00000000, 0xde3316ab, ped); 
}

/**
 * Immediately stops the pedestrian from whatever it's doing. The difference between this and [CLEAR_PED_TASKS](#\_0xE1EF3C1216AFF2CD) is that this one teleports the ped but does not change the position of the ped.
 * 
 * **This is the server-side RPC native equivalent of the client native [CLEAR_PED_TASKS_IMMEDIATELY](?\_0xAAA34F8A7CB32098).**
 * @param ped
 */
export function clearPedTasksImmediately(ped: number): void { 
	return _in(0x00000000, 0xbc045625, ped); 
}

/**
 * This executes at the same as speed as PLAYER::SET_PLAYER_WANTED_LEVEL(player, 0, false);
 * PLAYER::GET_PLAYER_WANTED_LEVEL(player); executes in less than half the time. Which means that it's worth first checking if the wanted level needs to be cleared before clearing. However, this is mostly about good code practice and can important in other situations. The difference in time in this example is negligible.
 * 
 * **This is the server-side RPC native equivalent of the client native [CLEAR_PLAYER_WANTED_LEVEL](?\_0xB302540597885499).**
 * @param player
 */
export function clearPlayerWantedLevel(player: number): void { 
	return _in(0x00000000, 0x54ea5bcc, player); 
}

/**
 * Creates an object (prop) with the specified model at the specified position, offset on the Z axis by the radius of the object's model.
 * This object will initially be owned by the creating script as a mission entity, and the model should be loaded already (e.g. using REQUEST_MODEL).
 * 
 * **This is the server-side RPC native equivalent of the client native [CREATE_OBJECT](?\_0x509D5878EB39E842).**
 * @param modelHash
 * @param x
 * @param y
 * @param z
 * @param isNetwork
 * @param netMissionEntity
 * @param doorFlag
 */
export function createObject(modelHash: number, x: number, y: number, z: number, isNetwork: boolean, netMissionEntity: boolean, doorFlag: boolean): number { 
	return _in(0x00000000, 0x2f7aa05c, modelHash, _fv(x), _fv(y), _fv(z), isNetwork, netMissionEntity, doorFlag, _r, _ri); 
}

/**
 * Creates an object (prop) with the specified model centered at the specified position.
 * This object will initially be owned by the creating script as a mission entity, and the model should be loaded already (e.g. using REQUEST_MODEL).
 * 
 * **This is the server-side RPC native equivalent of the client native [CREATE_OBJECT_NO_OFFSET](?\_0x9A294B2138ABB884).**
 * @param modelHash
 * @param x
 * @param y
 * @param z
 * @param isNetwork
 * @param netMissionEntity
 * @param doorFlag
 */
export function createObjectNoOffset(modelHash: number, x: number, y: number, z: number, isNetwork: boolean, netMissionEntity: boolean, doorFlag: boolean): number { 
	return _in(0x00000000, 0x58040420, modelHash, _fv(x), _fv(y), _fv(z), isNetwork, netMissionEntity, doorFlag, _r, _ri); 
}

/**
 * Creates a ped (biped character, pedestrian, actor) with the specified model at the specified position and heading.
 * This ped will initially be owned by the creating script as a mission entity, and the model should be loaded already
 * (e.g. using REQUEST_MODEL).
 * 
 * **This is the server-side RPC native equivalent of the client native [CREATE_PED](?\_0xD49F9B0955C367DE).**
 * @param pedType
 * @param modelHash
 * @param x
 * @param y
 * @param z
 * @param heading
 * @param isNetwork
 * @param bScriptHostPed
 */
export function createPed(pedType: number, modelHash: number, x: number, y: number, z: number, heading: number, isNetwork: boolean, bScriptHostPed: boolean): number { 
	return _in(0x00000000, 0x0389ef71, pedType, modelHash, _fv(x), _fv(y), _fv(z), _fv(heading), isNetwork, bScriptHostPed, _r, _ri); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [CREATE_PED_INSIDE_VEHICLE](?\_0x7DD959874C1FD534).**
 * @param vehicle
 * @param pedType
 * @param modelHash
 * @param seat
 * @param isNetwork
 * @param bScriptHostPed
 */
export function createPedInsideVehicle(vehicle: number, pedType: number, modelHash: number, seat: number, isNetwork: boolean, bScriptHostPed: boolean): number { 
	return _in(0x00000000, 0x3000f092, vehicle, pedType, modelHash, seat, isNetwork, bScriptHostPed, _r, _ri); 
}

/**
 * Creates a vehicle with the specified model at the specified position. This vehicle will initially be owned by the creating
 * script as a mission entity, and the model should be loaded already (e.g. using REQUEST_MODEL).
 * 
 * ```
 * NativeDB Added Parameter 8: BOOL p7
 * ```
 * 
 * **This is the server-side RPC native equivalent of the client native [CREATE_VEHICLE](?\_0xAF35D0D2583051B0).**
 * @param modelHash
 * @param x
 * @param y
 * @param z
 * @param heading
 * @param isNetwork
 * @param netMissionEntity
 */
export function createVehicle(modelHash: number, x: number, y: number, z: number, heading: number, isNetwork: boolean, netMissionEntity: boolean): number { 
	return _in(0x00000000, 0xdd75460a, modelHash, _fv(x), _fv(y), _fv(z), _fv(heading), isNetwork, netMissionEntity, _r, _ri); 
}

/**
 * Equivalent to CREATE_VEHICLE, but it uses 'server setter' logic (like the former CREATE_AUTOMOBILE) as a workaround for
 * reliability concerns regarding entity creation RPC.
 * 
 * Unlike CREATE_AUTOMOBILE, this supports other vehicle types as well.
 * @param modelHash
 * @param type
 * @param x
 * @param y
 * @param z
 * @param heading
 */
export function createVehicleServerSetter(modelHash: number, type: string, x: number, y: number, z: number, heading: number): number { 
	return _in(0x00000000, 0x6ae51d4b, modelHash, _ts(type), _fv(x), _fv(y), _fv(z), _fv(heading), _r, _ri); 
}

/**
 * Deletes the specified entity.
 * @param entity
 */
export function deleteEntity(entity: number): void { 
	return _in(0x00000000, 0xfaa3d236, entity); 
}

/**
 * Nonsynchronous [DELETE_RESOURCE_KVP](#\_0x7389B5DF) operation; see [FLUSH_RESOURCE_KVP](#\_0x5240DA5A).
 * @param key
 */
export function deleteResourceKvpNoSync(key: string): void { 
	return _in(0x00000000, 0x04152c90, _ts(key)); 
}

export function doesEntityExist(entity: number): boolean { 
	return _in(0x00000000, 0x3ac90869, entity, _r); 
}

/**
 * Requests whether or not the player owns the specified SKU.
 * @param playerSrc
 * @param skuId
 */
export function doesPlayerOwnSku(playerSrc: string, skuId: number): boolean { 
	return _in(0x00000000, 0x167aba27, _ts(playerSrc), skuId, _r); 
}

/**
 * Requests whether or not the player owns the specified package.
 * @param playerSrc
 * @param skuId
 */
export function doesPlayerOwnSkuExt(playerSrc: string, skuId: number): boolean { 
	return _in(0x00000000, 0xdef0480b, _ts(playerSrc), skuId, _r); 
}

export function dropPlayer(playerSrc: string, reason: string): void { 
	return _in(0x00000000, 0xba0613e1, _ts(playerSrc), _ts(reason)); 
}

export function enableEnhancedHostSupport(enabled: boolean): void { 
	return _in(0x00000000, 0xf97b1c93, enabled); 
}

export function flagServerAsPrivate(private_: boolean): void { 
	return _in(0x00000000, 0x13b6855d, private_); 
}

/**
 * Nonsynchronous operations will not wait for a disk/filesystem flush before returning from a write or delete call. They will be much faster than their synchronous counterparts (e.g., bulk operations), however, a system crash may lose the data to some recent operations.
 * 
 * This native ensures all `_NO_SYNC` operations are synchronized with the disk/filesystem.
 */
export function flushResourceKvp(): void { 
	return _in(0x00000000, 0xe27c97a0); 
}

/**
 * Freezes or unfreezes an entity preventing its coordinates to change by the player if set to `true`. You can still change the entity position using SET_ENTITY_COORDS.
 * 
 * **This is the server-side RPC native equivalent of the client native [FREEZE_ENTITY_POSITION](?\_0x428CA6DBD1094446).**
 * @param entity
 * @param toggle
 */
export function freezeEntityPosition(entity: number, toggle: boolean): void { 
	return _in(0x00000000, 0x65c16d57, entity, toggle); 
}

export function getAirDragMultiplierForPlayersVehicle(playerSrc: string): number { 
	return _in(0x00000000, 0x62fc38d0, _ts(playerSrc), _r, _rf); 
}

/**
 * Returns all object handles known to the server.
 * The data returned adheres to the following layout:
 * 
 * ```
 * [127, 42, 13, 37]
 * ```
 */
export function getAllObjects(): any { 
	return _in(0x00000000, 0x6886c3fe, _r, _ro); 
}

/**
 * Returns all peds handles known to the server.
 * The data returned adheres to the following layout:
 * 
 * ```
 * [127, 42, 13, 37]
 * ```
 */
export function getAllPeds(): any { 
	return _in(0x00000000, 0xb8584fef, _r, _ro); 
}

/**
 * Returns all vehicle handles known to the server.
 * The data returned adheres to the following layout:
 * 
 * ```
 * [127, 42, 13, 37]
 * ```
 */
export function getAllVehicles(): any { 
	return _in(0x00000000, 0x332169f5, _r, _ro); 
}

/**
 * Returns the current console output buffer.
 */
export function getConsoleBuffer(): string { 
	return _in(0x00000000, 0xe57429fa, _r, _s); 
}

/**
 * Gets the entity that this entity is attached to.
 * @param entity
 */
export function getEntityAttachedTo(entity: number): number { 
	return _in(0x00000000, 0xfe1589f9, entity, _r, _ri); 
}

/**
 * Gets the current coordinates for a specified entity. This native is used server side when using OneSync.
 * 
 * See [GET_ENTITY_COORDS](#\_0x3FEF770D40960D5A) for client side.
 * @param entity
 */
export function getEntityCoords(entity: number): Vector3 { 
	return _mv(_in(0x00000000, 0x1647f1cb, entity, _r, _rv)); 
}

export function getEntityHeading(entity: number): number { 
	return _in(0x00000000, 0x972cc383, entity, _r, _rf); 
}

/**
 * Currently it only works with peds.
 * @param entity
 */
export function getEntityHealth(entity: number): number { 
	return _in(0x00000000, 0x8e3222b7, entity, _r, _ri); 
}

/**
 * Currently it only works with peds.
 * @param entity
 */
export function getEntityMaxHealth(entity: number): number { 
	return _in(0x00000000, 0xc7ae6aa1, entity, _r, _ri); 
}

export function getEntityModel(entity: number): number { 
	return _in(0x00000000, 0xdafcb3ec, entity, _r, _ri); 
}

/**
 * This native gets an entity's population type.
 * @param entity
 */
export function getEntityPopulationType(entity: number): number { 
	return _in(0x00000000, 0xfc30ddff, entity, _r, _ri); 
}

export function getEntityRotation(entity: number): Vector3 { 
	return _mv(_in(0x00000000, 0x8ff45b04, entity, _r, _rv)); 
}

export function getEntityRotationVelocity(entity: number): Vector3 { 
	return _mv(_in(0x00000000, 0x9bf8a73f, entity, _r, _rv)); 
}

/**
 * Gets the routing bucket for the specified entity.
 * 
 * Routing buckets are also known as 'dimensions' or 'virtual worlds' in past echoes, however they are population-aware.
 * @param entity
 */
export function getEntityRoutingBucket(entity: number): number { 
	return _in(0x00000000, 0xed4b0486, entity, _r, _ri); 
}

export function getEntityScript(entity: number): string { 
	return _in(0x00000000, 0xb7f70784, entity, _r, _s); 
}

/**
 * Gets the current speed of the entity in meters per second.
 * 
 * ```
 * To convert to MPH: speed * 2.236936
 * To convert to KPH: speed * 3.6
 * ```
 * @param entity
 */
export function getEntitySpeed(entity: number): number { 
	return _in(0x00000000, 0x9e1e4798, entity, _r, _rf); 
}

/**
 * Gets the entity type (as an integer), which can be one of the following defined down below:
 * 
 * **The following entities will return type `2`:**
 * 
 * *   Automobile
 * *   Bike
 * *   Boat
 * *   Heli
 * *   Plane
 * *   Submarine
 * *   Trailer
 * *   Train
 * *   DraftVeh (Red Dead Redemption 2)
 * 
 * **The following entities will return type `1`:**
 * 
 * *   Ped
 * *   Player
 * *   Animal (Red Dead Redemption 2)
 * *   Horse (Red Dead Redemption 2)
 * 
 * **The following entities will return type `3`:**
 * 
 * *   Object
 * *   Door
 * *   Pickup
 * 
 * Otherwise, a value of `0` will be returned.
 * @param entity
 */
export function getEntityType(entity: number): number { 
	return _in(0x00000000, 0x0b1bd08d, entity, _r, _ri); 
}

export function getEntityVelocity(entity: number): Vector3 { 
	return _mv(_in(0x00000000, 0xc14c9b6b, entity, _r, _rv)); 
}

/**
 * Gets the current game timer in milliseconds.
 */
export function getGameTimer(): any { 
	return _in(0x00000000, 0xa4ea0691, _r, _rl); 
}

/**
 * This native converts the passed string to a hash.
 * @param model
 */
export function getHashKey(model: string): number { 
	return _in(0x00000000, 0x98eff6f1, _ts(model), _r, _ri); 
}

export function getHeliMainRotorHealth(vehicle: number): number { 
	return _in(0x00000000, 0xf01e2aab, vehicle, _r, _rf); 
}

export function getHeliTailRotorHealth(vehicle: number): number { 
	return _in(0x00000000, 0xa41bc13d, vehicle, _r, _rf); 
}

export function getHostId(): string { 
	return _in(0x00000000, 0x5f70f5a3, _r, _s); 
}

export function getIsVehicleEngineRunning(vehicle: number): boolean { 
	return _in(0x00000000, 0x7dc6d022, vehicle, _r); 
}

export function getIsVehiclePrimaryColourCustom(vehicle: number): boolean { 
	return _in(0x00000000, 0xd7ec8760, vehicle, _r); 
}

export function getIsVehicleSecondaryColourCustom(vehicle: number): boolean { 
	return _in(0x00000000, 0x288ad228, vehicle, _r); 
}

/**
 * See the client-side [GET_LANDING_GEAR_STATE](#\_0x9B0F3DCA3DB0F4CD) native for a description of landing gear states.
 * @param vehicle
 */
export function getLandingGearState(vehicle: number): number { 
	return _in(0x00000000, 0xa6f02670, vehicle, _r, _ri); 
}

export function getLastPedInVehicleSeat(vehicle: number, seatIndex: number): number { 
	return _in(0x00000000, 0xf7c6792d, vehicle, seatIndex, _r, _ri); 
}

export function getNumPlayerIdentifiers(playerSrc: string): number { 
	return _in(0x00000000, 0xff7f66ab, _ts(playerSrc), _r, _ri); 
}

export function getNumPlayerIndices(): number { 
	return _in(0x00000000, 0x63d13184, _r, _ri); 
}

export function getNumPlayerTokens(playerSrc: string): number { 
	return _in(0x00000000, 0x619e4a3d, _ts(playerSrc), _r, _ri); 
}

export function getPasswordHash(password: string): string { 
	return _in(0x00000000, 0x23473ea4, _ts(password), _r, _s); 
}

export function getPedArmour(ped: number): number { 
	return _in(0x00000000, 0x2ce311a7, ped, _r, _ri); 
}

export function getPedCauseOfDeath(ped: number): number { 
	return _in(0x00000000, 0x63458c27, ped, _r, _ri); 
}

export function getPedDesiredHeading(ped: number): number { 
	return _in(0x00000000, 0xc182f76e, ped, _r, _rf); 
}

export function getPedInVehicleSeat(vehicle: number, seatIndex: number): number { 
	return _in(0x00000000, 0x388fde9a, vehicle, seatIndex, _r, _ri); 
}

export function getPedMaxHealth(ped: number): number { 
	return _in(0x00000000, 0xa45b6c8d, ped, _r, _ri); 
}

/**
 * Gets the script task command currently assigned to the ped.
 * @param ped
 */
export function getPedScriptTaskCommand(ped: number): number { 
	return _in(0x00000000, 0x084fe084, ped, _r, _ri); 
}

/**
 * Gets the stage of the peds scripted task.
 * @param ped
 */
export function getPedScriptTaskStage(ped: number): number { 
	return _in(0x00000000, 0x44b0e5e2, ped, _r, _ri); 
}

/**
 * Get the last entity that damaged the ped. This native is used server side when using OneSync.
 * @param ped
 */
export function getPedSourceOfDamage(ped: number): number { 
	return _in(0x00000000, 0x535db43f, ped, _r, _ri); 
}

/**
 * Get the entity that killed the ped. This native is used server side when using OneSync.
 * @param ped
 */
export function getPedSourceOfDeath(ped: number): number { 
	return _in(0x00000000, 0x84adf9eb, ped, _r, _ri); 
}

/**
 * Gets the type of a ped's specific task given an index of the CPedTaskSpecificDataNode nodes.
 * A ped will typically have a task at index 0, if a ped has multiple tasks at once they will be in the order 0, 1, 2, etc.
 * @param ped
 * @param index
 */
export function getPedSpecificTaskType(ped: number, index: number): number { 
	return _in(0x00000000, 0x7f4563d3, ped, index, _r, _ri); 
}

/**
 * Gets the current camera rotation for a specified player. This native is used server side when using OneSync.
 * @param playerSrc
 */
export function getPlayerCameraRotation(playerSrc: string): Vector3 { 
	return _mv(_in(0x00000000, 0x433c765d, _ts(playerSrc), _r, _rv)); 
}

export function getPlayerEndpoint(playerSrc: string): string { 
	return _in(0x00000000, 0xfee404f9, _ts(playerSrc), _r, _s); 
}

/**
 * Gets the current fake wanted level for a specified player. This native is used server side when using OneSync.
 * @param playerSrc
 */
export function getPlayerFakeWantedLevel(playerSrc: string): number { 
	return _in(0x00000000, 0x0098d244, _ts(playerSrc), _r, _ri); 
}

export function getPlayerFromIndex(index: number): string { 
	return _in(0x00000000, 0xc8a9ce08, index, _r, _s); 
}

export function getPlayerGuid(playerSrc: string): string { 
	return _in(0x00000000, 0xe52d9680, _ts(playerSrc), _r, _s); 
}

export function getPlayerIdentifier(playerSrc: string, identifier: number): string { 
	return _in(0x00000000, 0x7302dbcf, _ts(playerSrc), identifier, _r, _s); 
}

/**
 * Get an identifier from a player by the type of the identifier.
 * @param playerSrc
 * @param identifierType
 */
export function getPlayerIdentifierByType(playerSrc: string, identifierType: string): string { 
	return _in(0x00000000, 0xa61c8fc6, _ts(playerSrc), _ts(identifierType), _r, _s); 
}

export function getPlayerInvincible(playerSrc: string): boolean { 
	return _in(0x00000000, 0x680c90ee, _ts(playerSrc), _r); 
}

export function getPlayerLastMsg(playerSrc: string): number { 
	return _in(0x00000000, 0x427e8e6a, _ts(playerSrc), _r, _ri); 
}

export function getPlayerMaxArmour(playerSrc: string): number { 
	return _in(0x00000000, 0x02a50657, _ts(playerSrc), _r, _ri); 
}

export function getPlayerMaxHealth(playerSrc: string): number { 
	return _in(0x00000000, 0x8154e470, _ts(playerSrc), _r, _ri); 
}

export function getPlayerName(playerSrc: string): string { 
	return _in(0x00000000, 0x406b4b20, _ts(playerSrc), _r, _s); 
}

export function getPlayerPed(playerSrc: string): number { 
	return _in(0x00000000, 0x6e31e993, _ts(playerSrc), _r, _ri); 
}

export function getPlayerPing(playerSrc: string): number { 
	return _in(0x00000000, 0xff1290d4, _ts(playerSrc), _r, _ri); 
}

/**
 * Gets the routing bucket for the specified player.
 * 
 * Routing buckets are also known as 'dimensions' or 'virtual worlds' in past echoes, however they are population-aware.
 * @param playerSrc
 */
export function getPlayerRoutingBucket(playerSrc: string): number { 
	return _in(0x00000000, 0x52441c34, _ts(playerSrc), _r, _ri); 
}

export function getPlayerTeam(playerSrc: string): number { 
	return _in(0x00000000, 0x9873e404, _ts(playerSrc), _r, _ri); 
}

/**
 * ```
 * Gets the amount of time player has spent evading the cops.
 * Counter starts and increments only when cops are chasing the player.
 * If the player is evading, the timer will pause.
 * ```
 * @param playerSrc
 * @param lastPursuit
 */
export function getPlayerTimeInPursuit(playerSrc: string, lastPursuit: boolean): number { 
	return _in(0x00000000, 0x7ade63e1, _ts(playerSrc), lastPursuit, _r, _ri); 
}

/**
 * Gets a player's token. Tokens can be used to enhance banning logic, however are specific to a server.
 * @param playerSrc
 * @param index
 */
export function getPlayerToken(playerSrc: string, index: number): string { 
	return _in(0x00000000, 0x54c06897, _ts(playerSrc), index, _r, _s); 
}

/**
 * Gets the current known coordinates for the specified player from cops perspective. This native is used server side when using OneSync.
 * @param playerSrc
 */
export function getPlayerWantedCentrePosition(playerSrc: string): Vector3 { 
	return _mv(_in(0x00000000, 0x821f2d2c, _ts(playerSrc), _r, _rv)); 
}

/**
 * ```
 * Returns given players wanted level server-side.
 * ```
 * @param playerSrc
 */
export function getPlayerWantedLevel(playerSrc: string): number { 
	return _in(0x00000000, 0xbdcdd163, _ts(playerSrc), _r, _ri); 
}

/**
 * Returns the physical on-disk path of the specified resource.
 * @param resourceName
 */
export function getResourcePath(resourceName: string): string { 
	return _in(0x00000000, 0x61dcf017, _ts(resourceName), _r, _s); 
}

/**
 * Returns a hash of selected ped weapon.
 * @param ped
 */
export function getSelectedPedWeapon(ped: number): number { 
	return _in(0x00000000, 0xd240123e, ped, _r, _ri); 
}

export function getTrainCarriageEngine(train: number): number { 
	return _in(0x00000000, 0x095070fa, train, _r, _ri); 
}

export function getTrainCarriageIndex(train: number): number { 
	return _in(0x00000000, 0x4b8285cf, train, _r, _ri); 
}

export function getVehicleBodyHealth(vehicle: number): number { 
	return _in(0x00000000, 0x2b2fcc28, vehicle, _r, _rf); 
}

export function getVehicleColours(vehicle: number): [number, number] { 
	const [colorPrimary_out, colorSecondary_out] = _in(0x00000000, 0x40d82d88, vehicle, _i, _i);
	return [colorPrimary_out as number, colorSecondary_out as number]; 
}

export function getVehicleCustomPrimaryColour(vehicle: number): [number, number, number] { 
	const [r_out, g_out, b_out] = _in(0x00000000, 0x1c2b9fef, vehicle, _i, _i, _i);
	return [r_out as number, g_out as number, b_out as number]; 
}

export function getVehicleCustomSecondaryColour(vehicle: number): [number, number, number] { 
	const [r_out, g_out, b_out] = _in(0x00000000, 0x3ff247a2, vehicle, _i, _i, _i);
	return [r_out as number, g_out as number, b_out as number]; 
}

export function getVehicleDashboardColour(vehicle: number, color: number): number { 
	return _in(0x00000000, 0xa0dbd08d, vehicle, _ii(color)); 
}

export function getVehicleDirtLevel(vehicle: number): number { 
	return _in(0x00000000, 0xfd15c065, vehicle, _r, _rf); 
}

/**
 * ```lua
 * enum_VehicleLockStatus = {
 * None = 0,
 * Locked = 2,
 * LockedForPlayer = 3,
 * StickPlayerInside = 4, -- Doesn't allow players to exit the vehicle with the exit vehicle key.
 * CanBeBrokenInto = 7, -- Can be broken into the car. If the glass is broken, the value will be set to 1
 * CanBeBrokenIntoPersist = 8, -- Can be broken into persist
 * CannotBeTriedToEnter = 10, -- Cannot be tried to enter (Nothing happens when you press the vehicle enter key).
 * }
 * ```
 * 
 * It should be [noted](https://forum.cfx.re/t/4863241) that while the [client-side command](#\_0x25BC98A59C2EA962) and its
 * setter distinguish between states 0 (unset) and 1 (unlocked), the game will synchronize both as state 0, so the server-side
 * command will return only '0' if unlocked.
 * @param vehicle
 */
export function getVehicleDoorLockStatus(vehicle: number): number { 
	return _in(0x00000000, 0x0d72cef2, vehicle, _r, _ri); 
}

export function getVehicleDoorStatus(vehicle: number): number { 
	return _in(0x00000000, 0x6e35c49c, vehicle, _r, _ri); 
}

/**
 * Currently it only works when set to "all players".
 * @param vehicle
 */
export function getVehicleDoorsLockedForPlayer(vehicle: number): number { 
	return _in(0x00000000, 0x1dc50247, vehicle, _r, _ri); 
}

export function getVehicleEngineHealth(vehicle: number): number { 
	return _in(0x00000000, 0x8880038a, vehicle, _r, _rf); 
}

export function getVehicleExtraColours(vehicle: number): [number, number] { 
	const [pearlescentColor_out, wheelColor_out] = _in(0x00000000, 0x80e4659b, vehicle, _i, _i);
	return [pearlescentColor_out as number, wheelColor_out as number]; 
}

/**
 * Gets the flight nozzel position for the specified vehicle. See the client-side [\_GET_VEHICLE_FLIGHT_NOZZLE_POSITION](#\_0xDA62027C8BDB326E) native for usage examples.
 * @param vehicle
 */
export function getVehicleFlightNozzlePosition(vehicle: number): number { 
	return _in(0x00000000, 0xad40ad55, vehicle, _r, _rf); 
}

export function getVehicleHeadlightsColour(vehicle: number): number { 
	return _in(0x00000000, 0xd7147656, vehicle, _r, _ri); 
}

/**
 * Gets the lock on state for the specified vehicle. See the client-side [GET_VEHICLE_HOMING_LOCKON_STATE](#\_0xE6B0E8CFC3633BF0) native for a description of lock on states.
 * @param vehicle
 */
export function getVehicleHomingLockonState(vehicle: number): number { 
	return _in(0x00000000, 0xfbde9fd8, vehicle, _r, _ri); 
}

export function getVehicleInteriorColour(vehicle: number, color: number): number { 
	return _in(0x00000000, 0xccff3b6e, vehicle, _ii(color)); 
}

export function getVehicleLightsState(vehicle: number): [boolean, boolean, boolean] { 
	const [retval, lightsOn_out, highbeamsOn_out] = _in(0x00000000, 0x7c278621, vehicle, _i, _i, _r);
	return [retval as boolean, lightsOn_out as boolean, highbeamsOn_out as boolean]; 
}

export function getVehicleLivery(vehicle: number): number { 
	return _in(0x00000000, 0xec82a51d, vehicle, _r, _ri); 
}

/**
 * Gets the vehicle that is locked on to for the specified vehicle.
 * @param vehicle
 */
export function getVehicleLockOnTarget(vehicle: number): number { 
	return _in(0x00000000, 0x4a557117, vehicle, _r, _ri); 
}

export function getVehicleNumberPlateText(vehicle: number): string { 
	return _in(0x00000000, 0xe8522d58, vehicle, _r, _s); 
}

export function getVehicleNumberPlateTextIndex(vehicle: number): number { 
	return _in(0x00000000, 0x499747b6, vehicle, _r, _ri); 
}

/**
 * Gets the vehicle the specified Ped is/was in depending on bool value. This native is used server side when using OneSync.
 * @param ped
 * @param lastVehicle
 */
export function getVehiclePedIsIn(ped: number, lastVehicle: boolean): number { 
	return _in(0x00000000, 0xafe92319, ped, lastVehicle, _r, _ri); 
}

export function getVehiclePetrolTankHealth(vehicle: number): number { 
	return _in(0x00000000, 0xe41595ce, vehicle, _r, _rf); 
}

export function getVehicleRadioStationIndex(vehicle: number): number { 
	return _in(0x00000000, 0x57037960, vehicle, _r, _ri); 
}

export function getVehicleRoofLivery(vehicle: number): number { 
	return _in(0x00000000, 0x0872cf42, vehicle, _r, _ri); 
}

/**
 * Returns the type of the passed vehicle.
 * 
 * ### Vehicle types
 * 
 * *   automobile
 * *   bike
 * *   boat
 * *   heli
 * *   plane
 * *   submarine
 * *   trailer
 * *   train
 * @param vehicle
 */
export function getVehicleType(vehicle: number): string { 
	return _in(0x00000000, 0xa273060e, vehicle, _r, _s); 
}

export function getVehicleTyreSmokeColor(vehicle: number): [number, number, number] { 
	const [r_out, g_out, b_out] = _in(0x00000000, 0x75280015, vehicle, _i, _i, _i);
	return [r_out as number, g_out as number, b_out as number]; 
}

export function getVehicleWheelType(vehicle: number): number { 
	return _in(0x00000000, 0xda58d7ae, vehicle, _r, _ri); 
}

export function getVehicleWindowTint(vehicle: number): number { 
	return _in(0x00000000, 0x13d53892, vehicle, _r, _ri); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [GIVE_WEAPON_COMPONENT_TO_PED](?\_0xD966D51AA5B28BB9).**
 * @param ped
 * @param weaponHash
 * @param componentHash
 */
export function giveWeaponComponentToPed(ped: number, weaponHash: number, componentHash: number): void { 
	return _in(0x00000000, 0x3e1e286d, ped, weaponHash, componentHash); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [GIVE_WEAPON_TO_PED](?\_0xBF0FD6E56C964FCB).**
 * @param ped
 * @param weaponHash
 * @param ammoCount
 * @param isHidden
 * @param bForceInHand
 */
export function giveWeaponToPed(ped: number, weaponHash: number, ammoCount: number, isHidden: boolean, bForceInHand: boolean): void { 
	return _in(0x00000000, 0xc4d88a85, ped, weaponHash, ammoCount, isHidden, bForceInHand); 
}

export function hasEntityBeenMarkedAsNoLongerNeeded(vehicle: number): boolean { 
	return _in(0x00000000, 0x9c9a3be0, vehicle, _r); 
}

export function hasVehicleBeenOwnedByPlayer(vehicle: number): boolean { 
	return _in(0x00000000, 0xe4e83a5b, vehicle, _r); 
}

/**
 * This native checks if the given entity is visible.
 * @param entity
 */
export function isEntityVisible(entity: number): boolean { 
	return _in(0x00000000, 0x120b4ed5, entity, _r); 
}

/**
 * This native checks if the given ped is a player.
 * @param ped
 */
export function isPedAPlayer(ped: number): boolean { 
	return _in(0x00000000, 0x404794ca, ped, _r); 
}

export function isPlayerAceAllowed(playerSrc: string, object: string): boolean { 
	return _in(0x00000000, 0xdedae23d, _ts(playerSrc), _ts(object), _r); 
}

/**
 * Requests whether or not the commerce data for the specified player has loaded.
 * @param playerSrc
 */
export function isPlayerCommerceInfoLoaded(playerSrc: string): boolean { 
	return _in(0x00000000, 0xbefe93f4, _ts(playerSrc), _r); 
}

/**
 * Requests whether or not the commerce data for the specified player has loaded from Tebex.
 * @param playerSrc
 */
export function isPlayerCommerceInfoLoadedExt(playerSrc: string): boolean { 
	return _in(0x00000000, 0x1d14f4fe, _ts(playerSrc), _r); 
}

/**
 * ```
 * This will return true if the player is evading wanted level, meaning that the wanted level stars are blink.
 * Otherwise will return false.
 * 
 * If the player is not wanted, it simply returns false.
 * ```
 * @param playerSrc
 */
export function isPlayerEvadingWantedLevel(playerSrc: string): boolean { 
	return _in(0x00000000, 0x89a3881a, _ts(playerSrc), _r); 
}

export function isPlayerUsingSuperJump(playerSrc: string): boolean { 
	return _in(0x00000000, 0xc7d2c20c, _ts(playerSrc), _r); 
}

export function isVehicleExtraTurnedOn(vehicle: number, extraId: number): boolean { 
	return _in(0x00000000, 0x042098b5, vehicle, extraId, _r); 
}

export function isVehicleSirenOn(vehicle: number): boolean { 
	return _in(0x00000000, 0x25eb5873, vehicle, _r); 
}

export function isVehicleTyreBurst(vehicle: number, wheelID: number, completely: boolean): boolean { 
	return _in(0x00000000, 0x48c80210, vehicle, wheelID, completely, _r); 
}

/**
 * Requests the commerce data for the specified player, including the owned SKUs. Use `IS_PLAYER_COMMERCE_INFO_LOADED` to check if it has loaded.
 * @param playerSrc
 */
export function loadPlayerCommerceData(playerSrc: string): void { 
	return _in(0x00000000, 0xa8f63eab, _ts(playerSrc)); 
}

/**
 * Requests the commerce data from Tebex for the specified player, including the owned SKUs. Use `IS_PLAYER_COMMERCE_INFO_LOADED` to check if it has loaded.
 * @param playerSrc
 */
export function loadPlayerCommerceDataExt(playerSrc: string): void { 
	return _in(0x00000000, 0x7995539e, _ts(playerSrc)); 
}

/**
 * Create a permanent voice channel.
 * @param id
 */
export function mumbleCreateChannel(id: number): void { 
	return _in(0x00000000, 0x262663c5, id); 
}

/**
 * Checks if the player is currently muted
 * @param playerSrc
 */
export function mumbleIsPlayerMuted(playerSrc: number): boolean { 
	return _in(0x00000000, 0x1d5d50c2, playerSrc, _r); 
}

/**
 * Mutes or unmutes the specified player
 * @param playerSrc
 * @param toggle
 */
export function mumbleSetPlayerMuted(playerSrc: number, toggle: boolean): void { 
	return _in(0x00000000, 0xcc6c2eb1, playerSrc, toggle); 
}

export function networkGetEntityFromNetworkId(netId: number): number { 
	return _in(0x00000000, 0x5b912c3f, netId, _r, _ri); 
}

/**
 * Returns the first owner ID of the specified entity.
 * @param entity
 */
export function networkGetFirstEntityOwner(entity: number): number { 
	return _in(0x00000000, 0x1e546224, entity, _r, _ri); 
}

export function networkGetNetworkIdFromEntity(entity: number): number { 
	return _in(0x00000000, 0x9e35dab6, entity, _r, _ri); 
}

export function networkGetVoiceProximityOverride(playerSrc: string): Vector3 { 
	return _mv(_in(0x00000000, 0x7a6462f4, _ts(playerSrc), _r, _rv)); 
}

export function performHttpRequestInternal(requestData: string, requestDataLength: number): number { 
	return _in(0x00000000, 0x8e8cc653, _ts(requestData), requestDataLength, _r, _ri); 
}

export function performHttpRequestInternalEx(requestData: any): number { 
	return _in(0x00000000, 0x6b171e87, ...(_obj(requestData)), _r, _ri); 
}

/**
 * Prints 'structured trace' data to the server `file descriptor 3` channel. This is not generally useful outside of
 * server monitoring utilities.
 * @param jsonString
 */
export function printStructuredTrace(jsonString: string): void { 
	return _in(0x00000000, 0x90892ded, _ts(jsonString)); 
}

/**
 * Registers a listener for console output messages.
 * @param listener
 */
export function registerConsoleListener(listener: any): void { 
	return _in(0x00000000, 0x281b5448, _mfr(listener)); 
}

/**
 * **Experimental**: This native may be altered or removed in future versions of CitizenFX without warning.
 * 
 * Registers a cached resource asset with the resource system, similar to the automatic scanning of the `stream/` folder.
 * @param resourceName
 * @param fileName
 */
export function registerResourceAsset(resourceName: string, fileName: string): string { 
	return _in(0x00000000, 0x9862b266, _ts(resourceName), _ts(fileName), _r, _s); 
}

/**
 * Registers a build task factory for resources.
 * The function should return an object (msgpack map) with the following fields:
 * 
 * ```
 * {
 * // returns whether the specific resource should be built
 * shouldBuild = func(resourceName: string): bool,
 * 
 * // asynchronously start building the specific resource.
 * // call cb when completed
 * build = func(resourceName: string, cb: func(success: bool, status: string): void): void
 * }
 * ```
 * @param factoryId
 * @param factoryFn
 */
export function registerResourceBuildTaskFactory(factoryId: string, factoryFn: any): void { 
	return _in(0x00000000, 0x285b43ca, _ts(factoryId), _mfr(factoryFn)); 
}

/**
 * Parameter `p1` does not seem to be used or referenced in game binaries.\
 * **Note:** When called for networked entities, a `CRemoveAllWeaponsEvent` will be created per request.
 * 
 * **This is the server-side RPC native equivalent of the client native [REMOVE_ALL_PED_WEAPONS](?\_0xF25DF915FA38C5F3).**
 * @param ped
 * @param p1
 */
export function removeAllPedWeapons(ped: number, p1: boolean): void { 
	return _in(0x00000000, 0xa44ce817, ped, p1); 
}

/**
 * Removes the blip from your map.
 * 
 * **This is the server-side RPC native equivalent of the client native [REMOVE_BLIP](?\_0x86A652570E5F25DD).**
 * @param blip
 */
export function removeBlip(blip: number): number { 
	return _in(0x00000000, 0xd8c3c1cd, _ii(blip)); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [REMOVE_WEAPON_COMPONENT_FROM_PED](?\_0x1E8BE90C74FB4C09).**
 * @param ped
 * @param weaponHash
 * @param componentHash
 */
export function removeWeaponComponentFromPed(ped: number, weaponHash: number, componentHash: number): void { 
	return _in(0x00000000, 0x412aa00d, ped, weaponHash, componentHash); 
}

/**
 * This native removes a specified weapon from your selected ped.
 * Weapon Hashes: pastebin.com/0wwDZgkF
 * Example:
 * C#:
 * Function.Call(Hash.REMOVE_WEAPON_FROM_PED, Game.Player.Character, 0x99B507EA);
 * C++:
 * WEAPON::REMOVE_WEAPON_FROM_PED(PLAYER::PLAYER_PED_ID(), 0x99B507EA);
 * The code above removes the knife from the player.
 * 
 * **This is the server-side RPC native equivalent of the client native [REMOVE_WEAPON_FROM_PED](?\_0x4899CB088EDF59B8).**
 * @param ped
 * @param weaponHash
 */
export function removeWeaponFromPed(ped: number, weaponHash: number): void { 
	return _in(0x00000000, 0x9c37f220, ped, weaponHash); 
}

/**
 * Requests the specified player to buy the passed SKU. This'll pop up a prompt on the client, which upon acceptance
 * will open the browser prompting further purchase details.
 * @param playerSrc
 * @param skuId
 */
export function requestPlayerCommerceSession(playerSrc: string, skuId: number): void { 
	return _in(0x00000000, 0x96f93cce, _ts(playerSrc), skuId); 
}

/**
 * Writes the specified data to a file in the specified resource.
 * Using a length of `-1` will automatically detect the length assuming the data is a C string.
 * @param resourceName
 * @param fileName
 * @param data
 * @param dataLength
 */
export function saveResourceFile(resourceName: string, fileName: string, data: string, dataLength: number): boolean { 
	return _in(0x00000000, 0xa09e7e7b, _ts(resourceName), _ts(fileName), _ts(data), dataLength, _r); 
}

/**
 * Scans the resources in the specified resource root. This function is only available in the 'monitor mode' process and is
 * not available for user resources.
 * @param rootPath
 * @param callback
 */
export function scanResourceRoot(rootPath: string, callback: any): void { 
	return _in(0x00000000, 0x636f097f, _ts(rootPath), _mfr(callback)); 
}

/**
 * Schedules the specified resource to run a tick as soon as possible, bypassing the server's fixed tick rate.
 * @param resourceName
 */
export function scheduleResourceTick(resourceName: string): void { 
	return _in(0x00000000, 0xb88a73ad, _ts(resourceName)); 
}

/**
 * <!--
 * _loc1_.map((name, idx) => `| ${idx} | ${name} | ![${name}](https://runtime.fivem.net/blips/${name}.svg) |`).join('\n')
 * -->
 * 
 * Sets the displayed sprite for a specific blip.
 * There's a [list of sprites](https://docs.fivem.net/game-references/blips/) on the FiveM documentation site.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_BLIP_SPRITE](?\_0xDF735600A4696DAF).**
 * @param blip
 * @param spriteId
 */
export function setBlipSprite(blip: number, spriteId: number): void { 
	return _in(0x00000000, 0x8dbbb0b9, blip, spriteId); 
}

export function setConvar(varName: string, value: string): void { 
	return _in(0x00000000, 0x341b16d2, _ts(varName), _ts(value)); 
}

/**
 * Used to replicate a server variable onto clients.
 * @param varName
 * @param value
 */
export function setConvarReplicated(varName: string, value: string): void { 
	return _in(0x00000000, 0xf292858c, _ts(varName), _ts(value)); 
}

export function setConvarServerInfo(varName: string, value: string): void { 
	return _in(0x00000000, 0x9338d547, _ts(varName), _ts(value)); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [SET_CURRENT_PED_WEAPON](?\_0xADF692B254977C0C).**
 * @param ped
 * @param weaponHash
 * @param bForceInHand
 */
export function setCurrentPedWeapon(ped: number, weaponHash: number, bForceInHand: boolean): void { 
	return _in(0x00000000, 0xb8278882, ped, weaponHash, bForceInHand); 
}

/**
 * Sets the coordinates (world position) for a specified entity, offset by the radius of the entity on the Z axis.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_ENTITY_COORDS](?\_0x06843DA7060A026B).**
 * @param entity
 * @param xPos
 * @param yPos
 * @param zPos
 * @param alive
 * @param deadFlag
 * @param ragdollFlag
 * @param clearArea
 */
export function setEntityCoords(entity: number, xPos: number, yPos: number, zPos: number, alive: boolean, deadFlag: boolean, ragdollFlag: boolean, clearArea: boolean): void { 
	return _in(0x00000000, 0xdf70b41b, entity, _fv(xPos), _fv(yPos), _fv(zPos), alive, deadFlag, ragdollFlag, clearArea); 
}

/**
 * It overrides the default distance culling radius of an entity. Set to `0.0` to reset.
 * If you want to interact with an entity outside of your players' scopes set the radius to a huge number.
 * @param entity
 * @param radius
 */
export function setEntityDistanceCullingRadius(entity: number, radius: number): void { 
	return _in(0x00000000, 0xd3a183a3, entity, _fv(radius)); 
}

/**
 * Set the heading of an entity in degrees also known as "Yaw".
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_ENTITY_HEADING](?\_0x8E2530AA8ADA980E).**
 * @param entity
 * @param heading
 */
export function setEntityHeading(entity: number, heading: number): void { 
	return _in(0x00000000, 0xe0ff064d, entity, _fv(heading)); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [SET_ENTITY_ROTATION](?\_0x8524A8B0171D5E07).**
 * @param entity
 * @param pitch
 * @param roll
 * @param yaw
 * @param rotationOrder
 * @param p5
 */
export function setEntityRotation(entity: number, pitch: number, roll: number, yaw: number, rotationOrder: number, p5: boolean): void { 
	return _in(0x00000000, 0x0a345efe, entity, _fv(pitch), _fv(roll), _fv(yaw), rotationOrder, p5); 
}

/**
 * Sets the routing bucket for the specified entity.
 * 
 * Routing buckets are also known as 'dimensions' or 'virtual worlds' in past echoes, however they are population-aware.
 * @param entity
 * @param bucket
 */
export function setEntityRoutingBucket(entity: number, bucket: number): void { 
	return _in(0x00000000, 0x635e5289, entity, bucket); 
}

/**
 * Note that the third parameter(denoted as z) is "up and down" with positive numbers encouraging upwards movement.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_ENTITY_VELOCITY](?\_0x1C99BB7B6E96D16F).**
 * @param entity
 * @param x
 * @param y
 * @param z
 */
export function setEntityVelocity(entity: number, x: number, y: number, z: number): void { 
	return _in(0x00000000, 0xff5a1988, entity, _fv(x), _fv(y), _fv(z)); 
}

export function setGameType(gametypeName: string): void { 
	return _in(0x00000000, 0xf90b7469, _ts(gametypeName)); 
}

export function setHttpHandler(handler: any): void { 
	return _in(0x00000000, 0xf5c6330c, _mfr(handler)); 
}

export function setMapName(mapName: string): void { 
	return _in(0x00000000, 0xb7ba82dc, _ts(mapName)); 
}

/**
 * NativeDB Added Parameter 4: BOOL p3
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_AMMO](?\_0x14E56BC5B5DB6A19).**
 * @param ped
 * @param weaponHash
 * @param ammo
 */
export function setPedAmmo(ped: number, weaponHash: number, ammo: number): void { 
	return _in(0x00000000, 0xbf90df1a, ped, weaponHash, ammo); 
}

/**
 * Sets the armor of the specified ped.
 * ped: The Ped to set the armor of.
 * amount: A value between 0 and 100 indicating the value to set the Ped's armor to.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_ARMOUR](?\_0xCEA04D83135264CC).**
 * @param ped
 * @param amount
 */
export function setPedArmour(ped: number, amount: number): void { 
	return _in(0x00000000, 0x4e3a0cc4, ped, amount); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [SET_PED_CAN_RAGDOLL](?\_0xB128377056A54E2A).**
 * @param ped
 * @param toggle
 */
export function setPedCanRagdoll(ped: number, toggle: boolean): void { 
	return _in(0x00000000, 0xcf1384c4, ped, toggle); 
}

/**
 * This native is used to set component variation on a ped. Components, drawables and textures IDs are related to the ped model.
 * 
 * ### MP Freemode list of components
 * 
 * **0**: Face\
 * **1**: Mask\
 * **2**: Hair\
 * **3**: Torso\
 * **4**: Leg\
 * **5**: Parachute / bag\
 * **6**: Shoes\
 * **7**: Accessory\
 * **8**: Undershirt\
 * **9**: Kevlar\
 * **10**: Badge\
 * **11**: Torso 2
 * 
 * ### Related and useful natives
 * 
 * [GET_NUMBER_OF_PED_DRAWABLE_VARIATIONS](#\_0x27561561732A7842)\
 * [GET_NUMBER_OF_PED_TEXTURE_VARIATIONS](#\_0x8F7156A3142A6BAD)
 * [List of component/props ID](gtaxscripting.blogspot.com/2016/04/gta-v-peds-component-and-props.html) of player_two with examples
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_COMPONENT_VARIATION](?\_0x262B14F48D29DE80).**
 * @param ped
 * @param componentId
 * @param drawableId
 * @param textureId
 * @param paletteId
 */
export function setPedComponentVariation(ped: number, componentId: number, drawableId: number, textureId: number, paletteId: number): void { 
	return _in(0x00000000, 0xd4f7b05c, ped, componentId, drawableId, textureId, paletteId); 
}

/**
 * cpp
 * // Potential names and hash collisions included as comments
 * enum ePedConfigFlags {
 * \_0x67D1A445 = 0,
 * \_0xC63DE95E = 1,
 * CPED_CONFIG_FLAG_NoCriticalHits = 2,
 * CPED_CONFIG_FLAG_DrownsInWater = 3,
 * CPED_CONFIG_FLAG_DisableReticuleFixedLockon = 4,
 * \_0x37D196F4 = 5,
 * \_0xE2462399 = 6,
 * CPED_CONFIG_FLAG_UpperBodyDamageAnimsOnly = 7,
 * \_0xEDDEB838 = 8,
 * \_0xB398B6FD = 9,
 * \_0xF6664E68 = 10,
 * \_0xA05E7CA3 = 11,
 * \_0xCE394045 = 12,
 * CPED_CONFIG_FLAG_NeverLeavesGroup = 13,
 * \_0xCD8D1411 = 14,
 * \_0xB031F1A9 = 15,
 * \_0xFE65BEE3 = 16,
 * CPED_CONFIG_FLAG_BlockNonTemporaryEvents = 17,
 * \_0x380165BD = 18,
 * \_0x07C045C7 = 19,
 * \_0x583B5E2D = 20,
 * \_0x475EDA58 = 21,
 * \_0x8629D05B = 22,
 * \_0x1522968B = 23,
 * CPED_CONFIG_FLAG_IgnoreSeenMelee = 24,
 * \_0x4CC09C4B = 25,
 * \_0x034F3053 = 26,
 * \_0xD91BA7CC = 27,
 * \_0x5C8DC66E = 28,
 * \_0x8902EAA0 = 29,
 * \_0x6580B9D2 = 30,
 * \_0x0EF7A297 = 31,
 * \_0x6BF86E5B = 32,
 * CPED_CONFIG_FLAG_DieWhenRagdoll = 33,
 * CPED_CONFIG_FLAG_HasHelmet = 34,
 * CPED_CONFIG_FLAG_UseHelmet = 35,
 * \_0xEEB3D630 = 36,
 * \_0xB130D17B = 37,
 * \_0x5F071200 = 38,
 * CPED_CONFIG_FLAG_DisableEvasiveDives = 39,
 * \_0xC287AAFF = 40,
 * \_0x203328CC = 41,
 * CPED_CONFIG_FLAG_DontInfluenceWantedLevel = 42,
 * CPED_CONFIG_FLAG_DisablePlayerLockon = 43,
 * CPED_CONFIG_FLAG_DisableLockonToRandomPeds = 44,
 * \_0xEC4A8ACF = 45,
 * \_0xDB115BFA = 46,
 * CPED_CONFIG_FLAG_PedBeingDeleted = 47,
 * CPED_CONFIG_FLAG_BlockWeaponSwitching = 48,
 * \_0xF8E99565 = 49,
 * \_0xDD17FEE6 = 50,
 * \_0x7ED9B2C9 = 51,
 * \_0x655E8618 = 52,
 * \_0x5A6C1F6E = 53,
 * \_0xD749FC41 = 54,
 * \_0x357F63F3 = 55,
 * \_0xC5E60961 = 56,
 * \_0x29275C3E = 57,
 * CPED_CONFIG_FLAG_IsFiring = 58,
 * CPED_CONFIG_FLAG_WasFiring = 59,
 * CPED_CONFIG_FLAG_IsStanding = 60,
 * CPED_CONFIG_FLAG_WasStanding = 61,
 * CPED_CONFIG_FLAG_InVehicle = 62,
 * CPED_CONFIG_FLAG_OnMount = 63,
 * CPED_CONFIG_FLAG_AttachedToVehicle = 64,
 * CPED_CONFIG_FLAG_IsSwimming = 65,
 * CPED_CONFIG_FLAG_WasSwimming = 66,
 * CPED_CONFIG_FLAG_IsSkiing = 67,
 * CPED_CONFIG_FLAG_IsSitting = 68,
 * CPED_CONFIG_FLAG_KilledByStealth = 69,
 * CPED_CONFIG_FLAG_KilledByTakedown = 70,
 * CPED_CONFIG_FLAG_Knockedout = 71,
 * \_0x3E3C4560 = 72,
 * \_0x2994C7B7 = 73,
 * \_0x6D59D275 = 74,
 * CPED_CONFIG_FLAG_UsingCoverPoint = 75,
 * CPED_CONFIG_FLAG_IsInTheAir = 76,
 * \_0x2D493FB7 = 77,
 * CPED_CONFIG_FLAG_IsAimingGun = 78,
 * \_0x14D69875 = 79,
 * \_0x40B05311 = 80,
 * \_0x8B230BC5 = 81,
 * \_0xC74E5842 = 82,
 * \_0x9EA86147 = 83,
 * \_0x674C746C = 84,
 * \_0x3E56A8C2 = 85,
 * \_0xC144A1EF = 86,
 * \_0x0548512D = 87,
 * \_0x31C93909 = 88,
 * \_0xA0269315 = 89,
 * \_0xD4D59D4D = 90,
 * \_0x411D4420 = 91,
 * \_0xDF4AEF0D = 92,
 * CPED_CONFIG_FLAG_ForcePedLoadCover = 93,
 * \_0x300E4CD3 = 94,
 * \_0xF1C5BF04 = 95,
 * \_0x89C2EF13 = 96,
 * CPED_CONFIG_FLAG_VaultFromCover = 97,
 * \_0x02A852C8 = 98,
 * \_0x3D9407F1 = 99,
 * \_0x319B4558 = 100,
 * CPED_CONFIG_FLAG_ForcedAim = 101,
 * \_0xB942D71A = 102,
 * \_0xD26C55A8 = 103,
 * \_0xB89E703B = 104,
 * CPED_CONFIG_FLAG_ForceReload = 105,
 * \_0xD9E73DA2 = 106,
 * \_0xFF71DC2C = 107,
 * \_0x1E27E8D8 = 108,
 * \_0xF2C53966 = 109,
 * \_0xC4DBE247 = 110,
 * \_0x83C0A4BF = 111,
 * \_0x0E0FAF8C = 112,
 * \_0x26616660 = 113,
 * \_0x43B80B79 = 114,
 * \_0x0D2A9309 = 115,
 * \_0x12C1C983 = 116,
 * CPED_CONFIG_FLAG_BumpedByPlayer = 117,
 * \_0xE586D504 = 118,
 * \_0x52374204 = 119,
 * CPED_CONFIG_FLAG_IsHandCuffed = 120,
 * CPED_CONFIG_FLAG_IsAnkleCuffed = 121,
 * CPED_CONFIG_FLAG_DisableMelee = 122,
 * \_0xFE714397 = 123,
 * \_0xB3E660BD = 124,
 * \_0x5FED6BFD = 125,
 * \_0xC9D6F66F = 126,
 * \_0x519BC986 = 127,
 * CPED_CONFIG_FLAG_CanBeAgitated = 128,
 * \_0x9A4B617C = 129, // CPED_CONFIG_FLAG_FaceDirInsult
 * \_0xDAB70E9F = 130,
 * \_0xE569438A = 131,
 * \_0xBBC77D6D = 132,
 * \_0xCB59EF0F = 133,
 * \_0x8C5EA971 = 134,
 * CPED_CONFIG_FLAG_IsScuba = 135,
 * CPED_CONFIG_FLAG_WillArrestRatherThanJack = 136,
 * \_0xDCE59B58 = 137,
 * CPED_CONFIG_FLAG_RidingTrain = 138,
 * CPED_CONFIG_FLAG_ArrestResult = 139,
 * CPED_CONFIG_FLAG_CanAttackFriendly = 140,
 * \_0x98A4BE43 = 141,
 * \_0x6901E731 = 142,
 * \_0x9EC9BF6C = 143,
 * \_0x42841A8F = 144,
 * CPED_CONFIG_FLAG_ShootingAnimFlag = 145,
 * CPED_CONFIG_FLAG_DisableLadderClimbing = 146,
 * CPED_CONFIG_FLAG_StairsDetected = 147,
 * CPED_CONFIG_FLAG_SlopeDetected = 148,
 * \_0x1A15670B = 149,
 * \_0x61786EE5 = 150,
 * \_0xCB9186BD = 151,
 * \_0xF0710152 = 152,
 * \_0x43DFE310 = 153,
 * \_0xC43C624E = 154,
 * CPED_CONFIG_FLAG_CanPerformArrest = 155,
 * CPED_CONFIG_FLAG_CanPerformUncuff = 156,
 * CPED_CONFIG_FLAG_CanBeArrested = 157,
 * \_0xF7960FF5 = 158,
 * \_0x59564113 = 159,
 * \_0x0C6C3099 = 160,
 * \_0x645F927A = 161,
 * \_0xA86549B9 = 162,
 * \_0x8AAF337A = 163,
 * \_0x13BAA6E7 = 164,
 * \_0x5FB9D1F5 = 165,
 * CPED_CONFIG_FLAG_IsInjured = 166,
 * \_0x6398A20B = 167,
 * \_0xD8072639 = 168,
 * \_0xA05B1845 = 169,
 * \_0x83F6D220 = 170,
 * \_0xD8430331 = 171,
 * \_0x4B547520 = 172,
 * \_0xE66E1406 = 173,
 * \_0x1C4BFE0C = 174,
 * \_0x90008BFA = 175,
 * \_0x07C7A910 = 176,
 * \_0xF15F8191 = 177,
 * \_0xCE4E8BE2 = 178,
 * \_0x1D46E4F2 = 179,
 * CPED_CONFIG_FLAG_IsInCustody = 180,
 * \_0xE4FD9B3A = 181,
 * \_0x67AE0812 = 182,
 * CPED_CONFIG_FLAG_IsAgitated = 183,
 * CPED_CONFIG_FLAG_PreventAutoShuffleToDriversSeat = 184,
 * \_0x7B2D325E = 185,
 * CPED_CONFIG_FLAG_EnableWeaponBlocking = 186,
 * CPED_CONFIG_FLAG_HasHurtStarted = 187,
 * CPED_CONFIG_FLAG_DisableHurt = 188,
 * CPED_CONFIG_FLAG_PlayerIsWeird = 189,
 * \_0x32FC208B = 190,
 * \_0x0C296E5A = 191,
 * \_0xE63B73EC = 192,
 * \_0x04E9CC80 = 193,
 * CPED_CONFIG_FLAG_UsingScenario = 194,
 * CPED_CONFIG_FLAG_VisibleOnScreen = 195,
 * \_0xD88C58A1 = 196,
 * \_0x5A3DCF43 = 197, // CPED_CONFIG_FLAG_AvoidUnderSide
 * \_0xEA02B420 = 198,
 * \_0x3F559CFF = 199,
 * \_0x8C55D029 = 200,
 * \_0x5E6466F6 = 201,
 * \_0xEB5AD706 = 202,
 * \_0x0EDDDDE7 = 203,
 * \_0xA64F7B1D = 204,
 * \_0x48532CBA = 205,
 * \_0xAA25A9E7 = 206,
 * \_0x415B26B9 = 207,
 * CPED_CONFIG_FLAG_DisableExplosionReactions = 208,
 * CPED_CONFIG_FLAG_DodgedPlayer = 209,
 * \_0x67405504 = 210,
 * \_0x75DDD68C = 211,
 * \_0x2AD879B4 = 212,
 * \_0x51486F91 = 213,
 * \_0x32F79E21 = 214,
 * \_0xBF099213 = 215,
 * \_0x054AC8E2 = 216,
 * \_0x14E495CC = 217,
 * \_0x3C7DF9DF = 218,
 * \_0x848FFEF2 = 219,
 * CPED_CONFIG_FLAG_DontEnterLeadersVehicle = 220,
 * \_0x2618E1CF = 221,
 * \_0x84F722FA = 222,
 * \_0xD1B87B1F = 223,
 * \_0x728AA918 = 224,
 * CPED_CONFIG_FLAG_DisablePotentialToBeWalkedIntoResponse = 225,
 * CPED_CONFIG_FLAG_DisablePedAvoidance = 226,
 * \_0x59E91185 = 227,
 * \_0x1EA7225F = 228,
 * CPED_CONFIG_FLAG_DisablePanicInVehicle = 229,
 * \_0x6DCA7D88 = 230,
 * \_0xFC3E572D = 231,
 * \_0x08E9F9CF = 232,
 * \_0x2D3BA52D = 233,
 * \_0xFD2F53EA = 234,
 * \_0x31A1B03B = 235,
 * CPED_CONFIG_FLAG_IsHoldingProp = 236,
 * \_0x82ED0A66 = 237, // CPED_CONFIG_FLAG_BlocksPathingWhenDead
 * \_0xCE57C9A3 = 238,
 * \_0x26149198 = 239,
 * \_0x1B33B598 = 240,
 * \_0x719B6E87 = 241,
 * \_0x13E8E8E8 = 242,
 * \_0xF29739AE = 243,
 * \_0xABEA8A74 = 244,
 * \_0xB60EA2BA = 245,
 * \_0x536B0950 = 246,
 * \_0x0C754ACA = 247,
 * CPED_CONFIG_FLAG_DisableVehicleSeatRandomAnimations = 248,
 * \_0x12659168 = 249,
 * \_0x1BDF2F04 = 250,
 * \_0x7728FAA3 = 251,
 * \_0x6A807ED8 = 252,
 * CPED_CONFIG_FLAG_OnStairs = 253,
 * \_0xE1A2F73F = 254,
 * \_0x5B3697C8 = 255,
 * \_0xF1EB20A9 = 256,
 * \_0x8B7DF407 = 257,
 * \_0x329DCF1A = 258,
 * \_0x8D90DD1B = 259,
 * \_0xB8A292B7 = 260,
 * \_0x8374B087 = 261,
 * \_0x2AF558F0 = 262,
 * \_0x82251455 = 263,
 * \_0x30CF498B = 264,
 * \_0xE1CD50AF = 265,
 * \_0x72E4AE48 = 266,
 * \_0xC2657EA1 = 267,
 * \_0x29FF6030 = 268,
 * \_0x8248A5EC = 269,
 * CPED_CONFIG_FLAG_OnStairSlope = 270,
 * \_0xA0897933 = 271,
 * CPED_CONFIG_FLAG_DontBlipCop = 272,
 * CPED_CONFIG_FLAG_ClimbedShiftedFence = 273,
 * \_0xF7823618 = 274,
 * \_0xDC305CCE = 275, // CPED_CONFIG_FLAG_KillWhenTrapped
 * CPED_CONFIG_FLAG_EdgeDetected = 276,
 * \_0x92B67896 = 277,
 * \_0xCAD677C9 = 278,
 * CPED_CONFIG_FLAG_AvoidTearGas = 279,
 * \_0x5276AC7B = 280,
 * \_0x1032692A = 281,
 * \_0xDA23E7F1 = 282,
 * \_0x9139724D = 283,
 * \_0xA1457461 = 284,
 * \_0x4186E095 = 285,
 * \_0xAC68E2EB = 286,
 * CPED_CONFIG_FLAG_RagdollingOnBoat = 287,
 * CPED_CONFIG_FLAG_HasBrandishedWeapon = 288,
 * \_0x1B9EE8A1 = 289,
 * \_0xF3F5758C = 290,
 * \_0x2A9307F1 = 291,
 * \_0x7403D216 = 292,
 * \_0xA06A3C6C = 293,
 * CPED_CONFIG_FLAG_DisableShockingEvents = 294,
 * \_0xF8DA25A5 = 295,
 * \_0x7EF55802 = 296,
 * \_0xB31F1187 = 297,
 * \_0x84315402 = 298,
 * \_0x0FD69867 = 299,
 * \_0xC7829B67 = 300,
 * CPED_CONFIG_FLAG_DisablePedConstraints = 301,
 * \_0x6D23CF25 = 302,
 * \_0x2ADA871B = 303,
 * \_0x47BC8A58 = 304,
 * \_0xEB692FA5 = 305,
 * \_0x4A133C50 = 306,
 * \_0xC58099C3 = 307,
 * \_0xF3D76D41 = 308,
 * \_0xB0EEE9F2 = 309,
 * CPED_CONFIG_FLAG_IsInCluster = 310,
 * \_0x0FA153EF = 311,
 * \_0xD73F5CD3 = 312,
 * \_0xD4136C22 = 313,
 * \_0xE404CA6B = 314,
 * \_0xB9597446 = 315,
 * \_0xD5C98277 = 316,
 * \_0xD5060A9C = 317,
 * \_0x3E5F1CBB = 318,
 * \_0xD8BE1D54 = 319,
 * \_0x0B1F191F = 320,
 * \_0xC995167A = 321,
 * CPED_CONFIG_FLAG_HasHighHeels = 322,
 * \_0x86B01E54 = 323,
 * \_0x3A56FE15 = 324,
 * \_0xC03B736C = 325, // CPED_CONFIG_FLAG_SpawnedAtScenario
 * \_0xBBF47729 = 326,
 * \_0x22B668A8 = 327,
 * \_0x2624D4D4 = 328,
 * CPED_CONFIG_FLAG_DisableTalkTo = 329,
 * CPED_CONFIG_FLAG_DontBlip = 330,
 * CPED_CONFIG_FLAG_IsSwitchingWeapon = 331,
 * \_0x630F55F3 = 332,
 * \_0x150468FD = 333,
 * \_0x914EBD6B = 334,
 * \_0x79AF3B6D = 335,
 * \_0x75C7A632 = 336,
 * \_0x52D530E2 = 337,
 * \_0xDB2A90E0 = 338,
 * \_0x5922763D = 339,
 * \_0x12ADB567 = 340,
 * \_0x105C8518 = 341,
 * \_0x106F703D = 342,
 * \_0xED152C3E = 343,
 * \_0xA0EFE6A8 = 344,
 * \_0xBF348C82 = 345,
 * \_0xCDDFE830 = 346,
 * \_0x7B59BD9B = 347,
 * \_0x0124C788 = 348,
 * CPED_CONFIG_FLAG_EquipJetpack = 349,
 * \_0x08D361A5 = 350,
 * \_0xE13D1F7C = 351,
 * \_0x40E25FB9 = 352,
 * \_0x930629D9 = 353,
 * \_0xECCF0C7F = 354,
 * \_0xB6E9613B = 355,
 * \_0x490C0478 = 356,
 * \_0xE8865BEA = 357,
 * \_0xF3C34A29 = 358,
 * CPED_CONFIG_FLAG_IsDuckingInVehicle = 359,
 * \_0xF660E115 = 360,
 * \_0xAB0E6DED = 361,
 * CPED_CONFIG_FLAG_HasReserveParachute = 362,
 * CPED_CONFIG_FLAG_UseReserveParachute = 363,
 * \_0x5C5D9CD3 = 364,
 * \_0x8F7701F3 = 365,
 * \_0xBC4436AD = 366,
 * \_0xD7E07D37 = 367,
 * \_0x03C4FD24 = 368,
 * \_0x7675789A = 369,
 * \_0xB7288A88 = 370,
 * \_0xC06B6291 = 371,
 * \_0x95A4A805 = 372,
 * \_0xA8E9A042 = 373,
 * CPED_CONFIG_FLAG_NeverLeaveTrain = 374,
 * \_0xBAC674B3 = 375,
 * \_0x147F1FFB = 376,
 * \_0x4376DD79 = 377,
 * \_0xCD3DB518 = 378,
 * \_0xFE4BA4B6 = 379,
 * \_0x5DF03A55 = 380,
 * \_0xBCD816CD = 381,
 * \_0xCF02DD69 = 382,
 * \_0xF73AFA2E = 383,
 * \_0x80B9A9D0 = 384,
 * \_0xF601F7EE = 385,
 * \_0xA91350FC = 386,
 * \_0x3AB23B96 = 387,
 * CPED_CONFIG_FLAG_IsClimbingLadder = 388,
 * CPED_CONFIG_FLAG_HasBareFeet = 389,
 * \_0xB4B1CD4C = 390,
 * \_0x5459AFB8 = 391,
 * \_0x54F27667 = 392,
 * \_0xC11D3E8F = 393,
 * \_0x5419EB3E = 394,
 * \_0x82D8DBB4 = 395,
 * \_0x33B02D2F = 396,
 * \_0xAE66176D = 397,
 * \_0xA2692593 = 398,
 * \_0x714C7E31 = 399,
 * \_0xEC488AC7 = 400,
 * \_0xAE398504 = 401,
 * \_0xABC58D72 = 402,
 * \_0x5E5B9591 = 403,
 * \_0x6BA1091E = 404,
 * \_0x77840177 = 405,
 * \_0x1C7ACAC4 = 406,
 * \_0x124420E9 = 407,
 * \_0x75A65587 = 408,
 * \_0xDFD2D55B = 409,
 * \_0xBDD39919 = 410,
 * \_0x43DEC267 = 411,
 * \_0xE42B7797 = 412,
 * CPED_CONFIG_FLAG_IsHolsteringWeapon = 413,
 * \_0x4F8149F5 = 414,
 * \_0xDD9ECA7A = 415,
 * \_0x9E7EF9D2 = 416,
 * \_0x2C6ED942 = 417,
 * CPED_CONFIG_FLAG_IsSwitchingHelmetVisor = 418,
 * \_0xA488727D = 419,
 * \_0xCFF5F6DE = 420,
 * \_0x6D614599 = 421,
 * CPED_CONFIG_FLAG_DisableVehicleCombat = 422,
 * \_0xFE401D26 = 423,
 * CPED_CONFIG_FLAG_FallsLikeAircraft = 424,
 * \_0x2B42AE82 = 425,
 * \_0x7A95734F = 426,
 * \_0xDF4D8617 = 427,
 * \_0x578F1F14 = 428,
 * CPED_CONFIG_FLAG_DisableStartEngine = 429,
 * CPED_CONFIG_FLAG_IgnoreBeingOnFire = 430,
 * \_0x153C9500 = 431,
 * \_0xCB7A632E = 432,
 * \_0xDE727981 = 433,
 * CPED_CONFIG_FLAG_DisableHomingMissileLockon = 434,
 * \_0x12BBB935 = 435,
 * \_0xAD0A1277 = 436,
 * \_0xEA6AA46A = 437,
 * CPED_CONFIG_FLAG_DisableHelmetArmor = 438,
 * \_0xCB7F3A1E = 439,
 * \_0x50178878 = 440,
 * \_0x051B4F0D = 441,
 * \_0x2FC3DECC = 442,
 * \_0xC0030B0B = 443,
 * \_0xBBDAF1E9 = 444,
 * \_0x944FE59C = 445,
 * \_0x506FBA39 = 446,
 * \_0xDD45FE84 = 447,
 * \_0xE698AE75 = 448,
 * \_0x199633F8 = 449,
 * CPED_CONFIG_FLAG_PedIsArresting = 450,
 * CPED_CONFIG_FLAG_IsDecoyPed = 451,
 * \_0x3A251D83 = 452,
 * \_0xA56F6986 = 453,
 * \_0x1D19C622 = 454,
 * \_0xB68D3EAB = 455,
 * CPED_CONFIG_FLAG_CanBeIncapacitated = 456,
 * \_0x4BD5EBAD = 457,
 * }
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_CONFIG_FLAG](?\_0x1913FE4CBF41C463).**
 * @param ped
 * @param flagId
 * @param value
 */
export function setPedConfigFlag(ped: number, flagId: number, value: boolean): void { 
	return _in(0x00000000, 0x9cfbe10d, ped, flagId, value); 
}

/**
 * Sets Ped Default Clothes
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_DEFAULT_COMPONENT_VARIATION](?\_0x45EEE61580806D63).**
 * @param ped
 */
export function setPedDefaultComponentVariation(ped: number): void { 
	return _in(0x00000000, 0xc866a984, ped); 
}

/**
 * Used for freemode (online) characters.
 * Indices:
 * 
 * 1.  black
 * 2.  very light blue/green
 * 3.  dark blue
 * 4.  brown
 * 5.  darker brown
 * 6.  light brown
 * 7.  blue
 * 8.  light blue
 * 9.  pink
 * 10. yellow
 * 11. purple
 * 12. black
 * 13. dark green
 * 14. light brown
 * 15. yellow/black pattern
 * 16. light colored spiral pattern
 * 17. shiny red
 * 18. shiny half blue/half red
 * 19. half black/half light blue
 * 20. white/red perimter
 * 21. green snake
 * 22. red snake
 * 23. dark blue snake
 * 24. dark yellow
 * 25. bright yellow
 * 26. all black
 * 27. red small pupil
 * 28. devil blue/black
 * 29. white small pupil
 * 30. glossed over
 * 
 * **This is the server-side RPC native equivalent of the client native [\_SET_PED_EYE_COLOR](?\_0x50B56988B170AFDF).**
 * @param ped
 * @param index
 */
export function setPedEyeColor(ped: number, index: number): void { 
	return _in(0x00000000, 0xec09db1b, ped, index); 
}

/**
 * Sets the various freemode face features, e.g. nose length, chin shape.
 * **Indexes (From 0 to 19):**
 * Parentheses indicate morph scale/direction as in (-1.0 to 1.0)
 * 
 * *   **0**: Nose Width (Thin/Wide)
 * *   **1**: Nose Peak (Up/Down)
 * *   **2**: Nose Length (Long/Short)
 * *   **3**: Nose Bone Curveness (Crooked/Curved)
 * *   **4**: Nose Tip (Up/Down)
 * *   **5**: Nose Bone Twist (Left/Right)
 * *   **6**: Eyebrow (Up/Down)
 * *   **7**: Eyebrow (In/Out)
 * *   **8**: Cheek Bones (Up/Down)
 * *   **9**: Cheek Sideways Bone Size (In/Out)
 * *   **10**: Cheek Bones Width (Puffed/Gaunt)
 * *   **11**: Eye Opening (Both) (Wide/Squinted)
 * *   **12**: Lip Thickness (Both) (Fat/Thin)
 * *   **13**: Jaw Bone Width (Narrow/Wide)
 * *   **14**: Jaw Bone Shape (Round/Square)
 * *   **15**: Chin Bone (Up/Down)
 * *   **16**: Chin Bone Length (In/Out or Backward/Forward)
 * *   **17**: Chin Bone Shape (Pointed/Square)
 * *   **18**: Chin Hole (Chin Bum)
 * *   **19**: Neck Thickness (Thin/Thick)
 * **Note:**
 * You may need to call [`SetPedHeadBlendData`](#0x9414E18B9434C2FE) prior to calling this native in order for it to work.
 * 
 * **This is the server-side RPC native equivalent of the client native [\_SET_PED_FACE_FEATURE](?\_0x71A5C1DBA060049E).**
 * @param ped
 * @param index
 * @param scale
 */
export function setPedFaceFeature(ped: number, index: number, scale: number): void { 
	return _in(0x00000000, 0x6c8d4458, ped, index, _fv(scale)); 
}

/**
 * Used for freemode (online) characters.
 * 
 * **This is the server-side RPC native equivalent of the client native [\_SET_PED_HAIR_COLOR](?\_0x4CFFC65454C93A49).**
 * @param ped
 * @param colorID
 * @param highlightColorID
 */
export function setPedHairColor(ped: number, colorID: number, highlightColorID: number): void { 
	return _in(0x00000000, 0xbb43f090, ped, colorID, highlightColorID); 
}

/**
 * For more info please refer to [this](https://gtaforums.com/topic/858970-all-gtao-face-ids-pedset-ped-head-blend-data-explained) topic.
 * **Other information:**
 * IDs start at zero and go Male Non-DLC, Female Non-DLC, Male DLC, and Female DLC.</br>
 * This native function is often called prior to calling natives such as:
 * 
 * *   [`SetPedHairColor`](#0xBB43F090)
 * *   [`SetPedHeadOverlayColor`](#0x78935A27)
 * *   [`SetPedHeadOverlay`](#0xD28DBA90)
 * *   [`SetPedFaceFeature`](#0x6C8D4458)
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_HEAD_BLEND_DATA](?\_0x9414E18B9434C2FE).**
 * @param ped
 * @param shapeFirstID
 * @param shapeSecondID
 * @param shapeThirdID
 * @param skinFirstID
 * @param skinSecondID
 * @param skinThirdID
 * @param shapeMix
 * @param skinMix
 * @param thirdMix
 * @param isParent
 */
export function setPedHeadBlendData(ped: number, shapeFirstID: number, shapeSecondID: number, shapeThirdID: number, skinFirstID: number, skinSecondID: number, skinThirdID: number, shapeMix: number, skinMix: number, thirdMix: number, isParent: boolean): void { 
	return _in(0x00000000, 0x60746b88, ped, shapeFirstID, shapeSecondID, shapeThirdID, skinFirstID, skinSecondID, skinThirdID, _fv(shapeMix), _fv(skinMix), _fv(thirdMix), isParent); 
}

/**
 * ```
 * OverlayID ranges from 0 to 12, index from 0 to _GET_NUM_OVERLAY_VALUES(overlayID)-1, and opacity from 0.0 to 1.0.
 * overlayID       Part                  Index, to disable
 * 0               Blemishes             0 - 23, 255
 * 1               Facial Hair           0 - 28, 255
 * 2               Eyebrows              0 - 33, 255
 * 3               Ageing                0 - 14, 255
 * 4               Makeup                0 - 74, 255
 * 5               Blush                 0 - 6, 255
 * 6               Complexion            0 - 11, 255
 * 7               Sun Damage            0 - 10, 255
 * 8               Lipstick              0 - 9, 255
 * 9               Moles/Freckles        0 - 17, 255
 * 10              Chest Hair            0 - 16, 255
 * 11              Body Blemishes        0 - 11, 255
 * 12              Add Body Blemishes    0 - 1, 255
 * ```
 * 
 * **Note:**
 * You may need to call [`SetPedHeadBlendData`](#0x9414E18B9434C2FE) prior to calling this native in order for it to work.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_HEAD_OVERLAY](?\_0x48F44967FA05CC1E).**
 * @param ped
 * @param overlayID
 * @param index
 * @param opacity
 */
export function setPedHeadOverlay(ped: number, overlayID: number, index: number, opacity: number): void { 
	return _in(0x00000000, 0xd28dba90, ped, overlayID, index, _fv(opacity)); 
}

/**
 * ```
 * Used for freemode (online) characters.
 * Called after SET_PED_HEAD_OVERLAY().
 * ```
 * 
 * **Note:**
 * You may need to call [`SetPedHeadBlendData`](#0x9414E18B9434C2FE) prior to calling this native in order for it to work.
 * 
 * **This is the server-side RPC native equivalent of the client native [\_SET_PED_HEAD_OVERLAY_COLOR](?\_0x497BF74A7B9CB952).**
 * @param ped
 * @param overlayID
 * @param colorType
 * @param colorID
 * @param secondColorID
 */
export function setPedHeadOverlayColor(ped: number, overlayID: number, colorType: number, colorID: number, secondColorID: number): void { 
	return _in(0x00000000, 0x78935a27, ped, overlayID, colorType, colorID, secondColorID); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [SET_PED_INTO_VEHICLE](?\_0xF75B0D629E1C063D).**
 * @param ped
 * @param vehicle
 * @param seatIndex
 */
export function setPedIntoVehicle(ped: number, vehicle: number, seatIndex: number): void { 
	return _in(0x00000000, 0x07500c79, ped, vehicle, seatIndex); 
}

/**
 * This native is used to set prop variation on a ped. Components, drawables and textures IDs are related to the ped model.
 * 
 * ### MP Freemode list of props
 * 
 * **0**: Hat\
 * **1**: Glass\
 * **2**: Ear\
 * **6**: Watch\
 * **7**: Bracelet
 * 
 * ### Related and useful natives
 * 
 * [GET_NUMBER_OF_PED_PROP_DRAWABLE_VARIATIONS](#\_0x5FAF9754E789FB47)\
 * [GET_NUMBER_OF_PED_PROP_TEXTURE_VARIATIONS](#\_0xA6E7F1CEB523E171)
 * [List of component/props ID](https://gtaxscripting.blogspot.com/2016/04/gta-v-peds-component-and-props.html) of player_two with examples
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_PROP_INDEX](?\_0x93376B65A266EB5F).**
 * @param ped
 * @param componentId
 * @param drawableId
 * @param textureId
 * @param attach
 */
export function setPedPropIndex(ped: number, componentId: number, drawableId: number, textureId: number, attach: boolean): void { 
	return _in(0x00000000, 0x0829f2e2, ped, componentId, drawableId, textureId, attach); 
}

/**
 * p1 is always 0 in R\* scripts; and a quick disassembly seems to indicate that p1 is unused.
 * List of component/props ID:
 * gtaxscripting.blogspot.com/2016/04/gta-v-peds-component-and-props.html
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_RANDOM_COMPONENT_VARIATION](?\_0xC8A9481A01E63C28).**
 * @param ped
 * @param p1
 */
export function setPedRandomComponentVariation(ped: number, p1: number): void { 
	return _in(0x00000000, 0x4111ba46, ped, p1); 
}

/**
 * List of component/props ID
 * gtaxscripting.blogspot.com/2016/04/gta-v-peds-component-and-props.html
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_RANDOM_PROPS](?\_0xC44AA05345C992C6).**
 * @param ped
 */
export function setPedRandomProps(ped: number): void { 
	return _in(0x00000000, 0xe3318e0e, ped); 
}

/**
 * PED::SET_PED_RESET_FLAG(PLAYER::PLAYER_PED_ID(), 240, 1);
 * Known values:
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_RESET_FLAG](?\_0xC1E8A365BF3B29F2).**
 * @param ped
 * @param flagId
 * @param doReset
 */
export function setPedResetFlag(ped: number, flagId: number, doReset: boolean): void { 
	return _in(0x00000000, 0xcff6ff66, ped, flagId, doReset); 
}

/**
 * p4/p5: Unusued in TU27
 * 
 * ### Ragdoll Types
 * 
 * **0**: CTaskNMRelax
 * **1**: CTaskNMScriptControl: Hardcoded not to work in networked environments.
 * **Else**: CTaskNMBalance
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_TO_RAGDOLL](?\_0xAE99FB955581844A).**
 * @param ped
 * @param time1
 * @param time2
 * @param ragdollType
 * @param p4
 * @param p5
 * @param p6
 */
export function setPedToRagdoll(ped: number, time1: number, time2: number, ragdollType: number, p4: boolean, p5: boolean, p6: boolean): void { 
	return _in(0x00000000, 0x83cb5052, ped, time1, time2, ragdollType, p4, p5, p6); 
}

/**
 * Return variable is never used in R\*'s scripts.
 * Not sure what p2 does. It seems like it would be a time judging by it's usage in R\*'s scripts, but didn't seem to affect anything in my testings.
 * x, y, and z are coordinates, most likely to where the ped will fall.
 * p7 is probably the force of the fall, but untested, so I left the variable name the same.
 * p8 to p13 are always 0f in R\*'s scripts.
 * (Simplified) Example of the usage of the function from R\*'s scripts:
 * ped::set_ped_to_ragdoll_with_fall(ped, 1500, 2000, 1, -entity::get_entity_forward_vector(ped), 1f, 0f, 0f, 0f, 0f, 0f, 0f);
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_TO_RAGDOLL_WITH_FALL](?\_0xD76632D99E4966C8).**
 * @param ped
 * @param time
 * @param p2
 * @param ragdollType
 * @param x
 * @param y
 * @param z
 * @param p7
 * @param p8
 * @param p9
 * @param p10
 * @param p11
 * @param p12
 * @param p13
 */
export function setPedToRagdollWithFall(ped: number, time: number, p2: number, ragdollType: number, x: number, y: number, z: number, p7: number, p8: number, p9: number, p10: number, p11: number, p12: number, p13: number): void { 
	return _in(0x00000000, 0xfa12e286, ped, time, p2, ragdollType, _fv(x), _fv(y), _fv(z), _fv(p7), _fv(p8), _fv(p9), _fv(p10), _fv(p11), _fv(p12), _fv(p13)); 
}

/**
 * Flags:
 * SPC_AMBIENT_SCRIPT = (1 << 1),
 * SPC_CLEAR_TASKS = (1 << 2),
 * SPC_REMOVE_FIRES = (1 << 3),
 * SPC_REMOVE_EXPLOSIONS = (1 << 4),
 * SPC_REMOVE_PROJECTILES = (1 << 5),
 * SPC_DEACTIVATE_GADGETS = (1 << 6),
 * SPC_REENABLE_CONTROL_ON_DEATH = (1 << 7),
 * SPC_LEAVE_CAMERA_CONTROL_ON = (1 << 8),
 * SPC_ALLOW_PLAYER_DAMAGE = (1 << 9),
 * SPC_DONT_STOP_OTHER_CARS_AROUND_PLAYER = (1 << 10),
 * SPC_PREVENT_EVERYBODY_BACKOFF = (1 << 11),
 * SPC_ALLOW_PAD_SHAKE = (1 << 12)
 * See: https://alloc8or.re/gta5/doc/enums/eSetPlayerControlFlag.txt
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PLAYER_CONTROL](?\_0x8D32347D6D4C40A2).**
 * @param player
 * @param bHasControl
 * @param flags
 */
export function setPlayerControl(player: number, bHasControl: boolean, flags: number): void { 
	return _in(0x00000000, 0xd17afcd8, player, bHasControl, flags); 
}

/**
 * Sets the culling radius for the specified player.
 * Set to `0.0` to reset.
 * @param playerSrc
 * @param radius
 */
export function setPlayerCullingRadius(playerSrc: string, radius: number): void { 
	return _in(0x00000000, 0x8a2fbad4, _ts(playerSrc), _fv(radius)); 
}

/**
 * Simply sets you as invincible (Health will not deplete).
 * Use 0x733A643B5B0C53C1 instead if you want Ragdoll enabled, which is equal to:
 * \*(DWORD \*)(playerPedAddress + 0x188) |= (1 << 9);
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PLAYER_INVINCIBLE](?\_0x239528EACDC3E7DE).**
 * @param player
 * @param toggle
 */
export function setPlayerInvincible(player: number, toggle: boolean): void { 
	return _in(0x00000000, 0xdfb9a2a2, player, toggle); 
}

/**
 * Set the model for a specific Player. Note that this will destroy the current Ped for the Player and create a new one, any reference to the old ped will be invalid after calling this.
 * As per usual, make sure to request the model first and wait until it has loaded.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PLAYER_MODEL](?\_0x00A1CADD00108836).**
 * @param player
 * @param model
 */
export function setPlayerModel(player: number, model: number): void { 
	return _in(0x00000000, 0x774a4c54, player, model); 
}

/**
 * Sets the routing bucket for the specified player.
 * 
 * Routing buckets are also known as 'dimensions' or 'virtual worlds' in past echoes, however they are population-aware.
 * @param playerSrc
 * @param bucket
 */
export function setPlayerRoutingBucket(playerSrc: string, bucket: number): void { 
	return _in(0x00000000, 0x6504eb38, _ts(playerSrc), bucket); 
}

/**
 * Call SET_PLAYER_WANTED_LEVEL_NOW for immediate effect
 * wantedLevel is an integer value representing 0 to 5 stars even though the game supports the 6th wanted level but no police will appear since no definitions are present for it in the game files
 * disableNoMission-  Disables When Off Mission- appears to always be false
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PLAYER_WANTED_LEVEL](?\_0x39FF19C64EF7DA5B).**
 * @param player
 * @param wantedLevel
 * @param disableNoMission
 */
export function setPlayerWantedLevel(player: number, wantedLevel: number, disableNoMission: boolean): void { 
	return _in(0x00000000, 0xb7a0914b, player, wantedLevel, disableNoMission); 
}

/**
 * Nonsynchronous [SET_RESOURCE_KVP_FLOAT](#\_0x9ADD2938) operation; see [FLUSH_RESOURCE_KVP](#\_0x5240DA5A).
 * @param key
 * @param value
 */
export function setResourceKvpFloatNoSync(key: string, value: number): void { 
	return _in(0x00000000, 0x3517bfbe, _ts(key), _fv(value)); 
}

/**
 * Nonsynchronous [SET_RESOURCE_KVP_INT](#\_0x6A2B1E8) operation; see [FLUSH_RESOURCE_KVP](#\_0x5240DA5A).
 * @param key
 * @param value
 */
export function setResourceKvpIntNoSync(key: string, value: number): void { 
	return _in(0x00000000, 0x26aeb707, _ts(key), value); 
}

/**
 * Nonsynchronous [SET_RESOURCE_KVP](#\_0x21C7A35B) operation; see [FLUSH_RESOURCE_KVP](#\_0x5240DA5A).
 * @param key
 * @param value
 */
export function setResourceKvpNoSync(key: string, value: string): void { 
	return _in(0x00000000, 0x0cf9a2ff, _ts(key), _ts(value)); 
}

/**
 * Sets the entity lockdown mode for a specific routing bucket.
 * 
 * Lockdown modes are:
 * 
 * | Mode       | Meaning                                                    |
 * | ---------- | ---------------------------------------------------------- |
 * | `strict`   | No entities can be created by clients at all.              |
 * | `relaxed`  | Only script-owned entities created by clients are blocked. |
 * | `inactive` | Clients can create any entity they want.                   |
 * @param bucketId
 * @param mode
 */
export function setRoutingBucketEntityLockdownMode(bucketId: number, mode: string): void { 
	return _in(0x00000000, 0xa0f2201f, bucketId, _ts(mode)); 
}

/**
 * Sets whether or not the specified routing bucket has automatically-created population enabled.
 * @param bucketId
 * @param mode
 */
export function setRoutingBucketPopulationEnabled(bucketId: number, mode: boolean): void { 
	return _in(0x00000000, 0xce51ac2c, bucketId, mode); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_ALARM](?\_0xCDE5E70C1DDB954C).**
 * @param vehicle
 * @param state
 */
export function setVehicleAlarm(vehicle: number, state: boolean): void { 
	return _in(0x00000000, 0x24877d84, vehicle, state); 
}

/**
 * p2 often set to 1000.0 in the decompiled scripts.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_BODY_HEALTH](?\_0xB77D05AC8C78AADB).**
 * @param vehicle
 * @param value
 */
export function setVehicleBodyHealth(vehicle: number, value: number): void { 
	return _in(0x00000000, 0x920c2517, vehicle, _fv(value)); 
}

/**
 * Sets the selected vehicle's colors to their default value (specific variant specified using the colorCombination parameter).
 * Range of possible values for colorCombination is currently unknown, I couldn't find where these values are stored either (Disquse's guess was vehicles.meta but I haven't seen it in there.)
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_COLOUR_COMBINATION](?\_0x33E8CD3322E2FE31).**
 * @param vehicle
 * @param colorCombination
 */
export function setVehicleColourCombination(vehicle: number, colorCombination: number): void { 
	return _in(0x00000000, 0xa557aead, vehicle, colorCombination); 
}

/**
 * colorPrimary & colorSecondary are the paint indexes for the vehicle.
 * For a list of valid paint indexes, view: pastebin.com/pwHci0xK
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_COLOURS](?\_0x4F1D4BE3A7F24601).**
 * @param vehicle
 * @param colorPrimary
 * @param colorSecondary
 */
export function setVehicleColours(vehicle: number, colorPrimary: number, colorSecondary: number): void { 
	return _in(0x00000000, 0x57f24253, vehicle, colorPrimary, colorSecondary); 
}

/**
 * p1, p2, p3 are RGB values for color (255,0,0 for Red, ect)
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_CUSTOM_PRIMARY_COLOUR](?\_0x7141766F91D15BEA).**
 * @param vehicle
 * @param r
 * @param g
 * @param b
 */
export function setVehicleCustomPrimaryColour(vehicle: number, r: number, g: number, b: number): void { 
	return _in(0x00000000, 0x8df9f9bc, vehicle, r, g, b); 
}

/**
 * p1, p2, p3 are RGB values for color (255,0,0 for Red, ect)
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_CUSTOM_SECONDARY_COLOUR](?\_0x36CED73BFED89754).**
 * @param vehicle
 * @param r
 * @param g
 * @param b
 */
export function setVehicleCustomSecondaryColour(vehicle: number, r: number, g: number, b: number): void { 
	return _in(0x00000000, 0x9d77259e, vehicle, r, g, b); 
}

/**
 * Sets the dirt level of the passed vehicle.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_DIRT_LEVEL](?\_0x79D3B596FE44EE8B).**
 * @param vehicle
 * @param dirtLevel
 */
export function setVehicleDirtLevel(vehicle: number, dirtLevel: number): void { 
	return _in(0x00000000, 0x2b39128b, vehicle, _fv(dirtLevel)); 
}

/**
 * See eDoorId declared in [`SET_VEHICLE_DOOR_SHUT`](#\_0x93D9BD300D7789E5)
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_DOOR_BROKEN](?\_0xD4D4F6A4AB575A33).**
 * @param vehicle
 * @param doorIndex
 * @param deleteDoor
 */
export function setVehicleDoorBroken(vehicle: number, doorIndex: number, deleteDoor: boolean): void { 
	return _in(0x00000000, 0x8147fea7, vehicle, doorIndex, deleteDoor); 
}

/**
 * // Source GTA VC miss2 leak, matching constants for 0/2/4, testing
 * // They use 10 in am_mp_property_int, don't know what it does atm.
 * enum eCarLock {
 * CARLOCK_NONE = 0,
 * CARLOCK_UNLOCKED = 1,
 * CARLOCK_LOCKED = 2,
 * CARLOCK_LOCKOUT_PLAYER_ONLY = 3,
 * CARLOCK_LOCKED_PLAYER_INSIDE = 4,
 * CARLOCK_LOCKED_INITIALLY = 5,
 * CARLOCK_FORCE_SHUT_DOORS = 6,
 * CARLOCK_LOCKED_BUT_CAN_BE_DAMAGED = 7
 * };
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_DOORS_LOCKED](?\_0xB664292EAECF7FA6).**
 * @param vehicle
 * @param doorLockStatus
 */
export function setVehicleDoorsLocked(vehicle: number, doorLockStatus: number): void { 
	return _in(0x00000000, 0x4cdd35d0, vehicle, doorLockStatus); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_NUMBER_PLATE_TEXT](?\_0x95A88F0B409CDA47).**
 * @param vehicle
 * @param plateText
 */
export function setVehicleNumberPlateText(vehicle: number, plateText: string): void { 
	return _in(0x00000000, 0x400f9556, vehicle, _ts(plateText)); 
}

export function startResource(resourceName: string): boolean { 
	return _in(0x00000000, 0x29b440dc, _ts(resourceName), _r); 
}

export function stopResource(resourceName: string): boolean { 
	return _in(0x00000000, 0x21783161, _ts(resourceName), _r); 
}

/**
 * Makes the specified ped attack the target ped.
 * p2 should be 0
 * p3 should be 16
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_COMBAT_PED](?\_0xF166E48407BAC484).**
 * @param ped
 * @param targetPed
 * @param p2
 * @param p3
 */
export function taskCombatPed(ped: number, targetPed: number, p2: number, p3: number): void { 
	return _in(0x00000000, 0xcb0d8932, ped, targetPed, p2, p3); 
}

/**
 * Example:
 * TASK::TASK_DRIVE_BY(l\_467\[1 -- [[22]] ], PLAYER::PLAYER_PED_ID(), 0, 0.0, 0.0, 2.0, 300.0, 100, 0, ${firing_pattern_burst_fire_driveby});
 * Needs working example. Doesn't seem to do anything.
 * I marked p2 as targetVehicle as all these shooting related tasks seem to have that in common.
 * I marked p6 as distanceToShoot as if you think of GTA's Logic with the native SET_VEHICLE_SHOOT natives, it won't shoot till it gets within a certain distance of the target.
 * I marked p7 as pedAccuracy as it seems it's mostly 100 (Completely Accurate), 75, 90, etc. Although this could be the ammo count within the gun, but I highly doubt it. I will change this comment once I find out if it's ammo count or not.
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_DRIVE_BY](?\_0x2F8AF0E82773A171).**
 * @param driverPed
 * @param targetPed
 * @param targetVehicle
 * @param targetX
 * @param targetY
 * @param targetZ
 * @param distanceToShoot
 * @param pedAccuracy
 * @param p8
 * @param firingPattern
 */
export function taskDriveBy(driverPed: number, targetPed: number, targetVehicle: number, targetX: number, targetY: number, targetZ: number, distanceToShoot: number, pedAccuracy: number, p8: boolean, firingPattern: number): void { 
	return _in(0x00000000, 0x2b84d1c4, driverPed, targetPed, targetVehicle, _fv(targetX), _fv(targetY), _fv(targetZ), _fv(distanceToShoot), pedAccuracy, p8, firingPattern); 
}

/**
 * speed 1.0 = walk, 2.0 = run
 * p5 1 = normal, 3 = teleport to vehicle, 8 = normal/carjack ped from seat, 16 = teleport directly into vehicle
 * p6 is always 0
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_ENTER_VEHICLE](?\_0xC20E50AA46D09CA8).**
 * @param ped
 * @param vehicle
 * @param timeout
 * @param seatIndex
 * @param speed
 * @param flag
 * @param p6
 */
export function taskEnterVehicle(ped: number, vehicle: number, timeout: number, seatIndex: number, speed: number, flag: number, p6: number): void { 
	return _in(0x00000000, 0xb8689b4e, ped, vehicle, timeout, seatIndex, _fv(speed), flag, p6); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [TASK_EVERYONE_LEAVE_VEHICLE](?\_0x7F93691AB4B92272).**
 * @param vehicle
 */
export function taskEveryoneLeaveVehicle(vehicle: number): void { 
	return _in(0x00000000, 0xc1971f30, vehicle); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [TASK_GO_STRAIGHT_TO_COORD](?\_0xD76B57B44F1E6F8B).**
 * @param ped
 * @param x
 * @param y
 * @param z
 * @param speed
 * @param timeout
 * @param targetHeading
 * @param distanceToSlide
 */
export function taskGoStraightToCoord(ped: number, x: number, y: number, z: number, speed: number, timeout: number, targetHeading: number, distanceToSlide: number): void { 
	return _in(0x00000000, 0x80a9e7a7, ped, _fv(x), _fv(y), _fv(z), _fv(speed), timeout, _fv(targetHeading), _fv(distanceToSlide)); 
}

/**
 * example from fm_mission_controller
 * TASK::TASK_GO_TO_COORD_ANY_MEANS(l\_649, sub_f7e86(-1, 0), 1.0, 0, 0, 786603, 0xbf800000);
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_GO_TO_COORD_ANY_MEANS](?\_0x5BC448CB78FA3E88).**
 * @param ped
 * @param x
 * @param y
 * @param z
 * @param speed
 * @param p5
 * @param p6
 * @param walkingStyle
 * @param p8
 */
export function taskGoToCoordAnyMeans(ped: number, x: number, y: number, z: number, speed: number, p5: number, p6: boolean, walkingStyle: number, p8: number): void { 
	return _in(0x00000000, 0xf91df93b, ped, _fv(x), _fv(y), _fv(z), _fv(speed), p5, p6, walkingStyle, _fv(p8)); 
}

/**
 * The entity will move towards the target until time is over (duration) or get in target's range (distance). p5 and p6 are unknown, but you could leave p5 = 1073741824 or 100 or even 0 (didn't see any difference but on the decompiled scripts, they use 1073741824 mostly) and p6 = 0
 * Note: I've only tested it on entity -> ped and target -> vehicle. It could work differently on other entities, didn't try it yet.
 * Example: TASK::TASK_GO_TO_ENTITY(pedHandle, vehicleHandle, 5000, 4.0, 100, 1073741824, 0)
 * Ped will run towards the vehicle for 5 seconds and stop when time is over or when he gets 4 meters(?) around the vehicle (with duration = -1, the task duration will be ignored).
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_GO_TO_ENTITY](?\_0x6A071245EB0D1882).**
 * @param entity
 * @param target
 * @param duration
 * @param distance
 * @param speed
 * @param p5
 * @param p6
 */
export function taskGoToEntity(entity: number, target: number, duration: number, distance: number, speed: number, p5: number, p6: number): void { 
	return _in(0x00000000, 0x374827c2, entity, target, duration, _fv(distance), _fv(speed), _fv(p5), p6); 
}

/**
 * In the scripts, p3 was always -1.
 * p3 seems to be duration or timeout of turn animation.
 * Also facingPed can be 0 or -1 so ped will just raise hands up.
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_HANDS_UP](?\_0xF2EAB31979A7F910).**
 * @param ped
 * @param duration
 * @param facingPed
 * @param p3
 * @param p4
 */
export function taskHandsUp(ped: number, duration: number, facingPed: number, p3: number, p4: boolean): void { 
	return _in(0x00000000, 0x8dcc19c5, ped, duration, facingPed, p3, p4); 
}

/**
 * Flags are the same flags used in [`TASK_LEAVE_VEHICLE`](#\_0xD3DBCE61A490BE02)
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_LEAVE_ANY_VEHICLE](?\_0x504D54DF3F6F2247).**
 * @param ped
 * @param p1
 * @param flags
 */
export function taskLeaveAnyVehicle(ped: number, p1: number, flags: number): void { 
	return _in(0x00000000, 0xdbdd79fa, ped, p1, flags); 
}

/**
 * Flags from decompiled scripts:
 * 0 = normal exit and closes door.
 * 1 = normal exit and closes door.
 * 16 = teleports outside, door kept closed.  (This flag does not seem to work for the front seats in buses, NPCs continue to exit normally)
 * 64 = normal exit and closes door, maybe a bit slower animation than 0.
 * 256 = normal exit but does not close the door.
 * 4160 = ped is throwing himself out, even when the vehicle is still.
 * 262144 = ped moves to passenger seat first, then exits normally
 * Others to be tried out: 320, 512, 131072.
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_LEAVE_VEHICLE](?\_0xD3DBCE61A490BE02).**
 * @param ped
 * @param vehicle
 * @param flags
 */
export function taskLeaveVehicle(ped: number, vehicle: number, flags: number): void { 
	return _in(0x00000000, 0x7b1141c6, ped, vehicle, flags); 
}

/**
 * [Animations list](https://alexguirre.github.io/animations-list/)
 * 
 * ```
 * float blendInSpeed > normal speed is 8.0f
 * ----------------------
 * float blendOutSpeed > normal speed is 8.0f
 * ----------------------
 * int duration: time in millisecond
 * ----------------------
 * -1 _ _ _ _ _ _ _> Default (see flag)
 * 0 _ _ _ _ _ _ _ > Not play at all
 * Small value _ _ > Slow down animation speed
 * Other _ _ _ _ _ > freeze player control until specific time (ms) has
 * _ _ _ _ _ _ _ _ _ passed. (No effect if flag is set to be
 * _ _ _ _ _ _ _ _ _ controllable.)
 * int flag:
 * ----------------------
 * enum eAnimationFlags
 * {
 * ANIM_FLAG_NORMAL = 0,
 * ANIM_FLAG_REPEAT = 1,
 * ANIM_FLAG_STOP_LAST_FRAME = 2,
 * ANIM_FLAG_UPPERBODY = 16,
 * ANIM_FLAG_ENABLE_PLAYER_CONTROL = 32,
 * ANIM_FLAG_CANCELABLE = 120,
 * };
 * Odd number : loop infinitely
 * Even number : Freeze at last frame
 * Multiple of 4: Freeze at last frame but controllable
 * 01 to 15 > Full body
 * 10 to 31 > Upper body
 * 32 to 47 > Full body > Controllable
 * 48 to 63 > Upper body > Controllable
 * ...
 * 001 to 255 > Normal
 * 256 to 511 > Garbled
 * ...
 * playbackRate:
 * values are between 0.0 and 1.0
 * lockX:
 * 0 in most cases 1 for rcmepsilonism8 and rcmpaparazzo_3
 * > 1 for mini@sprunk
 * lockY:
 * 0 in most cases
 * 1 for missfam5_yoga, missfra1mcs_2_crew_react
 * lockZ:
 * 0 for single player
 * Can be 1 but only for MP
 * ```
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_PLAY_ANIM](?\_0xEA47FE3719165B94).**
 * @param ped
 * @param animDictionary
 * @param animationName
 * @param blendInSpeed
 * @param blendOutSpeed
 * @param duration
 * @param flag
 * @param playbackRate
 * @param lockX
 * @param lockY
 * @param lockZ
 */
export function taskPlayAnim(ped: number, animDictionary: string, animationName: string, blendInSpeed: number, blendOutSpeed: number, duration: number, flag: number, playbackRate: number, lockX: boolean, lockY: boolean, lockZ: boolean): void { 
	return _in(0x00000000, 0x5ab552c6, ped, _ts(animDictionary), _ts(animationName), _fv(blendInSpeed), _fv(blendOutSpeed), duration, flag, _fv(playbackRate), lockX, lockY, lockZ); 
}

/**
 * It's similar to the one above, except the first 6 floats let you specify the initial position and rotation of the task. (Ped gets teleported to the position).
 * [Animations list](https://alexguirre.github.io/animations-list/)
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_PLAY_ANIM_ADVANCED](?\_0x83CDB10EA29B370B).**
 * @param ped
 * @param animDict
 * @param animName
 * @param posX
 * @param posY
 * @param posZ
 * @param rotX
 * @param rotY
 * @param rotZ
 * @param animEnterSpeed
 * @param animExitSpeed
 * @param duration
 * @param flag
 * @param animTime
 * @param p14
 * @param p15
 */
export function taskPlayAnimAdvanced(ped: number, animDict: string, animName: string, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, animEnterSpeed: number, animExitSpeed: number, duration: number, flag: number, animTime: number, p14: number, p15: number): void { 
	return _in(0x00000000, 0x3ddeb0e6, ped, _ts(animDict), _ts(animName), _fv(posX), _fv(posY), _fv(posZ), _fv(rotX), _fv(rotY), _fv(rotZ), _fv(animEnterSpeed), _fv(animExitSpeed), duration, flag, _fv(animTime), p14, p15); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [TASK_REACT_AND_FLEE_PED](?\_0x72C896464915D1B1).**
 * @param ped
 * @param fleeTarget
 */
export function taskReactAndFleePed(ped: number, fleeTarget: number): void { 
	return _in(0x00000000, 0x8a632bd8, ped, fleeTarget); 
}

/**
 * Firing Pattern Hash Information: https://pastebin.com/Px036isB
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_SHOOT_AT_COORD](?\_0x46A6CC01E0826106).**
 * @param ped
 * @param x
 * @param y
 * @param z
 * @param duration
 * @param firingPattern
 */
export function taskShootAtCoord(ped: number, x: number, y: number, z: number, duration: number, firingPattern: number): void { 
	return _in(0x00000000, 0x601c22e3, ped, _fv(x), _fv(y), _fv(z), duration, firingPattern); 
}

/**
 * //this part of the code is to determine at which entity the player is aiming, for example if you want to create a mod where you give orders to peds
 * Entity aimedentity;
 * Player player = PLAYER::PLAYER_ID();
 * PLAYER::\_GET_AIMED_ENTITY(player, \&aimedentity);
 * //bg is an array of peds
 * TASK::TASK_SHOOT_AT_ENTITY(bg\[i], aimedentity, 5000, MISC::GET_HASH_KEY("FIRING_PATTERN_FULL_AUTO"));
 * in practical usage, getting the entity the player is aiming at and then task the peds to shoot at the entity, at a button press event would be better.
 * Firing Pattern Hash Information: https://pastebin.com/Px036isB
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_SHOOT_AT_ENTITY](?\_0x08DA95E8298AE772).**
 * @param entity
 * @param target
 * @param duration
 * @param firingPattern
 */
export function taskShootAtEntity(entity: number, target: number, duration: number, firingPattern: number): void { 
	return _in(0x00000000, 0xac0631c9, entity, target, duration, firingPattern); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [TASK_WARP_PED_INTO_VEHICLE](?\_0x9A7D091411C5F684).**
 * @param ped
 * @param vehicle
 * @param seatIndex
 */
export function taskWarpPedIntoVehicle(ped: number, vehicle: number, seatIndex: number): void { 
	return _in(0x00000000, 0x65d4a35d, ped, vehicle, seatIndex); 
}

export function tempBanPlayer(playerSrc: string, reason: string): void { 
	return _in(0x00000000, 0x1e35dbba, _ts(playerSrc), _ts(reason)); 
}

/**
 * The backing function for TriggerClientEvent.
 * @param eventName
 * @param eventTarget
 * @param eventPayload
 * @param payloadLength
 */
export function triggerClientEventInternal(eventName: string, eventTarget: string, eventPayload: string, payloadLength: number): void { 
	return _in(0x00000000, 0x2f7a49e6, _ts(eventName), _ts(eventTarget), _ts(eventPayload), payloadLength); 
}

/**
 * The backing function for TriggerLatentClientEvent.
 * @param eventName
 * @param eventTarget
 * @param eventPayload
 * @param payloadLength
 * @param bps
 */
export function triggerLatentClientEventInternal(eventName: string, eventTarget: string, eventPayload: string, payloadLength: number, bps: number): void { 
	return _in(0x00000000, 0x70b35890, _ts(eventName), _ts(eventTarget), _ts(eventPayload), payloadLength, bps); 
}

export function verifyPasswordHash(password: string, hash: string): boolean { 
	return _in(0x00000000, 0x2e310acd, _ts(password), _ts(hash), _r); 
}
