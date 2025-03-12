interface CutCondition {
  evaluate(): boolean | Promise<boolean>;
}

class NPlusCutCondition implements CutCondition {
  evaluate(): boolean | Promise<boolean> {
    return false;
  }
}

class UpDownCutCondition implements CutCondition {
  evaluate(): boolean | Promise<boolean> {
    return false;
  }
}
