import { createApp } from 'vue';

export const withSetup = (composable: () => any) => {
  let resut: any;

  const app = createApp({
    setup() {
      resut = composable();
      return () => {};
    },
  });
  app.mount(document.createElement('div'));
  return [resut, app] as const;
};
