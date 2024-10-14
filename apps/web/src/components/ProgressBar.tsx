"use client";
import Router from "next/router";
import NProgress from "nprogress";

// Type definitions
let timer: NodeJS.Timeout | undefined;
let state: "loading" | "stop" | undefined;
let activeRequests = 0;
const delay = 250;

function load(): void {
  console.log("loading");
  if (state === "loading") {
    return;
  }

  state = "loading";

  timer = setTimeout(() => {
    NProgress.start();
  }, delay); // only show progress bar if it takes longer than the delay
}

function stop(): void {
  if (activeRequests > 0) {
    return;
  }

  state = "stop";

  if (timer) {
    clearTimeout(timer);
  }
  NProgress.done();
}

// Router events for route change
Router.events.on("routeChangeStart", load);
Router.events.on("routeChangeComplete", stop);
Router.events.on("routeChangeError", stop);

// Save the original fetch function
const originalFetch = window.fetch;

// Override the fetch function
window.fetch = async function (...args: [RequestInfo, RequestInit?]): Promise<Response> {
  if (activeRequests === 0) {
    load();
  }

  activeRequests++;

  try {
    const response = await originalFetch(...args);
    return response;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    activeRequests -= 1;
    if (activeRequests === 0) {
      stop();
    }
  }
};

// Default export
export default function () {
  return null;
}
