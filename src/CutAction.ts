interface CutAction {
  action(): Promise<void> | void;
}

class NPlusCutAction implements CutAction {
  async action(): Promise<void> {}
}

class UpDownCutAction implements CutAction {
  async action(): Promise<void> {}
}
