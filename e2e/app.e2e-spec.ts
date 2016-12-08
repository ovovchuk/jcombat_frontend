import { JavaCombatPage } from './app.po';

describe('java-combat App', function() {
  let page: JavaCombatPage;

  beforeEach(() => {
    page = new JavaCombatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
