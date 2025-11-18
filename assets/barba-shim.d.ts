declare module '@barba/core' {
  export interface BarbaHookAPI {
    afterEnter(cb: (data: unknown) => void): void;
    after?(cb: (data: unknown) => void): void;
  }
  export interface Barba {
    hooks: BarbaHookAPI;
    init(options?: { transitions?: unknown[]; views?: unknown[] }): void;
  }
  const barba: Barba;
  export default barba;
}

export interface BarbaNavigator {
  go(href: string, trigger?: string): Promise<unknown> | void;
}

declare global {
  interface Window {
    Y?: BarbaNavigator;
  }
}



