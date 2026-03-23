const LESS_MIXINS = `
.ios-vars(@ruleset) {
  .ios {
    @ruleset();
  }
}
.md-vars(@ruleset) {
  .md {
    @ruleset();
  }
}
.dark-vars(@ruleset) {
  .dark, &.dark {
    @ruleset();
  }
}
.light-vars(@ruleset) {
  & {
    @ruleset();
  }
}
.ltr(@ruleset) {
  @ruleset();
}
.rtl(@ruleset) {}

.md-color-vars(@ruleset) {
  .md,
  .md .dark,
  .md [class*='color-'] {
    @ruleset();
  }
}

.ios-color-vars(@ruleset) {
  .ios,
  .ios .dark,
  .ios [class*='color-'] {
    @ruleset();
  }
}
`;

module.exports = LESS_MIXINS;
