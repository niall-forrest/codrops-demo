import { defaultTransition } from "./animations/index";
import { alternativeTransition } from "./animations/alternative.js";

export const transitionRegistry = {
  "home-to-schedule": defaultTransition,
  "schedule-to-home": defaultTransition,
  "home-to-shows": defaultTransition,
  "shows-to-home": defaultTransition,
  "home-to-stories": defaultTransition,
  "stories-to-home": defaultTransition,
  "schedule-to-shows": defaultTransition,
  "shows-to-schedule": defaultTransition,
  "schedule-to-stories": defaultTransition,
  "stories-to-schedule": defaultTransition,
  "shows-to-stories": defaultTransition,
  "stories-to-shows": defaultTransition,
  default: defaultTransition,
};

export function getTransition(currentNamespace, nextNamespace) {
  const key = `${currentNamespace}-to-${nextNamespace}`;
  const transition = transitionRegistry[key] || transitionRegistry.default;
  return transition;
}
