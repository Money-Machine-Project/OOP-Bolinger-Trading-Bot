export interface Behavior {
  evaluate(): Promise<boolean>;
  action(): Promise<void>;
}
