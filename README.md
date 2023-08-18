# cfx-server

improve your scripting quality of life.
```ts
import * as cfx from "cfx-server";

cfx.ServerEvent.playerJoining((data: cfx.ServerEventContext.playerJoining) => {
	console.log("onPlayerJoining", data);
});

cfx.ServerEvent.playerDropped((data: cfx.ServerEventContext.playerDropped) => {
	console.log("onPlayerDropped", data.source, data.reason);
});

cfx.Event.onClient("testEvent", (source: number, str: string) => {
	console.log("testEvent", source, str);
});

cfx.ServerEvent.explosionEvent((data: cfx.ServerEventContext.explosionEvent) => {
	return false;
});
```