import { Centrifuge } from "centrifuge";
import { renewSubscriptionToken } from "@/utils/authentication";

import store from "../redux/store";

export const createCentrifugeClientObj = (token) => {
  const client = new Centrifuge("ws://127.0.0.1:8001/connection/websocket", {
    token: token,
    getToken: function (ctx) {
      return renewSubscriptionToken(
        `http://127.0.0.1:8000/api/renew-acc-token/`,
        ctx
      );
    },
  });
  client.on("connecting", (ctx) => {
    console.log("Socket Establishing...");
  });
  client.on("connected", (ctx) => {
    console.log("Socket Established!");
  });
  return client;
};

export const subscribeToChannelForAcceptingItem = (
  centrifuge,
  subToken,
  callback
) => {
  const username = store.getState().userSession.username;
  const channelName = `${username}#${username}`;
  const channelNameEncoded = encodeURIComponent(channelName);
  const sub = centrifuge.newSubscription(channelName, {
    token: subToken,
    getToken: function (ctx) {
      return renewSubscriptionToken(
        `http://127.0.0.1:8000/api/renew-sub-token/?channel=${channelNameEncoded}`,
        ctx
      );
    },
  });
  sub.on("publication", (ctx) => {
    console.log("Item Received \n\n");
    console.log(ctx.data);
    callback(ctx.data.item);
  });

  return sub;
};

export const subscribeToChannelForOrderProcess = (
  centrifuge,
  subToken,
  callback
) => {
  const username = store.getState().userSession.username;
  const channelName = `${username}#${username}`;
  const channelNameEncoded = encodeURIComponent(channelName);
  const sub = centrifuge.newSubscription(channelName, {
    token: subToken,
    getToken: function (ctx) {
      return renewSubscriptionToken(
        `http://127.0.0.1:8000/api/renew-sub-token/?channel=${channelNameEncoded}`,
        ctx
      );
    },
  });
  sub.on("publication", (ctx) => {
    console.log("Status Received \n\n");
    console.log(ctx.data.current_status);
    callback(ctx.data.current_status);
  });

  return sub;
};
